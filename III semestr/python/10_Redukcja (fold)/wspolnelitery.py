#ukończono

from functools import reduce

def wspolne_litery(wyrazy):
    def wspolne(wynik, wyraz):
        return [znak for znak in wynik if znak in wyraz.lower()]
    return list(set(reduce(wspolne, wyrazy, list(wyrazy[0].lower()))))

def main():
    print(wspolne_litery(['Ala', 'ma', 'kota']))
    print(wspolne_litery(['mama', 'ma', 'misia']))

main()