import {Product} from "./product";
import {Helpers} from "./libs/helpers";

export class ProductRepository {
	private products: Product[] = [];

	constructor() {
		this.addItem(new Product(100, "Ferrari", "1.png", "Ferrari Challenge Europe at Silverstone - Hurni, Mattsson, Nielsen and Froggatt shine in Race-2", 500000));
		this.addItem(new Product(101, "Bugatti", "2.png", "The CHIRON is the most powerful, fastest and exclusive production super sports car in BUGATTI's brand history.", 420000));
		this.addItem(new Product(102, "Chevrolet", "3.png", "Chevy. The only brand to earn J.D. Power Dependability awards for cars, trucks, and SUV’s.", 360000));
		this.addItem(new Product(103, "Audi", "4.png", "Discover 2018 Audi sedans, SUVs & coupes. Visit AudiUSA.com and search our new inventory.", 120000));
		this.addItem(new Product(104, "Lamborghini", "5.png", "Like real-life hurricanes, the Huracán family of supercars is awe-inspiring and extremely powerful.", 200000,false));

	}

	public addItem(product: Product): void {
		this.products.push(product);
	}

	public getItems() : Product[] {
		return this.products;
	}

	public getItemById(id: number) : Product {
		//Case 01:

		let total = this.products.length;
		for(let i: number = 0; i < total; i++) {
			if(this.products[i].id == id) return this.products[i];
		}
		return null;

		//Case 02:
		

		// let filter: Product[] = this.products.filter(
		// 	product => product.id == id
		// );
		// if(filter.length > 0) return filter[0];
		// return null;

	}

	public showItemsInHTML() : string {
		let total = this.products.length;
		let xhtmlResult : string = "";
		if(total > 0) {
			for(let i: number = 0; i < total; i++) {
				let currentItem : Product = this.products[i];

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
								</div>`
			}
		} else {
			xhtmlResult = "Empty product in my shop";
		}
		return xhtmlResult;
	}

	private showBuyItemInHTML(product: Product) : string {
		let xhtmlResult = "";
		if(product.canBuy) {
			xhtmlResult += `<input type="number" name="quantity-product-${product.id}" value="1" min="1">
							<a data-product="${product.id}" href="#" class="price" onclick ="return false"> ${Helpers.toCurrency(product.price, "$", "left")}  </a>
							`;
			return xhtmlResult;
		} else {
			xhtmlResult += `<div>
							<span class="price">${Helpers.toCurrency(product.price, "$", "left")}</span>
							 <p class="sold-out">SOLD OUT</p>
							</div>
							`;
			return xhtmlResult
		}
	}
}