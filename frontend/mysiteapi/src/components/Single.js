import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";


import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import Avatar from "@mui/joy/Avatar";
import Button from "@mui/material/Button";

export default function Single() {

    const [data, setData] = useState({post: []});
    const { slug } = useParams();
    const navigateTo = useNavigate();

    useEffect(() => {
        axiosInstance.get('detail/?slug=' + slug)
            .then((response) => {
                setData({post: response.data[0]})
            })
            .catch((error) => console.log(error));
    }, [setData, slug])
    const styleCSS = {
        display: "flex",
        float: "left",
        margin: "5px 10px",
    }

    const trimData = (data) => {
        if (data === undefined) {
            return data
        } else {
            return data.substring(0, 19);
        }
    }

    const styleMainDiv = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
    return (
        <div style={styleMainDiv}>
            <Button
                type="submit"
                style={{float: "left"}}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => navigateTo('/')
                }
            >
                Back
            </Button>
            <Box sx={{minHeight: 350}} style={styleCSS}>
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
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            maxWidth: 300,
                        }}
                    >
                        <Box sx={{display: 'flex'}}>
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
                                position: "relative"
                            }}
                        >
                            <img
                                alt="not found"
                                src={data.post.image}
                                width="250"
                                height="250"
                            />
                        </AspectRatio>
                        <Box sx={{display: 'flex', gap: 1.5, mt: 'auto'}}>
                            <Avatar variant="soft" color="neutral">
                                Y
                            </Avatar>
                            <div>
                                <Typography fontWeight="lg" level="body2">
                                    Title:
                                </Typography>
                                <Typography level="body2">{data.post.title}</Typography>

                                <Typography fontWeight="lg" level="body2">
                                    Author:
                                </Typography>
                                <Typography level="body2">{data.post.author}</Typography>

                                <Typography fontWeight="lg" level="body2">
                                    Excerpt:
                                </Typography>
                                <Typography level="body2">{data.post.excerpt}</Typography>

                                <Typography fontWeight="lg" level="body2">
                                    Content:
                                </Typography>
                                <Typography level="body2">{data.post.content}</Typography>

                                <Typography fontWeight="lg" level="body2">
                                    Published:
                                </Typography>
                                <Typography level="body2">{trimData(data.post.published)}</Typography>
                            </div>
                        </Box>
                    </Box>
                </Card>
            </Box>
        </div>
    )
}