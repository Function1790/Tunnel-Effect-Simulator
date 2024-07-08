const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const print = (t) => console.log(t)

const PI2 = 2 * Math.PI
const GRAPH_Y = 400

class Wave {
    constructor(lambda, T, vel = 1, x0 = 0, isEvent = false) {
        this.x = x0
        this.y = 400
        this.vel = vel
        this.k = PI2 / lambda
        this.w = PI2 / T
        this.values = []
        for (var i = 0; i < 100; i++) {
            this.values.push(0)
        }
        this.isEvent = isEvent
    }
    setTime(t) {
        for (var x in this.values) {
            this.values[x] = Math.cos(this.k * x - this.w * t)
        }
    }
    addToWave(y_values) {
        for (var x = 0; x < this.values.length; x++) {
            y_values[this.x + x] -= 40 * this.values[x]
        }
    }
    move() {
        this.x += this.vel
        if (this.isEvent && this.x >= V_func[1][0] && this.x <= V_func[2][0]) {
            this.vel *= -1
            this.isEvent = false
        }
    }
}

var frame = 0;
const waves = [
    new Wave(60, 60, 1, 0, true),
    //new Wave(80, 60, -1, 650)
]
var y_values = []
const V_func = [
    [0, 0],
    [400, 100],
    [450, 0]
]

for (var i = 0; i < 800; i++) {
    y_values.push(0)
}

function render() {
    ctx.clearRect(0, 0, 800, 800)
    //tasking waves
    for (var i in waves) {
        waves[i].addToWave(y_values)
        waves[i].setTime(frame)
        waves[i].move()
    }
    //tasking drawing
    ctx.beginPath()
    ctx.strokeStyle = "rgba(255,0,0,0.5)"
    for (var i = 0; i < V_func.length; i++) {
        ctx.lineTo(V_func[i][0], GRAPH_Y - V_func[i][1])
        if (i + 1 < V_func.length) {
            ctx.lineTo(V_func[i + 1][0], GRAPH_Y - V_func[i][1])
        } else {
            ctx.lineTo(800, GRAPH_Y - V_func[i][1])
        }
    }
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.strokeStyle = "black"
    for (var i = 0; i < 800; i++) {
        ctx.lineTo(i, y_values[i] + 400, 1, 1)
        y_values[i] = 0
    }
    ctx.stroke()
    ctx.closePath()
    frame++
    //requestAnimationFrame(render)
}

setInterval(render, 10)