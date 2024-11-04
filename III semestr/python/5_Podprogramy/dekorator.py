#ukończono

def upper_decorator(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return result.upper()
    return wrapper

@upper_decorator
def cyfry_slowami(napis):
    slownik = {
        '0': 'zero',
        '1': 'jeden',
        '2': 'dwa',
        '3': 'trzy',
        '4': 'cztery',
        '5': 'pięć',
        '6': 'sześć',
        '7': 'siedem',
        '8': 'osiem',
        '9': 'dziewięć'
    }
    wynik = ""
    for znak in napis:
        if znak in slownik:
            wynik += slownik[znak] + " "
    return wynik.strip()

@upper_decorator
def drukuj_napis(*args, sep=" ", end=""):
    result = ""
    for arg in args:
        result += str(arg) + sep
    result = result[:-len(sep)] + end
    return result

def main():
    wynik_cyfry = cyfry_slowami("1410")
    print("Wynik cyfry_slowami:", wynik_cyfry)

    wynik_drukuj = drukuj_napis("Ala", "ma", "kota")
    print("Wynik drukuj_napis:", wynik_drukuj)

main()
