import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AddContactDialog({ open, onClose }) {
  //setting default values as empty
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [company, setCompany] = useState(''); 
  const [jobTitle, setJobTitle] = useState('');

  const handleAddContact = (e) => {

    e.preventDefault();

    console.log("New Contact:", {
      firstName,
      lastName,
      email,
      phoneNumber,
      company,
      jobTitle,
    });

    const formData = {firstName,lastName,email,phoneNumber,company,jobTitle};
    //passing arguments using API
    fetch("http://localhost:5000/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged === true) {
            toast.success("Contact saved successfully!");
          }
          //resetting state to being empty
          setFirstName('');
          setLastName('');
          setEmail('');
          setPhoneNumber('');
          setCompany('');
          setJobTitle('');
        });
    
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
       <form onSubmit={handleAddContact}>
      <DialogTitle
        sx={{
          backgroundColor: "#292a2c",
          color: "white",         
        }}
      >
        New Contact
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: "#292a2c",
        }}
      >
        <TextField
          color="secondary"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          label="First Name"
          fullWidth
          margin="normal"
          variant="filled"
          required
          slotProps={{
            inputLabel: { style: { color: 'white' }  },
            input: { style: { color: 'white' } }
          }}
          sx={{
            backgroundColor: "#242424",
          }}
        />
        <TextField
          color="secondary"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          label="Last Name"
          fullWidth
          margin="normal"
          variant="filled"
          slotProps={{
            inputLabel: { style: { color: 'white' } },
            input: { style: { color: 'white' } }
          }}
          sx={{
            backgroundColor: "#242424",
          }}
        />
        <TextField
          type="email"
          color="secondary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          fullWidth
          margin="normal"
          variant="filled"
          required
          slotProps={{
            inputLabel: { style: { color: 'white' } },
            input: { style: { color: 'white' } }
          }}
          sx={{
            backgroundColor: "#242424",
          }}
        />
        <TextField
          type="number"
          color="secondary"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          label="Phone Number"
          fullWidth
          margin="normal"
          variant="filled"
          slotProps={{
            inputLabel: { style: { color: 'white' } },
            input: { style: { color: 'white' } }
          }}
          sx={{
            backgroundColor: "#242424",
            "& input[type='number']::-webkit-outer-spin-button, & input[type='number']::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            "& input[type='number']": {
              MozAppearance: "textfield",
            },
          }}
        />
        <TextField
          color="secondary"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          label="Company"
          fullWidth
          margin="normal"
          variant="filled"
          slotProps={{
            inputLabel: { style: { color: 'white' } },
            input: { style: { color: 'white' } }
          }}
          sx={{
            backgroundColor: "#242424",
          }}
        />
        <TextField
          color="secondary"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          label="Job Title"
          fullWidth
          margin="normal"
          variant="filled"
          slotProps={{
            inputLabel: { style: { color: 'white' } },
            input: { style: { color: 'white' } }
          }}
          sx={{
            backgroundColor: "#242424",
          }}
        />
      </DialogContent>
      <DialogActions
        sx={{
          backgroundColor: "#18141c",
        }}
      >
        <Button color="error" onClick={onClose}>Cancel</Button>
        <Button color="secondary" variant="contained" type="submit">
          Add Contact
        </Button>
        <ToastContainer />
      </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddContactDialog;
