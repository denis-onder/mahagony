import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { User } from "../../domain/User";
import {
  Button,
  TableFooter,
  TablePagination,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { PaginatedResponse } from "../../domain/PaginatedResponse";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

interface Props {
  paginatedEmployeesResponse: PaginatedResponse<User>;
  onDeleteEmployeeClick: (employee: User) => void;
  onPageChange: (page: number) => void;
  limit: number;
}

export default function EmployeesTable({
  paginatedEmployeesResponse,
  onDeleteEmployeeClick,
  onPageChange,
  limit,
}: Props) {
  const navigate = useNavigate();

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    onPageChange(newPage);
  };

  return (
    <Fragment>
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
          {paginatedEmployeesResponse.results.map((employee) => (
            <TableRow key={employee._id}>
              <TableCell>
                {employee.firstName} {employee.lastName}
              </TableCell>
              <TableCell>{employee.username}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.status ? "Active" : "Inactive"}</TableCell>
              <TableCell align="center">
                <Button
                  size="small"
                  color="success"
                  onClick={() => navigate(`/assign/${employee._id}`)}
                >
                  Assign
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => navigate(`/employee/${employee._id}`)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => onDeleteEmployeeClick(employee)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[limit]}
                colSpan={3}
                count={paginatedEmployeesResponse.count}
                rowsPerPage={limit}
                page={paginatedEmployeesResponse.currentPage}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </TableBody>
      </Table>
    </Fragment>
  );
}
