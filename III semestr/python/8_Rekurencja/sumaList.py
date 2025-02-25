#ukończono

def zwykla_rek(lista):
    if not lista:
        return 0
    głowa, *reszta = lista
    return głowa + zwykla_rek(reszta)


def ogonowa_rek(lista, akumulator=0):
    match lista:
        case []:
            return akumulator
        case [głowa, *reszta]:
            return ogonowa_rek(reszta, akumulator + głowa)

def main():
    lista1 = [1, 2, 3, 4, 5]
    lista2 = []

    print("Sumowanie rekurencyjne:")
    print(f"Lista {lista1} -> Suma: {zwykla_rek(lista1)}")
    print(f"Lista {lista2} -> Suma: {zwykla_rek(lista2)}")
    print("Sumowanie rekurencji ogonowej:")
    print(f"Lista {lista1} -> Suma: {ogonowa_rek(lista1)}")
    print(f"Lista {lista2} -> Suma: {ogonowa_rek(lista2)}")
main()