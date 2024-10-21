import {
  Box,
  Button,
  MenuItem,
  Select,
  Snackbar,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../services/products/hooks";
import { ProductUpdateDTO } from "../services/products/types";
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
    borderColor: "#BCBCBC",
  },
});

const StyledSelect = styled(Select)({
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
    borderColor: "#BCBCBC",
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

const UploadButton = styled(Button)({
  backgroundColor: "#ff4d4f",
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: "#ff7875",
  },
  marginBottom: 2,
  textTransform: "capitalize",
});

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, updateProduct, fetchProducts, error } = useProduct();
  const { categories } = useCategories();
  const [productName, setProductName] = useState("");
  const [specification, setSpecification] = useState("");
  const [detail, setDetail] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [productPicture, setProductPicture] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const product = products.find((prd) => prd.id === Number(id));
    if (product) {
      setProductName(product.productName);
      setSpecification(product.specification);
      setDetail(product.detail);
      setPrice(product.price.toString());
      setStock(product.stock.toString());
      setCategoryId(product.categoryId);
      if (product.productPicture && product.productPicture[0]) {
        setFileName(product.productPicture[0].url.split("/").pop() || "");
      }
    }
  }, [id, products]);

  const handleSave = async () => {
    if (id) {
      try {
        const updatedProduct: ProductUpdateDTO = {
          productName,
          specification,
          detail,
          price: Number(price),
          stock: Number(stock),
          categoryId,
          productPicture: productPicture || undefined,
        };
        await updateProduct(Number(id), updatedProduct);
        setMessage("Product updated successfully");
        setSeverity("success");
        setOpen(true);
        setTimeout(() => navigate("/admin/product"), 2000);
      } catch (err) {
        setMessage(error || "Failed to update product");
        setSeverity("error");
        setOpen(true);
        throw err;
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProductPicture(file);
      setFileName(file.name);
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway" || event?.type === "EscapeKeyDown") {
      return;
    }
    setOpen(false);
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
          Edit Product
        </Typography>
      </Box>
      <Box
        sx={{
          overflowY: "auto",
          maxHeight: "calc(95vh - 200px)",
          scrollbarWidth: "none",
        }}
      >
        <Box
          width={"100%"}
          paddingX={10}
          flexDirection={"row"}
          display={"flex"}
          gap={2}
          marginBottom={2}
          alignItems={"center"}
        >
          <UploadButton variant="contained">
            <label htmlFor="upload-image">
              Upload Image
              <input
                id="upload-image"
                type="file"
                hidden
                onChange={handleFileChange}
                accept="image/*"
              />
            </label>
          </UploadButton>
          {fileName && <Typography color="white">{fileName}</Typography>}
        </Box>
        <Box width={"100%"} paddingX={10}>
          <StyledTextField
            fullWidth
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Product Name"
            sx={{ marginBottom: 2 }}
          />
          <StyledTextField
            fullWidth
            value={specification}
            onChange={(e) => setSpecification(e.target.value)}
            placeholder="Specification"
            multiline
            rows={4}
            sx={{ marginBottom: 2 }}
          />
          <StyledTextField
            fullWidth
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="Detail"
            multiline
            rows={4}
            sx={{ marginBottom: 2 }}
          />
          <StyledTextField
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            type="number"
            sx={{ marginBottom: 2 }}
          />
          <StyledTextField
            fullWidth
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Stock"
            type="number"
            sx={{ marginBottom: 2 }}
          />
          <StyledSelect
            fullWidth
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            sx={{ marginBottom: 2 }}
          >
            <MenuItem value={0}>Select Category</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.categoryName}
              </MenuItem>
            ))}
          </StyledSelect>
        </Box>
        <Box width={"100%"} paddingX={10}>
          <SaveButton onClick={handleSave}>Save</SaveButton>
        </Box>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </StyledBox>
  );
};

export default EditProduct;
