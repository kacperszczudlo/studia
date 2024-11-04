#ukończono

kontakty = {('Jan', 'Kowalski'): "123456789", ('Adam', 'Nowak'): "987654321", ('Adam', 'Kowalski'): "600300900"}

print(kontakty[('Adam', 'Nowak')])

for klucz in kontakty:
    if klucz[1] == 'Kowalski':
        print(f"{klucz}: {kontakty[klucz]}")
