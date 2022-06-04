import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { users } from "../api";
import DeleteEntityModal from "../components/DeleteEntityModal";
import AddEmployeeModal from "../components/Employees/AddEmployeeModal";
import EmployeesTable from "../components/Employees/EmployeesTable";
import Loader from "../components/Loader";
import { PaginatedResponse } from "../domain/PaginatedResponse";
import { User, UserPayload } from "../domain/User";
import { DeleteEntityModalTarget } from "../utils/modalUtils";
import onError from "../utils/onError";

export default function Employees() {
  const LIMIT = 10;

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<PaginatedResponse<User>>();
  const [employees, setEmployees] = useState<Array<User>>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showDeleteEmployeeModal, setShowDeleteEmployeeModal] = useState(false);
  const [page, setPage] = useState(1);
  const [changePage, setChangePage] = useState(false);

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

        const response = await loadEmployees();

        setResponse(response);
        setEmployees(response.results);
        setPage(response.currentPage);
      } catch (error) {
        navigate("/login");
        onError("Please Login Again.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [changePage]);

  const onChangePage = (page: number) => {
    if (page === 0) page = 1;

    setPage(page);
    setChangePage((p) => !p);
  };

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

  if (loading || !response) {
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
              paginatedEmployeesResponse={response as PaginatedResponse<User>}
              onDeleteEmployeeClick={handleOnDeleteEmployeeClick}
              onPageChange={onChangePage}
              limit={LIMIT}
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
