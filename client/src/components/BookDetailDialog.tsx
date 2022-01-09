import Add from '@mui/icons-material/Add';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import React from 'react';
import { Book } from '../interface';

interface Props {
  book?: Book;
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
}

const DetailBook = (props: Props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    props.setIsDialogOpen(false);
  };

  const parseDate = (date?: Date) => {
    if (!date) return '';
    const parsedDate = new Date(date);
    return `${parsedDate.getDate()} ${parsedDate.toLocaleString('default', {
      month: 'long',
    })} ${parsedDate.getFullYear()}`;
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={props.isDialogOpen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle>{props.book?.title}</DialogTitle>
      <DialogContent dividers>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{
            minWidth: '400px',
          }}
          spacing={2}
        >
          <img
            src={props.book?.cover}
            alt={`$title cover`}
            style={{
              height: '13rem',
              borderRadius: '5px',
            }}
          />
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1}
          >
            <Typography variant="body1">
              {props.book?.author} (Author)
            </Typography>
            <Stack direction="row" alignItems="center" gap={1}>
              <Rating readOnly value={props.book?.rating} />
              <Typography variant="body1">{props.book?.rating}</Typography>
            </Stack>

            <DialogContentText
              sx={{
                textJustify: 'inter-word',
                textAlign: 'justify',
              }}
            >
              {props.book?.review ?? 'No review yet.'}
            </DialogContentText>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          gap={1}
          sx={{ marginTop: '16px', color: '#9e9e9e' }}
        >
          {props.book?.date_read ? (
            <Tooltip title="Date read" arrow>
              <Chip
                icon={<EventAvailableIcon />}
                label={parseDate(props.book?.date_read)}
                variant="outlined"
                size="small"
                color="info"
              />
            </Tooltip>
          ) : null}
          <Tooltip title="Date added" arrow>
            <Chip
              icon={<Add />}
              label={parseDate(props.book?.date_added)}
              variant="outlined"
              size="small"
            />
          </Tooltip>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          href={`https://www.goodreads.com/book/show/${props.book?.id}`}
          target="_blank"
          rel="noopener noreferrer"
          variant="outlined"
          color="secondary"
          sx={{
            marginRight: '8px',
          }}
        >
          View on Goodreads
        </Button>
        <Button autoFocus onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailBook;
