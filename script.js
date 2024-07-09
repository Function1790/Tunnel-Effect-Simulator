const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const print = (t) => console.log(t)

const PI2 = 2 * Math.PI
const GRAPH_Y = 400
const h = 1
const h_bar = h / PI2
const WAVE_LEANGTH = 300

class Wave {
    constructor(lambda, T, vel = 1, x0 = 0, isEvent = false, amp = 40) {
        this.x = x0
        this.y = 400
        this.vel = vel
        this.k = PI2 / lambda
        this.w = PI2 / T
        this.T = T
        this.lambda = lambda
        this.values = []
        for (var i = 0; i < WAVE_LEANGTH; i++) {
            this.values.push(0)
        }
        this.isEvent = isEvent
        this.amp = amp
    }
    setTime(t) {
        for (var x in this.values) {
            this.values[x] = Math.cos(this.k * x - this.w * t)
        }
        this.lastT = t
    }
    addToWave(y_values) {
        for (var x = 0; x < this.values.length; x++) {
            if (this.x + x >= V_func[1][0] && this.x + x <= V_func[2][0]) {
                y_values[this.x + x] -= this.amp * Math.cos(this.k / 2 * x - this.w * this.lastT)
                continue
            }
            y_values[this.x + x] -= this.amp * this.values[x]
        }
    }
    move() {
        this.x += this.vel
        if (this.isEvent && this.x + WAVE_LEANGTH >= V_func[1][0] && this.x - WAVE_LEANGTH <= V_func[2][0]) {
            crash(this, V_func[1][1], V_func[1][0])
            this.vel *= -1
            this.isEvent = false
        }
    }
}

function crash(wave, V0, x0) {
    v = Math.abs(wave.vel) * 1000
    E = h * v / wave.T
    m = h / (wave.lambda * v)
    k = Math.sqrt(2 * m * E) / h_bar
    kappa = Math.sqrt(2 * m * (V0 - E)) / h_bar
    ampRateInverse = (1 / 4 + 1 / 16 * kappa ** 2 / k ** 2) * Math.exp(2 * kappa)
    F = wave.amp / ampRateInverse / 10
    B = wave.amp - F
    wave.amp = B
    waves.push(new Wave(wave.lambda, wave.T, wave.vel, x0, false, F))
}

var frame = 0;
const waves = [
    new Wave(60, 60, 1, -WAVE_LEANGTH, true),
    //new Wave(80, 60, -1, 650)
]
var y_values = []
const V_func = [
    [0, 0],
    [300, 100],
    [600, 0]
]

for (var i = 0; i < 1000; i++) {
    y_values.push(0)
}

function render() {
    ctx.clearRect(0, 0, 1000, 800)
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
            ctx.lineTo(1000, GRAPH_Y - V_func[i][1])
        }
    }
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.strokeStyle = "black"
    for (var i = 0; i < 1000; i++) {
        ctx.lineTo(i, y_values[i] + 400, 1, 1)
        y_values[i] = 0
    }
    ctx.stroke()
    ctx.closePath()
    frame++
    //requestAnimationFrame(render)
}

setInterval(render, 10)