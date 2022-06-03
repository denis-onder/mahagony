import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { User } from "../../domain/User";
import { Button } from "@mui/material";

interface Props {
  employees: Array<User>;
}

export default function Employees({ employees }: Props) {
  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee._id}>
              <TableCell>
                {employee.firstName} {employee.lastName}
              </TableCell>
              <TableCell>{employee.username}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.status ? "Active" : "Inactive"}</TableCell>
              <TableCell align="center">
                <Button size="small">Assign</Button>
                <Button size="small">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
