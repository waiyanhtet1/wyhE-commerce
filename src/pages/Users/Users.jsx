import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/DataTable/DataTable";
import Navbar from "../../components/Navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import { userColumn } from "../../datatablesource";
import { getUsers } from "../../redux/apiCall";
import "./user.scss";

export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.users);

  useEffect(() => {
    getUsers(dispatch);
  }, []);

  return (
    <>
      <Navbar />
      <div className="mainContainer">
        <SideBar />
        <div className="mainWrapper">
          <DataTable title="users" row={users} column={userColumn} />
        </div>
      </div>
    </>
  );
}
