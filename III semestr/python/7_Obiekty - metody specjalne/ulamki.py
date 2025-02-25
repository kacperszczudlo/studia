#ukończono

import decimal

class Ulamek:

    __instances = 0

    def __init__(self, licznik, mianownik):
        if mianownik == 0:
            raise ValueError("Mianownik nie może być zerem")
        self.licznik = licznik
        self.mianownik = mianownik
        self.skroc()
        Ulamek.__instances += 1

    def __nwd(self, a, b):
        while b != 0:
            a, b = b, a % b
        return a

    def __nww(self, n, k):
        return n * k // self.__nwd(n, k)

    def skroc(self):
        nwd = self.__nwd(self.licznik, self.mianownik)
        self.licznik //= nwd
        self.mianownik //= nwd

    def __add__(self, other):
        nww = self.__nww(self.mianownik, other.mianownik)
        licznik_wynik = self.licznik * (nww // self.mianownik) + other.licznik * (nww // other.mianownik)
        wynik = Ulamek(licznik_wynik, nww)
        wynik.skroc()
        return wynik

    def __sub__(self, other):
        nww = self.__nww(self.mianownik, other.mianownik)
        licznik_wynik = self.licznik * (nww // self.mianownik) - other.licznik * (nww // other.mianownik)
        wynik = Ulamek(licznik_wynik, nww)
        wynik.skroc()
        return wynik

    def __mul__(self, other):
        wynik = Ulamek(self.licznik * other.licznik, self.mianownik * other.mianownik)
        wynik.skroc()
        return wynik

    def __truediv__(self, other):
        if other.licznik == 0:
            raise ValueError("Nie można dzielić przez zero")
        wynik = Ulamek(self.licznik * other.mianownik, self.mianownik * other.licznik)
        wynik.skroc()
        return wynik

    def __str__(self):
        return f"{self.licznik}/{self.mianownik}"

    def __del__(self):
        Ulamek.__instances -= 1

    @classmethod
    def fromdecimal(cls, dziesietna):
        d = decimal.Decimal(str(dziesietna))
        licznik, mianownik = d.as_integer_ratio()
        return cls(licznik, mianownik)

    @staticmethod
    def liczba_instancji():
        return Ulamek.__instances


def main():
    u1 = Ulamek(3, 4)
    u2 = Ulamek(5, 6)
    u3 = u1 + u2
    u4 = u1 - u2
    u5 = u1 * u2
    u6 = u1 / u2
    u7 = Ulamek.fromdecimal(0.75)

    print(f"Ułamek u1: {u1}")
    print(f"Ułamek u2: {u2}")
    print(f"u1 + u2 = {u3}")
    print(f"u1 - u2 = {u4}")
    print(f"u1 * u2 = {u5}")
    print(f"u1 / u2 = {u6}")
    print(f"Ułamek z dziesiętnej 0.75: {u7}")
    print(f"Liczba instancji klasy Ulamek: {Ulamek.liczba_instancji()}")
main()
