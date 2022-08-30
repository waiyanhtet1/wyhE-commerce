import styled from "styled-components";
import { categories } from "../data.js";
import { mobile } from "../responsive.js";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

export default function Categories() {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem key={item.id} item={item} />
      ))}
    </Container>
  );
}
