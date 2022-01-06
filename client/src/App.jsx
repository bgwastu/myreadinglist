import MenuIcon from '@mui/icons-material/Menu';
import { FormControl, MenuItem, Select, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import MainDrawer from './components/MainDrawer';

const App = (props) => {
  const title = 'All Book';
  const name = 'Bagas Wastu';
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const drawerWidth = mobileOpen ? 300 : 340;

  const mainContent = (
    <Box
      sx={{
        px: 2,
        py: 2,
      }}
    >
      <Box>Hello World</Box>
    </Box>
  );

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
        {name + "'s"}
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
          value={10}
          onChange={() => {}}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
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
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <MainDrawer
        content={drawerContent}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        userId="123"
      />
      <Box
        component="main"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          display: 'flex',
          flexDirection: 'column',
          mt: {
            md: 8,
          },
        }}
      >
        {appBar}
        {mainContent}
      </Box>
    </Box>
  );
};

export default App;
