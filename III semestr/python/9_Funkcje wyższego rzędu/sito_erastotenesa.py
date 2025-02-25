def usun_wielokrotnosci(glowa, lista):
    return list(filter(lambda x: x % glowa != 0, lista))

def znajdz_liczby_pierwsze(lista):
    if not lista:
        return []
    else:
        glowa = lista[0]
        return [glowa] + znajdz_liczby_pierwsze(usun_wielokrotnosci(glowa, lista[1:]))

def sito_eratostenesa(n):
    return znajdz_liczby_pierwsze(list(range(2, n)))

def main():
    print(sito_eratostenesa(20))

main()
