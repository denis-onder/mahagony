import { Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { PermissionPayload } from "../../domain/Permission";
import { Props, style } from "../../utils/modalUtils";

export default function AddEmployeeModal({ open, onClose, onSubmit }: Props) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const payload: PermissionPayload = {
      code: formData.get("code") as string,
      description: formData.get("description") as string,
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
      <Box sx={style} component="form" noValidate onSubmit={handleSubmit}>
        <Typography
          component="h6"
          variant="h6"
          style={{ marginBottom: "16px" }}
        >
          Add A New Permission
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="code"
              label="Code"
              name="code"
              autoComplete="code"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              autoComplete="description"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Add Permission
        </Button>
      </Box>
    </Modal>
  );
}
