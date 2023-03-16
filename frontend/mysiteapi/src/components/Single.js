import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axiosInstance from "../axios";

const Single = () => {
    const [data, setData] = useState({post: []});
    const { slug } = useParams();

    useEffect(() => {
        axiosInstance.get('detail/?slug=' + slug)
            .then((response) => {
                console.log(response.data)
                setData({post: response.data[0]})
            })
            .catch((error) => console.log(error));
    }, [setData])


    return (
        <div>
            <div>Title: {data.post.title}</div>
            <div>Content: {data.post.content}</div>
            <div>Excerpt: {data.post.excerpt}</div>

        </div>
    );
};

export default Single;