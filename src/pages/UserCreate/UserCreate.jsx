import "./userCreate.scss";
import Navbar from "../../components/Navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import { PersonAdd } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../redux/apiCall";

export default function UserCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.admin);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors);

  const onSubmit = (data) => {
    createUser(dispatch, data, navigate);
  };

  return (
    <>
      <Navbar />
      <div className="mainContainer">
        <SideBar />
        <div className="mainWrapper">
          <h1 className="userDetailTitle">New User</h1>
          <div className="createFormContainer">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="createformWrapper"
            >
              <div className="createformControl">
                <label htmlFor="username">User Name</label> <br />
                <input
                  type="text"
                  className="createFormInput"
                  {...register("username", { required: true, maxLength: 80 })}
                />
                {errors.username && (
                  <p className="errorMessage">User Name is required</p>
                )}
              </div>

              <div className="createformControl">
                <label htmlFor="username">Email</label> <br />
                <input
                  type="email"
                  className="createFormInput"
                  {...register("email", { required: true, maxLength: 80 })}
                />
                {errors.email && (
                  <p className="errorMessage">Email is required</p>
                )}
              </div>

              <div className="createformControl">
                <label htmlFor="username">Password</label> <br />
                <input
                  type="password"
                  className="createFormInput"
                  {...register("password", { required: true, maxLength: 80 })}
                />
                {errors.password && (
                  <p className="errorMessage">Password is required</p>
                )}
              </div>

              <div className="createformControl">
                <label htmlFor="username">Role</label> <br />
                <select className="createFormInput" {...register("isAdmin")}>
                  <option value={true}>Admin</option>
                  <option value={false}>User</option>
                </select>
              </div>

              <div className="createformControl">
                <p className="errorMessage">{error}</p>
              </div>

              <Button
                type="submit"
                sx={{ marginTop: "20px" }}
                endIcon={<PersonAdd />}
                variant="contained"
              >
                Create
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
