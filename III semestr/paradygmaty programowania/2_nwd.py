#ukończono

for liczba in range (1,101):
    if liczba < 2:
        continue
    for i in range(2, liczba):
        if liczba % i == 0:
            break
    else:
        print(liczba)