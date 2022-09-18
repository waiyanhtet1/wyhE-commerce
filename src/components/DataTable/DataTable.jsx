import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { deleteProduct, deleteUser } from "../../redux/apiCall";
import { useState } from "react";

export default function DataTable({ title, row, column }) {
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/${title}/${params.row._id}`}>
              <button className="viewButton">View</button>
            </Link>
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => {
                setId(params.row._id);
                setOpen(true);
              }}
            >
              <Delete />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="datatable">
        <h1 className="datatableTitle">{title}</h1>
        <DataGrid
          sx={{ margin: "20px" }}
          rows={row}
          columns={column.concat(actionColumn)}
          pageSize={6}
          getRowId={(row) => row._id}
          rowsPerPageOptions={[6]}
          checkboxSelection
        />
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure want to delete?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Sure want to delete <b></b> from your list? This will permantaly
            delete and can't restore back.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Disagree</Button>
          <Button
            autoFocus
            color="error"
            onClick={() => {
              if (title === "users") {
                deleteUser(dispatch, id);
              } else {
                deleteProduct(dispatch, id);
              }
              setOpen(false);
            }}
          >
            Yes,Delete!
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
