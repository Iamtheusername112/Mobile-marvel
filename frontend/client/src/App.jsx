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
      .get("https://mobile-marvel.onrender.com/phones")
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
        .get(`https://mobile-marvel.onrender.com/phones/${phoneId}`)
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
    // Replace the following URL with the actual URL where your images are hosted.
    const baseUrl = "https://mobile-marvel.onrender.com"; // Update this URL
    return `${baseUrl}/assets/images/${imageFileName}`;
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-3xl font-semibold mb-4 text-center">Phone Catalog</h1>
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 p-4 border-r border-gray-300">
            <h2 className="text-xl font-semibold mb-2">Phone Models</h2>
            <ul>
              {phones.map((phone) => (
                <li
                  key={phone.id}
                  onClick={() => handlePhoneSelect(phone.id)}
                  className="cursor-pointer hover:text-blue-600 mb-2"
                >
                  {phone.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-3/4 p-4">
            <h2 className="text-xl font-semibold mb-2">Phone Details</h2>
            {isPhoneDetailsLoading ? (
              <div className="animate-spin h-16 w-16 md:h-32 md:w-32 mx-auto border-t-2 md:border-t-4 border-blue-500 rounded-full"></div>
            ) : selectedPhone ? (
              <>
                <img
                  src={getImageUrl(selectedPhone.imageFileName)}
                  alt={selectedPhone.name}
                  className="max-w-full h-auto mb-4 rounded-lg shadow-lg mx-auto"
                />
                <p className="text-lg font-semibold">{selectedPhone.name}</p>
                <p>Brand: {selectedPhone.manufacturer}</p>
                <p>Price: ${selectedPhone.price}</p>
                <p>Processor: {selectedPhone.processor}</p>
                <p>Screen: {selectedPhone.screen}</p>
                <p>RAM: {selectedPhone.ram} GB</p>
              </>
            ) : (
              <p className="text-center">Select a phone to view details</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
