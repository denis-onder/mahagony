import * as api from "../api";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Permission, PermissionPayload } from "../domain/Permission";
import { Box } from "@mui/system";
import { DeleteEntityModalTarget } from "../utils/modalUtils";
import PermissionsTable from "../components/Permissions/PermissionsTable";
import Loader from "../components/Loader";
import onError from "../utils/onError";
import AddPermissionModal from "../components/Permissions/AddPermissionModal";
import toast from "react-hot-toast";
import DeleteEntityModal from "../components/DeleteEntityModal";

export default function Permissions() {
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState<Array<Permission>>([]);
  const [selectedPermission, setSelectedPermission] =
    useState<Permission | null>(null);
  const [showAddPermissionModal, setShowAddPermissionModal] = useState(false);
  const [showDeletePermissionModal, setShowDeletePermissionModal] =
    useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    function loadPermissions() {
      return api.permissions.findPermissions();
    }

    async function load() {
      try {
        setLoading(true);

        const permissions = await loadPermissions();

        setPermissions(permissions);
      } catch (error) {
        navigate("/login");
        onError("Please Login Again.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const onAddPermissionSubmit = async (payload: PermissionPayload) => {
    try {
      const permission = await api.permissions.createPermission(payload);

      if (!permission) {
        onError("Failed to create permission.");
      }

      setPermissions([...permissions, permission]);
      toast.success("Permission Created Successfully!");
    } catch (error) {
      onError(error);
    } finally {
      setShowAddPermissionModal(false);
    }
  };

  const handleOnDeleteEmployeeClick = (permission: Permission) => {
    setSelectedPermission(permission);
    setShowDeletePermissionModal(true);
  };

  const onDeletePermission = async (permission: Permission) => {
    try {
      await api.permissions.deletePermission(permission._id);
      setPermissions(permissions.filter((p) => p._id !== permission._id));
      toast.success("Permission Deleted Successfully!");
    } catch (error) {
      onError(error);
    } finally {
      setShowDeletePermissionModal(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: "12px",
                marginX: "6px",
              }}
            >
              <Typography variant="h6" component="h6">
                Permissions
              </Typography>
              <Button onClick={() => setShowAddPermissionModal(true)}>
                Add Permission
              </Button>
            </Box>
            <PermissionsTable
              permissions={permissions}
              onDeletePermissionClick={handleOnDeleteEmployeeClick}
            />
          </Paper>
        </Grid>
      </Grid>
      <AddPermissionModal
        open={showAddPermissionModal}
        onClose={() => setShowAddPermissionModal(false)}
        onSubmit={onAddPermissionSubmit}
      />
      {selectedPermission && (
        <DeleteEntityModal
          open={showDeletePermissionModal}
          entity={selectedPermission}
          onClose={() => setShowDeletePermissionModal(false)}
          onSubmit={onDeletePermission}
          target={DeleteEntityModalTarget.PERMISSION}
        />
      )}
    </Fragment>
  );
}
