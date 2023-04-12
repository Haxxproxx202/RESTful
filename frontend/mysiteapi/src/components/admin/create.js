import * as React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import slugify from "./slugify/slugify";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from "axios";
const theme = createTheme();

export default function Create() {
    const navigateTo = useNavigate();
    const initialFormData = Object.freeze({
        title: '',
        excerpt: '',
        slug: '',
        content: ''
    });

    const [postData, setPostData] = useState(initialFormData);
    const [postImage, setPostImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'image') {
            setPostImage({
                image: e.target.files,
            })
        }
        if (name === 'title') {
            setPostData({
                ...postData,
                [name]: value,
                ['slug']: slugify(value.trim())
            })
        } else {
                setPostData({
                    ...postData,
                    [name]: value,
            })
        }}

    const handleSubmit = (event) => {
        event.preventDefault();

        const config = { headers: { 'Content-Type': 'multipart/form-data'}};
        const URL = 'http://127.0.0.1:8000/api/admin/create/';
        let formData = new FormData();
        formData.append('title', postData.title);
        formData.append('slug', postData.slug);
        formData.append('author', 1);
        formData.append('excerpt', postData.excerpt);
        formData.append('content', postData.content);
        if (postImage) {
            formData.append('image', postImage.image[0]);
        }

        axios
            .post(URL, formData, config)
            .catch((err) => console.log(err));
        navigateTo('/admin/');
        window.location.reload();

    //
    //
    //     axiosInstance
    //         .post('admin/create/', {
    //             title: postData.title,
    //             excerpt: postData.excerpt,
    //             author: 1,
    //             slug: postData.slug,
    //             content: postData.content,
    //         })
    //         // .post('admin/create/', {
    //         //     "title": "test",
    //         //     "slug": "test",
    //         //     "author": 1,
    //         //     "excerpt": "test",
    //         //     "content": "dsadas"
    //         // })
    //         .then((res) => {
    //             navigateTo('/admin/');
    //             // console.log(res);
    //             // console.log(res.data);
    //         })
    //         .catch((error) => console.log(error));
    };


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <PostAddIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create New Post
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="on"
                                    name="title"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Post Title"
                                    autoFocus
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    multiline
                                    rows={4}
                                    required
                                    fullWidth
                                    id="excerpt"
                                    label="Post Excerpt"
                                    name="excerpt"
                                    autoComplete="off"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    disabled
                                    fullWidth
                                    id="slug"
                                    label="Slug"
                                    name="slug"
                                    autoComplete="off"
                                    onChange={handleChange}
                                    value={postData.slug}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    multiline
                                    rows={4}
                                    required
                                    fullWidth
                                    name="content"
                                    label="Content"
                                    id="content"
                                    autoComplete="off"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <input
                                accept="image/*"
                                id="post-image"
                                onChange={handleChange}
                                name="image"
                                type="file"
                            />
                            <label htmlFor="post-image">
                                <AddPhotoAlternateIcon />
                            </label>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="Save to drafts"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            Create Post
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}