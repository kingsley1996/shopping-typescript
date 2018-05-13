"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Định dạng kiểu hiển thị của giá tiền
class Helpers {
    static toCurrency(value, current, position = "left") {
        if (position === "left") {
            return current + " " + value;
        }
        else if (position === "right") {
            return value + " " + current;
        }
    }
}
exports.Helpers = Helpers;
