import MenuIcon from '@mui/icons-material/Menu';
import {
  FormControl,
  MenuItem,
  Select,
  Stack,
  Fade,
  LinearProgress,
  Grid,
  Box,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import Drawer from './components/Drawer';
import SplashScreen from './components/SplashScreen';
import constants from './constants';
import BookContainer from './components/BookContainer';
import NoBookScreen from './components/NoBookScreen';

interface Shelf {
  name: string;
  slug: string;
  total: number;
}

interface Book {
  id: string;
  cover: string;
  title: string;
  author: string;
  rating: number;
  review: string;
  date_read: Date;
  date_added: Date;
}

interface UserDetail {
  user_id: string;
  first_name: string;
  last_name: string;
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = mobileOpen ? 300 : 340;

  const [shelves, setShelves] = useState<Shelf[]>();
  const [currentShelf, setCurrentShelf] = useState<Shelf>();
  const [listBook, setListBook] = useState<Book[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const [userDetail, setUserDetail] = useState<UserDetail>();

  useEffect(() => {
    fetch(`${constants.API_URL}/user-detail`)
      .then((res) => res.json())
      .then((data) => {
        setUserDetail(data as UserDetail);
      });
  }, []);

  useEffect(() => {
    if (
      shelves !== undefined &&
      currentShelf !== undefined &&
      listBook !== undefined &&
      userDetail !== undefined
    ) {
      setIsInitial(false);
    }
  }, [currentShelf, shelves, listBook, userDetail]);

  useEffect(() => {
    fetch(`${constants.API_URL}/shelves`)
      .then((res) => res.json())
      .then((data) => {
        setShelves(data);
      });
  }, []);

  useEffect(() => {
    if (shelves !== undefined) {
      setCurrentShelf(shelves[0]);
    }
  }, [shelves]);

  // Fetch books
  useEffect(() => {
    if (currentShelf !== undefined) {
      setIsLoading(true);
      fetch(`${constants.API_URL}/books/shelf/${currentShelf.slug}`)
        .then((res) => res.json())
        .then((data) => {
          setListBook(data.data as Book[]);
          setIsLoading(false);
        });
    }
  }, [currentShelf]);

  const mainContent = () => {
    if (listBook === undefined) {
      return <></>;
    }
    if (listBook.length > 0) {
      return (
        <Fade in={!isLoading}>
          <Grid
            container
            sx={{
              px: 6,
              py: 3,
              display: 'flex',
              justifyContent: {
                xs: 'center',
                lg: 'flex-start',
              },
            }}
            gap={3}
          >
            {listBook?.map((book) => (
              <Grid item sx={{ maxWidth: '160px' }}>
                <BookContainer {...book} />
              </Grid>
            ))}
          </Grid>
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
  );
}

export default App;
