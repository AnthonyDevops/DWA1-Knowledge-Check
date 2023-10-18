// scripts.js

const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);

if (isNaN(dividend) || isNaN(divider) || divider == "") {
    result.innerText = "Division not performed. Both values are required in inputs. Try Again";
}
if(isNaN(divider) || parseFloat(divider) < 0){ 
result.innerText = "Division not performed. Invalid number provided. Try again";
  }
  if (isNaN(dividend) || isNaN(divider)) {
    alert("Something critical went wrong. Please reload the page.");
  } else {
result.innerText = parseInt(dividend / divider);
  }
});

