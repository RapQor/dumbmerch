import React, { useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "../components/delete-modal/delete-confirm-modal";
import { useProduct } from "../services/products/hooks";

const StyledTableContainer = styled(TableContainer)({
  backgroundColor: "#232323",
  overflowY: "auto",
  maxHeight: "calc(107vh - 200px)",
  scrollbarWidth: "none",
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
  minWidth: "40px",
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

const ProductPage = () => {
  const { products, deleteProduct, fetchProducts } = useProduct();
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [productToDelete, setProductToDelete] = React.useState<number | null>(
    null
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleEditClick = (id: number) => {
    navigate(`/admin/edit-product/${id}`);
  };

  const handleDeleteClick = (id: number) => {
    setProductToDelete(id);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    await deleteProduct(productToDelete || 0);
    setOpenDeleteModal(false);
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
              <StyledTableHeadCell>No</StyledTableHeadCell>
              <StyledTableHeadCell>Photo</StyledTableHeadCell>
              <StyledTableHeadCell>Product Name</StyledTableHeadCell>
              <StyledTableHeadCell>Product Desc</StyledTableHeadCell>
              <StyledTableHeadCell>Price</StyledTableHeadCell>
              <StyledTableHeadCell>Qty</StyledTableHeadCell>
              <StyledTableHeadCell align="inherit">Action</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <StyledTableRow key={product.id}>
                <StyledTableBodyCell>{index + 1}</StyledTableBodyCell>
                <StyledTableBodyCell>
                  {product.productPicture && product.productPicture[0]?.url
                    ? product.productPicture[0].url.split("/").pop()
                    : "No photo"}
                </StyledTableBodyCell>
                <StyledTableBodyCell>{product.productName}</StyledTableBodyCell>
                <StyledTableBodyCell>
                  {product.detail.length > 20
                    ? `${product.detail.substring(0, 20)}...`
                    : product.detail}
                </StyledTableBodyCell>
                <StyledTableBodyCell>
                  {product.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </StyledTableBodyCell>
                <StyledTableBodyCell>{product.stock}</StyledTableBodyCell>
                <StyledTableBodyCell align="inherit">
                  <EditButton
                    onClick={() => handleEditClick(product.id)}
                    sx={{ marginRight: 1, width: 100 }}
                  >
                    Edit
                  </EditButton>
                  <DeleteButton
                    sx={{ width: 100 }}
                    onClick={() => handleDeleteClick(product.id)}
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

export default ProductPage;
