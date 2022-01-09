import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Fade,
  FormControl,
  Grid,
  LinearProgress,
  MenuItem,
  Pagination,
  Select,
  Stack,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import BookContainer from './components/BookContainer';
import BookDetailDialog from './components/BookDetailDialog';
import Drawer from './components/Drawer';
import NoBookScreen from './components/NoBookScreen';
import SplashScreen from './components/SplashScreen';
import constants from './constants';
import { Book, BookResponse, Shelf, UserDetail } from './interface';

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = mobileOpen ? 300 : 340;

  const [shelves, setShelves] = useState<Shelf[]>();
  const [currentShelf, setCurrentShelf] = useState<Shelf>();
  const [bookResponse, setBookResponse] = useState<BookResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const [userDetail, setUserDetail] = useState<UserDetail>();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book>();

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  // Fetch requested page number
  function gotoPage(page: number) {
    if (currentShelf !== undefined) {
      // Fetch next book list
      if (bookResponse !== undefined) {
        // If the requested page is current page, do nothing
        if (page === bookResponse.current_page) {
          return;
        }

        if (bookResponse.current_page <= bookResponse.max_page) {
          backToTop();
          setIsLoading(true);
          fetch(
            `${constants.API_URL}/books/shelf/${currentShelf.slug}?page=${page}`
          )
            .then((res) => res.json())
            .then((data) => {
              setBookResponse(data as BookResponse);
              setIsLoading(false);
            });
        }
      }
    }
  }

  // When current shelf shanged
  useEffect(() => {
    if (currentShelf !== undefined) {
      setIsLoading(true);
      fetch(`${constants.API_URL}/books/shelf/${currentShelf.slug}`)
        .then((res) => res.json())
        .then((data) => {
          setBookResponse(data as BookResponse);
          setIsLoading(false);
        });
    }
  }, [currentShelf]);

  // Fetch initial data
  useEffect(() => {
    fetch(`${constants.API_URL}/shelves`)
      .then((res) => res.json())
      .then((data) => {
        setShelves(data);
        setCurrentShelf(data[0]);
      });

    fetch(`${constants.API_URL}/user-detail`)
      .then((res) => res.json())
      .then((data) => {
        setUserDetail(data as UserDetail);
      });

    fetch(`${constants.API_URL}/books/shelf/read`)
      .then((res) => res.json())
      .then((data) => {
        setBookResponse(data as BookResponse);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (
      shelves !== undefined &&
      currentShelf !== undefined &&
      bookResponse !== undefined &&
      userDetail !== undefined
    ) {
      setIsInitial(false);
    }
  }, [currentShelf, shelves, bookResponse, userDetail]);

  function onClickDetail(book: Book) {
    setIsDialogOpen(true);
    setSelectedBook(book);
  }

  const mainContent = () => {
    if (bookResponse === undefined) {
      return <></>;
    }
    if (bookResponse.data.length > 0) {
      return (
        <Fade in={!isLoading}>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            gap={2}
            sx={{
              height: '100vh',
            }}
          >
            <Grid
              container
              sx={{
                px: 6,
                py: 3,
                flexGrow: 1,
                display: 'flex',
                justifyContent: {
                  xs: 'center',
                  lg: 'flex-start',
                },
              }}
              gap={2}
            >
              {bookResponse.data?.map((book) => (
                <Grid
                  item
                  key={book.id}
                  sx={{
                    maxWidth: '160px',
                    visibility: isLoading ? 'hidden' : 'visible',
                    cursor: 'pointer',
                  }}
                  onClick={() => onClickDetail(book)}
                >
                  <BookContainer {...book} />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                padding: '16px',
              }}
            >
              <Pagination
                count={bookResponse.max_page}
                onChange={(e, page) => {
                  gotoPage(page);
                }}
                color="primary"
              />
            </Box>
          </Stack>
        </Fade>
      );
    } else {
      return <NoBookScreen />;
    }
  };

  const drawerContent = (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
      spacing={2}
      flexGrow={1}
      sx={{
        m: 4,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 'medium', mb: 0 }}>
        {userDetail !== undefined ? `${userDetail.first_name}'s` : ''}
      </Typography>
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold' }}
        style={{ marginTop: 2 }}
        color="secondary.main"
        mt={0}
      >
        Bookshelves
      </Typography>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentShelf ? currentShelf.slug : ''}
          disabled={isLoading}
          onChange={(value) => {
            if (shelves !== undefined) {
              setCurrentShelf(
                shelves.find((shelf) => shelf.slug === value.target.value)
              );
            }
          }}
        >
          {shelves !== undefined ? (
            shelves.map((shelf) => (
              <MenuItem key={shelf.slug} value={shelf.slug}>
                {shelf.name}
              </MenuItem>
            ))
          ) : (
            <></>
          )}
        </Select>
      </FormControl>
    </Stack>
  );

  const appBar = (
    <AppBar
      position="static"
      sx={{
        borderBottom: '0.01px solid #d7d7d7',
      }}
      color="transparent"
      elevation={0}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => setMobileOpen(!mobileOpen)}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          noWrap
          component="div"
          sx={{
            fontWeight: '600',
            fontSize: {
              xs: 18,
              md: 28,
            },
            ml: {
              md: 4,
            },
          }}
        >
          {currentShelf?.name}
        </Typography>
      </Toolbar>
      <LinearProgress sx={{ visibility: isLoading ? 'visible' : 'hidden' }} />
    </AppBar>
  );

  if (isInitial) {
    return <SplashScreen />;
  }

  return (
    <>
      <Fade in={!isInitial}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Drawer
            content={drawerContent}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
            userId={userDetail?.user_id}
          />
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            sx={{
              width: { md: `calc(100% - ${drawerWidth}px)` },
              height: '90vh',
              mt: {
                md: 8,
              },
            }}
          >
            {appBar}
            {mainContent()}
          </Stack>
        </Box>
      </Fade>
      <BookDetailDialog
        book={selectedBook}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </>
  );
}

export default App;
