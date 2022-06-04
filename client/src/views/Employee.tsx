import { Fragment, useEffect, useState } from "react";
import Loader from "../components/Loader";
import { User } from "../domain/User";
import * as api from "../api";
import { useNavigate, useParams } from "react-router-dom";
import onError from "../utils/onError";
import { Button, Grid, Paper, Typography } from "@mui/material";
import DeleteEntityModal from "../components/DeleteEntityModal";
import { DeleteEntityModalTarget } from "../utils/modalUtils";
import toast from "react-hot-toast";

export default function Employee() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState<User | null>(null);
  const [showDeleteEmployeeModal, setShowDeleteEmployeeModal] = useState(false);

  useEffect(() => {
    function loadEmployee() {
      return api.users.findUserById(id as string);
    }

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
          <Grid item xs={12} sm={6}>
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
    </Fragment>
  );
}
