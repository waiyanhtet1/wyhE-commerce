import styled from "styled-components";
import Announment from "../components/Announment";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({
    margin: "0px 10px",
    display: "flex",
    flexDirection: "column",
  })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  border: 1px solid gray;
  ${mobile({ margin: "10px 0px" })};
`;

const CancelFilter = styled.button`
  padding: 10px;
  background-color: teal;
  color: white;
  border: none;
  cursor: pointer;
`;

const Option = styled.option``;

export default function ProductList() {
  const { pathname } = useLocation();
  const cat = pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const navigate = useNavigate();

  const handleFilters = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  console.log(filters);

  return (
    <Container>
      <Navbar />
      <Announment />
      <Title>{cat}</Title>

      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={(e) => handleFilters(e)}>
            <Option disabled>Color</Option>
            <Option>Gray</Option>
            <Option>Brown</Option>
            <Option>Orange</Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Green</Option>
          </Select>
          <Select name="size" onChange={(e) => handleFilters(e)}>
            <Option disabled>Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>

        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>

        <Filter>
          <CancelFilter onClick={() => setFilters({})}>
            All Products
          </CancelFilter>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <NewsLetter />
      <Footer />
    </Container>
  );
}
