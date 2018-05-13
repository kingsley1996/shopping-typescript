"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cart_item_1 = require("./cart-item");
const helpers_1 = require("./libs/helpers");
class Cart {
    constructor() {
        this.cartItems = [];
        this.totalQuantity = 0;
        this.totalPrice = 0;
    }
    addProduct(product, quantity = 1) {
        let position = this.getProductPosition(product);
        if (position > -1) {
            this.cartItems[position].quantity += quantity;
        }
        else {
            this.cartItems[this.cartItems.length] = new cart_item_1.CartItem(product, quantity);
        }
        this.totalQuantity += quantity;
        this.totalPrice += product.price * quantity;
    }
    //Kiểm tra sản phẩm đã có trong giỏ hàng hay chưa
    getProductPosition(product) {
        let total = this.cartItems.length;
        for (let i = 0; i < total; i++) {
            if (this.cartItems[i].product.id == product.id)
                return i;
        }
        return -1;
    }
    updateProduct(product, quantity = 1) {
        let position = this.getProductPosition(product);
        if (position > -1) {
            this.totalQuantity = this.totalQuantity - this.cartItems[position].quantity + quantity;
            this.totalPrice = this.totalPrice - product.price * (this.cartItems[position].quantity - quantity);
            this.cartItems[position].quantity = quantity;
        }
    }
    removeProduct(product) {
        let position = this.getProductPosition(product);
        if (position > -1) {
            this.totalQuantity = this.totalQuantity - this.cartItems[position].quantity;
            this.totalPrice = this.totalPrice - product.price * this.cartItems[position].quantity;
            //xóa 1 phần tử ra khỏi mảng
            this.cartItems.splice(position, 1);
        }
    }
    isEmpty() {
        return (this.cartItems.length == 0);
    }
    // public getTotalQuantity() : number {
    // 	let total : number = 0;
    // 	this.cartItems.forEach((cartItem : CartItem) => {
    // 		total += cartItem.quantity;
    // 	});
    // 	return total;
    // }
    // public getTotalPrice() : number {
    // 	let total : number = 0;
    // 	this.cartItems.forEach((cartItem : CartItem) => {
    // 		total += cartItem.quantity * cartItem.product.price;
    // 	});
    // 	return total;
    // }
    showCartBodyHTML() {
        let xhtmlResult = ``;
        if (!this.isEmpty()) {
            let total = this.cartItems.length;
            for (let i = 0; i < total; i++) {
                let cartItemCurrent = this.cartItems[i];
                xhtmlResult += cartItemCurrent.showCartItemsInHTML(i + 1);
            }
        }
        return xhtmlResult;
    }
    showCartFooterHTML() {
        let xhtmlResult = `<th colspan='6' class='empty-cart text-center'>Empty Cart !!!</th>`;
        if (!this.isEmpty()) {
            xhtmlResult = ` <tr class="total">
								<td colspan="4">There are <b>${this.totalQuantity}</b> items in your shopping cart.</td>
								<td colspan="2" class="total-price text-left"> ${helpers_1.Helpers.toCurrency(this.totalPrice, "USD", "right")}</td>
							</tr>`;
        }
        return xhtmlResult;
    }
}
exports.Cart = Cart;
