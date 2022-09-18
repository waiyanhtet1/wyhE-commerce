import { Edit, PhotoCamera } from "@mui/icons-material";
import { Avatar, Button, IconButton } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import ProudctChart from "../../components/ProudctChart/ProudctChart";
import SideBar from "../../components/sidebar/SideBar";
import LoadingButton from "@mui/lab/LoadingButton";
import app from "../../firebase";
import { updateProduct } from "../../redux/apiCall";
import { format } from "timeago.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "./productDetail.scss";

export default function ProductDetail() {
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];

  const product = useSelector((state) =>
    state.product.products.find((p) => p._id === id)
  );

  const [img, SetImg] = useState(product.img);
  const [title, setTitle] = useState(product.title);
  const [desc, setDesc] = useState(product.desc);
  const [categories, setCategories] = useState(product.categories);
  const [color, setColor] = useState(product.color);
  const [size, setSize] = useState(product.size);
  const [price, setPrice] = useState(product.price);
  const [inStock, setinStock] = useState(product.inStock);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleUpdate = () => {
    if (typeof img === "object") {
      setLoading(true);
      const fileName = new Date().getTime() + img.name;
      const storage = getStorage(app);
      const metadata = {
        contentType: "image/*",
      };
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, img, metadata);
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
            updateProduct(dispatch, id, {
              img: downloadURL,
            });
            setLoading(false);
          });
        }
      );
    }

    updateProduct(dispatch, id, {
      title,
      desc,
      categories,
      color,
      size,
      price,
      inStock,
    });
  };

  return (
    <>
      <Navbar />
      <div className="mainContainer">
        <SideBar />
        <div className="mainWrapper">
          <h1 className="userDetailTitle">Edit "{product.title}" Prouduct</h1>
          <div className="top">
            <ProudctChart proudctId={id} />
            <div className="proudctDetailInfo">
              <div className="productInfo">
                <Avatar
                  sx={{ width: 45, height: 45 }}
                  alt={product.title}
                  src={product.img}
                />
                {product.title}
              </div>
              <ul className="proudctList">
                <li className="productItem">
                  <span className="proudctItemKey">Id:</span>
                  <span>{product._id}</span>
                </li>
                <li className="productItem">
                  <span className="proudctItemKey">Description:</span>
                  <span>{product.desc}</span>
                </li>
                <li className="productItem">
                  <span className="proudctItemKey">Categories:</span>
                  <span>
                    {product.categories.map((c, i) => (
                      <span key={i}>
                        {c} {i < product.categories.length - 1 && " , "}
                      </span>
                    ))}
                  </span>
                </li>
                <li className="productItem">
                  <span className="proudctItemKey">Size:</span>
                  <span>
                    {product.size.map((c, i) => (
                      <span key={i}>
                        {c} {i < product.size.length - 1 && " , "}
                      </span>
                    ))}
                  </span>
                </li>
                <li className="productItem">
                  <span className="proudctItemKey">Color:</span>
                  <span>
                    {product.color.map((c, i) => (
                      <span key={i}>
                        {c} {i < product.color.length - 1 && " , "}
                      </span>
                    ))}
                  </span>
                </li>
                <li className="productItem">
                  <span className="proudctItemKey">Price:</span>
                  <span>$ {product.price}</span>
                </li>

                <li className="productItem">
                  <span className="proudctItemKey">In stock:</span>
                  <span>{product.inStock ? "Yes" : "No"}</span>
                </li>

                <li className="productItem">
                  <span className="proudctItemKey">Created At</span>
                  <span>{format(product.createdAt)}</span>
                </li>
                <li className="productItem">
                  <span className="proudctItemKey">Updated At</span>
                  <span>{format(product.updatedAt)}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bottom">
            <form className="productEditForm">
              <div className="DetailForm">
                <div className="editTextControl">
                  <label htmlFor="title">Product Name</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={product.title}
                    className="editTextField"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="editTextControl">
                  <label htmlFor="desc">Description</label>
                  <textarea
                    rows="4"
                    defaultValue={product.desc}
                    className="editTextField"
                    onChange={(e) => setDesc(e.target.value)}
                  ></textarea>
                </div>

                <div className="editTextControl">
                  <label htmlFor="price">Categories</label>
                  <input
                    type="text"
                    name="categories"
                    defaultValue={product.categories.toString()}
                    className="editTextField"
                    onChange={(e) => setCategories(e.target.value.split(","))}
                  />
                </div>

                <div className="editTextControl">
                  <label htmlFor="price">Color</label>
                  <input
                    type="text"
                    name="color"
                    defaultValue={product.color.toString()}
                    className="editTextField"
                    onChange={(e) => setColor(e.target.value.split(","))}
                  />
                </div>

                <div className="editTextControl">
                  <label htmlFor="price">Size</label>
                  <input
                    type="text"
                    name="size"
                    defaultValue={product.size.toString()}
                    className="editTextField"
                    onChange={(e) => setSize(e.target.value.split(","))}
                  />
                </div>

                <div className="editTextControl">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    name="price"
                    defaultValue={product.price}
                    className="editTextField"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="editTextControl">
                  <label htmlFor="">In Stock</label>
                  <select
                    className="editTextField select"
                    name="inStock"
                    defaultValue={product.inStock}
                    onChange={(e) => setinStock(e.target.value)}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>

              <div className="buttonAndImage">
                <div className="editFormimage">
                  <img
                    src={
                      typeof img === "object"
                        ? URL.createObjectURL(img)
                        : product.img
                    }
                    style={{ width: "150px", height: "150px" }}
                    alt=""
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={(e) => SetImg(e.target.files[0])}
                    />
                    <PhotoCamera />
                  </IconButton>
                </div>

                <LoadingButton
                  loading={loading}
                  sx={{ marginTop: "20px" }}
                  endIcon={<Edit />}
                  loadingPosition="end"
                  variant="contained"
                  onClick={() => handleUpdate()}
                >
                  Edit
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
