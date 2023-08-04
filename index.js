import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingList = ref(database, "shoppingList");

const addItemInputEl = document.querySelector("#add-item-input");
const addItemFormEl = document.querySelector("#add-item-form");
const itemsEl = document.querySelector("#items");

addItemFormEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const { value } = addItemInputEl;
  addItemInputEl.value = "";
  push(shoppingList, value);
});

onValue(shoppingList, (snapshot) => {
  if (snapshot.exists()) {
    const remoteShoppingList = Object.entries(snapshot.val());

    itemsEl.innerHTML = "";

    remoteShoppingList.forEach(([id, value]) => createItem(id, value));
  }
});

function createItem(id, value) {
  const newItem = document.createElement("li");
  newItem.textContent = value;
  newItem.addEventListener("dblclick", () => {
    const refToDelete = ref(database, `shoppingList/${id}`);

    remove(refToDelete);
  });

  itemsEl.append(newItem);
}
