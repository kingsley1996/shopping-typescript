import { Product } from "./product";
import {Helpers} from "./libs/helpers";
export class CartItem {
	private _product: Product;
	private _quantity: number;

	constructor(product: Product, quantity: number =1) {
		this._product = product;
		this._quantity = quantity;
	}

	public showCartItemsInHTML(index : number): string {
		return `
				<tr>
					<th scope="row">${index}</th>
					<td>${this.product.name}</td>
					<td>${Helpers.toCurrency(this.product.price, "$", "left")}</td>
					<td><input type="number" name="cart-item-quantity-${this.product.id}" value="${this.quantity}" min="1"></td>
					<td><strong>${Helpers.toCurrency(this.getSubtotal(), "$", "left")}</strong></td>
					<td>
						<a href="#" class="update-cart-item label label-info" data-product="${this.product.id}" onclick ="return false">Update</a>
						<a href="#" class="delete-cart-item label label-danger" data-product="${this.product.id}" onclick ="return false">Delete</a>
					</td>
				</tr>`;
	}

	public getSubtotal() : number {
		return this.product.price * this.quantity;
	}

	public get product() : Product {
		return this._product;
	}

	public set product(v: Product) {
		this._product = v;
	}

	public get quantity() : number {
		return this._quantity;
	}

	public set quantity(v: number) {
		this._quantity = v;
	}
}