// Inventory Management Functionality

class Inventory {
    constructor() {
        this.items = {};
    }

    addItem(name, quantity) {
        if (this.items[name]) {
            this.items[name] += quantity;
        } else {
            this.items[name] = quantity;
        }
        console.log(`Added ${quantity} of ${name}.`);
    }

    removeItem(name, quantity) {
        if (this.items[name]) {
            this.items[name] -= quantity;
            if (this.items[name] <= 0) {
                delete this.items[name];
            }
            console.log(`Removed ${quantity} of ${name}.`);
        } else {
            console.log(`Item ${name} not found.`);
        }
    }

    getInventory() {
        return this.items;
    }

    clearInventory() {
        this.items = {};
        console.log(`Inventory cleared.`);
    }
}

// Example usage:
const inventory = new Inventory();
inventory.addItem('Apples', 10);
inventory.removeItem('Apples', 5);
console.log(inventory.getInventory());

