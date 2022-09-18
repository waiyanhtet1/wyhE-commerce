import styled from "styled-components";
import { categories } from "../data.js";
import { mobile } from "../responsive.js";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px;
  ${mobile({ flexDirection: "column" })}
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
