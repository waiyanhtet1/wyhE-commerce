import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ backgroundPosition: "center" })}
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  font-size: 15px;
  padding: 10px;
  border: 1px solid gray;
`;

const CheckBoxContainer = styled.div`
  /* margin-top: px; */
  margin-bottom: 15px;
`;

const CheckBoxLabel = styled.label`
  font-size: 15px;
`;

const CheckBox = styled.input`
  margin-right: 10px;
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  color: crimson;
`;

const Button = styled.button`
  width: 40%;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  border: none;
  cursor: pointer;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const StyleLink = styled(Link)`
  margin: 5px 0px;
  font-size: 12px;
  color: #000;
  cursor: pointer;
`;

export default function Login() {
  const [checked, setChecked] = useState(false);
  const { clientFetching, clientError } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  console.log(state);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => login(dispatch, data, navigate);

  console.log(errors);
  return (
    <Container>
      <Wrapper>
        {state?.user ? (
          <Title>Hello {state.user.username}, Please Login Here</Title>
        ) : (
          <Title>SIGN IN</Title>
        )}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Eamil"
            type="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          <ErrorMessage>
            {errors.email?.type === "required" && "Email is required"}
          </ErrorMessage>

          <Input
            placeholder="Password"
            type={checked ? "text" : "password"}
            {...register("password", { required: true })}
          />
          <ErrorMessage>
            {errors.password?.type === "required" && "Password is required"}
          </ErrorMessage>
          <ErrorMessage>{clientError}</ErrorMessage>

          <CheckBoxContainer>
            <CheckBox
              type="checkbox"
              // value={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <CheckBoxLabel htmlFor="">Show Password</CheckBoxLabel>
          </CheckBoxContainer>
          <Button type="submit" disabled={clientFetching}>
            Login In
          </Button>
          <StyleLink to="">DO NOT YOU REMEMBER THE PASSWORD?</StyleLink>
          <StyleLink to="/register">CREATE A NEW ACCOUNT</StyleLink>
        </Form>
      </Wrapper>
    </Container>
  );
}
