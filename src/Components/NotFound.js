import React, { Component } from "react"
import {
        Card,
        CardContent,
        CardActionArea,
        CardMedia,
        Typography, 
      } from '@mui/material/';

class NotFound extends Component {
  constructor() {
    super();
  }

  render() {
    return (
        <Card sx={{ maxWidth: 500 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              image="https://c.tenor.com/j5YcO9slE7YAAAAC/leslie-nielsen-nothing-to-see-here.gif"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                404 not found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Nothing to see here
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
    );
  }
}

export default NotFound;
