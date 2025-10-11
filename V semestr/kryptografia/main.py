from passlib.hash import md5_crypt

tekst = 'It is not that I am so smart. But I stay with the questions much longer.'

# passlib automatycznie generuje losową sól i dołącza ją do skrótu
skrot = md5_crypt.hash(tekst)

print("CRYPT-MD5 (passlib):")
print(skrot)

# A tak weryfikujemy hasło:
print("Weryfikacja:", md5_crypt.verify(tekst, skrot)) # Powinno być True