#ukończono

while True:
    a = int(input("Podaj wysokość choinki: "))

    if a % 2 == 0:
        znak = '*'
    else:
        znak = '#'

    for i in range(1, a + 1):
        print(' ' * (a - i) + znak * (2 * i - 1))

    if a == 7:
        break
