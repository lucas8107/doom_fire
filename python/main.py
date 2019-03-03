import random
import math
import pygame, sys
from pygame.locals import *

PIXEL_SIZE = 10
FIRE_WIDTH = 75
FIRE_HEIGHT = 50
PIXEL_TOTAL = FIRE_WIDTH * FIRE_HEIGHT
fire_arr = [0] * PIXEL_TOTAL
fire_colorspalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}];


def start(display):
    create_fire_source()
    update_fire()

    render_fire(display)

def create_fire_source():
    for i in range(PIXEL_TOTAL - FIRE_WIDTH, PIXEL_TOTAL):
        fire_arr[i] = 36

def update_fire():
    for i in range(0, PIXEL_TOTAL - FIRE_WIDTH):
        decay = int(math.floor(random.random() * 3))
        t_d = fire_arr[i + FIRE_WIDTH] - decay

        if(t_d >= 0):
            new_int = t_d
        else:
            new_int = 0

        fire_arr[i] = new_int
        
        fire_arr[i - decay] = new_int

def render_fire(display):
    for i in range(0, PIXEL_TOTAL, FIRE_WIDTH):
        # buf = ''
        for j in range(0, FIRE_WIDTH):
            cl = (fire_colorspalette[fire_arr[i + j]])
            pygame.draw.rect(display, (cl['r'], cl['g'], cl['b']), (j * PIXEL_SIZE, (i/FIRE_WIDTH)*PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE))
            # buf += '{} '.format(fire_arr[i + j])
        # print(buf)
        
def main():
    pygame.init()

    DISPLAY=pygame.display.set_mode((PIXEL_SIZE * FIRE_WIDTH, PIXEL_SIZE * FIRE_HEIGHT),0,0)

    while True:
        for event in pygame.event.get():
            if event.type==QUIT:
                pygame.quit()
                sys.exit()
        start(DISPLAY)
        pygame.display.update()

if __name__ == "__main__":
    main()