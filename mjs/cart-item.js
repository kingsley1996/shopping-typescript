"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./libs/helpers");
class CartItem {
    constructor(product, quantity = 1) {
        this._product = product;
        this._quantity = quantity;
    }
    showCartItemsInHTML(index) {
        return `
				<tr>
					<th scope="row">${index}</th>
					<td>${this.product.name}</td>
					<td>${helpers_1.Helpers.toCurrency(this.product.price, "$", "left")}</td>
					<td><input type="number" name="cart-item-quantity-${this.product.id}" value="${this.quantity}" min="1"></td>
					<td><strong>${helpers_1.Helpers.toCurrency(this.getSubtotal(), "$", "left")}</strong></td>
					<td>
						<a href="#" class="update-cart-item label label-info" data-product="${this.product.id}" onclick ="return false">Update</a>
						<a href="#" class="delete-cart-item label label-danger" data-product="${this.product.id}" onclick ="return false">Delete</a>
					</td>
				</tr>`;
    }
    getSubtotal() {
        return this.product.price * this.quantity;
    }
    get product() {
        return this._product;
    }
    set product(v) {
        this._product = v;
    }
    get quantity() {
        return this._quantity;
    }
    set quantity(v) {
        this._quantity = v;
    }
}
exports.CartItem = CartItem;
