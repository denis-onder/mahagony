import { Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../api";
import PermissionsTable from "../components/Permissions/PermissionsTable";
import Loader from "../components/Loader";
import { Permission } from "../domain/Permission";
import onError from "../utils/onError";

export default function Permissions() {
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState<Array<Permission>>([]);
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
            Permissions
          </Typography>
          <PermissionsTable permissions={permissions} />
        </Paper>
      </Grid>
    </Grid>
  );
}
