import * as React from 'react';
// import Posts from '../Posts/';
// import PostLoadingComponent from "../PostLoading";
// import axiosInstance from "../../axios";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Link from "@mui/joy/Link";
import Button from "@mui/material/Button";
import {Fragment} from "react";



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function CustomizedTables(props) {
    const { posts } = props;
    // console.log("to są posty:", posts)

    if(!posts || posts.length === 0) return <p>Can not find any posts, sorry for that</p>
    return (
        <Fragment>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 700 }} aria-label="customized table" >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Title</StyledTableCell>
                            <StyledTableCell align="right" >ID</StyledTableCell>
                            <StyledTableCell align="right">Author</StyledTableCell>
                            <StyledTableCell align="right">Category</StyledTableCell>
                            <StyledTableCell align="right">Content</StyledTableCell>
                            <StyledTableCell align="right">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts.map((el) => (
                            <StyledTableRow key={el.id} style={{margin: "80px"}}>
                                <StyledTableCell component="th" scope="el" style={{margin: "80px"}}>
                                    {el.title}
                                </StyledTableCell>
                                <StyledTableCell align="right">{el.id}</StyledTableCell>
                                <StyledTableCell align="right">{el.author}</StyledTableCell>
                                <StyledTableCell align="right">{el.category}</StyledTableCell>
                                <StyledTableCell align="right">{el.content.substring(0, 20)}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <Link href={'/admin/edit/' + el.id}>
                                        <EditRoundedIcon />
                                    </Link>
                                    <Link href={'/admin/delete' + el.id} style={{color: "red"}}>
                                        <DeleteForeverRoundedIcon />
                                    </Link>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}

                    </TableBody>

                </Table>
            </TableContainer>
            <Button variant="contained" href={'/admin/create'} style={{float: "right"}}>New Post</Button>
        </Fragment>

    );
}
