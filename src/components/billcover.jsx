import React from 'react'
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone"
import { useNavigate } from 'react-router-dom';

function BillComp({ id ,title, date, total_price ,type }) {
       const navigate = useNavigate();
     
        return (
            <div className="container">
                <div className="par1">
                    <div className="details">
                        <div className="text-cont">
                            <h5 id="h5">Bill To:{id} {title}</h5>
                        </div>
                    </div>
                    <div className="date">
                        <div className="date-cont">
                            <h6>{date}</h6>
                        </div>
                        <div  className="price">
                            <h6 className={type}>₹ {total_price}</h6>
                        </div>
                        <div className="price">
                            <h6>{type}</h6>
                        </div>
                    </div>
                </div>
                <div className="par2">
                    <button id="btn" onClick={()=> navigate(`/Edit/${id}`)}>
                        <ModeEditOutlineTwoToneIcon />
                    </button>
                </div>
            </div>
        );
    }
    
export default BillComp;