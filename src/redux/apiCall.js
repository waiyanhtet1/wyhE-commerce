import { publicRequest, userRequest } from "../requestMethod";
import {
  startAction,
  failAction,
  getProductSuccess,
  deleteProductSuccess,
  createProductSuccess,
  updateProductSuccess,
} from "./productRedux";
import {
  createUserSuccess,
  deleteUserSuccess,
  failUserAction,
  getUserSuccess,
  loginFail,
  loginStart,
  loginSuccess,
  startUserAction,
  updateUserSuccess,
} from "./userRedux";

export const login = async (dispatch, user, navigate) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    if (res.data.isAdmin) {
      dispatch(loginSuccess(res.data));
      navigate("/");
    } else {
      dispatch(loginFail("You are not allowed!"));
    }
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
    console.log(error.response.data);
  }
};

// GET products
export const getProduct = async (dispatch) => {
  dispatch(startAction());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(failAction());
  }
};

// DELETE product
export const deleteProduct = async (dispatch, id) => {
  dispatch(startAction());
  try {
    await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(failAction());
  }
};

// UPDATE product
export const updateProduct = async (dispatch, id, product) => {
  dispatch(startAction());
  try {
    const res = await userRequest.put(`/products/${id}`, product);
    dispatch(updateProductSuccess(res.data));
  } catch (error) {
    dispatch(failAction());
  }
};

// CREATE product
export const createProduct = async (dispatch, product) => {
  dispatch(startAction());
  try {
    const res = await userRequest.post("/products", product);
    dispatch(createProductSuccess(res.data));
  } catch (error) {
    dispatch(failAction());
  }
};

// ------------------------- User ----------------------------------

// GET user
export const getUsers = async (dispatch) => {
  dispatch(startUserAction());
  try {
    const res = await userRequest.get("/users");
    dispatch(getUserSuccess(res.data));
  } catch (error) {
    dispatch(failUserAction());
  }
};

// DELETE user
export const deleteUser = async (dispatch, id) => {
  dispatch(startUserAction());
  try {
    await userRequest.delete(`/users/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (error) {
    dispatch(failUserAction());
  }
};

// UPDATE user
export const updateUser = async (dispatch, id, user) => {
  dispatch(startUserAction());
  try {
    const res = await userRequest.put(`/users/${id}`, user);
    dispatch(updateUserSuccess(res.data));
  } catch (error) {
    dispatch(failUserAction());
  }
};

// CREATE user
export const createUser = async (dispatch, user, navigate) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(createUserSuccess(res.data));
    navigate("/users");
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
  }
};
