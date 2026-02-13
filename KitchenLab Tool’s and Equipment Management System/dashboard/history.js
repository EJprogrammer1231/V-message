    const history = JSON.parse(localStorage.getItem("inventoryHistory")) || [];

    const colName = document.getElementById("col-name");
    const colItem = document.getElementById("col-item");
    const colQuantity = document.getElementById("col-quantity");
    const colAvailable = document.getElementById("col-available");

    if (history.length === 0) {
      colName.innerHTML = "";
      colItem.innerHTML = "";
      colQuantity.innerHTML = "";
      colAvailable.innerHTML = "";
    } else {
      history.forEach(entry => {
        colName.innerHTML += `<div>${entry.name}</div>`;
        colItem.innerHTML += `<div>${entry.item}</div>`;
        colQuantity.innerHTML += `<div>${entry.quantity}</div>`;
        colAvailable.innerHTML += `<div>${entry.available}</div>`;
      });
    }