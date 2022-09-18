import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { deleteProduct } from "../redux/apiCall";

export default function OpenDialog({ open, setOpen, id, dispatch }) {
  console.log(id);
  return (
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
          onClick={() => deleteProduct(dispatch, id)}
        >
          Yes,Delete!
        </Button>
      </DialogActions>
    </Dialog>
  );
}
