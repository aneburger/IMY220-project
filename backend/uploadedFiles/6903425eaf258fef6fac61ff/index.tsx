/* Ane' Burger 24565068, 33 */

import React from "react";
//import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import PokemonApp from "./PokemonApp";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container #root not found");
}
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <PokemonApp />
  </React.StrictMode>
);