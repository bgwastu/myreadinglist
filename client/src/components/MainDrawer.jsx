import MenuBook from '@mui/icons-material/MenuBook';
import { Link, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import React from 'react';

const MainDrawer = (props) => {
  const { content, userId, mobileOpen, setMobileOpen, window } = props;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawerWidth = mobileOpen ? 300 : 340;

  const drawerHeader = (
    <>
      <Link href="/">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
          sx={{
            px: 4,
            py: 2,
            bgcolor: 'primary.light',
            color: 'primary.main',
          }}
        >
          <MenuBook fontSize="medium" />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            MyReadingList
          </Typography>
        </Stack>
      </Link>
      <Divider />
    </>
  );

  const drawerFooter = (
    <>
      <Divider />
      <Box
        sx={{
          mx: 2,
          my: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="overline">{'User id: ' + userId}</Typography>
        <Link sx={{ fontWeight: '600' }} href="#" variant="overline">
          API
        </Link>
      </Box>
    </>
  );

  const drawerMobile = (
    <Drawer
      container={container}
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        'display': { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
        },
      }}
    >
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {drawerHeader}
        {content}
        {drawerFooter}
      </Box>
    </Drawer>
  );

  const drawerDesktop = (
    <Drawer
      variant="permanent"
      sx={{
        'display': { xs: 'none', md: 'block' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
        },
      }}
      open
    >
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {drawerHeader}
        {content}
        {drawerFooter}
      </Box>
    </Drawer>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      aria-label="mailbox folders"
    >
      {drawerMobile}
      {drawerDesktop}
    </Box>
  );
};

export default MainDrawer;
