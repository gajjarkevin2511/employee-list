import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchEmployees,
  deleteEmployee,
  updateEmployee,
} from "../store/builder/employee.builder";

import type { AppDispatch } from "../store/store";
import type { Employee } from "../types";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveIcon from "@mui/icons-material/Save";
import CreateUser from "./create-user";
type EditRow = { id: string; updatedData: Record<string, any> };
const EmployeeList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { employees, loading, error } = useSelector(
    (state: any) => state.employees
  );
  const [editRow, setEditRow] = useState<EditRow>({
    id: "",
    updatedData: {},
  });

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleUpdateRow = (field: string, value: string) => {
    setEditRow((prev) => ({
      ...prev,
      updatedData: {
        ...prev.updatedData,
        [field]: value,
      },
    }));
  };

  const columns: GridColDef[] = [
    { field: "srNo", headerName: "Sr No", width: 70 },
    {
      field: "name",
      headerName: "Name",
      width: 130,
      renderCell: (params) => {
        if (editRow.id === params.id) {
          return (
            <input onChange={(e) => handleUpdateRow("name", e.target.value)} />
          );
        }
        return <Typography>{params.value}</Typography>;
      },
    },
    { field: "position", headerName: "Position", width: 130 ,renderCell: (params) => {
      if (editRow.id === params.id) {
        return (
          <input onChange={(e) => handleUpdateRow("position", e.target.value)} />
        );
      }
      return <Typography>{params.value}</Typography>;
    },},
    {
      field: "department",
      headerName: "department",
      type: "string",
      width: 90,
      renderCell: (params) => {
        if (editRow.id === params.id) {
          return (
            <input onChange={(e) => handleUpdateRow("department", e.target.value)} />
          );
        }
        return <Typography>{params.value}</Typography>;
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={editRow.id === params.id ? <SaveIcon /> : <ModeEditIcon />}
          label="Edit"
          onClick={() => {

            if (editRow.id) {
              const updatedEmployee = {
                id: editRow.id,
                ...editRow.updatedData,
              } as Employee;

              dispatch(updateEmployee(updatedEmployee));

              setEditRow({
                id: "",
                updatedData: {},
              });

            } else {
              setEditRow(() => ({
                id: params.id.toString(),
                updatedData: {},
              }));
            }
          }}
        />,
        <GridActionsCellItem
          icon={<DeleteForeverIcon />}
          label="Delete"
          onClick={() => dispatch(deleteEmployee(params.id.toString()))}
        />,
      ],
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        marginTop: "50px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">User List</Typography>
        <CreateUser/>
      </Box>
      <Box sx={{ height: 400, width: "100%", marginTop: "50px" }}>
        <DataGrid rows={employees} columns={columns} />
      </Box>
    </Box>
  );
};

export default EmployeeList;