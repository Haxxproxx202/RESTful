import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { useEffect, useState } from "react";
import axiosInstance from "../axios";
import { useLocation } from "react-router-dom";


const SearchResult = () => {
    const data = useLocation();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axiosInstance
            .get(`search/?search=${data.state.data}`)
            .then((response) => {
                console.log("TO jest response:", response)
                const allPosts = response.data;
                setPosts(allPosts);
                console.log(response.data);
            });
    }, []);


    if (!posts || posts.length === 0) {
        return <p>Can not find any posts, sorry</p>;
    } else {
        return (
            posts.map((el, id) => {
                return (
                    <Box key={id} sx={{minHeight: 350}}>
                        <Card
                            variant="outlined"
                            sx={(theme) => ({
                                width: 300,
                                gridColumn: 'span 2',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                resize: 'horizontal',
                                overflow: 'hidden',
                                gap: 'clamp(0px, (100% - 360px + 32px) * 999, 16px)',
                                transition: 'transform 0.3s, border 0.3s',
                                '&:hover': {
                                    borderColor: theme.vars.palette.primary.outlinedHoverBorder,
                                    transform: 'translateY(-2px)',
                                },
                                '& > *': {minWidth: 'clamp(0px, (360px - 100%) * 999,100%)'},
                            })}
                        >

                            <AspectRatio
                                variant="soft"
                                sx={{
                                    flexGrow: 1,
                                    display: 'contents',
                                    '--AspectRatio-paddingBottom':
                                        'clamp(0px, (100% - 360px) * 999, min(calc(100% / (16 / 9)), 300px))',
                                }}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2000"
                                    loading="lazy"
                                    alt=""
                                />
                            </AspectRatio>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2,
                                    maxWidth: 200,
                                }}
                            >
                                <Box sx={{display: 'flex'}}>
                                    <div>
                                        <Typography level="h2" sx={{fontSize: 'md'}} mb={0.5}>
                                            <Link
                                                href={`post/${el.slug}`}
                                                overlay
                                                underline="none"
                                                sx={{
                                                    color: 'text.primary',
                                                    '&.Mui-focusVisible:after': {outlineOffset: '-4px'},
                                                }}
                                            >
                                                Author: {el.author}
                                            </Link>
                                        </Typography>
                                        <Typography level="body2">{el.title}</Typography>
                                    </div>
                                    <IconButton
                                        size="sm"
                                        variant="plain"
                                        color="neutral"
                                        sx={{ml: 'auto', alignSelf: 'flex-start'}}
                                    >
                                        <FavoriteBorderRoundedIcon color="danger"/>
                                    </IconButton>
                                </Box>
                                <AspectRatio
                                    variant="soft"
                                    sx={{
                                        '--AspectRatio-paddingBottom':
                                            'clamp(0px, (100% - 200px) * 999, 200px)',
                                        pointerEvents: 'none',
                                    }}
                                >
                                    <img
                                        alt=""
                                        src="https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2262"
                                    />
                                </AspectRatio>
                                <Box sx={{display: 'flex', gap: 1.5, mt: 'auto'}}>
                                    <Avatar variant="soft" color="neutral">
                                        Y
                                    </Avatar>
                                    <div>
                                        <Typography level="body2">Designed by</Typography>
                                        <Typography fontWeight="lg" level="body2">
                                            {el.excerpt}
                                        </Typography>
                                    </div>
                                </Box>
                            </Box>
                        </Card>
                    </Box>
                )
            })
        )
    }
}

export default SearchResult;
