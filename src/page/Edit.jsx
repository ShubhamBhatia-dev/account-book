import React, { useState, useContext, useEffect } from "react";
import Select from "react-select";
import dayjs from 'dayjs';
import { useNavigate, useParams } from "react-router-dom";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AppContext } from "../App";

export default function EditPage() {
    const param = useParams();
    const navigate = useNavigate();
    const { entries, updateEntry } = useContext(AppContext);

    const [title, setTitle] = useState("");
    const [date, setDate] = useState(dayjs(new Date().toISOString().split("T")[0]));
    const [total_price, setPrice] = useState(0);
    const [type, setType] = useState({ value: "credit", label: "Credit" });

    // Use Effect to fetch the entry by id
    useEffect(() => {
        const toupdate = entries.filter(entry => entry._id === parseInt(param.id));
        const et = toupdate[0];
        console.log(toupdate);
        setTitle(et.title);
        setDate(dayjs(et.date));
        setPrice(parseInt(et.total_price));
        setType({ value: et.type, label: et.type.charAt(0).toUpperCase() + et.type.slice(1) });
    }, [entries, param.id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Create an updated entry object
        const updatedEntry = { title, date: date.format('YYYY-MM-DD'), total_price: Number(total_price), type: type.value };
        
        // Update entry in the context/database
        updateEntry(param.id, updatedEntry);

        // Reset form
        setTitle("");
        setDate(dayjs(new Date().toISOString().split("T")[0]));
        setPrice(0);
        setType({ value: "credit", label: "Credit" });
        
        // Navigate to home page
        navigate("/");
    };

    const typeOptions = [
        { value: "credit", label: "Credit" },
        { value: "debit", label: "Debit" },
        { value: "udhar", label: "Udhar" }
    ];

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Customer Name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <br />
                <br />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                        <DatePicker
                            label="Select Date"
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                        />
                    </DemoContainer>
                </LocalizationProvider>
                <br />
                <input
                    type="number"
                    placeholder="Amount"
                    value={total_price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <br />
                <br />
                <Select
                    value={type}
                    onChange={(selectedOption) => setType(selectedOption)}
                    options={typeOptions}
                    required
                />
                <br />
                <button type="submit">Update Entry</button>
                <button onClick={() => navigate("/")}>Cancel</button>
            </form>
        </div>
    );
}
