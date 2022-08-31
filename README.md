# MyReadingList
[UNMAINTAINED]

**MyReadingList** is project that will list your reading history _(or any other user)_ from Goodreads and display it.

This come in handy if you want to show your cool list of books to friends but at the same time you want to manage all your reading activity from Goodreads.

![Screenshot](/assets/screenshot.jpg)

## Features

- List your reading history
- Display your bookshelves and books
- Get your comments and rating from books you've been read

## How to run the project

### Using Docker Compose

- Clone the repository
- Go to `client/src/config.js` and change the `apiUrl` to `http://localhost:5000`
- Edit `ID` variable at `/api/config.py` to change the User Goodreads id
- Run the following command:
  ```bash
  $ docker-compose up
  ```
- You can now access the client at `http://localhost:3000` and the API at `http://localhost:5000`

### Manually

- Clone the repository
- Go to `client/src/config.js` and change the `apiUrl` to `http://localhost:5000`
- Edit `ID` variable at `/api/config.py` to change the User Goodreads id
- Run the API server:
  ```bash
  $ cd api
  $ python -m venv venv
  $ source venv/bin/activate
  $ pip install -r requirements.txt
  $ python main.py
  ```
- Run the client server:
  ```bash
  $ cd client
  $ npm install
  $ npm start
  ```

# License

[MIT](License)
