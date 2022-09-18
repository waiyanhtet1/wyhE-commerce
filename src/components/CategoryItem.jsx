import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  /* flex: 1; */
  width: 32%;
  margin: 3px;
  height: 70vh;
  position: relative;
  ${mobile({ width: "100%", height: "20vh" })}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 10px;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  font-weight: 600;
  background-color: white;
  color: gray;
  cursor: pointer;
  &:hover {
    background-color: #ffffffbe;
  }
`;

export default function CategoryItem({ item }) {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Link to={`/products/${item.cat}`}>
          <Button>Shop Now</Button>
        </Link>
      </Info>
    </Container>
  );
}