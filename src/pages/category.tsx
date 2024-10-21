import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  styled,
} from "@mui/material";
import { useCategories } from "../services/category/hooks";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "../components/delete-modal/delete-confirm-modal";

const StyledTableContainer = styled(TableContainer)({
  backgroundColor: "#232323",
});

const StyledTableRow = styled(TableRow)({
  "&:nth-of-type(odd)": {
    backgroundColor: "#303030",
  },
});

const StyledTableHeadCell = styled(TableCell)({
  color: "#FFFFFF",
  borderBottom: "1px solid #C4C4C4",
  padding: "16px",
  fontWeight: "bold",
  minWidth: "150px",
});

const StyledTableBodyCell = styled(TableCell)({
  color: "#FFFFFF",
  borderBottom: "1px solid #C4C4C4",
  padding: "16px",
});

const ActionButton = styled(Button)({
  color: "#FFFFFF",
  padding: "6px 16px",
  textTransform: "none",
  fontSize: "0.875rem",
  fontWeight: 500,
  lineHeight: 1.75,
  minWidth: "64px",
  borderRadius: "4px",
});

const EditButton = styled(ActionButton)({
  backgroundColor: "#56C05A",
  "&:hover": {
    backgroundColor: "#45a049",
  },
});

const DeleteButton = styled(ActionButton)({
  backgroundColor: "#F74D4D",
  "&:hover": {
    backgroundColor: "#d32f2f",
  },
});

const CategoryPage: React.FC = () => {
  const { categories, deleteCategory } = useCategories();
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [categoryToDelete, setCategoryToDelete] = React.useState<number | null>(
    null
  );

  const handleEditClick = (id: number) => {
    navigate(`/admin/edit-category/${id}`);
  };

  const handleDeleteClick = (id: number) => {
    setCategoryToDelete(id);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (categoryToDelete !== null) {
      await deleteCategory(categoryToDelete);
      setOpenDeleteModal(false);
    }
  };

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: "#0B0B0B",
        minHeight: "100vh",
        width: "100%",
        paddingX: "100px",
      }}
    >
      <Typography
        variant="h6"
        sx={{ color: "#FFFFFF", marginBottom: 3 }}
        fontWeight={"bold"}
      >
        List Category
      </Typography>
      <StyledTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableHeadCell sx={{ minWidth: "300px" }}>
                No
              </StyledTableHeadCell>
              <StyledTableHeadCell sx={{ minWidth: "400px" }}>
                Category Name
              </StyledTableHeadCell>
              <StyledTableHeadCell align="inherit">Action</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, index) => (
              <StyledTableRow key={category.id}>
                <StyledTableBodyCell>{index + 1}</StyledTableBodyCell>
                <StyledTableBodyCell>
                  {category.categoryName}
                </StyledTableBodyCell>
                <StyledTableBodyCell align="inherit">
                  <EditButton
                    onClick={() => handleEditClick(category.id)}
                    sx={{ marginRight: 1, width: 100 }}
                  >
                    Edit
                  </EditButton>
                  <DeleteButton
                    sx={{ width: 100 }}
                    onClick={() => handleDeleteClick(category.id)}
                  >
                    Delete
                  </DeleteButton>
                </StyledTableBodyCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
      <DeleteConfirmationModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};

export default CategoryPage;
