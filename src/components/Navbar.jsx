import { Menu, Search, ShoppingCartOutlined } from "@mui/icons-material";
import { Badge, IconButton, useMediaQuery } from "@mui/material";
import styled from "styled-components";
import { mobile } from "../responsive.js";
import { Link } from "react-router-dom";
import { useState } from "react";
import DrawerComponent from "./DrawerComponent.jsx";

const Container = styled.div`
  height: 60px;
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

const MenuItem = styled.span`
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
  const [openDrawer, setOpenDrawer] = useState(false);

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
                <Menu />
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
          <StyledLink to="/register">
            <MenuItem>REGISTER</MenuItem>
          </StyledLink>
          <StyledLink to="/login">
            <MenuItem>SIGN UP</MenuItem>
          </StyledLink>
          <StyledLink to="/cart">
            <MenuItem type="icon">
              <Badge badgeContent={4} color="error">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </StyledLink>
        </Right>
      </Wrapper>
    </Container>
  );
}
