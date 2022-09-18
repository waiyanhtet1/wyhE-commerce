import "./userDetail.scss";
import Navbar from "../../components/Navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import LoadingButton from "@mui/lab/LoadingButton";
import app from "../../firebase";
import { Avatar, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { updateUser } from "../../redux/apiCall";
import { format } from "timeago.js";
import {
  CalendarTodayOutlined,
  LocationSearching,
  PersonOutline,
  PhoneAndroid,
  PhotoCamera,
  Edit,
} from "@mui/icons-material";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function UserDetail() {
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];
  const dispatch = useDispatch();

  const user = useSelector((state) =>
    state.admin.users.find((u) => u._id === id)
  );

  const [img, setImg] = useState(user.img);
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user.email);
  const [password, setpassword] = useState(user.password);
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);
  const [loading, setLoading] = useState(false);

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
            updateUser(dispatch, id, {
              img: downloadURL,
              password,
            });
            setLoading(false);
          });
        }
      );
    }

    updateUser(dispatch, id, {
      username,
      email,
      password,
      isAdmin,
    });
  };

  return (
    <>
      <Navbar />
      <div className="mainContainer">
        <SideBar />
        <div className="mainWrapper">
          <h1 className="userDetailTitle">Edit User</h1>
          <div className="userDetailWrapper">
            <div className="userDetailInfo">
              <div className="userDetailProfile">
                <Avatar
                  sx={{ width: 35, height: 35 }}
                  alt="Remy Sharp"
                  src={
                    user.img ||
                    "https://149368894.v2.pressablecdn.com/wp-content/uploads/2019/09/iStock-1018999828.jpg"
                  }
                />
                <div>
                  <span className="detailProfileName">{user.username}</span>
                  <br />
                  <span className="detailProfilePosition">
                    {user.isAdmin ? "Admin" : "User"}
                  </span>
                </div>
              </div>
              <ul className="userDetailList">
                <div className="useListTitle">
                  <span>Account Details</span>
                </div>
                <li className="userDetailListItem">
                  <PersonOutline fontSize="small" /> {user.email}
                </li>
                <li className="userDetailListItem">
                  <CalendarTodayOutlined fontSize="small" />
                  {format(user.createdAt)}
                </li>
                <div className="useListTitle">
                  <span>Contact</span>
                </div>
                <li className="userDetailListItem">
                  <PhoneAndroid fontSize="small" /> +1 234 567 890
                </li>
                <li className="userDetailListItem">
                  <LocationSearching fontSize="small" /> New York | USA
                </li>
              </ul>
            </div>
            <div className="userDetailEdit">
              <h3>Edit</h3>
              <form className="userDetailEditForm">
                <div className="DetailForm">
                  <div className="editTextControl">
                    <label htmlFor="title">Name</label> <br />
                    <input
                      type="text"
                      name="username"
                      defaultValue={user.username}
                      className="editTextField"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="editTextControl">
                    <label htmlFor="title">Email</label> <br />
                    <input
                      type="email"
                      name="email"
                      defaultValue={user.email}
                      className="editTextField"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="editTextControl">
                    <label htmlFor="title">Role</label> <br />
                    <select
                      className="editTextField"
                      name="isAdmin"
                      defaultValue={user.isAdmin}
                      onChange={(e) => setIsAdmin(e.target.value)}
                    >
                      <option value="true">Admin</option>
                      <option value="false">User</option>
                    </select>
                  </div>
                </div>
                <div className="buttonAndImage">
                  <div className="editFormimage">
                    <img
                      src={
                        typeof img === "object"
                          ? URL.createObjectURL(img)
                          : user.img ||
                            "https://149368894.v2.pressablecdn.com/wp-content/uploads/2019/09/iStock-1018999828.jpg"
                      }
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
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
                        onChange={(e) => setImg(e.target.files[0])}
                      />
                      <PhotoCamera />
                    </IconButton>
                  </div>
                  <LoadingButton
                    loading={loading}
                    sx={{ width: "50%" }}
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
      </div>
    </>
  );
}
