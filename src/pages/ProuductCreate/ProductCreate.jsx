import "./productCreate.scss";
import Navbar from "../../components/Navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import app from "../../firebase";
import LoadingButton from "@mui/lab/LoadingButton";
import { Add, UploadFile } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { createProduct } from "../../redux/apiCall";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function ProductCreate() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors);

  const onSubmit = (data) => {
    setLoading(true);
    const fileName = new Date().getTime() + data.img[0].name;
    const storage = getStorage(app);
    const metadata = {
      contentType: "image/*",
    };
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, data.img[0], metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          createProduct(dispatch, {
            ...data,
            img: downloadURL,
            categories: data.categories.split(","),
            color: data.color.split(","),
            size: data.size.split(","),
          });
          setLoading(false);
          navigate("/products");
        });
      }
    );
  };

  return (
    <>
      <Navbar />
      <div className="mainContainer">
        <SideBar />
        <div className="mainWrapper">
          <h1 className="userDetailTitle">New Product</h1>
          <div className="createFormContainer">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="createformWrapper"
            >
              <div className="createformControl">
                <label htmlFor="img">Image</label>
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    {...register("img", { required: true })}
                  />
                  <UploadFile />
                </IconButton>
                {errors.img && (
                  <p className="errorMessage">Image is required</p>
                )}
              </div>

              <div className="createformControl">
                <label htmlFor="title">Product Name</label> <br />
                <input
                  type="text"
                  className="createFormInput"
                  {...register("title", { required: true, maxLength: 80 })}
                />
                {errors.title && (
                  <p className="errorMessage">Product Name is required</p>
                )}
              </div>

              <div className="createformControl">
                <label htmlFor="title">Categories</label> <br />
                <input
                  type="text"
                  placeholder="Cloth,Women"
                  className="createFormInput"
                  {...register("categories", {
                    required: true,
                    pattern: /^\S+,\S+$/i,
                  })}
                />
                {errors.categories?.type === "required" && (
                  <p className="errorMessage">Categories is required</p>
                )}
                {errors.categories?.type === "pattern" && (
                  <p className="errorMessage">
                    Comma is required between items
                  </p>
                )}
              </div>

              <div className="createformControl">
                <label htmlFor="desc">Description</label> <br />
                <textarea
                  rows={3}
                  cols={25}
                  {...register("desc", { required: true })}
                  className="createFormInput"
                />
                {errors.desc && (
                  <p className="errorMessage">Description is required</p>
                )}
              </div>

              <div className="createformControl">
                <label htmlFor="title">Color</label> <br />
                <input
                  type="text"
                  placeholder="White,Blue"
                  className="createFormInput"
                  {...register("color", {
                    required: true,
                    pattern: /^\S+,\S+$/i,
                  })}
                />
                {errors.color?.type === "required" && (
                  <p className="errorMessage">Color is required</p>
                )}
                {errors.color?.type === "pattern" && (
                  <p className="errorMessage">
                    Comma is required between items
                  </p>
                )}
              </div>

              <div className="createformControl">
                <label htmlFor="title">Size</label> <br />
                <input
                  type="text"
                  placeholder="XL,M,S"
                  className="createFormInput"
                  {...register("size", {
                    required: true,
                    pattern: /^\S+,\S+$/i,
                  })}
                />
                {errors.size?.type === "required" && (
                  <p className="errorMessage">Size is required</p>
                )}
                {errors.size?.type === "pattern" && (
                  <p className="errorMessage">
                    Comma is required between items
                  </p>
                )}
              </div>

              <div className="createformControl">
                <label htmlFor="price">Price</label> <br />
                <input
                  type="number"
                  className="createFormInput"
                  {...register("price", { required: true })}
                />
                {errors.price && (
                  <p className="errorMessage">Price is required</p>
                )}
              </div>

              <LoadingButton
                type="submit"
                loading={loading}
                sx={{ marginTop: "20px" }}
                endIcon={<Add />}
                loadingPosition="end"
                variant="contained"
              >
                Create
              </LoadingButton>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
