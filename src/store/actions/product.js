import axios from "axios";
import {
  addVehicle,
  updateVehicle,
  deleteVehicle,
  getVehicle,
} from "src/modules/api/vehicle";
import { ACTION_STRING } from "src/store/actions/actionString";

const productAction = (data) => {
  return {
    type: ACTION_STRING.productData,
    payload: { data },
  };
};

export const dataProduct = (page, limit, type, search, location) => {
  return (dispatch) => {
    getVehicle(page, limit, type, search, location)
      .then((res) => {
        // setLoad(true);
        // console.log("response:", res.data.result.data[0].images);
        // setRows(res.data.result.data);
        dispatch(productAction(res.data.result.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
