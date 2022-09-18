import DataTable from "../../components/DataTable/DataTable";
import Navbar from "../../components/Navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import "./product.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProduct } from "../../redux/apiCall";
import { proudctColumn } from "../../datatablesource.js";

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    getProduct(dispatch);
  }, []);

  return (
    <>
      <Navbar />
      <div className="mainContainer">
        <SideBar />
        <div className="mainWrapper">
          <DataTable title="products" row={products} column={proudctColumn} />
        </div>
      </div>
    </>
  );
}
