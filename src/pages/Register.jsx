import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerUser } from "../redux/apiCalls";
import { actionFail } from "../redux/userRedux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
  flex-direction: column;
`;

// const InputContainer = styled.div`
//   min-width: 40%;
// `;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border: 1px solid gray;
  font-size: 15px;
`;

const CheckBoxContainer = styled.div`
  margin: 5px 0px;
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

const Aggrement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
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

export default function Register() {
  const [checked, setChecked] = useState(false);
  const [cPassword, setcPassword] = useState("");
  const { clientFetching, clientError } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (data.password === cPassword) {
      registerUser(dispatch, data, navigate);
    } else {
      dispatch(actionFail("Password must be same!"));
    }
  };
  console.log(errors);

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="UserName"
            type="text"
            {...register("username", { required: true })}
          />
          <ErrorMessage>
            {errors.username?.type === "required" && "UserName is required"}
          </ErrorMessage>

          <Input
            placeholder="Email"
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

          <Input
            placeholder="ConfimPassword"
            type={checked ? "text" : "password"}
            onChange={(e) => setcPassword(e.target.value)}
            // {...register("cpassword", { required: true })}
          />
          <CheckBoxContainer>
            <CheckBox
              type="checkbox"
              // value={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <CheckBoxLabel htmlFor="">Show Password</CheckBoxLabel>
          </CheckBoxContainer>

          <ErrorMessage>{clientError}</ErrorMessage>

          <Aggrement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Aggrement>
          <Button type="submit" disabled={clientFetching}>
            Create
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
}
