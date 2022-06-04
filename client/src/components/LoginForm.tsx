import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { LoginPayload } from "../domain/Auth";
import {
  Avatar,
  Button,
  Grid,
  CssBaseline,
  Typography,
  Container,
  Box,
  TextField,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

interface Props {
  onLoginButtonClick: (data: LoginPayload) => void;
}

const theme = createTheme();

export default function LoginForm({ onLoginButtonClick }: Props) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      identifier: formData.get("identifier") as string,
      password: formData.get("password") as string,
    };

    onLoginButtonClick(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address or Username"
              name="identifier"
              autoComplete="identifier"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "blue" }}
                >
                  Don't have an account? Register here
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
