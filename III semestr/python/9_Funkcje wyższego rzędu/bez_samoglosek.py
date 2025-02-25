#ukończono

def usun_samogloske(napis):
    samogloski = "aeouiy"
    return ''.join(filter(lambda x: x not in samogloski, napis))

def funkcja(lista, usun_samogloske):
    return list(map(usun_samogloske, lista))

def main():
    lista = ["ala", "ma", "kota"]

    print(funkcja(lista, usun_samogloske))
main()
