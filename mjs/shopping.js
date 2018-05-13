"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./libs/jquery.d.ts" />
const product_repository_1 = require("./product-repository");
const validate_1 = require("./libs/validate");
const cart_1 = require("./cart");
//Khai báo các hằng số để dễ dàng chỉnh sửa
var MElement;
(function (MElement) {
    MElement.ELM_LIST_PRODUCT = "#list-product";
    MElement.ELM_NOTIFICATION = "#mnotification";
    MElement.ELM_MYCART_BODY = "#my-cart-body";
    MElement.ELM_MYCART_FOOTER = "#my-cart-footer";
})(MElement || (MElement = {}));
var MNotification;
(function (MNotification) {
    MNotification.NOTI_READY_TO_BUY = "READY TO BUY";
    MNotification.NOTI_MUAKO = "Are you kidding me!?";
    MNotification.NOTI_ACT_ADD = "Added successfull !!";
    MNotification.NOTI_ACT_UPDATE = "Updated successfull !!";
    MNotification.NOTI_ACT_DELETE = "Deleted successfull !!";
})(MNotification || (MNotification = {}));
let productRepository = new product_repository_1.ProductRepository();
//Tạo 1 đối tượng giỏ hàng
let cartObj = new cart_1.Cart();
let products = productRepository.getItems();
//Hàm hiển thị danh sách sản phẩm
function showListProduct() {
    $(MElement.ELM_LIST_PRODUCT).html(productRepository.showItemsInHTML());
}
function showNotification(str) {
    $(MElement.ELM_NOTIFICATION).html(str);
}
function showCart() {
    $(MElement.ELM_MYCART_BODY).html(cartObj.showCartBodyHTML());
    $(MElement.ELM_MYCART_FOOTER).html(cartObj.showCartFooterHTML());
}
//Add Product
//Kiểm tra xem số lượng người dùng nhập vào có hợp lệ hay không
//Rồi mới add sản phẩm vào giỏ hàng
function addProduct(id, quantity) {
    if (validate_1.Validate.checkQuantity(quantity)) {
        //add sản phẩm vào giỏ hàng
        //trả về 1 sản phẩm dựa vào id của sản phẩm đó
        let product = productRepository.getItemById(id);
        //thêm sản phẩm đó vào giỏ hàng 
        cartObj.addProduct(product, quantity);
        showCart();
        showNotification(MNotification.NOTI_ACT_ADD);
    }
    else {
        showNotification(MNotification.NOTI_MUAKO);
    }
}
//Update Prodcut 
function updateProduct(id, quantity) {
    if (validate_1.Validate.checkQuantity(quantity)) {
        //add sản phẩm vào giỏ hàng
        //trả về 1 sản phẩm dựa vào id của sản phẩm đó
        let product = productRepository.getItemById(id);
        //thêm sản phẩm đó vào giỏ hàng 
        cartObj.updateProduct(product, quantity);
        showCart();
        showNotification(MNotification.NOTI_ACT_UPDATE);
    }
    else {
        showNotification(MNotification.NOTI_MUAKO);
    }
}
//Delete Product 
function deleteProduct(id) {
    let product = productRepository.getItemById(id);
    cartObj.removeProduct(product);
    showCart();
    showNotification(MNotification.NOTI_ACT_DELETE);
}
$(document).ready(function () {
    //Hiển thị danh sách sản phẩm
    showListProduct();
    //Giỏ hàng rỗng : my-cart-body my-cart-footer
    showCart();
    //Update thông báo 
    showNotification(MNotification.NOTI_READY_TO_BUY);
    //Buy Product
    $("a.price").click(function () {
        let id = $(this).data("product");
        let quantity = parseInt($("input[name='quantity-product-" + id + "']").val());
        addProduct(id, quantity);
    });
    //Update Product
    $(document).on("click", "a.update-cart-item", function () {
        let id = $(this).data("product");
        let quantity = parseInt($("input[name='cart-item-quantity-" + id + "']").val());
        updateProduct(id, quantity);
    });
    //Delete Product
    $(document).on("click", "a.delete-cart-item", function () {
        let id = $(this).data("product");
        deleteProduct(id);
    });
});
