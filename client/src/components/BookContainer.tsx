import { Card } from '@mui/material';
import React from 'react';

interface Props {
  id: string;
  cover: string;
  title: string;
  author: string;
  rating: number;
  review: string;
  date_read: Date;
  date_added: Date;
}

const BookContainer = (props: Props) => {
  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <img src={props.cover} alt={`$title cover`} style={{
        height: '14rem',
        width: '150px',
      }}/>
      <div>{props.title}</div>
    </Card>
  );
};

export default BookContainer;
