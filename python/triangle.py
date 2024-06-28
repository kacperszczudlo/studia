size = int(input("Podaj wysokość trójkąta: "))

for i in range(size - 1):
    if i == 0:
        for j in range(size):
            print(' ', end='')
        print('*')
    
    for k in range(1, size - i):
        print(' ', end='')
    
    if i == size - 2:
        print('*', end='')
        for l in range(2 * size - 4):
            print('_', end='')
        print('*')
    else:
        print('/', end='')
        for m in range(0, i * 2):
            print(' ', end='')
        print('\\')
