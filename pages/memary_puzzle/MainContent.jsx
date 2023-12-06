import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MainContent({encryptedString1 , encryptedString2}) {



  return (
    <Card sx={{ minWidth: 275  , maxWidth : 800}}>
      <CardContent>

        <Typography variant="h5" component="div">
          SOME
        </Typography>

        <Typography variant="body2" className = "fix-size">
          
            {encryptedString1}
            <br />
            <br />
            {encryptedString2}
          
        </Typography>
      </CardContent>

    </Card>
  );
}

