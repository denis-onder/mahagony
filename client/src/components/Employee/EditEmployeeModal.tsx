import {
  Box,
  Button,
  Grid,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { User, UserPayload } from "../../domain/User";
import { Props, style } from "../../utils/modalUtils";

interface EditEmployeeModalProps extends Props {
  employee: User;
}

export default function EditEmployeeModal({
  open,
  employee,
  onClose,
  onSubmit,
}: EditEmployeeModalProps) {
  const [firstName, setFirstName] = useState(employee.firstName);
  const [lastName, setLastName] = useState(employee.lastName);
  const [email, setEmail] = useState(employee.email);
  const [username, setUsername] = useState(employee.username);
  const [status, setStatus] = useState(employee.status);
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: UserPayload = {
      firstName,
      lastName,
      email,
      username,
      password,
      status,
    };

    onSubmit(payload);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        id="form"
        sx={style}
        component="form"
        noValidate
        onSubmit={handleSubmit}
      >
        <Typography
          component="h6"
          variant="h6"
          style={{ marginBottom: "16px" }}
        >
          Edit Employee: {employee.firstName} {employee.lastName}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={`${status}`}
              label="Status"
              placeholder="Status"
              onChange={(e) =>
                setStatus(e.target.value === "true" ? true : false)
              }
            >
              <MenuItem value={"true"}>Active</MenuItem>
              <MenuItem value={"false"}>Inactive</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Edit Employee
        </Button>
      </Box>
    </Modal>
  );
}
