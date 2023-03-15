import {alpha, styled} from "@mui/material/styles";
import InputBase from '@mui/material/InputBase';
import { useState } from "react";
import * as React from "react";
import axiosInstance from "../axios";
import SearchBar from '@mkyy/mui-search-bar';
import { useNavigate } from "react-router-dom";

const SearchMUI = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const Search = () => {
    const navigateTo = useNavigate();
    const [appState, setAppState] = useState({
        search: '',
        posts: []
    });

    const handleChange = (e) => {
        console.log(e)
        setAppState({
            ...appState,
            search: e
        })
        console.log()
    }

    const handleSearch = () => {
        console.log("handleSearch dziala");
        axiosInstance
            .get(`search/?search=${appState.search}`)
            .then((response) => {
                console.log("TO jest response:", response)
                const allPosts = response.data;
                setAppState({
                    ...appState,
                    posts: allPosts
                });
                console.log(response.data);
            });
        navigateTo(`search/?search=${appState.search}`)
    }

    return (
        // <StyledInputBase
        //     placeholder="Search…"
        //     onChange={handleChange}
        //     onSearch={handleSearch}
        //
        // />
    <SearchBar
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            value={appState.search}
            onChange={handleChange}
        />
    );
}

export {
    SearchIconWrapper,
    SearchMUI,
    Search
}