#ukończono

tekst = input("Podaj napis: ")
print(tekst)
liczba = 0

for znak in tekst:
    if znak == 'a' or znak == 'A':
        liczba+=1
        
print("Liczba liter a i A to: ", liczba)

