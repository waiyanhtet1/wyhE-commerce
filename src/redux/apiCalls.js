import { publicRequest, userRequest } from "../requestMethod";
import {
  actionFail,
  actionStart,
  loginSuccess,
  registerSuccess,
} from "./userRedux";

export const login = async (dispatch, user, navigate) => {
  dispatch(actionStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    navigate(-1);
  } catch (error) {
    dispatch(actionFail(error.response.data.message));
  }
};

export const registerUser = async (dispatch, user, navigate) => {
  dispatch(actionStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess());
    navigate("/login", { state: { user: res.data } });
  } catch (error) {
    dispatch(actionFail(error.response.data.message));
  }
};
