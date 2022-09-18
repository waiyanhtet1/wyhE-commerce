import "./lasttrans.scss";

import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import useFetch from "../../hook/useFetch";
import { format } from "timeago.js";
import { useSelector } from "react-redux";

export default function LastTrans() {
  const { users } = useSelector((state) => state.admin);
  const { data } = useFetch("/orders?new=true");
  let userInfo = [];

  data.forEach((item) => {
    users.forEach((user) => {
      if (item.userId === user._id) userInfo.push({ user, item });
    });
  });

  return (
    <div className="lastTran">
      <h1 className="lastTitle">Latest Transcations</h1>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userInfo.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <span>{row.user.username}</span>
                </TableCell>

                <TableCell>{format(row.item.createdAt)}</TableCell>
                <TableCell>{row.item.amount}</TableCell>
                <TableCell>
                  <span className={`lastStatus ${row.item.status}`}>
                    {row.item.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
