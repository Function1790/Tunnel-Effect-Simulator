import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots()
plt.ion()


k = 2 * np.pi * 5
w = 2 * np.pi / 10

for t in range(1000):
    ax.clear()
    plt.xlim(0, 10)
    plt.ylim(-15, 15)
    lines_x = np.arange(0, 50, 0.05)
    lines_y = np.zeros(len(lines_x))
    lines_y += np.cos(k * lines_x - w * t)
    lines_y += np.cos((k+1) * lines_x - w * t)
    ax.plot(lines_x, lines_y, "r")
    plt.show()
    plt.pause(0.1)
