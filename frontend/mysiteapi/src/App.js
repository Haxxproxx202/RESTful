import React, { useEffect, useState } from "react";
import './App.css';
import Posts from './components/Posts';
import PostLoadingComponent from './components/PostLoading';


const App = () => {
    const PostLoading = PostLoadingComponent(Posts);
    const [appState, setAppState] = useState({
        loading: false,
        posts: null,
    });
    const [list, setList] = useState([1, 2, 3, 4, 5]);

    useEffect(() => {
        setAppState({ loading: true});
        const apiUrl = 'http://127.0.0.1:8000/api/';
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setAppState(prevState => {
                    return {
                        loading: false,
                        posts: data
                    }
                })
            })
            .catch((err) => console.log(err))
    }, [setAppState]);
    return (
        <div className="App">
            <h1>Latest Posts</h1>
            {/*{*/}
            {/*    appState.posts.map((el, id) => (*/}
            {/*        <PostLoading key={id} isLoading={appState.loading} />*/}
            {/*    ))*/}
            {/*}*/}
            {/*<PostLoading isLoading={appState.loading} posts={appState.posts} />*/}
            <PostLoading isLoading={appState.loading} posts={appState.posts} />
        </div>
    );
}

export default App;























// import React from 'react';
//
// class connectionExample extends React.Component {
//     componentDidMount() {
//         const apiUrl = 'http://127.0.0.1:8000/api/';
//         fetch(apiUrl)
//             .then((response) => response.json())
//             .then((data) => console.log(data))
//     }
//     render() {
//         return <div>Example connection</div>;
//     }
// }
//
// export default connectionExample;
