import { Fragment, useEffect, useMemo, useState } from "react";
import Loader from "../components/Loader";
import { User, UserPayload } from "../domain/User";
import * as api from "../api";
import { useNavigate, useParams } from "react-router-dom";
import onError from "../utils/onError";
import { Button, Grid, Paper, Typography } from "@mui/material";
import DeleteEntityModal from "../components/DeleteEntityModal";
import { DeleteEntityModalTarget } from "../utils/modalUtils";
import toast from "react-hot-toast";
import { Permission } from "../domain/Permission";
import PermissionsTable from "../components/Permissions/PermissionsTable";
import EditEmployeeModal from "../components/Employee/EditEmployeeModal";

export default function Employee() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState<User | null>(null);
  const [showEditEmployeeModal, setShowEditEmployeeModal] = useState(false);
  const [showDeleteEmployeeModal, setShowDeleteEmployeeModal] = useState(false);

  function loadEmployee() {
    return api.users.findUserById(id as string);
  }

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const employee = await loadEmployee();

        setEmployee(employee);
      } catch (error) {
        onError(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const onDeleteEmployee = async () => {
    if (!employee) return;

    try {
      await api.users.deleteUser(employee._id);
      toast.success("Employee Deleted Successfully!");
      navigate("/employees");
    } catch (error) {
      onError(error);
    } finally {
      setShowDeleteEmployeeModal(false);
    }
  };

  const onEditEmployee = async (payload: UserPayload) => {
    if (!employee || !payload) return;

    try {
      await api.users.updateUser(employee._id, payload);

      const updatedEmployee = await loadEmployee();

      setEmployee(updatedEmployee);

      toast.success("Employee Updated Successfully!");
      setShowEditEmployeeModal(false);
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
          <Grid item xs={12}>
            <span>Email: {employee.email}</span>
          </Grid>
          <Grid item xs={12}>
            <span>Username: {employee.username}</span>
          </Grid>
          <Grid item xs={12}>
            <span>Status: {employee.status ? "Active" : "Inactive"}</span>
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
          <Grid item xs={12} sm={6}>
            <Button
              style={{
                marginRight: "10px",
              }}
              variant="contained"
              color="success"
              onClick={() => setShowEditEmployeeModal(true)}
            >
              Edit Employee
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setShowDeleteEmployeeModal(true)}
            >
              Delete Employee
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <DeleteEntityModal
        open={showDeleteEmployeeModal}
        entity={employee}
        onClose={() => setShowDeleteEmployeeModal(false)}
        onSubmit={onDeleteEmployee}
        target={DeleteEntityModalTarget.EMPLOYEE}
      />
      <EditEmployeeModal
        open={showEditEmployeeModal}
        employee={employee}
        onClose={() => setShowEditEmployeeModal(false)}
        onSubmit={onEditEmployee}
      />
    </Fragment>
  );
}
