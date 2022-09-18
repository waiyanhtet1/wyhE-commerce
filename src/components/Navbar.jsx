import {
  AccountCircle,
  Menu as MenuIcon,
  Search,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import {
  Badge,
  IconButton,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import styled from "styled-components";
import { mobile } from "../responsive.js";
import { Link } from "react-router-dom";
import { useState } from "react";
import DrawerComponent from "./DrawerComponent.jsx";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/userRedux.js";

const Container = styled.div`
  height: 60px;
  position: sticky;
  top: 0;
  z-index: 4;
  background-color: white;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  margin-left: 25px;
  padding: 5px;
  border: 0.5px solid gray;
  display: flex;
  align-items: center;
  ${mobile({ display: "none" })}
`;

const Input = styled.input`
  border: none;
  outline: none;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "20px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItemValue = styled.span`
  font-size: 14px;
  cursor: pointer;
  margin-right: 20px;
  cursor: pointer;
  ${mobile({ display: (props) => props.type !== "icon" && "none" })}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

export default function Navbar() {
  const matches = useMediaQuery("(max-width:900px)");
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartQuantity);
  const user = useSelector((state) => state.user.currentUser);

  const handleLogout = () => {
    dispatch(logOut());
    localStorage.clear();
  };

  return (
    <Container>
      <Wrapper>
        <Left>
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
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search..." />
            <Search sx={{ fontSize: 16, color: "gray" }} />
          </SearchContainer>
        </Left>
        <Center>
          <StyledLink to="/">
            <Logo>WYH.com</Logo>
          </StyledLink>
        </Center>
        <Right>
          {!user && (
            <>
              <StyledLink to="/register">
                <MenuItemValue>REGISTER</MenuItemValue>
              </StyledLink>
              <StyledLink to="/login">
                <MenuItemValue>SIGN UP</MenuItemValue>
              </StyledLink>
            </>
          )}
          <StyledLink to="/cart">
            <MenuItemValue type="icon">
              <Badge badgeContent={cart} color="error">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItemValue>
          </StyledLink>

          {user && (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => setOpen(true)}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
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
                <MenuItem>{user?.username}</MenuItem>
                <MenuItem>{user?.email}</MenuItem>
                <MenuItem
                  sx={{ color: "crimson" }}
                  onClick={() => handleLogout()}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
}
