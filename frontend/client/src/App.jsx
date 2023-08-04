import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [phones, setPhones] = useState([]);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPhoneDetailsLoading, setIsPhoneDetailsLoading] = useState(false);

  // UseEffect
  useEffect(() => {
    axios
      .get("http://localhost:7000/phones")
      .then((res) => {
        setPhones(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("An error occurred trying to fetch data:", error);
        setIsLoading(false);
      });
  }, []);

  const handlePhoneSelect = (phoneId) => {
    setIsPhoneDetailsLoading(true); // Set loading status to true
    setSelectedPhone(null); // Clear selectedPhone while loading
    setTimeout(() => {
      axios
        .get(`http://localhost:7000/phones/${phoneId}`)
        .then((response) => {
          setSelectedPhone(response.data);
          setIsPhoneDetailsLoading(false); // Set loading status back to false
        })
        .catch((error) => {
          console.error("Error fetching phone details:", error);
          setIsPhoneDetailsLoading(false); // Set loading status back to false in case of error
        });
    }, 2000); // Show spinner for 2 seconds
  };

  // Function to generate the full image URL
  const getImageUrl = (imageFileName) => {
    return `/assets/images/${imageFileName}`;
  };

  return (
    <div className="App">
      <h1>Phone Catalog</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="phone-container">
          <div className="phone-list">
            <h2>Phone Models</h2>
            <ul>
              {phones.map((phone) => (
                <li key={phone.id} onClick={() => handlePhoneSelect(phone.id)}>
                  {phone.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="phone-details">
            <h2>Phone Details</h2>
            {isPhoneDetailsLoading ? (
              <div className="loading-spinner"></div>
            ) : selectedPhone ? (
              <>
                <img
                  src={getImageUrl(selectedPhone.imageFileName)}
                  alt={selectedPhone.name}
                />
                <p>Name: {selectedPhone.name}</p>
                <p>Brand: {selectedPhone.manufacturer}</p>
                <p>Price: {selectedPhone.price}</p>
                <p>Processor: {selectedPhone.processor}</p>
                <p>Screen: {selectedPhone.screen}</p>
                <p>RAM: {selectedPhone.ram}</p>
              </>
            ) : (
              <p>Select a phone to view details</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
