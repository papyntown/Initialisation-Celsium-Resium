import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";

// Le token Cesium pour avoir accès a la planete etc ...
import * as Cesium from "cesium";
Cesium.Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmZDE1MWZkNy03ODA2LTQ1ZGUtYTU0Ny0wODk4YjJmNjRlNjgiLCJpZCI6MTM2MDM2LCJpYXQiOjE2ODI2Nzg0MTJ9.iHoaBQzYta71j7qcvnIAMkqQBowphzGGGnntMlqiCwI";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
