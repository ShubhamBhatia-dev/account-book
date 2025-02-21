import React, { useState , useContext} from "react";
import Select from "react-select";
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AppContext } from "../App";
const LedgerForm = () => {
    const { db ,entries, addEntry , updateEntry, deleteEntry } = useContext(AppContext);

    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(dayjs(new Date().toISOString().split("T")[0]));
    const [total_price, setPrice] = useState(0);
    const [type, setType] = useState({ value: "credit", label: "Credit" });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Add new entry
        const good = { title, date:date.format('YYYY-MM-DD'), total_price: Number(total_price), type: type.value };
        addEntry(good);

        // Reset form
        setTitle("");
        setDate(dayjs(new Date().toISOString().split("T")[0]));
        setPrice(0);
        setType({ value: "credit", label: "Credit" });
        navigate("/")
    };

    // Options for the type selection
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
                <button type="submit">Add Entry</button>
            </form>
        </div>
    );
};

export default LedgerForm;
