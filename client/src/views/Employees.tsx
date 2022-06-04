import { Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../api";
import EmployeesTable from "../components/Employees/EmployeesTable";
import Loader from "../components/Loader";
import { User } from "../domain/User";
import onError from "../utils/onError";

export default function Employees() {
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState<Array<User>>([]);

  const navigate = useNavigate();

  useEffect(() => {
    function loadEmployees() {
      return users.findUsers();
    }

    async function load() {
      try {
        setLoading(true);

        const employees = await loadEmployees();

        setEmployees(employees);
      } catch (error) {
        navigate("/login");
        onError("Please Login Again.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h6"
            component="h6"
            marginBottom="12px"
            marginLeft="6px"
          >
            Employees
          </Typography>
          <EmployeesTable employees={employees} />
        </Paper>
      </Grid>
    </Grid>
  );
}
