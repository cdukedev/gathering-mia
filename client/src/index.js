import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { FoodBankProvider } from "./contexts/FoodBankContext";
import { CommunityGardenProvider } from "./contexts/CommunityGardenContext";
import { RecipientProvider } from "./contexts/RecipientContext";
import { GeolocationProvider } from "./contexts/GeolocationContext";
import { MapPageProvider } from "./contexts/MapPageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
