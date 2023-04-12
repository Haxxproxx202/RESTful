import * as React from 'react';
import {Fragment, useEffect, useState} from "react";
import axiosInstance from "../axios";
import {useLocation, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {searchPosts} from "./searchposts";


const SearchResult = () => {
    const data = useLocation();
    const [posts, setPosts] = useState([]);
    const navigateTo = useNavigate();

    useEffect(() => {
        axiosInstance
            .get(`search/?search=${data.state.data}`)
            .then((response) => {
                const allPosts = response.data;
                setPosts(allPosts);
            });
    }, [data.state.data]);


    if (!posts || posts.length === 0) {
        return <p>Can not find any posts, sorry</p>;
    } else {
        return (
            <Fragment>
                <div className="App">
                    <Button variant="text" onClick={() => navigateTo('/')} style={{float: "left"}}>Back</Button>
                    <h1>Results</h1>
                </div>
                {searchPosts(posts)}
            </Fragment>
        )
    }
}

export default SearchResult;
