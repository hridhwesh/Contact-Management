import React, { useState } from "react";
import {Typewriter} from 'react-simple-typewriter';

import { 
  CssBaseline,
  Typography,
  Box,
  Button, 
  Stack , 
  styled ,  
   } from "@mui/material";
import AddContactDialog from "./dialogs/AddContact";
import ViewContactsDialog from "./dialogs/ViewContact";
import EditContactDialog from "./dialogs/EditContact";
import DeleteAContact from "./dialogs/DeleteContact";


const ColorButton = styled(Button)(() => ({
  
  backgroundColor: "#abb4fb",
  '&:hover': {
    backgroundColor:"#5c6cfc" ,
  },
}));

function App() {
  
  const [openDialog, setOpenDialog] = useState(null);
  const handleClickOpen = (dialog) => {
    setOpenDialog(dialog);
  };
  const handleClose = () => {
    setOpenDialog(null);
  };
  return (
    <>
    <CssBaseline />
    <Box
  sx={{
    backgroundImage: `url(https://cdn.prod.website-files.com/5a9ee6416e90d20001b20038/64c21faa0b43fb0bc6364a19_-24.png)`,
    backgroundSize: "cover",
    minHeight: "100vh",
    minWidth: "80vw", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
  }}
>
  <Box
    sx={{
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      flexDirection: "column",
    }}
  >
    <Typography
      variant="h1"
      sx={{
        fontSize: {
        xs: "36px", 
        sm: "48px", 
        md: "72px", },
        textAlign: "center", 
        marginBottom:"20px",
        marginTop:{
        xs:"-90px",  
        md:"-60px"},
        color: "#333333",
      }}
    > 
       <Typewriter
            words={['Your Contacts, Simplified.']}
            loop={1}
            cursor={false}
            typeSpeed={100} 
            delaySpeed={1000}
          />
    </Typography>
    <Box
      sx={{
        backgroundColor: "#d8b6ff",
        minHeight: "500px",
        minWidth: "300px",
        borderRadius: "16px", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px", 
        flexDirection: "column", 
        textAlign: "center", 
        boxShadow: "15px 15px 10px 5px white",
      }}
    >

  <Typography
    variant="h4"
    sx={{
      marginBottom: "24px",
      fontWeight: "bold",
      color: "#333", 
    }}
  >
    Get Started
  </Typography>

      <Stack spacing={2} direction="column"
      >
      <ColorButton
      variant="contained"
      sx={{
        color: "black",
        padding: "12px 24px",
        fontSize: "16px",
        borderRadius: "8px", 
        "&:hover": {
          backgroundColor: "#5c6cfc", 
        },
      }}
      onClick={()=>handleClickOpen("addContact")}
    >
      Add New Contact
    </ColorButton>
    <ColorButton
      variant="contained"
      sx={{
        color: "black",
        padding: "12px 24px",
        fontSize: "16px",
        borderRadius: "8px",
        "&:hover": {
          backgroundColor: "#5c6cfc",
        },
      }}
      onClick={() => handleClickOpen("viewContacts")}
    >
      View Contacts
    </ColorButton>
    <ColorButton
      variant="contained"
      sx={{
        color: "black",
        padding: "12px 24px",
        fontSize: "16px",
        borderRadius: "8px",
        "&:hover": {
          backgroundColor: "#5c6cfc",
        },
      }}
      onClick={() => handleClickOpen("editContact")}
    >
      Edit Contact Information
    </ColorButton>
    <ColorButton
      variant="contained"
      sx={{
        color: "black",
        padding: "12px 24px",
        fontSize: "16px",
        borderRadius: "8px",
        "&:hover": {
          backgroundColor: "#5c6cfc",
        },
      }}
      onClick={() => handleClickOpen("deleteContact")}
    >
      Delete A Contact
    </ColorButton>
      </Stack>
    </Box>
  </Box>
</Box>
    <AddContactDialog open={openDialog === "addContact"} onClose={handleClose} />
    <ViewContactsDialog open={openDialog === "viewContacts"} onClose={handleClose} />
    <EditContactDialog open={openDialog === "editContact"} onClose={handleClose} />
    <DeleteAContact open={openDialog === "deleteContact"} onClose={handleClose} />
      
      
</>
  );
}

export default App;
