import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loadingcomponent from "src/common/components/loading/LoadingComponent";

const List = () => {
  const productData = useSelector((state) => state.products.data);
  const [product, setproduct] = useState([]);
  const [load, setload] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  useEffect(() => {
    if (productData !== undefined || null) {
      setproduct(productData);
      setFilteredData(productData);
    }
    setload(true);
  }, [productData]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = productData.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  //   const clearInput = () => {
  //     setFilteredData([]);
  //     setWordEntered("");
  //   };
  console.log("Pdata", productData);

  console.log("dataData", filteredData);

  return (
    <>
      <input
        type="text"
        // placeholder={placeholder}
        value={wordEntered}
        onChange={handleFilter}
      />
      <div>
        {load ? (
          <div>
            {filteredData.length > 0 && (
              <div>
                {filteredData.map((i) => (
                  <div key={i.id}>
                    <p style={{ color: "black" }}>{i.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Loadingcomponent />
        )}
      </div>
    </>
  );
};

export default List;
