import React, { useEffect, useState } from "react";
import './App.css';
import Posts from './components/Posts';
import PostLoadingComponent from './components/PostLoading';
import axiosInstance from "./axios";


const App = () => {
    const PostLoading = PostLoadingComponent(Posts);
    const [appState, setAppState] = useState({
        loading: false,
        posts: null,
    });

    useEffect(() => {
        axiosInstance.get().then((res) => {
            const allPosts = res.data;
            setAppState({ loading: false, posts: allPosts });

        });
    }, [setAppState]);
    return (
        <div className="App">
            <h1>Latest Posts</h1>
            <PostLoading isLoading={appState.loading} posts={appState.posts} />
        </div>
    );
}

export default App;
