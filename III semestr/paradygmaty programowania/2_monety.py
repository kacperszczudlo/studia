#ukończono

liczba = 0
for x in range(0,101,2):
    for y in range(0,101,5):
        for z in range(0,101,10):
            if x + y + z == 100:
                liczba += 1
            
print(f"Liczba: {liczba}")
            
    