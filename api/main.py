import json
from datetime import datetime
import os
import requests
from bottle import request, route, run, static_file, response, hook
from bs4 import BeautifulSoup
from config import DETAIL_URL, LIST_URL, USER_DETAIL_URL, ID
import re


@route('/<:re:.*>', method='OPTIONS')
def enable_cors_generic_route():
    add_cors_headers()


@hook('after_request')
def enable_cors_after_request_hook():
    add_cors_headers()


def add_cors_headers():
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = \
        'GET, POST, PUT, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = \
        'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'


@route('/')
def index():
    return static_file('index.html', root='./static')


@route('/user-detail')
def user_detail():
    body = requests.get(USER_DETAIL_URL)
    soup = BeautifulSoup(body.content, 'html.parser')

    name = soup.find('h1', {'class': 'userProfileName'}).text.strip()
    first_name = name.split(' ')[0]
    last_name = name.split(' ')[-1]

    return json.dumps({
        'user_id': ID,
        'first_name': first_name,
        'last_name': last_name,
    })


# Get books based on shelf
# shelf: currently-reading, to-read, read
@route('/books/shelf/<shelf>')
def get_books_shelf(shelf):
    # Check page
    page = request.query.page or 1
    page = int(page)
    body = requests.get(
        LIST_URL, params={'shelf': shelf, 'page': page, 'print': 'true'})
    soup = BeautifulSoup(body.content, 'html.parser')

    # Get max page
    max_page = 1
    if soup.select_one('.next_page'):
        max_page = int(soup.select_one(
            '.next_page').find_previous_sibling('a').text)

    # Check is page is end by current page > max page
    if page > max_page:
        max_page = page

    booksRaw = soup.select('tbody#booksBody > tr')
    books = []

    for book in booksRaw:
        cover = re.sub("_(?<=_)[a-zA-Z0-9\_]+_.", "",
                       book.select('img')[0]['src'])
        title = book.select_one('.field.title > div > a').attrs['title']
        author = book.select_one('.field.author > div > a').text
        rating = book.find_all('span', class_='staticStar p10')
        review = book.select('.field.review > div > span')[-1].get_text(' ')
        date_read = book.select_one(
            '.field.date_read > div > div > div > span').text.strip()
        date_added = book.select_one(
            '.field.date_added > div > span').text.strip()
        detail_url = book.select_one('td.field.title > div > a')['href']

        # Get id from detail_url
        id = (detail_url.split('/')[-1]).split('-')[0]

        # Date parsing, parse if date format is like Jan 01, 2002 or if failed like date Jan 2002
        if date_read == 'not set':
            date_read = None
        else:
            try:
                date_read = datetime.strptime(
                    date_read, '%b %d, %Y').isoformat()
            except:
                date_read = datetime.strptime(date_read, '%b %Y').isoformat()

        if date_added == 'not set':
            date_added = None
        else:
            try:
                date_added = datetime.strptime(
                    date_added, '%b %d, %Y').isoformat()
            except:
                date_added = datetime.strptime(date_added, '%b %Y').isoformat()

        if review == 'None':
            review = None

        books.append({
            'id': id,
            'cover': cover,
            'title': title,
            'author': author,
            'rating': len(rating),
            'review': review,
            'date_read': date_read,
            'date_added': date_added,
        })

    return json.dumps({
        'current_page': page,
        'max_page': max_page,
        'data': books
    })


# Get details of a book, without user info
@route('/books/<book_id:re:[0-9]+>')
def get_book_details(book_id):
    page = requests.get(DETAIL_URL + book_id)
    if page.status_code == 404:
        return json.dumps({'error': 'Book not found'})

    soup = BeautifulSoup(page.content, 'html.parser')

    title = soup.select_one('h1#bookTitle').text.strip()
    author = soup.select_one('.authorName > span').text.strip()
    description = soup.select(
        'div#description > span')[-1].get_text('\n').replace('\n', '\n\n')
    genres = [x.text for x in soup.select('.actionLinkLite.bookPageGenreLink')]
    pages = int(
        soup.find('span', {'itemprop': 'numberOfPages'}).text.replace(' pages', ''))

    return json.dumps({
        'title': title,
        'author': author,
        'description': description,
        'genres': genres,
        'pages': pages,
    })


@route('/shelves')
def get_shelves():
    page = requests.get(LIST_URL)
    soup = BeautifulSoup(page.content, 'html.parser')

    shelves = [dict({
        'name': x.select_one('a').text.split(' ‎(')[0].strip(),
        'slug': x.select_one('a').attrs['href'].split('shelf=')[-1],
        'total': int(x.select_one('a').text.split(' ‎(')[-1].strip().replace(')', ''))
    }) for x in soup.find_all('div', class_='userShelf')]

    return json.dumps(shelves)


if __name__ == '__main__':
    # Get host and port from environment variable
    host = os.environ.get('HOST') or '127.0.0.1'
    run(host=host, port=5000, debug=not host)
