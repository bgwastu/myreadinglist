import MenuBook from '@mui/icons-material/MenuBook';
import { Stack, Typography } from '@mui/material';
import React from 'react';

const NoBookScreen = () => {
  return (
    <Stack sx={{ flexGrow: 1 }} alignItems="center" justifyContent="center">
      <MenuBook sx={{ fontSize: 60, color: '#757575' }} />
      <Typography variant="h5" sx={{ fontWeight: '600' }}>
        No Books
      </Typography>
      <Typography>No books added into this shelf.</Typography>
    </Stack>
  );
};

export default NoBookScreen;
