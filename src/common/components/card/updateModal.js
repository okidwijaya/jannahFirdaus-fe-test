import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import { updateVehicle } from "src/modules/api/vehicle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import dbg from "src/assets/images/default-placeholder.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
  color: "black",
};

const UpdateModal = ({ open, onClose, getId }) => {
  const [image, setImage] = useState(null);
  const [imgPrev, setImagePrev] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const [counter, setCounter] = useState(1);

  const addCounter = () => {
    const newCounter = counter + 1;
    setCounter(newCounter);
  };

  const subCounter = () => {
    const newCounter = counter - 1 < 0 ? 0 : counter - 1;
    setCounter(newCounter);
  };

  const [data, setData] = useState({
    name: "",
    price: "",
    qty: "",
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(file);
    setImagePrev(URL.createObjectURL(file));
  };
  // console.log("image file upl : ", image);

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    setIsFetching(true);

    let id = getId;
    e.preventDefault();
    let body = new FormData();
    // body.append("user_id", ownerId);
    body.append("name", data.name);
    body.append("price", data.price);
    body.append("qty", counter);
    if (image) body.append("images", image);

    console.log("body data : ", body);
    updateVehicle(body, id)
      .then((response) => {
        console.log("resposnse pos req", body);
        console.log(response);
        if (response.status === 200) {
          toast.success("product updated.");
          toast.info("Please refresh the page.");
          setTimeout(() => {
            onClose();
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err, err.message);
        toast.warning("Update failed");
      });
  };
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2>Update Produuct </h2>
          <form onSubmit={handleSubmit}>
            <div>
              <ToastContainer />

              <section>
                <input type="file" name="images" hidden />
                {/* <button /> */}
              </section>

              <div
              // value={image.file}
              // name="image"
              >
                {image &&
                <Image src={imgPrev} alt="add pic" width={50} height={50} /> !==
                  null ? (
                  <Image src={imgPrev} alt="add pic" width={50} height={50} />
                ) : (
                  <Image src={dbg} alt="add pic" width={50} height={50} />
                )}
              </div>
              <div>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => handleImage(e)}
                  {...data}
                  style={{ width: "100%", marginLeft: "0" }}
                />
                <label htmlFor="file"> *Choose From Gallery</label>
              </div>
              <p>*Image must be provide</p>
            </div>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Name (max up to 50 words)"
            />

            <p style={{ textAlign: "left" }}>Price :</p>
            <input
              type="text"
              name="price"
              onChange={handleChange}
              id=""
              placeholder="Price"
            />

            <div>
              <p style={{ textAlign: "left" }}>Stok Quantity :</p>
              <button onClick={subCounter} type="button">
                -
              </button>
              <p>{counter}</p>
              <button onClick={addCounter} type="button">
                +
              </button>
            </div>
            <Button
              type="submit"
              style={{ float: "right", margin: "0.5rem" }}
              variant="contained"
            >
              {isFetching ? "wait...." : "Update"}
            </Button>
            <Button
              style={{ float: "right", margin: "0.5rem" }}
              onClick={onClose}
            >
              Cancel
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default UpdateModal;
