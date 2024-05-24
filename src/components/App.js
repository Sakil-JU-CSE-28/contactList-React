import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";

function App() {
  // Key used for storing contacts in localStorage
  const LOCAL_STORAGE_KEY = "contacts";

  // State to store the list of contacts, initialized from localStorage if available
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  );

  // Handler to add a new contact
  const addContactHandler = (contact) => {
    console.log(contact);
    // Add the new contact with a unique ID
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  // Handler to remove a contact by ID
  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    // Update the state with the new contact list
    setContacts(newContactList);
  };

  // Effect to save contacts to localStorage whenever contacts state changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      {/* Render the Header component */}
      <Header />
      {/* Render the AddContact component and pass addContactHandler as a prop */}
      <AddContact addContactHandler={addContactHandler} />
      {/* Render the ContactList component and pass contacts and removeContactHandler as props */}
      <ContactList contacts={contacts} getContactId={removeContactHandler} />
    </div>
  );
}

export default App;

