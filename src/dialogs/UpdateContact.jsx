import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateContact({ open, onClose, contact }) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    company: "",
    jobtitle: "",
  });

  // Update form data when contact changes
  useEffect(() => {
    if (contact) {
      setFormData({
        firstname: contact.firstname || "",
        lastname: contact.lastname || "",
        email: contact.email || "",
        phonenumber: contact.phonenumber || "",
        company: contact.company || "",
        jobtitle: contact.jobtitle || "",
      });
    }
  }, [contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    //chaing part of the form data where it gets changed by the user
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //checking
    if (!formData.firstname || !formData.lastname || !formData.email) {
      toast.error("Please fill in all required fields.");
      return;
    }
      //PUTTING the updated contact on the DB
    fetch(`http://localhost:5000/contacts/${contact._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update contact");
        return res.json();
      })
      .then(() => {
        toast.success("Contact updated successfully!");
        setTimeout(onClose, 5000); 
      })
      .catch((error) => {
        console.error("Error updating contact:", error);
        toast.error("Failed to update contact.");
      });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle
          sx={{
            backgroundColor: "#292a2c",
            color: "white",
          }}
        >
          Update Contact
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "#292a2c",
          }}
        >
          <TextField
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            label="First Name"
            fullWidth
            margin="normal"
            variant="filled"
            required
            color="secondary"
            slotProps={{
              inputLabel: { style: { color: "white" } },
              input: { style: { color: "white" } },
            }}
            sx={{
              backgroundColor: "#242424",
            }}
          />
          <TextField
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            label="Last Name"
            fullWidth
            margin="normal"
            variant="filled"
            color="secondary"
            slotProps={{
              inputLabel: { style: { color: "white" } },
              input: { style: { color: "white" } },
            }}
            sx={{
              backgroundColor: "#242424",
            }}
          />
          <TextField
            name="email"
            value={formData.email}
            onChange={handleChange}
            label="Email"
            fullWidth
            margin="normal"
            variant="filled"
            required
            type="email"
            color="secondary"
            slotProps={{
              inputLabel: { style: { color: "white" } },
              input: { style: { color: "white" } },
            }}
            sx={{
              backgroundColor: "#242424",
            }}
          />
          <TextField
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
            label="Phone Number"
            fullWidth
            margin="normal"
            variant="filled"
            type="number"
            color="secondary"
            slotProps={{
              inputLabel: { style: { color: "white" } },
              input: { style: { color: "white" } },
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
            name="company"
            value={formData.company}
            onChange={handleChange}
            label="Company"
            fullWidth
            margin="normal"
            variant="filled"
            color="secondary"
            slotProps={{
              inputLabel: { style: { color: "white" } },
              input: { style: { color: "white" } },
            }}
            sx={{
              backgroundColor: "#242424",
            }}
          />
          <TextField
            name="jobtitle"
            value={formData.jobtitle}
            onChange={handleChange}
            label="Job Title"
            fullWidth
            margin="normal"
            variant="filled"
            color="secondary"
            slotProps={{
              inputLabel: { style: { color: "white" } },
              input: { style: { color: "white" } },
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
          <Button color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button color="secondary" variant="contained" type="submit">
            Update
          </Button>
          <ToastContainer />
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default UpdateContact;
