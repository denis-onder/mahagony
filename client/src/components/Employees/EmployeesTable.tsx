import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { User } from "../../domain/User";
import { Fragment, useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { PaginatedResponse } from "../../domain/PaginatedResponse";
import { visuallyHidden } from "@mui/utils";
import { Order, getComparator } from "../../utils/sortingUtils";
import {
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Box,
  TableContainer,
  Button,
} from "@mui/material";

interface Props {
  paginatedEmployeesResponse: PaginatedResponse<User>;
  onDeleteEmployeeClick: (employee: User) => void;
  onPageChange: (page: number) => void;
  limit: number;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof User;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "firstName",
    numeric: false,
    disablePadding: true,
    label: "First Name",
  },
  {
    id: "lastName",
    numeric: true,
    disablePadding: false,
    label: "Last Name",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "username",
    numeric: true,
    disablePadding: false,
    label: "Username",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
];

interface EmployeesTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof User
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EmployeesTableHead(props: EmployeesTableProps) {
  const { order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler =
    (property: keyof User) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="right">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default function EmployeesTable({
  paginatedEmployeesResponse,
  onDeleteEmployeeClick,
  onPageChange,
  limit,
}: Props) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof User>("firstName");

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: keyof User
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    onPageChange(newPage + 1);
  };

  const navigate = useNavigate();

  return (
    <Fragment>
      <TableContainer>
        <Table size="small">
          <EmployeesTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={paginatedEmployeesResponse.count}
          />
          <TableBody>
            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
            {paginatedEmployeesResponse.results
              .slice()
              .sort(getComparator(order, orderBy))
              .map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.firstName}
                    </TableCell>
                    <TableCell align="right">{row.lastName}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.username}</TableCell>
                    <TableCell align="right">
                      {row.status ? "Active" : "Inactive"}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        color="success"
                        onClick={() => navigate(`/assign/${row._id}`)}
                      >
                        Assign
                      </Button>
                      <Button
                        size="small"
                        color="secondary"
                        onClick={() => navigate(`/employee/${row._id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => onDeleteEmployeeClick(row)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[limit]}
        colSpan={3}
        count={paginatedEmployeesResponse.count}
        rowsPerPage={limit}
        page={paginatedEmployeesResponse.currentPage - 1}
        SelectProps={{
          inputProps: {
            "aria-label": "rows per page",
          },
          native: true,
        }}
        onPageChange={handleChangePage}
        ActionsComponent={TablePaginationActions}
      />
    </Fragment>
  );
}
