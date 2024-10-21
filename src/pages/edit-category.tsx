import { Box, Button, styled, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCategories } from "../services/category/hooks";

const StyledBox = styled(Box)({
  padding: 10,
  backgroundColor: "#0B0B0B",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#BCBCBC",
    },
    "&:hover fieldset": {
      borderColor: "#BCBCBC",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#56C05A",
    },
  },
  "& .MuiInputBase-input": {
    color: "#FFFFFF",
    backgroundColor: "#303030",
    BorderColor: "#BCBCBC",
  },
});

const SaveButton = styled(Button)({
  backgroundColor: "#56C05A",
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: "#45a049",
  },
  marginTop: 2,
  width: "100%",
});

const EditCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { categories, updateCategory } = useCategories();
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const category = categories.find((cat) => cat.id === Number(id));
    if (category) {
      setCategoryName(category.categoryName);
    }
  }, [id, categories]);

  const handleSave = async () => {
    if (id) {
      await updateCategory(Number(id), { categoryName });
      navigate("/admin/category");
    }
  };

  return (
    <StyledBox>
      <Box width={"100%"} paddingX={10} marginTop={10} marginBottom={3}>
        <Typography
          variant="h6"
          sx={{
            color: "#FFFFFF",
            marginBottom: 3,
            fontWeight: "bold",
          }}
        >
          Edit Category
        </Typography>
      </Box>
      <Box width={"100%"} paddingX={10}>
        <StyledTextField
          fullWidth
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          sx={{ marginBottom: 7 }}
        />
      </Box>
      <Box width={"100%"} paddingX={10}>
        <SaveButton onClick={handleSave}>Save</SaveButton>
      </Box>
    </StyledBox>
  );
};

export default EditCategory;
