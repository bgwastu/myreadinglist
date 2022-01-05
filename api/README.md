# API Specifications
| Method | Endpoint             | Description                              |
|--------|----------------------|------------------------------------------|
| GET    | /books/shelf/{shelf} | Get list of book based on shelf slug     |
| GET    | /shelves             | Get list of shelf                        |
| GET    | /books/{id}          | Get details of a book, without user info |
| GET    | /user-detail         | Get user detail                          |


# Quick start
- Change your Goodreads ID in the `config.py` file
- Make sure to have pipenv installed, then install the dependencies:
  ```bash
  $ pipenv install
  ```
- Then run the server:
  ```bash
  $ pipenv run python main.py
  ```
# Unit testing
```bash
$ pipenv run python test.py
```