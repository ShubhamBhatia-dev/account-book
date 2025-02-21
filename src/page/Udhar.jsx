import { useLocation } from "react-router-dom";
import BillComp from "../components/billcover";

const Udhar = () => {
  const location = useLocation();
  const { udhar } = location.state || {}; // Safely access the passed state

  return (
    <div>
      <h1>Udhar Page</h1>
      {udhar ? (
        <ul>
          {udhar.map((entry, index) => (
            <BillComp
            key={entry._id}
            title={entry.title}
            date={entry.date}
            total_price={entry.total_price}
            type={entry.type}
        />
          ))}
        </ul>
      ) : (
        <p>No Udhar data available.</p>
      )}
    </div>
  );
};

export default Udhar;
