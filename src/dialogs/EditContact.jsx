import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import UpdateContact from "../dialogs/UpdateContact";

function EditContact({ open, onClose }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  // Fetch contacts from MongoDB
  useEffect(() => {
    if (open) {
      setLoading(true);
      fetch("http://localhost:5000/contacts")
        .then((res) => res.json())
        .then((data) => {
          const formattedRows = data.map((contact, index) => ({
            id: index + 1, 
            mongoId: contact._id, // MongoDB ID for later updating in UpdateContact.jsx 
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

  // Handle editing contact
  const handleEditContact = (mongoId) => {
    fetch(`http://localhost:5000/contacts/${mongoId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch contact: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Contact Data Fetched:", data);
        setSelectedContact(data);
        setOpenUpdateDialog(true);
      })
      .catch((error) => {
       // console.error("Error fetching contact for update:", error);
      });
  };

  // Close the UpdateContactDialog
  const handleUpdateDialogClose = () => {
    setOpenUpdateDialog(false);
    setSelectedContact(null);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 30 },
    { field: "first", headerName: "First Name", width: 160 },
    { field: "last", headerName: "Last Name", width: 120, sortable: false },
    { field: "email", headerName: "E-Mail", width: 170, sortable: false },
    { field: "company", headerName: "Company", width: 120 },
    { field: "job", headerName: "Job Title", width: 90, sortable: false },
    {
      field: "edit",
      headerName: "Edit",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Button
          color="success"
          onClick={() => handleEditContact(params.row.mongoId)}
        >
          EDIT
        </Button>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle
          sx={{
            backgroundColor: "#292a2c",
            color: "white",
          }}
        >
          View Contacts
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "#292a2c",
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
            backgroundColor: "#18141c",
          }}
        >
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>

      
      {selectedContact && (
        <UpdateContact
          open={openUpdateDialog}
          onClose={handleUpdateDialogClose}
          contact={selectedContact}
        />
      )}
    </>
  );
}

export default EditContact;
