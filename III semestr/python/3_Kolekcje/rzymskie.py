#ukończono

napis = input("Podaj napis: ")

slownik = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
}

suma = 0

for i in range(len(napis) - 1):
    p,d = napis[i:i+2] 
    pierwsza, druga = slownik[p], slownik[d]
    
    if pierwsza >= druga:
        suma += pierwsza
    else:
        suma -= druga

suma += slownik[napis[-1]]

print(suma)
