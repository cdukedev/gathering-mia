// Importing the required libraries, components and styles
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Importing context providers
import { FoodBankProvider } from "./contexts/FoodBankContext";
import { CommunityGardenProvider } from "./contexts/CommunityGardenContext";
import { RecipientProvider } from "./contexts/RecipientContext";
import { GeolocationProvider } from "./contexts/GeolocationContext";
import { MapPageProvider } from "./contexts/MapPageContext";

// Getting root element to render the application
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app inside the context providers so that every component can access it
root.render(
  <FoodBankProvider>
    <CommunityGardenProvider>
      <RecipientProvider>
        <GeolocationProvider>
          <MapPageProvider>
            <App />
          </MapPageProvider>
        </GeolocationProvider>
      </RecipientProvider>
    </CommunityGardenProvider>
  </FoodBankProvider>
);

// Performance measuring function call.
// To measure performance please pass a function to log results or send to an analytics endpoint.
// More about this: https://bit.ly/CRA-vitals
reportWebVitals();
