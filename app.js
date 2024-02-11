const shoppingBasket = document.getElementById("shoppingBasket");
const shoppingBasketList = document.querySelector("#shoppingBasketList tbody");
const menuList = document.getElementById("menuList");
const total = document.querySelector("#total");
let menuShoppingBasket = [];

loadListener();

function loadListener() {
  menuList.addEventListener("click", addMenuShoppingBasket);
  document.addEventListener('DOMContentLoaded', () => {
    menuShoppingBasket = JSON.parse(localStorage.getItem('menuShoppingBasket')) || [];
  })
}

function addMenuShoppingBasket(e) {
  e.preventDefault();
  if (e.target.classList.contains("addShoppingBasket")) {
    const menuSelected = e.target.parentElement;
    readMenuToShoppingBasket(menuSelected);
  }
}

function readMenuToShoppingBasket(menuSelected) {
  const dataMenuSelected = {
    title: menuSelected.querySelector("h3").textContent,
    price: menuSelected.querySelector("h4").textContent,
    id: menuSelected.querySelector("a").getAttribute("data-id"),
    quantity: 1,
  };

  const exist = menuShoppingBasket.some(
    (menu) => menu.id === dataMenuSelected.id
  );
  if (exist) {
    const menuListShoppingBasketFiltered = menuShoppingBasket.map((menu) => {
      if (menu.id === dataMenuSelected.id) {
        menu.quantity++;
        return menu;
      } else {
        return menu;
      }
    });
    menuShoppingBasket = [...menuListShoppingBasketFiltered];
  } else {
    menuShoppingBasket = [...menuShoppingBasket, dataMenuSelected];
  }
  printMenuShoppingBasket();
}

function printMenuShoppingBasket() {
  clearContainerShoppingBasket();
  menuShoppingBasket.forEach((menu) => {
    let { quantity, title, price } = menu;
    
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${quantity}</td>
        <td>${title}</td>
        <td><strong>${price}</strong></td>
        <td><a href='#' class='deleteMenu' id='deleteMenu' data-id='${menu.id}'> X </a></td>
        `;
    shoppingBasketList.appendChild(row);
  });
  let priceTotal = menuShoppingBasket.reduce((acumulador, actual) => acumulador + (+actual.price.slice(1) * actual.quantity), 0);
  total.innerHTML = `Total: $ ${priceTotal}` ;
  menuShoppingBasketList();
}

function clearContainerShoppingBasket() {
  shoppingBasketList.innerHTML = "";
}

document.querySelector("#shoppingBasketList").addEventListener("click", (event) => {
    const id = event.target.getAttribute("data-id");
    const newShoppingBasket = menuShoppingBasket.filter(
        (menu) => menu.id !== id
      );
      menuShoppingBasket = [...newShoppingBasket];
    printMenuShoppingBasket();
});

function menuShoppingBasketList(){
  localStorage.setItem("menuShoppingBasket", JSON.stringify(menuShoppingBasket));
}