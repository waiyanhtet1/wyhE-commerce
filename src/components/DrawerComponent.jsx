import {
  AppRegistrationRounded,
  Drafts,
  Inbox,
  Login,
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

import { Link } from "react-router-dom";
import styled from "styled-components";

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
  return (
    <Drawer
      open={openDrawer}
      anchor="left"
      onClose={() => setOpenDrawer(false)}
    >
      <List>
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
