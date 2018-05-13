"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("./product");
const helpers_1 = require("./libs/helpers");
class ProductRepository {
    constructor() {
        this.products = [];
        this.addItem(new product_1.Product(100, "Ferrari", "1.png", "Ferrari Challenge Europe at Silverstone - Hurni, Mattsson, Nielsen and Froggatt shine in Race-2", 500000));
        this.addItem(new product_1.Product(101, "Bugatti", "2.png", "The CHIRON is the most powerful, fastest and exclusive production super sports car in BUGATTI's brand history.", 420000));
        this.addItem(new product_1.Product(102, "Chevrolet", "3.png", "Chevy. The only brand to earn J.D. Power Dependability awards for cars, trucks, and SUV’s.", 360000));
        this.addItem(new product_1.Product(103, "Audi", "4.png", "Discover 2018 Audi sedans, SUVs & coupes. Visit AudiUSA.com and search our new inventory.", 120000));
        this.addItem(new product_1.Product(104, "Lamborghini", "5.png", "Like real-life hurricanes, the Huracán family of supercars is awe-inspiring and extremely powerful.", 200000, false));
    }
    addItem(product) {
        this.products.push(product);
    }
    getItems() {
        return this.products;
    }
    getItemById(id) {
        //Case 01:
        let total = this.products.length;
        for (let i = 0; i < total; i++) {
            if (this.products[i].id == id)
                return this.products[i];
        }
        return null;
        //Case 02:
        // let filter: Product[] = this.products.filter(
        // 	product => product.id == id
        // );
        // if(filter.length > 0) return filter[0];
        // return null;
    }
    showItemsInHTML() {
        let total = this.products.length;
        let xhtmlResult = "";
        if (total > 0) {
            for (let i = 0; i < total; i++) {
                let currentItem = this.products[i];
                xhtmlResult += `<div class="media product">
									<div class="media-left">
										<a href="#" onclick ="return false">
											<img class="media-object" src="img/characters/${currentItem.image}" alt = "${currentItem.name}"></img>
										</a>
									</div>
									<div class="media-body">
										<h4 class="media-heading">${currentItem.name}</h4>
										<p>${currentItem.summary}</p>
										${this.showBuyItemInHTML(currentItem)}
									</div>
								</div>`;
            }
        }
        else {
            xhtmlResult = "Empty product in my shop";
        }
        return xhtmlResult;
    }
    showBuyItemInHTML(product) {
        let xhtmlResult = "";
        if (product.canBuy) {
            xhtmlResult += `<input type="number" name="quantity-product-${product.id}" value="1" min="1">
							<a data-product="${product.id}" href="#" class="price" onclick ="return false"> ${helpers_1.Helpers.toCurrency(product.price, "$", "left")}  </a>
							`;
            return xhtmlResult;
        }
        else {
            xhtmlResult += `<div>
							<span class="price">${helpers_1.Helpers.toCurrency(product.price, "$", "left")}</span>
							 <p class="sold-out">SOLD OUT</p>
							</div>
							`;
            return xhtmlResult;
        }
    }
}
exports.ProductRepository = ProductRepository;
