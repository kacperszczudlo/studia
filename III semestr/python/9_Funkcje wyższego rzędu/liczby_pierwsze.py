#okończono

def pierwsza_wersja(n):
    def czy_pierwsza(x):
        return all(map(lambda i: x % i != 0, range(2, x)))
    return list(
        filter(czy_pierwsza, range(2, n))
        )

def druga_wersja(n):
    return list(
        filter(lambda x: all(x % i != 0 for i in range(2, x)), range(2, n))
    )

def main():
    print(pierwsza_wersja(10))
    print(druga_wersja(10))  

main()
