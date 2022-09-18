import "./drawercomponent.scss";
import {
  AddBusiness,
  Dashboard,
  ListAlt,
  PersonAddOutlined,
  PersonOutline,
  StoreOutlined,
} from "@mui/icons-material";
import { Drawer } from "@mui/material";
import { Link } from "react-router-dom";

export default function DrawerComponent({ openDrawer, setOpenDrawer }) {
  return (
    <Drawer
      open={openDrawer}
      anchor="left"
      onClose={() => setOpenDrawer(false)}
    >
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

        <Link to="/products" style={{ textDecoration: "none", color: "#000" }}>
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
    </Drawer>
  );
}
