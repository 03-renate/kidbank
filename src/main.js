import "./src/style.css";
import { setupCounter } from "./counter.js";

const containerEl = document.getElementById("recent-transactions").innerHTML;

setupCounter(document.querySelector("#counter"));
