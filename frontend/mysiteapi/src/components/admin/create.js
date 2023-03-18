import axiosInstance from "../../axios";
import { useNavigate } from 'react-router-dom';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import PostAddIcon from '@mui/icons-material/PostAdd';
// import Posts from "../Posts";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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

    const handleChange = (e) => {
        const { name, value } = e.target;
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


        axiosInstance
            .post('admin/create/', {
                title: postData.title,
                excerpt: postData.excerpt,
                author: 1,
                slug: postData.slug,
                content: postData.content,
            })
            // .post('admin/create/', {
            //     "title": "test",
            //     "slug": "test",
            //     "author": 1,
            //     "excerpt": "test",
            //     "content": "dsadas"
            // })
            .then((res) => {
                navigateTo('/admin/');
                // console.log(res);
                // console.log(res.data);
            })
            .catch((error) => console.log(error));
    };

    const slugify = (string) => {
        const a =
            'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
        const b =
            'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
        const p = new RegExp(a.split('').join('|'), 'g');

        return string
            .toString()
            .toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
            .replace(/&/g, '-and-') // Replace & with 'and'
            .replace(/[^\w\-]+/g, '') // Remove all non-word characters
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, ''); // Trim - from end of text
    }

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
                                    // InputProps={{ sx: { height: 80 } }}
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
                        {/*<Grid container justifyContent="flex-end">*/}
                        {/*    <Grid item>*/}
                        {/*        <Link href="#" variant="body2">*/}
                        {/*            Already have an account? Sign in*/}
                        {/*        </Link>*/}
                        {/*    </Grid>*/}
                        {/*</Grid>*/}
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}