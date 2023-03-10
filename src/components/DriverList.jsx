import React from 'react'
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import { Typography } from '@mui/material';

function DriverList({
  drivers=[], 
  deleteHandler=() => console.log('No deleteHandler provided to Drivers List')
}) {
  const reversedDrivers = [...drivers].reverse();
  return (
    <List sx={{border: 2, borderColor: 'primary.main', borderRadius: 2, mt: 2}}>
        {reversedDrivers.map(({ firstname, lastname, age, email, _id }) => (
          <ListItem key={_id}>
            <ListItemText>
              {firstname} {lastname} ({age} years old) Email: {email}
            </ListItemText>
            <IconButton
              aria-label="update"
              color="secondary"
              to={`/update/${_id}`}
              component={Link}
            >
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" color="secondary" onClick={() => deleteHandler(_id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
  )
}

export default DriverList