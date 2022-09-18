import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { format } from "timeago.js";

export default function Row({ row, setupdateId }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.user.username} <br />
          <span style={{ fontSize: "13px" }}>{row.user.email}</span>
        </TableCell>
        <TableCell>
          {row.item.address.line1}, {row.item.address.city},
          {row.item.address.country}. <br /> Postal Code:{" "}
          {row.item.address.postal_code}
        </TableCell>
        <TableCell>{format(row.item.createdAt)}</TableCell>
        <TableCell>$ {row.item.amount}</TableCell>
        <TableCell>
          <span className={`orderStatus ${row.item.status}`}>
            {row.item.status}
          </span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="subtitle1" gutterBottom component="div">
                Products
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>Items</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Quantity
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Color</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Size</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.item.products.map((historyRow) => (
                    <TableRow key={historyRow._id}>
                      <TableCell component="th" scope="row">
                        <div className="productInfo">
                          <Avatar alt="Remy Sharp" src={historyRow.img} />
                          {historyRow.title}
                        </div>
                      </TableCell>
                      <TableCell>{historyRow.quantity}</TableCell>
                      <TableCell>{historyRow.color}</TableCell>
                      <TableCell>{historyRow.size}</TableCell>
                      <TableCell>$ {historyRow.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {row.item.status === "pending" && (
                <div className="buttonGroup">
                  <button
                    className="confimButton"
                    onClick={() => setupdateId(row.item._id)}
                  >
                    Confim
                  </button>
                </div>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
