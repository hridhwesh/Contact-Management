import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function ViewContactsDialog({ open, onClose }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    //fetching all the contacts from MONGODB and outputing them in a datagrid format
    if (open) {
      fetch("http://localhost:5000/contacts")
        .then((res) => res.json())
        .then((data) => {
          const formattedRows = data.map((contact, index) => ({
            id: index + 1, //serial numbering
            first: contact.firstname,
            last: contact.lastname,
            email: contact.email,
            company: contact.company,
            job: contact.jobtitle,
          }));
          setRows(formattedRows);
          setLoading(false);
          toast.success("Data loaded successfully!");
        })
        .catch((error) => {
          console.error("Error fetching contacts:", error);
          setLoading(false);
        });
    }
  }, [open]);

  const columns = [
    { field: "id", headerName: "ID", width: 30 },
    { field: "first", headerName: "First Name", width: 160 },
    { field: "last", headerName: "Last Name", width: 120, sortable: false },
    { field: "email", headerName: "E-Mail", width: 220, sortable: false },
    { field: "company", headerName: "Company", width: 130 },
    { field: "job", headerName: "Job Title", width: 130, sortable: false },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <ToastContainer />
      <DialogTitle
        sx={{
          backgroundColor: "#444444",
          color: "white",
        }}
      >
        Your Contacts
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: "#444444",
          color: "white",
        }}
      >
  <DataGrid
  rows={rows}
  columns={columns}
  loading={loading}
  initialState={{ pagination: { paginationModel } }}
  pageSizeOptions={[5, 10]}
  sx={{ //CSS to beautify the datagrid
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
      <DialogActions
        sx={{
          backgroundColor: "#5b5b5b",
        }}
      >
        <Button color="error" variant="contained" onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}


export default ViewContactsDialog;