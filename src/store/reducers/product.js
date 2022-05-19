import { ACTION_STRING } from "src/store/actions/actionString";
// import { ActionType } from "redux-promise-middleware";

const initialState = {
  productData: [],
};

const productReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case ACTION_STRING.productData:
      const data = action.payload;
      // console.log("data transfer", data);
      return {
        ...data,
      };
    default:
      return prevState;
  }
};

export default productReducer;
