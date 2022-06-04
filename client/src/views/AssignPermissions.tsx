import * as api from "../api";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Permission } from "../domain/Permission";
import { User } from "../domain/User";
import onError from "../utils/onError";
import Loader from "../components/Loader";
import { Grid, Paper, Typography } from "@mui/material";
import PermissionsTable from "../components/Permissions/PermissionsTable";
import toast from "react-hot-toast";

export default function AssignPermissions() {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState<User | null>(null);
  const [permissions, setPermissions] = useState<Array<Permission>>([]);

  const filteredPermissions = useMemo(() => {
    return permissions.filter(
      (permission) =>
        (employee as User).permissions
          .map((p) => p._id)
          .indexOf(permission._id) === -1
    );
  }, [employee]);

  function loadEmployee() {
    return api.users.findUserById(id as string);
  }

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const employee = await loadEmployee();
        const permissions = await api.permissions.findPermissions();

        setEmployee(employee);
        setPermissions(permissions);
      } catch (error) {
        onError(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const onAssignPermissionButtonClick = async (permission: Permission) => {
    if (!employee || !permission) return;

    try {
      await api.userPermissions.assignPermission(employee._id, permission._id);
      setEmployee(await loadEmployee());
      toast.success("Permission Assigned Successfully!");
    } catch (error) {
      onError(error);
    }
  };

  const onRevokePermissionButtonClick = async (permission: Permission) => {
    if (!employee || !permission) return;

    try {
      await api.userPermissions.revokePermission(employee._id, permission._id);
      setEmployee(await loadEmployee());
      toast.success("Permission Revoked Successfully!");
    } catch (error) {
      onError(error);
    }
  };

  if (loading || !employee) {
    return <Loader />;
  }

  return (
    <Fragment>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">
              Employee: {employee.firstName} {employee.lastName}
            </Typography>
          </Grid>
          {/* Assigned Permissions */}
          {employee.permissions.length > 0 && (
            <Fragment>
              <Grid item xs={12}>
                <Typography variant="h6">Assigned Permissions</Typography>
              </Grid>
              <Grid item xs={12}>
                <PermissionsTable
                  permissions={employee.permissions}
                  onRevokePermissionClick={onRevokePermissionButtonClick}
                />
              </Grid>
            </Fragment>
          )}
          {/* Available Permissions */}
          {filteredPermissions.length > 0 && (
            <Fragment>
              <Grid item xs={12}>
                <Typography variant="h6">Available Permissions</Typography>
              </Grid>
              <Grid item xs={12}>
                <PermissionsTable
                  permissions={filteredPermissions}
                  onAssignPermissionClick={onAssignPermissionButtonClick}
                />
              </Grid>
            </Fragment>
          )}
        </Grid>
      </Paper>
    </Fragment>
  );
}
