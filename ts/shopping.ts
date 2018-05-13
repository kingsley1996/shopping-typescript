/// <reference path="./libs/jquery.d.ts" />
import { ProductRepository } from "./product-repository";
import { Product } from "./product";
import { Validate } from "./libs/validate";
import { Cart } from "./cart";
//Khai báo các hằng số để dễ dàng chỉnh sửa
namespace MElement {
	export const ELM_LIST_PRODUCT : string = "#list-product";
	export const ELM_NOTIFICATION : string = "#mnotification";
	export const ELM_MYCART_BODY : string = "#my-cart-body";
	export const ELM_MYCART_FOOTER : string = "#my-cart-footer";
}

namespace MNotification {
	export const NOTI_READY_TO_BUY : string = "READY TO BUY";
	export const NOTI_MUAKO : string = "Are you kidding me!?";
	export const NOTI_ACT_ADD : string = "Added successfull !!";
	export const NOTI_ACT_UPDATE : string = "Updated successfull !!";
	export const NOTI_ACT_DELETE : string = "Deleted successfull !!";
}

let productRepository = new ProductRepository();
//Tạo 1 đối tượng giỏ hàng
let cartObj = new Cart();
let products: Product[] = productRepository.getItems();

//Hàm hiển thị danh sách sản phẩm
function showListProduct() : void {
	$(MElement.ELM_LIST_PRODUCT).html(productRepository.showItemsInHTML());
}

function showNotification(str: string) : void {
	$(MElement.ELM_NOTIFICATION).html(str);
}

function showCart() : void {
	$(MElement.ELM_MYCART_BODY).html(cartObj.showCartBodyHTML());
	$(MElement.ELM_MYCART_FOOTER).html(cartObj.showCartFooterHTML());
}

//Add Product
//Kiểm tra xem số lượng người dùng nhập vào có hợp lệ hay không
//Rồi mới add sản phẩm vào giỏ hàng
function addProduct(id: number, quantity: number)  {
	if(Validate.checkQuantity(quantity)) {
			//add sản phẩm vào giỏ hàng

			//trả về 1 sản phẩm dựa vào id của sản phẩm đó
			let product : Product = productRepository.getItemById(id);

			//thêm sản phẩm đó vào giỏ hàng 
			cartObj.addProduct(product,quantity);
			showCart();
			showNotification(MNotification.NOTI_ACT_ADD);
		} else {
			showNotification(MNotification.NOTI_MUAKO);
		}
}

//Update Prodcut 
function updateProduct(id: number, quantity: number)  {
	if(Validate.checkQuantity(quantity)) {
			//add sản phẩm vào giỏ hàng

			//trả về 1 sản phẩm dựa vào id của sản phẩm đó
			let product : Product = productRepository.getItemById(id);

			//thêm sản phẩm đó vào giỏ hàng 
			cartObj.updateProduct(product,quantity);
			showCart();
			showNotification(MNotification.NOTI_ACT_UPDATE);
		} else {
			showNotification(MNotification.NOTI_MUAKO);
		}
}

//Delete Product 
function deleteProduct(id: number)  {
	let product : Product = productRepository.getItemById(id);
	cartObj.removeProduct(product);
	showCart();
	showNotification(MNotification.NOTI_ACT_DELETE);	
}

$(document).ready(function(){

	//Hiển thị danh sách sản phẩm
	showListProduct();

	//Giỏ hàng rỗng : my-cart-body my-cart-footer
	showCart();

	//Update thông báo 
	showNotification(MNotification.NOTI_READY_TO_BUY);

	//Buy Product
	$("a.price").click(function(){
		let id : number = $(this).data("product");
		let quantity : number = parseInt($("input[name='quantity-product-"+ id +"']").val());
		addProduct(id,quantity);
		
	});

	//Update Product
	$(document).on("click", "a.update-cart-item", function(){
		let id : number = $(this).data("product");
		let quantity : number = parseInt($("input[name='cart-item-quantity-" + id + "']").val());
		updateProduct(id,quantity);
	});
	
	//Delete Product
	$(document).on("click", "a.delete-cart-item", function(){
		let id : number = $(this).data("product");
		deleteProduct(id);
	});
	
});