//Định dạng kiểu hiển thị của giá tiền
export class Helpers {
	public static toCurrency(value: number, current: string, position: string = "left" ) {
		if(position === "left") {
			return current + " " + value;
		}
		else if(position === "right") {
			return value + " " + current;
		}
	}
}