import pygame

def game_window(title, background_color, window, window_size):
    if not title or not background_color:
        return None
    
    pygame.display.set_caption(title + " - " + str(window_size))
    window.fill(background_color)
    pygame.display.update()

pygame.init()
window_size = (800, 600)
window = pygame.display.set_mode(window_size)
background_color = (128, 128, 128) 
game_window("My Game", background_color, window, window_size)

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
pygame.quit()
