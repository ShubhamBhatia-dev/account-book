import React, { useState ,useContext } from "react";
import LedgerForm from "./LedgerForm";
import BillComp from "../components/billcover";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
const Home = () => {
  
    const { db ,entries, addEntry , updateEntry, deleteEntry } = useContext(AppContext);
    const navigate = useNavigate();

    // Compute total credit and debit
    const totalCredit = entries
    .filter(entry => entry.type === "credit")
    .reduce((sum, entry) => sum + entry.total_price, 0);
    const totalDebit = entries
        .filter(entry => entry.type === "debit")
        .reduce((sum, entry) => sum + entry.total_price, 0);
    const totalUdhar =entries
    .filter(entry => entry.type === "udhar")
    .reduce((sum, entry) => sum + entry.total_price, 0);

    // Get today's bills
    const today = new Date().toISOString().split("T")[0];
    const todaysBills = entries.filter(entry => entry.date === today);




    // Function to Handle Udhar 

    const handleUdhar = async () => {
        try {
          const udhar = await db.find({ type: "udhar" }); // Await the asynchronous call
          navigate("/Udhar", { state: { udhar } }); // Pass `udhar` in `state`
        } catch (error) {
          console.error("Error fetching Udhar data:", error);
        }
      };
    return (
        <div>
            {/* Total Credit and Debit */}
            <div className="summary">
                <div className="v-a">
                    <div className="sum-a"><p>Total Credit: ₹{totalCredit}</p></div>
                    <div className="sum-b"><p>Total Debit: ₹{totalDebit}</p></div>
                </div>

                <div className="v-b">
                <div className="sum-c" onClick={handleUdhar}><p>Total Udhar: ₹{totalUdhar}</p></div>
                 {/* Add New Button */}
           
                <button className="btn-add" onClick={() => navigate("/AddNew")}>Add New</button>
        
                </div>
                
            </div>

           

            {/* Today's Bills */}
        

                <div className="bills">
                    <div className="toaster">
                        <div className="toast-a">
                        <h2>Today's Bills</h2>
                        </div>
                        <div className="toast-b">
                            <button className="button-85">Today's Report</button>
                        </div>
                   

                    </div>
                    {todaysBills.length > 0 ? (
                        <div className="bill-div">
                            
                            {todaysBills.map((entry,index) => (
                                
                                <BillComp
                                    key={index}
                                    id = {entry._id}
                                    title={entry.title}
                                    date={entry.date}
                                    total_price={entry.total_price}
                                    type={entry.type}
                                />
                                
                            ))}
                            <br />
                        </div>
                    ) : (
                        <p>No bills for today.</p>
                    )}
                </div>
            
        </div>
    );
};

export default Home;
