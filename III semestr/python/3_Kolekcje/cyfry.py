#ukończono

slownik = {
    '0' : 'zero',
    '1' : 'jeden',
    '2' : 'dwa',
    '3' : 'trzy',
    '4' : 'cztery',
    '5' : 'pięć',
    '6' : 'sześć',
    '7' : 'siedem',
    '8' : 'osiem',
    '9' : 'dziewięć'
}

ciag = input("Podaj ciąg cyfr: ")
napis = ""

for znak in ciag:
    if znak in slownik:
        napis += slownik[znak] + " "
        
print(napis)