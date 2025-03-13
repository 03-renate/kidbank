// import "./style.css";
// import javascriptLogo from "./javascript.svg";
// import viteLogo from "/vite.svg";
// import { setupCounter } from "../counter.js";

// document.querySelector("#app").innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `;

// setupCounter(document.querySelector("#counter"));

// Footer

function showMember(name, role, github) {
  document.getElementById("memberName").innerText = name;
  document.getElementById("memberRole").innerText = role;
  document.getElementById("memberGithub").href = github;
  document.getElementById("memberGithub").innerText = `GitHub: ${github}`;
  document.getElementById("pop-up-member").style.display = "block";
}

document.querySelector("#close-btn").onclick = function () {
  document.getElementById("pop-up-member").style.display = "none";
};

window.onclick = function (event) {
  if (event.target == document.getElementById("pop-up-member")) {
    document.getElementById("pop-up-member").style.display = "none";
  }
};
