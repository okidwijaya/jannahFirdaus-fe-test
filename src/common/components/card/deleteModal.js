import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { deleteVehicle } from "src/modules/api/vehicle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  color: "black",
};

const DeleteModal = ({ open, onClose, getId }) => {
  const [isFetching, setIsFetching] = useState(false);

  const deleteProduct = () => {
    setIsFetching(true);
    let id = getId;
    deleteVehicle(id)
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          toast.success("Delete Success.");
          toast.info("Please refresh the page.");

          setTimeout(() => {
            onClose();
          }, 3000);
        }
      })
      .catch((err) => {
        toast.warning("Delete Failed");
        console.log(err);
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <ToastContainer />
          <h2 id="child-modal-title">
            Are you sure you want to delete this product?
          </h2>
          <Button
            style={{ float: "right", margin: "0.5rem" }}
            color="error"
            variant="contained"
            onClick={deleteProduct}
          >
            {isFetching ? "wait...." : "Delete"}
          </Button>
          <Button
            style={{ float: "right", margin: "0.5rem" }}
            onClick={onClose}
            variant="outlined"
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteModal;
