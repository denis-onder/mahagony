import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { Permission } from "../../domain/Permission";
import { Fragment } from "react";

interface Props {
  permissions: Array<Permission>;
  onDeletePermissionClick?: (permission: Permission) => void;
  onAssignPermissionClick?: (permission: Permission) => void;
  onRevokePermissionClick?: (permission: Permission) => void;
}

export default function PermissionsTable({
  permissions,
  onDeletePermissionClick,
  onAssignPermissionClick,
  onRevokePermissionClick,
}: Props) {
  return (
    <Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {permissions.map((permission) => (
            <TableRow>
              <TableCell>{permission.code}</TableCell>
              <TableCell>{permission.description}</TableCell>
              <TableCell align="center">
                {onDeletePermissionClick && (
                  <Button
                    size="small"
                    color="error"
                    onClick={() => onDeletePermissionClick(permission)}
                  >
                    Delete
                  </Button>
                )}
                {onAssignPermissionClick && (
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => onAssignPermissionClick(permission)}
                  >
                    Assign
                  </Button>
                )}
                {onRevokePermissionClick && (
                  <Button
                    size="small"
                    color="error"
                    onClick={() => onRevokePermissionClick(permission)}
                  >
                    Revoke
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
}
