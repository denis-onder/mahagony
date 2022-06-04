import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../api";
import { PaginatedResponse } from "../domain/PaginatedResponse";
import { User, UserPayload, UserQueryParams } from "../domain/User";
import { DeleteEntityModalTarget } from "../utils/modalUtils";
import toast from "react-hot-toast";
import DeleteEntityModal from "../components/DeleteEntityModal";
import AddEmployeeModal from "../components/Employees/AddEmployeeModal";
import EmployeesTable from "../components/Employees/EmployeesTable";
import Loader from "../components/Loader";
import onError from "../utils/onError";
import useDebounce from "../utils/useDebounce";

export default function Employees() {
  const LIMIT = 10;

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<PaginatedResponse<User>>();
  const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showDeleteEmployeeModal, setShowDeleteEmployeeModal] = useState(false);
  const [page, setPage] = useState(1);
  const [changePage, setChangePage] = useState(false);
  const [triggerLoad, setTriggerLoad] = useState(false);
  const [name, setName] = useState("");
  const [status, setStatus] = useState<boolean | null>(null);

  const debouncedName = useDebounce(name, 500);

  const navigate = useNavigate();

  useEffect(() => {
    function loadEmployees() {
      const params: UserQueryParams = {
        limit: LIMIT,
        page: page,
      };

      if (name) {
        params.name = name;
      }

      if (status !== null) {
        params.status = status;
      }

      return users.findUsers(params);
    }

    async function load() {
      try {
        setLoading(true);

        const response = await loadEmployees();

        setResponse(response);
        setPage(response.currentPage);
      } catch (error) {
        navigate("/login");
        onError("Please Login Again.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [changePage, triggerLoad, debouncedName, status]);

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
      toast.success("Employee Created Successfully!");

      setTriggerLoad((t) => !t);

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
      toast.success("Employee Deleted Successfully!");

      setTriggerLoad((t) => !t);
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
                Employees: Page {page}
              </Typography>
              <Button onClick={() => setShowAddEmployeeModal(true)}>
                Add Employee
              </Button>
            </Box>
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                placeholder="Search By Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FormControl sx={{ marginLeft: 1, minWidth: 120 }}>
                <InputLabel>Status?</InputLabel>
                <Select
                  value={`${status}`}
                  label="Status?"
                  onChange={(e) => setStatus(e.target.value === "true")}
                >
                  <MenuItem value="true">Active</MenuItem>
                  <MenuItem value="false">Inactive</MenuItem>
                </Select>
              </FormControl>
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
