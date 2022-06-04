import * as React from "react";
import { auth } from "../../api";
import { useNavigate } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import RuleIcon from "@mui/icons-material/Rule";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import Divider from "@mui/material/Divider";
import onError from "../../utils/onError";

export default function DrawerListItems() {
  const navigate = useNavigate();

  const onLogout = () => {
    auth
      .logOut()
      .then(() => navigate("/login"))
      .catch(onError);
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={() => navigate("/employees")}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Employees" />
      </ListItemButton>
      <ListItemButton onClick={() => navigate("/permissions")}>
        <ListItemIcon>
          <RuleIcon />
        </ListItemIcon>
        <ListItemText primary="Permissions" />
      </ListItemButton>
      <Divider />
      <ListItemButton onClick={onLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </React.Fragment>
  );
}
