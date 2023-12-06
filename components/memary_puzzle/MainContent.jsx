import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MainContent({encryptedString1 , encryptedString2 , head}) {



  return (<div>

<Card sx={{ minWidth: 275  , maxWidth : 300 , maxHeight:40}} style={{margin:5}} >
    <div stly ={{margin:3}}>
      <div style={{padding:10 , margin: 0 , background: "linear-gradient(to top, #09203f 0%, #537895 100%)" , color:"white"}} >
          {head}
        </div>

        </div>

    </Card>

    <Card sx={{ minWidth: 275  , maxWidth : 800}}>
      <CardContent>
        <Typography variant="body2" className = "fix-size">
          
            {encryptedString1}
            <br />
            <br />
            {encryptedString2}
          
        </Typography>
      </CardContent>

    </Card>
    </div>
  );
}

