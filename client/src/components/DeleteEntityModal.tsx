import { Button, Grid, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Permission } from "../domain/Permission";
import { User } from "../domain/User";
import { DeleteEntityModalTarget, Props, style } from "../utils/modalUtils";

interface DeleteEntityModalProps extends Props {
  entity: User | Permission;
  target: DeleteEntityModalTarget;
}

export default function DeleteEntityModal({
  open,
  entity,
  target,
  onClose,
  onSubmit,
}: DeleteEntityModalProps) {
  const handleSubmit = () => {
    onSubmit(entity);
  };
  const getEntityName = () => {
    if (target === "employee") {
      const { firstName, lastName } = entity as User;
      return `${firstName} ${lastName}`;
    } else {
      return (entity as Permission).code;
    }
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
          Delete {target === "employee" ? "Employee" : "Permission"}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <p>Are you sure you want to delete the following {target}?</p>
            <b>{getEntityName()}</b>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={onClose}>
              Cancel
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} textAlign="right">
            <Button variant="contained" color="error" onClick={handleSubmit}>
              Delete
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
