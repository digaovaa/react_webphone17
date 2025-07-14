import React, { useState } from "react";

import "./App.css";

import { WebPhoneProvider } from "./contexts/Webphone";
import { Webphone } from "./pages/Webphone";
import { defaultConfig } from "./data/config";

function App() {
  const [wavoip, setWavoip] = useState([
    // {
    //   name: "Wavoip",
    //   token: "xxxxxxxx",
    //   canAcceptCall: false
    // },
    // {
    //   name: "Wavoip",
    //   token: "xxxxxxx",
    //   canAcceptCall: true
    // },
    // {
    //   name: "Wavoip",
    //   token: "xxxxxxxxx",
    //   canAcceptCall: true
    // },
  ]);

  return (
    <WebPhoneProvider defaultConfig={defaultConfig} channels={wavoip}>
      <Webphone />
    </WebPhoneProvider>
  );
}

export default App;
