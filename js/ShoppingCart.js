
const calculator = new Calculator();

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        const existingItem = this.items.find(i => 
            i.product === item.product
        );
        
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            this.items.push({
                ...item,
                quantity: 1
            });
        }
    }

    removeItem(item) {
        const index = this.items.findIndex(i => 
            i.product === item.product
        );
        
        if (index !== -1) {
            if (this.items[index].quantity > 1) {
                this.items[index].quantity--;
            } else {
                this.items.splice(index, 1);
            }
            updateCartUI();
        }
    }

    getItems() {
        return this.items;
    }
}