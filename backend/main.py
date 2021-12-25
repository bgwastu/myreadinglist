from bottle import route, run, template
from config import LIST_URL, DETAIL_URL
import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime


# Get books based on shelf
# shelf: currently-reading, to-read, read
@route('/books/shelf/<shelf>')
def get_books_read(shelf):
    page = requests.get(LIST_URL, params={'shelf': shelf})
    soup = BeautifulSoup(page.content, 'html.parser')

    booksRaw = soup.select('tbody#booksBody > tr')
    books = []

    for book in booksRaw:
        cover = book.select('img')[0]['src'].replace('._SY75_', '')
        title = book.select_one('.field.title > div > a').attrs['title']
        author = book.select_one('.field.author > div > a').text
        rating = book.find_all('span', class_='staticStar p10')
        review = book.select_one('.field.review > div > span').text
        date_read = book.select_one(
            '.field.date_read > div > div > div > span').text.strip()
        date_added = book.select_one(
            '.field.date_added > div > span').text.strip()
        detail_url = book.select_one('td.field.title > div > a')['href']

        # get id from detail_url
        id = (detail_url.split('/')[-1]).split('-')[0]

        if date_read == 'not set':
            date_read = None
        else:
            date_read = datetime.strptime(date_read, '%b %d, %Y').isoformat()

        if date_added == 'not set':
            date_added = None
        else:
            date_added = datetime.strptime(date_added, '%b %d, %Y').isoformat()

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

    return json.dumps(books)

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

    # print to hello.html
    return json.dumps({
        'title': title,
        'author': author,
        'description': description,
        'genres': genres,
        'pages': pages,
    })


run(host='localhost', port=8080)
