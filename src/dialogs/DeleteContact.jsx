import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ViewContactsDialog({ open, onClose }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(null); // Store the contact to confirm deletion

  // Fetch contacts from MongoDB
  useEffect(() => {
    if (open) {
      fetch("http://localhost:5000/contacts")
        .then((res) => res.json())
        .then((data) => {
          const formattedRows = data.map((contact, index) => ({
            id: index + 1, 
            mongoId: contact._id, 
            first: contact.firstname,
            last: contact.lastname,
            email: contact.email,
            company: contact.company,
            job: contact.jobtitle,
          }));
          setRows(formattedRows);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching contacts:", error);
          setLoading(false);
        });
    }
  }, [open]);

  const handleDeleteContact = (mongoId) => {
    fetch(`http://localhost:5000/contacts/${mongoId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete");
        }
        toast.success("Contact deleted successfully!");
        return res.json();
      })
      .then(() => {
        setRows((prevRows) => prevRows.filter((row) => row.mongoId !== mongoId));
        setConfirmDelete(null); 
      })
      .catch((error) => {
        console.error("Error deleting contact:", error);
        toast.error("Failed to delete contact");
      });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 30 },
    { field: "first", headerName: "First Name", width: 160 },
    { field: "last", headerName: "Last Name", width: 120, sortable: false },
    { field: "email", headerName: "E-Mail", width: 170, sortable: false },
    { field: "company", headerName: "Company", width: 120 },
    { field: "job", headerName: "Job Title", width: 90, sortable: false },
    {
      field: "del",
      headerName: "Delete",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Button
          color="error"
          onClick={() => setConfirmDelete(params.row.mongoId)} // Open confirmation dialog
        >
          Delete
        </Button>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <ToastContainer />
        <DialogTitle sx={{ backgroundColor: "#292a2c", color: "white" }}>
          Delete Contacts
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#292a2c", color: "white" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{ //CSS to beautify table
              boxShadow: "0px 0px 25px  black",
              border: 1,
              borderColor:"black",
              color: "#ffffff", 
              backgroundColor: "#1E1E2F", 
              '& .MuiDataGrid-cell': {
                color: "#E0E0E0",
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: "#333333", 
                color: "#333333", 
                borderBottom: "1px solid #444", 
              },
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: "#333333", 
                borderTop: "1px solid #444", 
              },
              '& .MuiTablePagination-root': {
                color: "#E0E0E0",
              },
              '& .MuiDataGrid-columnSeparator': {
                color: "#444", 
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: "#2A2A40", 
              },  
            }}
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#18141c" }}>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>
            Do you really want to delete this contact? 
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(null)}>Cancel</Button>
          <Button
            color="error"
            onClick={() => handleDeleteContact(confirmDelete)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ViewContactsDialog;
