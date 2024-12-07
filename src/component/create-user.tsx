import { Box, Button } from "@mui/material";
import { addEmployee } from "../store/builder/employee.builder";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { ChangeEvent, useState } from "react";
import { AddUser } from "../types";
const CreateUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const [newUserFields, setNewUserFields] = useState<boolean>(false);
  
  const [newUser, setNewUser] = useState<AddUser>({
    name: "",
    position: "",
    department: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  
  const handleBtnClick = () => {
    if (newUserFields) {
      dispatch(addEmployee(newUser));
    }
    setNewUser({ department: "", name: "", position: "" });
    setNewUserFields(!newUserFields);
  };

  const inputFields = [
    {
      name: "name",
      id: "name",
      label: "name",
      onChange: handleInputChange,
    },
    {
      name: "position",
      id: "position",
      label: "position",
      onChange: handleInputChange,
    },
    {
      name: "department",
      id: "department",
      label: "department",
      onChange: handleInputChange,
    },
  ];
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ marginRight: "50px" }}>
        {newUserFields &&
          inputFields.map((field) => {
            return (
              <Box
                sx={{
                  marginRight: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                  marginBottom: "10px",
                  alignItems: "baseline",
                }}
              >
                <label htmlFor={field.id}>{field.name}</label>
                <input
                  style={{ width: "100px" }}
                  id={field.id}
                  name={field.name}
                  onChange={handleInputChange}
                />
              </Box>
            );
          })}
      </Box>
      <Button variant="contained" onClick={handleBtnClick}>
        {newUserFields ? "save" : "Create User"}
      </Button>
    </Box>
  );
};

export default CreateUser;
