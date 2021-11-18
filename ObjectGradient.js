"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zGradient = exports.yGradient = exports.xGradient = exports.blueBand2 = exports.greenBand2 = exports.redBand2 = exports.blueBand = exports.greenBand = exports.redBand = exports.updateObjectGradients = exports.ObjectGradient = void 0;
// Helper to animate some 
class ObjectGradient {
    value;
    step;
    min;
    max;
    constructor(value, step, min = 0.0, max = 1.0) {
        this.value = value;
        this.step = step;
        this.min = min;
        this.max = max;
    }
    update() {
        var invertStep = (this.step > 0 && (this.value + this.step) >= this.max) ||
            (this.step < 0 && (this.value + this.step) <= this.min);
        this.value += this.step;
        if (invertStep) {
            this.step = -this.step;
        }
        if (this.value < 0) {
            this.value = this.min;
        }
        if (this.value > this.max) {
            this.value = this.max;
        }
    }
    val() {
        return this.value;
    }
}
exports.ObjectGradient = ObjectGradient;
const COLOR_WAIT = 10;
let colorUpdateTimer = COLOR_WAIT;
function updateObjectGradients() {
    colorUpdateTimer--;
    if (colorUpdateTimer == 0) {
        exports.redBand.update();
        exports.greenBand.update();
        exports.blueBand.update();
        exports.redBand2.update();
        exports.greenBand2.update();
        exports.blueBand2.update();
        colorUpdateTimer = COLOR_WAIT;
    }
    exports.xGradient.update();
    exports.yGradient.update();
    exports.zGradient.update();
}
exports.updateObjectGradients = updateObjectGradients;
exports.redBand = new ObjectGradient(0.5, -0.03);
exports.greenBand = new ObjectGradient(0.0, 0.03);
exports.blueBand = new ObjectGradient(0.0, 0.04);
exports.redBand2 = new ObjectGradient(1.0, -0.04);
exports.greenBand2 = new ObjectGradient(1.0, -0.02);
exports.blueBand2 = new ObjectGradient(0.0, 0.03);
exports.xGradient = new ObjectGradient(0.0, 0.01);
exports.yGradient = new ObjectGradient(1.0, -0.01);
exports.zGradient = new ObjectGradient(0.5, 0.01);
