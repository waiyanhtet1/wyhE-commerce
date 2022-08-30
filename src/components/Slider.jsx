import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../data.js";
import { mobile } from "../responsive.js";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e2dddd;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  ${mobile({ flexDirection: "column" })};
`;

const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
  ${mobile({ height: "50%" })}
`;

const Image = styled.img`
  padding: 20px 150px;
  height: 80%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 30px;
  ${mobile({ padding: "10px 30px" })}
`;

const Title = styled.h1`
  font-size: 70px;
  ${mobile({ fontSize: "40px" })}
`;

const Desc = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin: 50px 0px;
  letter-spacing: 3px;
  ${mobile({ margin: "20px 0px" })}
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

export default function Slider() {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeft />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <StyledLink to="/products">
                <Button>Shop Now</Button>
              </StyledLink>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>

      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRight />
      </Arrow>
    </Container>
  );
}
