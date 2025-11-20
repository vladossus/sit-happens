document.addEventListener('DOMContentLoaded', function()
{
    Cart.init();
});
const Cart = {
    cart: [],

    init() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    },
    save() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    },
    clear() {
        this.cart = [];
        this.save();
    },
    addItem(product) {
        const existing = this.cart.find(item => item.id === product.id);
        if (existing) { existing.quantity += 1; } 
        else { this.cart.push({ ...product, quantity: 1 }); }
        this.save();
    },
    removeItem(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.save();
    },
    changeQuantity(productId, amount) {
        const item = this.cart.find(item => item.id === productId);
        if (!item) return;
        item.quantity += amount;
        if (item.quantity <= 0) { this.removeItem(productId); }
        else { this.save(); }
    },
    getCart() {
        return this.cart;
    },
    getTotalCount() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    }
};
function updateCartCounter()
{
    const totalCount = Cart.getTotalCount();
    const cartCounter = document.getElementById('cart-count');
    if (cartCounter) { cartCounter.textContent = totalCount; }
}
