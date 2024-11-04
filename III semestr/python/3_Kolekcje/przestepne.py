#ukończono

poczatek = int(input("Podaj od: "))
koniec = int(input("Podaj do: "))

lista = [rok for rok in range(poczatek, koniec) if (rok % 4 == 0 and rok % 100 != 0) or (rok % 400 == 0)]

print(lista)
