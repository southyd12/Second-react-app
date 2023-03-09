import React from 'react'
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Typography } from '@mui/material';

function CartoonList({
  cartoons=[], 
  deleteHandler=() => console.log('No deleteHandler provided to Cartoons List')
}) {
  const reversedCartoons = [...cartoons].reverse();
  return (
    <List>
        {reversedCartoons.map(({ title, creator, image, id }) => (
          <ListItem key={id}>
            <ListItemAvatar>
              <Avatar alt="" src={image} />
            </ListItemAvatar>
            <ListItemText>
              {title} (Created by: {creator})
            </ListItemText>
            <IconButton
              aria-label="update"
              to={`/update/${id}`}
              component={Link}
            >
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => deleteHandler(id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
  )
}

export default CartoonList