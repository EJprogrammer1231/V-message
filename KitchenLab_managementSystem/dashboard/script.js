// Inventory queue (using array)
    let inventory = [];

    // Get references to input fields and buttons
    const itemNameInput = document.getElementById('item-name');
    const quantityInput = document.getElementById('quantity');
    const statusSelect = document.getElementById('cars');
    const saveBtn = document.querySelector('.button-1:nth-child(1)');
    const updateBtn = document.querySelector('.button-1:nth-child(2)');
    const clearBtn = document.querySelector('.button-1:nth-child(3)');
    const itemColumns = document.querySelectorAll('section > section > section > div');

    let selectedIndex = null; // track selected item for update

    // Function to render inventory in the table
    function renderInventory() {
        // Clear existing table display
        itemColumns.forEach(col => col.innerHTML = '');

        inventory.forEach((item, index) => {
            const nameDiv = document.createElement('div');
            nameDiv.textContent = item.name;
            nameDiv.style.cssText = 'border: solid 1px gray; margin: 10px; padding: 5px; height: 20px;';
            itemColumns[0].appendChild(nameDiv);

            const quantityDiv = document.createElement('div');
            quantityDiv.textContent = item.quantity;
            quantityDiv.style.cssText = 'border: solid 1px gray; margin: 10px; padding: 5px; height: 20px;';
            itemColumns[1].appendChild(quantityDiv);

            const statusDiv = document.createElement('div');
            statusDiv.textContent = item.status;
            statusDiv.style.cssText = 'border: solid 1px gray; margin: 10px; padding: 5px; height: 20px;';
            itemColumns[2].appendChild(statusDiv);

            const actionDiv = document.createElement('div');
            actionDiv.style.cssText = 'border: solid 1px gray; margin: 10px; padding: 5px;';
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.style.cssText = 'height: 20px; background-color: red; color: white; border-radius: 8px; border: none; margin-right: 10px';
            deleteBtn.onclick = () => {
                inventory.splice(index, 1);
                renderInventory();
            };

            const updateBtn = document.createElement('button');
            updateBtn.textContent = 'Update';
            updateBtn.style.cssText = 'height: 20px; background-color: green; color: white; border-radius: 8px; border: none;';
            updateBtn.onclick = () => {
                itemNameInput.value = item.name;
                quantityInput.value = item.quantity;
                statusSelect.value = item.status;
                selectedIndex = index;
            };

            actionDiv.appendChild(deleteBtn);
            actionDiv.appendChild(updateBtn);
            itemColumns[3].appendChild(actionDiv);
        });
    }

    // Save button
    saveBtn.addEventListener('click', () => {
        const name = itemNameInput.value.trim();
        const quantity = quantityInput.value.trim();
        const status = statusSelect.value;

        if (!name || !quantity || !status) {
            alert('Please fill all fields!');
            return;
        }

        // Add to inventory queue
        inventory.push({ name, quantity, status });
        renderInventory();

        // Clear inputs
        itemNameInput.value = '';
        quantityInput.value = '';
        statusSelect.value = '';
    });

    // Update button
    updateBtn.addEventListener('click', () => {
        if (selectedIndex === null) return alert('Select an item to update!');

        const name = itemNameInput.value.trim();
        const quantity = quantityInput.value.trim();
        const status = statusSelect.value;

        if (!name || !quantity || !status) {
            alert('Please fill all fields!');
            return;
        }

        inventory[selectedIndex] = { name, quantity, status };
        selectedIndex = null;
        renderInventory();

        itemNameInput.value = '';
        quantityInput.value = '';
        statusSelect.value = '';
    });

    // Clear button
    clearBtn.addEventListener('click', () => {
        itemNameInput.value = '';
        quantityInput.value = '';
        statusSelect.value = '';
        selectedIndex = null;
    });