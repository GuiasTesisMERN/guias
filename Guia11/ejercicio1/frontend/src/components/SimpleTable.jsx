import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const SimpleTable = ({cabeceras, datos}) => {

  return (
    <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    {
                        cabeceras?.map((c, k) => {
                            return <TableCell key={k} align="left" sx={{ backgroundColor: "primary.main", color: "white" }}>{c}</TableCell>
                        })
                    }
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    datos?.map((row, key) => {
                        return(
                            <TableRow key={row._id} sx={{
                                backgroundColor: !(key % 2) ? "#e6e6e6" : 'none',
                            }}>
                                <TableCell>{key + 1}</TableCell>
                                <TableCell>{row.nombres}</TableCell>
                                <TableCell>{row.apellidos}</TableCell>
                                <TableCell>{row.email}</TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    </TableContainer>
  )
}

export default SimpleTable;