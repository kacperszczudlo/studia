#ukończono

import operator

class Haskell:        
    def __init__(self, funkcja, liczba_argumentow=None):
        self.funkcja = funkcja
        self.liczba_argumentow = funkcja.__code__.co_argcount if liczba_argumentow == None else liczba_argumentow

    def __pow__(self, other):
        return (lambda *args, **kw: self.funkcja(other(*args, **kw)))

    def __call__(self, *a):
        if len(a) == self.liczba_argumentow:
            return self.funkcja(*a)
        def q(*b):
            return self.funkcja(*(a + b))
        return Haskell(q, self.liczba_argumentow - len(a))

def fst(para):
    return para[0]

def snd(para):
    return para[1]

snd_h = Haskell(snd, 1)
rowne_h = Haskell(operator.eq, 2)

def znajdz_indeksy(sekwencja, element):
    sekwencja_z_indeksami = list(enumerate(sekwencja))
    
    przefiltrowane_pary = filter(rowne_h(element) ** snd_h, sekwencja_z_indeksami)
    
    indeksy = map(fst, przefiltrowane_pary)
    
    return list(indeksy)

sekwencja = [1, 2, 3, 1, 4, 1]
element = 1
print(znajdz_indeksy(sekwencja, element))
