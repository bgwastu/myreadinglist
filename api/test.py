import json
import unittest

import responses
from boddle import boddle

from config import DETAIL_URL, LIST_URL
from main import get_books_shelf, get_shelves, get_book_details


class Test(unittest.TestCase):

    @responses.activate
    def test_get_books_read(self):

        # Arrange
        shelf = 'read'
        with open('./test_assets/get_books_read.html', 'r', encoding='utf-8') as f:
            data = f.read()
            f.close()
        with open('./test_assets/get_books_read.json', 'r', encoding='utf-8') as f:
            expected = json.load(f)
            f.close()
        responses.add(
            responses.GET, url=LIST_URL + f'?shelf={shelf}&page=1&print=true',
            body=data,
        )

        # Act
        res = get_books_shelf(shelf)
        res_dict = json.loads(res)

        # Assert
        self.assertEqual(res_dict, expected, 'Should return expected result')

    # Check pagination
    @responses.activate
    def test_get_books_pagination(self):

        # Arrange
        shelf = 'read'
        with open('./test_assets/get_books_pagination_1.html', 'r', encoding='utf-8') as f:
            response_1 = f.read()
            f.close()
        with open('./test_assets/get_books_pagination_2.html', 'r', encoding='utf-8') as f:
            response_2 = f.read()
            f.close()

        responses.add(
            responses.GET, url=LIST_URL + f'?shelf={shelf}&page=1&print=true',
            body=response_1,
        )

        responses.add(
            responses.GET, url=LIST_URL + f'?shelf={shelf}&page=2&print=true',
            body=response_2,
        )

        # Act
        res_1 = get_books_shelf(shelf)
        with boddle(page=2):
            res_2 = get_books_shelf(shelf)

        # Assert
        res_dict_1 = json.loads(res_1)
        self.assertEqual(res_dict_1['current_page'],
                         1, 'Should return current page (page 1)')
        self.assertEqual(res_dict_1['max_page'], 280,
                         'Should return max page (280)')

        res_dict_2 = json.loads(res_2)
        self.assertEqual(res_dict_2['current_page'],
                         1, 'Should return current page (page 2)')
        self.assertEqual(res_dict_2['max_page'], 280,
                         'Should return max page (280)')

    @responses.activate
    def test_get_shelves(self):
        # Arrange
        with open('./test_assets/get_shelves.html', 'r', encoding='utf-8') as f:
            response = f.read()
            f.close()
        with open('./test_assets/get_shelves.json', 'r', encoding='utf-8') as f:
            expected = json.load(f)
            f.close()

        responses.add(responses.GET, url=LIST_URL, body=response)

        # Act
        res = get_shelves()
        res_dict = json.loads(res)

        # Assert
        self.assertEqual(res_dict, expected, 'Should return expected result')

    # Check detail book
    @responses.activate
    def test_get_detail_book(self):

        # Arrange
        book_id = '1885'
        with open('./test_assets/get_detail_book.html', 'r', encoding='utf-8') as f:
            response = f.read()
            f.close()
        with open('./test_assets/get_detail_book.json', 'r', encoding='utf-8') as f:
            expected = json.load(f)
            f.close()
        responses.add(responses.GET, url=DETAIL_URL + book_id, body=response)

        # Act
        res = get_book_details(book_id)
        res_dict = json.loads(res)

        # Assert
        self.assertEqual(res_dict, expected, 'Should return expected result')


if __name__ == '__main__':
    unittest.main()
