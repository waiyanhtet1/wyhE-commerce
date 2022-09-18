import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import useFetch from "../../hook/useFetch";
import { userRequest } from "../../requestMethod";
import "./orders.scss";
import Row from "./Row";

export default function Orders() {
  const [updateId, setupdateId] = useState();

  const { users } = useSelector((state) => state.admin);
  const { data, reFetch } = useFetch("/orders");
  let userInfo = [];

  data.forEach((item) => {
    users.forEach((user) => {
      if (item.userId === user._id) {
        userInfo.push({ user, item });
      }
    });
  });

  useEffect(() => {
    if (updateId) {
      const updateIdInfo = async () => {
        try {
          await userRequest.put(`/orders/${updateId}`, {
            status: "confimed",
          });
          reFetch();
        } catch (error) {
          console.log(error);
        }
      };
      updateIdInfo();
    }
  }, [updateId]);

  return (
    <>
      <Navbar />
      <div className="mainContainer">
        <SideBar />
        <div className="mainWrapper">
          <h1 className="orderTableTitle">Orders</h1>
          <div className="orderTable">
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell style={{ fontWeight: "bold" }}>
                      Customer
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Delivery To
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Date</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Amount</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userInfo.map((row) => (
                    <Row key={row.name} row={row} setupdateId={setupdateId} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
}
