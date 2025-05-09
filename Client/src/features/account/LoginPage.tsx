import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";

export default function LoginPage() {

    function handleSubmit() {

    }

    return (
        <Container maxWidth="xs">
            <Paper sx={{marginTop:8, padding: 2}} elevation={3}>
                <Avatar sx={{mx:"auto", mb: 2, bgcolor:"primary.main", textAlign:"center"}}>
                    <LockOutlined/>
                </Avatar>
                <Typography component="h1" variant="h5" sx={{textAlign: "center"}} gutterBottom>
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt:2}}>
                    <TextField label="Enter username" fullWidth required autoFocus sx={{mb:2}} size="small"></TextField>
                    <TextField label="Enter password" type="password" fullWidth required sx={{mb:2}} size="small"></TextField>
                    <Button type="submit" variant="contained" fullWidth sx={{mt:1}}>Login</Button>
                </Box>
            </Paper>
        </Container>
    );
}