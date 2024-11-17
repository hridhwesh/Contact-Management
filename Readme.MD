
# Contact Management - Mini Feature of a CRM

This is my work on the assignment provided by Erino, to build a CONTACT MANAGEMENT website made with MERN stack. This website  lets users to create, view, update, and delete contacts. Each contact includes a first name, last name, email, phone numbers, company, and job title, out of which the first name, and email are required fields.

## Features of this project
1. Create new contact
2. View contact details
3. Update contact information
4. Delete contact information
5. Search/Filter contact information
6. Pleasant responsive UI

To run this on your local pc:

## Prerequisites: 
1. Node.JS, npm must be installed.
2. A MongoDB cluster made using MongoDB Atlas.

## Setup Instructions:

1. Fork and Clone this repository .
2. In the folder of this project, install the required dependencies:
```npm install```
3. Configure an .env variable. Create .env file in the server and save your MONGO_URI in it from the Atlas website. It should look something like this:
```
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/databaseName?retryWrites=true&w=majority
```
4. Start the backend
```
cd server
nodemon index.js
```
5. Start the frontend
```
npm start
```

6. Use the functionalities

# No need to set up a schema for this project! 
Just run the backend code and you're good to go!

## Technical Decisions
1. I chose Mongo DB as te database because it is a flexible, NoSQL document database that is well-suited for handling unstructured or semi-structured data since it has no schema enforcement, and has flexibility and scalable potential.
2. Used toastify for alerts.
3. Used Material UI at every section as it was asked in the assignment.
4. Used Dialog- like approach for seamless user experience.
5. Used pleasant theme on the homepage and dark theme / mode on the dialogs.

## API Endpoints

`POST /contacts`: Accepts a new contact entry from the frontend and stores it in the database.
`GET /contacts`: Retrieves all contact entries to populate the table.
`PUT /contacts/:id`: Updates a specific contact’s information.
`DELETE /contacts/:id`: Deletes a contact from the database.
