import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableHead from "@mui/material/TableHead";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Link from "next/link";
import { Button } from "@mui/material";
import Image from "next/image";
import defaultImages from "src/assets/images/default-placeholder.png";
import DeleteModal from "./card/deleteModal";
import AddModal from "./card/addModal";
import UpdateModal from "./card/updateModal";
import Loadingcomponent from "./loading/LoadingComponent";
import { dataProduct } from "src/store/actions/product";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";

const formatPrice = (value) => {
  let price = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  })
    .format(value)
    .replace(/(\.|,)00$/g, "");
  return price;
};

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 24,
  },
}));

export default function CustomPaginationActionsTable() {
  const productData = useSelector((state) => state.products.data);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [load, setLoad] = useState(false);

  const [rows, setRows] = useState([]);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [srcImg, setSrcImg] = useState(defaultImages);
  const [getId, setId] = useState(null);

  const handleDelete = () => setOpenDelete(true);
  const handleUpdate = () => setOpenUpdate(true);
  const handleAdd = () => setOpenAdd(true);

  const handleClose = () => {
    setOpenAdd(false);
    setOpenDelete(false);
    setOpenUpdate(false);
  };

  useEffect(() => {
    if (productData) {
      setRows(productData);
      setLoad(false);
    }
    setLoad(true);
  });

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const dataId = (id) => {
    setId(id);
  };

  const [filteredData, setFilteredData] = useState(null);
  const [wordEntered, setWordEntered] = useState("");

  useEffect(() => {
    setFilteredData(productData);
  }, []);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    // console.log(searchWord);
    const newFilter = rows.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData(productData);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData(productData);
    setWordEntered("");
  };

  return (
    <>
      {load ? (
        <div
          style={{
            width: "75%",
            margin: "auto",
            height: "auto",
            position: "relative",
            zIndex: "1",
          }}
        >
          <Link href="/">
            <Button
              style={{
                color: "black",
                width: "100%",
                margin: "auto",
                height: "auto",
              }}
            >
              Welcome to Admin
            </Button>
          </Link>
          <TextField
            id="outlined-helperText"
            label="Search"
            // defaultValue=" "
            value={wordEntered}
            onChange={handleFilter}
          />
          <div className="searchIcon">
            {filteredData.length === 0 ? (
              <p>search</p>
            ) : (
              <Button onClick={clearInput}>Clear Search</Button>
            )}
          </div>
          <TableContainer component={Paper}>
            <Table
              sx={{ width: 350, width: "100%" }}
              aria-label="custom pagination table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell style={{ fontWeight: 900, fontSize: 16 }}>
                    Foto Produk
                  </StyledTableCell>
                  <StyledTableCell
                    style={{ fontWeight: 900, fontSize: 16 }}
                    align="right"
                  >
                    Nama Produk
                  </StyledTableCell>
                  <StyledTableCell
                    style={{ fontWeight: 900, fontSize: 16 }}
                    align="right"
                  >
                    Harga Jual
                  </StyledTableCell>
                  <StyledTableCell
                    style={{ fontWeight: 900, fontSize: 16 }}
                    align="right"
                  >
                    Stok
                  </StyledTableCell>
                  <StyledTableCell
                    style={{
                      fontWeight: 900,
                      fontSize: 16,
                      textAlign: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        p: 1,
                        m: 1,
                      }}
                    >
                      <p>Action</p>
                      <Button
                        style={{ marginLeft: "15px" }}
                        variant="contained"
                        color="success"
                        onClick={handleAdd}
                      >
                        Add Product
                      </Button>
                    </Box>
                  </StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {(rowsPerPage > 0
                  ? filteredData.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : filteredData
                )
                  .slice(0, 15)
                  .map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        <Image
                          src={
                            row
                              ? process.env.NEXT_PUBLIC_API_URL +
                                "/" +
                                JSON.parse(row.images)[0]
                              : defaultImages
                          }
                          alt="product"
                          width={50}
                          height={50}
                          onError={() => setSrcImg(defaultImages)}
                        />
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        {row.name}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        {formatPrice(row.price)}
                        {/* id{row.id} */}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        {row.qty}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="right">
                        <Button
                          onClick={() => {
                            dataId(row.id);
                            handleUpdate();
                          }}
                          variant="outlined"
                          size="small"
                          sx={{ m: 1 }}
                        >
                          Update
                        </Button>

                        <Button
                          onClick={() => {
                            dataId(row.id);
                            handleDelete();
                          }}
                          variant="outlined"
                          color="error"
                          size="small"
                          sx={{ m: 1 }}
                        >
                          Delete
                        </Button>
                        <AddModal open={openAdd} onClose={handleClose} />
                        <UpdateModal
                          open={openUpdate}
                          onClose={handleClose}
                          getId={getId}
                        />
                        <DeleteModal
                          open={openDelete}
                          onClose={handleClose}
                          getId={getId}
                        />
                      </TableCell>
                    </TableRow>
                  ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <Loadingcomponent />
      )}
    </>
  );
}

{
  /* <Image
// loader={productImage}
// src={
//   rows.images
//     ? `#`
//     : process.env.NEXT_PUBLIC_API_URL + `/${rows.images}`
// }
// loader={img !== undefined ? productImage : defaultImages}
// src={process.env.NEXT_PUBLIC_API_URL + `/${rows.images}}
alt="google"
width={50}
height={50}
 /> */
}
