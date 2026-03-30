import React from "react";
import ReactDOM from "react-dom/client";
import CalculatorPanel from "./components/CalculatorPanel";

function handleOpenRequestPage() {
  const target = "/kontakt";
  if (window.location.pathname !== target) {
    window.location.href = target;
    return;
  }
  window.location.hash = "anfrage";
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CalculatorPanel onOpenRequestPage={handleOpenRequestPage} />
  </React.StrictMode>
);
