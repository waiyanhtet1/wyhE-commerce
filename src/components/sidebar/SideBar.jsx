import {
  AddBusiness,
  Dashboard,
  ListAlt,
  PersonAddOutlined,
  PersonOutline,
  StoreOutlined,
} from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import "./sidebar.scss";

export default function SideBar() {
  const matches = useMediaQuery("(max-width:900px)");

  return (
    <div className={`sidebar ${matches && "small-screen"}`}>
      <div className="sidebarWrapper">
        <ul className="sidebar_list">
          <p className="title">Dashboard</p>
          <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
            <li className="sidebar_items">
              <Dashboard className="icon" />
              <span>Home</span>
            </li>
          </Link>

          <p className="title">Quick Menu</p>
          <Link to="/users" style={{ textDecoration: "none", color: "#000" }}>
            <li className="sidebar_items">
              <PersonOutline className="icon" />
              <span>Users</span>
            </li>
          </Link>

          <Link
            to="/products"
            style={{ textDecoration: "none", color: "#000" }}
          >
            <li className="sidebar_items">
              <StoreOutlined className="icon" />
              <span>Products</span>
            </li>
          </Link>

          <Link to="/orders" style={{ textDecoration: "none", color: "#000" }}>
            <li className="sidebar_items">
              <ListAlt className="icon" />
              <span>Orders</span>
            </li>
          </Link>

          <p className="title">Creating</p>
          <Link
            to="/create/user"
            style={{ textDecoration: "none", color: "#000" }}
          >
            <li className="sidebar_items">
              <PersonAddOutlined className="icon" />
              <span>Create Users</span>
            </li>
          </Link>

          <Link
            to="/create/product"
            style={{ textDecoration: "none", color: "#000" }}
          >
            <li className="sidebar_items">
              <AddBusiness className="icon" />
              <span>Create Products</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
