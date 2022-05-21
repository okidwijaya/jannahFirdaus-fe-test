import React, { useState, useEffect } from "react";
import Datas from "src/common/components/Datas";
import { useDispatch, useSelector } from "react-redux";
import { dataProduct } from "src/store/actions/product";
import Loadingcomponent from "src/common/components/loading/LoadingComponent";

const Admin = () => {
  const productData = useSelector((state) => state.products.data);
  const dispatch = useDispatch();
  const [load, setload] = useState(false);

  useEffect(() => {
    dispatch(dataProduct(1, 100, "", "", ""));
    setTimeout(() => {
      setload(true);
    }, 3000);
    if (productData !== null || undefined) {
      setload(false);
    }
    console.log("productData : ", productData);
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
