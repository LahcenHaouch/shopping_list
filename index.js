const addItemFormEl = document.querySelector("#add-item-form");
const itemsEl = document.querySelector("#items");

addItemFormEl.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("clicked");
});
