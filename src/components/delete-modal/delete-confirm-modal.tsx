import React from "react";
import { Modal, Box, Typography, Button, styled } from "@mui/material";

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  backgroundColor: "#FFFFFF",
  boxShadow: theme.shadows[24],
  padding: theme.spacing(5),
  borderRadius: theme.shape.borderRadius,
}));

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

const YesButton = styled(ActionButton)({
  backgroundColor: "#56C05A",
  "&:hover": {
    backgroundColor: "#45a049",
  },
});

const NoButton = styled(ActionButton)({
  backgroundColor: "#F74D4D",
  "&:hover": {
    backgroundColor: "#d32f2f",
  },
});

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalBox>
        <Typography
          variant="h6"
          component="h2"
          sx={{ color: "#000000", marginBottom: 2 }}
        >
          Delete Data
        </Typography>
        <Typography sx={{ color: "#000000", marginBottom: 2 }}>
          Are you sure you want to delete this data?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <YesButton
            onClick={onConfirm}
            sx={{ marginRight: 1, width: 100, height: 30 }}
          >
            Yes
          </YesButton>
          <NoButton onClick={onClose} sx={{ width: 100, height: 30 }}>
            No
          </NoButton>
        </Box>
      </ModalBox>
    </Modal>
  );
};

export default DeleteConfirmationModal;
