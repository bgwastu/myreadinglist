import { Paper, Link, Rating, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';

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
  const [raised, setRaised] = useState(false);

  const toggleRaised = () => setRaised(!raised);

  return (
    <Link href="#" underline="none">
      <Paper
        onMouseOver={toggleRaised}
        onMouseOut={toggleRaised}
        elevation={raised ? 3 : 1}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: 1,
          width: '160px',
        }}
      >
        <img
          src={props.cover}
          alt={`$title cover`}
          style={{
            height: '13rem',
            borderRadius: '3px',
          }}
        />
        <Tooltip title={props.title} followCursor>
          <Typography
            variant="body1"
            sx={{
              fontWeight: '600',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              marginTop: '5px',
            }}
          >
            {props.title}
          </Typography>
        </Tooltip>

        <Typography variant="caption">{props.author}</Typography>
        <Rating readOnly value={props.rating} />
      </Paper>
    </Link>
  );
};

export default BookContainer;
