import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function TableDecode({decodeKey , setDecodeKey}) {
 


    const setKey = (i,k) => {
        setDecodeKey(decodeKey.map( (x,j) => i==j?k:x ))
    }

    const a_z="abcdefghijklmnopqrstuvwxyz"
    const a_zList = [...a_z]
    let range13 = () => [...Array(13).keys()]
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">

        <TableBody>
          {range13().map((x,i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {a_zList[i]}
              </TableCell>
              <TableCell align="right">
                <input value={decodeKey[i]}
                    maxLength={1} 
                    minLength={1}
                    onChange= { e => setKey(i,e.target.value)}/>
                </TableCell>
                <TableCell component="th" scope="row">
                {a_zList[i+13]}
              </TableCell>
              
              <TableCell align="right">
                <input value={decodeKey[i+13]}
                    maxLength={1} 
                    minLength={1}
                    onChange= { e => setKey(i+13,e.target.value)}/>
                </TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}