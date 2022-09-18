import "./navbar.scss";
import {
  Avatar,
  Badge,
  IconButton,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Language,
  Menu as MenuIcon,
  Notifications,
  Settings,
} from "@mui/icons-material";
import { useState } from "react";
import DrawerComponent from "../Drawer/DrawerComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/userRedux";

export default function Navbar() {
  const matches = useMediaQuery("(max-width:900px)");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { adminUser } = useSelector((state) => state.admin);

  const handleLogout = () => {
    dispatch(logOut());
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="wrapper">
        {matches && (
          <>
            <DrawerComponent
              openDrawer={openDrawer}
              setOpenDrawer={setOpenDrawer}
            />
            <IconButton onClick={() => setOpenDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </>
        )}
        <h1 className="logo">WYH E-commerce</h1>

        <div className="items">
          {!matches && (
            <>
              <div className="item">
                <Badge badgeContent={4} color="secondary">
                  <Notifications color="action" />
                </Badge>
              </div>
              <div className="item">
                <Badge badgeContent={4} color="success">
                  <Language color="action" />
                </Badge>
              </div>
              <div className="item">
                <Settings />
              </div>
            </>
          )}
          <div className="item">
            <Avatar
              sx={{ width: 35, height: 35 }}
              alt="Remy Sharp"
              src={
                adminUser?.img ||
                "https://149368894.v2.pressablecdn.com/wp-content/uploads/2019/09/iStock-1018999828.jpg"
              }
              onClick={() => setOpen(true)}
            />
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              open={open}
              onClose={() => setOpen(false)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem>{adminUser?.username}</MenuItem>
              <MenuItem>{adminUser?.email}</MenuItem>
              <MenuItem
                sx={{ color: "crimson" }}
                onClick={() => handleLogout()}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}
