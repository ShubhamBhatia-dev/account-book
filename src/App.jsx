import React, { useState, createContext ,useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Udhar from "./page/Udhar";
import Bolt from "bolt-browser-db";
import { AddNew } from "./page/addNew";
import EditPage from "./page/Edit";

// Create a Context
export const AppContext = createContext();

const App = () => {
    // Bolt database instance
  const [db, setDb] = useState(null); 
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    // Initialize the Bolt database
    const initializeDB = async () => {
        const database = new Bolt("LedgerDB");
        setDb(database);

        // Load initial entries from the database
        const savedEntries = await database.find();
        setEntries(savedEntries);
    };

    initializeDB();
}, []);

  // Update Entry
  const updateEntry =async( id, updatedData) => {
    await db.update({ _id : parseInt(id)},updatedData);
    setEntries((prev) =>
      prev.map((entry) => (entry._id === parseInt(id) ?
        { ...entry, ...updatedData } : entry))
    );
  };

  // Delete Entry
  const deleteEntry = (id) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  // Add Entry
  const addEntry = async(newEntry) =>{
    if (db) {
        const id = await db.insertOne(newEntry); // Save to Bolt database
        const savedEntry = { ...newEntry, _id: id };
        setEntries((prevEntries) => [...prevEntries, savedEntry]); // Update state
    
  }}

  return (
    <AppContext.Provider value={{db,entries, addEntry, updateEntry, deleteEntry }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Udhar" element={<Udhar />} />
          <Route path="/AddNew" element={<AddNew />} />
          <Route path="/Edit/:id" element={<EditPage />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
