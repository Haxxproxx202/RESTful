import axiosInstance from "../../axios";
import { useNavigate, useParams } from 'react-router-dom';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

export default function Create() {
    const navigateTo = useNavigate();
    const { id } = useParams();

    const handleDelete = (event) => {
        event.preventDefault();

        axiosInstance
            .delete('admin/delete/' + id)
            .then((res) => {
                navigateTo('/admin/');
            })
            .catch((error) => {
                if(error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
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
                    <Typography component="h1" variant="h5">
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: 'error.main'}}
                            onClick={handleDelete}
                        >
                            PRESS HERE TO CONFIRM DELETE
                        </Button>
                        <Button
                            type="submit"
                            style={{float: "left"}}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => navigateTo('/admin/')
                            }
                        >
                            Back
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}