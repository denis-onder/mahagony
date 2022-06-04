import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { users } from "../api";
import DeleteEntityModal from "../components/DeleteEntityModal";
import AddEmployeeModal from "../components/Employees/AddEmployeeModal";
import EmployeesTable from "../components/Employees/EmployeesTable";
import Loader from "../components/Loader";
import { User, UserPayload } from "../domain/User";
import { DeleteEntityModalTarget } from "../utils/modalUtils";
import onError from "../utils/onError";

export default function Employees() {
  const LIMIT = 10;

  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState<Array<User>>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showDeleteEmployeeModal, setShowDeleteEmployeeModal] = useState(false);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    function loadEmployees() {
      return users.findUsers({
        limit: LIMIT,
        page: page,
      });
    }

    async function load() {
      try {
        setLoading(true);

        const employees = await loadEmployees();

        setEmployees(employees.results);
      } catch (error) {
        navigate("/login");
        onError("Please Login Again.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const onAddEmployeeSubmit = async (payload: UserPayload) => {
    try {
      const user = await users.createUser(payload);

      if (!user) {
        onError("Failed to create user.");
      }

      setEmployees([...employees, user]);
      toast.success("Employee Created Successfully!");
      setShowAddEmployeeModal(false);
    } catch (error) {
      onError(error);
    }
  };

  const handleOnDeleteEmployeeClick = (employee: User) => {
    setSelectedEmployee(employee);
    setShowDeleteEmployeeModal(true);
  };

  const onDeleteEmployee = async (user: User) => {
    try {
      await users.deleteUser(user._id);
      setEmployees(employees.filter((e) => e._id !== user._id));
      toast.success("Employee Deleted Successfully!");
    } catch (error) {
      onError(error);
    } finally {
      setShowDeleteEmployeeModal(false);
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
                Employees
              </Typography>
              <Button onClick={() => setShowAddEmployeeModal(true)}>
                Add Employee
              </Button>
            </Box>
            <EmployeesTable
              employees={employees}
              onDeleteEmployeeClick={handleOnDeleteEmployeeClick}
            />
          </Paper>
        </Grid>
      </Grid>
      <AddEmployeeModal
        open={showAddEmployeeModal}
        onClose={() => setShowAddEmployeeModal(false)}
        onSubmit={onAddEmployeeSubmit}
      />
      {selectedEmployee && (
        <DeleteEntityModal
          open={showDeleteEmployeeModal}
          entity={selectedEmployee}
          onClose={() => setShowDeleteEmployeeModal(false)}
          onSubmit={onDeleteEmployee}
          target={DeleteEntityModalTarget.EMPLOYEE}
        />
      )}
    </Fragment>
  );
}
