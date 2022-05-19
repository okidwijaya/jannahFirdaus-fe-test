import React, { useState, useEffect } from "react";
import Datas from "src/common/components/Datas";
import { useDispatch } from "react-redux";
import { dataProduct } from "src/store/actions/product";
import Loadingcomponent from "src/common/components/loading/LoadingComponent";

const Admin = () => {
  const dispatch = useDispatch();
  const [load, setload] = useState(false);

  useEffect(() => {
    let page = "1";
    let type = "";
    let limit = "1000";
    let search = "";
    let location = "";
    dispatch(dataProduct(page, limit, type, search, location));
    setTimeout(() => {
      setload(true);
    }, 3000);
    setload(false);
  }, [dispatch]);

  return (
    <>
      {/* <List /> */}
      {load ? <Datas /> : <Loadingcomponent />}
    </>
  );
};

export default Admin;

// const productData = useSelector((state) => state.products.data);
// const [loadData, setLoadData] = useState([]);
// useEffect(() => {
// setLoadData(dataProduct);
// if (loadData.length != 0) setload(false);
// if (loadData.length > 0) setload(true);
// setload(false);
//   if (productData.length != 0) setload(false);
//   if (productData.length > 0) setload(true);
//   // productData.length > 0 ? setload(true) : setload(false);
// }, []);

// console.log(productData.length);
