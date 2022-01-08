import React from 'react';
import { CssBaseline, Stack, Typography, CircularProgress } from '@mui/material';
import MenuBook from '@mui/icons-material/MenuBook';

export default function SplashScreen() {
  return (
    <>
    <CssBaseline />
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{
          height: '100vh',
          width: `100vw`,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <MenuBook sx={{ fontSize: 42 }} />
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            MyReadingList
          </Typography>
        </Stack>
        <CircularProgress />
      </Stack>
    </>
  );
}
