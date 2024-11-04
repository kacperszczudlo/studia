#ukończono

def slownik(napis):
    jednosci = {
        'zero': 0,
        'jeden': 1,
        'dwa': 2,
        'trzy': 3,
        'cztery': 4,
        'pięć': 5,
        'sześć': 6,
        'siedem': 7,
        'osiem': 8,
        'dziewięć': 9,
    }
    
    dziesiatki = {
        'dwadzieścia': 20,
        'trzydzieści': 30,
        'czterdzieści': 40,
        'pięćdziesiąt': 50
    }
    
    wyrazy = napis.split()
    liczba = 0

    if wyrazy[0] in dziesiatki:
        liczba += dziesiatki[wyrazy[0]]
    
    if len(wyrazy) > 1 and wyrazy[1] in jednosci:
        liczba += jednosci[wyrazy[1]]

    return liczba

napis = "dwadzieścia jeden"
print(napis)
wynik = slownik(napis)
print(wynik)
