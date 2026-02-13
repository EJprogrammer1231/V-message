document.addEventListener("DOMContentLoaded", function() {
  const nameInput = document.getElementById("fname");
  const courseInput = document.getElementById("Cname");
  const yearInput = document.getElementById("Yname");

  const buttons = document.querySelectorAll("button");
  const saveBtn = buttons[0];
  const deleteBtn = buttons[1];
  const updateBtn = buttons[2];
  const deleteFirstBtn = buttons[3];

  const table = document.querySelector("table");
  let selectedRow = null;

  // Function to clear inputs
  function clearInputs() {
    nameInput.value = "";
    courseInput.value = "";
    yearInput.value = "";
  }

  // Function to add data to table
  saveBtn.addEventListener("click", function() {
    const name = nameInput.value.trim();
    const course = courseInput.value.trim();
    const year = yearInput.value.trim();

    if (!name || !course || !year) {
      alert("Please fill in all fields before saving.");
      return;
    }

    // Create new row
    const newRow = table.insertRow(-1);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);

    cell1.textContent = name;
    cell2.textContent = course;
    cell3.textContent = year;

    newRow.addEventListener("click", () => selectRow(newRow));

    clearInputs();
  });

  // Select a row for update/delete
  function selectRow(row) {
    if (selectedRow) selectedRow.style.backgroundColor = "";
    selectedRow = row;
    row.style.backgroundColor = "lightgray";

    nameInput.value = row.cells[0].textContent;
    courseInput.value = row.cells[1].textContent;
    yearInput.value = row.cells[2].textContent;
  }

  // Delete selected row
  deleteBtn.addEventListener("click", function() {
    if (!selectedRow) {
      alert("Please select a row to delete.");
      return;
    }
    selectedRow.remove();
    selectedRow = null;
    clearInputs();
  });

  // Update selected row
  updateBtn.addEventListener("click", function() {
    if (!selectedRow) {
      alert("Please select a row to update.");
      return;
    }

    selectedRow.cells[0].textContent = nameInput.value;
    selectedRow.cells[1].textContent = courseInput.value;
    selectedRow.cells[2].textContent = yearInput.value;

    selectedRow.style.backgroundColor = "";
    selectedRow = null;
    clearInputs();
  });

  // Delete first data row (not header)
  deleteFirstBtn.addEventListener("click", function() {
    if (table.rows.length > 1) {
      table.deleteRow(1);
    } else {
      alert("No data rows to delete.");
    }
  });

  // Make existing rows selectable
  for (let i = 1; i < table.rows.length; i++) {
    table.rows[i].addEventListener("click", () => selectRow(table.rows[i]));
  }
});
