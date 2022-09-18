import "./login.scss";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { login } from "../../redux/apiCall";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => login(dispatch, data, navigate);
  console.log(errors);

  const admin = useSelector((state) => state.admin);

  useEffect(() => {
    if (admin.adminUser) {
      navigate("/");
    }
  }, []);

  return (
    <div className="loginContainer">
      <div className="loginWrapper">
        <h1 className="loginTitle">Login</h1>
        <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                type="email"
                id="outlined-basic"
                label="Email"
                variant="outlined"
                size="small"
                className="loginInput"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
            )}
          />
          <span className="errorMessage">
            {errors.email?.type === "required" && "Email is required"}
          </span>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                type="password"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                size="small"
                className="loginInput"
                {...register("password", {
                  required: true,
                })}
              />
            )}
          />
          <span className="errorMessage">
            {errors.password?.type === "required" && "Password is required"}
          </span>

          <span className="errorMessage">{admin.error}</span>

          <button type="submit" className="LoginButton">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
