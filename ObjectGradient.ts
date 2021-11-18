// Helper to animate some 
export class ObjectGradient {
    private value: number;
    private step: number;
    private readonly min: number;
    private readonly max: number;

    constructor(value : number, step : number, min = 0.0, max = 1.0) {
        this.value = value
        this.step = step
        this.min = min
        this.max = max
    }

    update() {
        var invertStep =
            (this.step > 0 && (this.value + this.step) >= this.max) ||
            (this.step < 0 && (this.value + this.step) <= this.min);

        this.value += this.step

        if (invertStep) {
            this.step = -this.step
        }

        if (this.value < 0) {
            this.value = this.min
        }
        if (this.value > this.max) {
            this.value = this.max
        }
    }

    val():number {
        return this.value
    }
}

const COLOR_WAIT = 10
let colorUpdateTimer = COLOR_WAIT

export function updateObjectGradients() {
    colorUpdateTimer--
    if (colorUpdateTimer == 0) {
        redBand.update()
        greenBand.update()
        blueBand.update()
        redBand2.update()
        greenBand2.update()
        blueBand2.update()

        colorUpdateTimer = COLOR_WAIT
    }
    xGradient.update()
    yGradient.update()
    zGradient.update()
}

export const redBand = new ObjectGradient(0.5, -0.03)
export const greenBand = new ObjectGradient(0.0, 0.03)
export const blueBand = new ObjectGradient(0.0, 0.04)

export const redBand2 = new ObjectGradient(1.0, -0.04)
export const greenBand2 = new ObjectGradient(1.0, -0.02)
export const blueBand2 = new ObjectGradient(0.0, 0.03)

export const xGradient = new ObjectGradient(0.0, 0.01)
export const yGradient = new ObjectGradient(1.0, -0.01)
export const zGradient = new ObjectGradient(0.5, 0.01)