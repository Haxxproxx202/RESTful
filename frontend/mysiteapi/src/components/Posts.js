import * as React from 'react';
import {searchPosts} from "./searchposts";


const ContainerResponsive = (props) => {
    const { posts } = props;
    console.log("Nowe posty:", posts);


    if (!posts || posts.length === 0) {
        return <p>Can not find any posts, sorry</p>;
    } else {
        return (
            <div>
                {searchPosts(posts)}
            </div>
        )
    }
}

export default ContainerResponsive;
