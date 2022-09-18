import {
  AppRegistrationRounded,
  Login,
  Logout as LogoutIcon,
  Search,
} from "@mui/icons-material";
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import styled from "styled-components";
import { logOut } from "../redux/userRedux";

const SearchContainer = styled.div`
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
`;

const Input = styled.input`
  border: none;
  outline: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

export default function DrawerComponent({ openDrawer, setOpenDrawer }) {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    localStorage.clear();
  };

  return (
    <Drawer
      open={openDrawer}
      anchor="left"
      onClose={() => setOpenDrawer(false)}
    >
      <List>
        {!user ? (
          <>
            <ListSubheader>Register or Login</ListSubheader>
            <ListItem>
              <StyledLink to="/login">
                <ListItemButton>
                  <ListItemIcon>
                    <Login />
                  </ListItemIcon>
                  <ListItemText primary="SIGN IN" />
                </ListItemButton>
              </StyledLink>
            </ListItem>
            <ListItem>
              <StyledLink to="/register">
                <ListItemButton>
                  <ListItemIcon>
                    <AppRegistrationRounded />
                  </ListItemIcon>
                  <ListItemText primary="REGISTER" />
                </ListItemButton>
              </StyledLink>
            </ListItem>
          </>
        ) : (
          <>
            <ListSubheader>User Information</ListSubheader>
            <ListItem>
              <ListItemText primary={user.username} />
            </ListItem>
            <ListItem>
              <ListItemText primary={user.email} />
            </ListItem>
            <ListItemButton onClick={() => handleLogout()}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText sx={{ color: "crimson" }} primary="Logout" />
            </ListItemButton>
          </>
        )}
        <Divider />
      </List>
      <List>
        <ListItem>
          <SearchContainer>
            <Input placeholder="Search.." />
            <Search sx={{ color: "gray" }} />
          </SearchContainer>
        </ListItem>
        <ListItem>
          <ListItemButton component="a" href="#simple-list">
            <ListItemText primary="EN" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
