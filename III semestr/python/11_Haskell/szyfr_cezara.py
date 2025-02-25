#ukończono

from operator import add, mod
from haskell import Haskell, flip

ord_h = Haskell(ord, 1)
chr_h = Haskell(chr, 1)
add_h = Haskell(add, 2)

def caesars_cipher_for(text, shift):
    result = []
    for char in text:
        ascii_code = ord(char)
        shifted_code = add(ascii_code, shift)
        encoded_code = mod(shifted_code, 127)
        result.append(chr(encoded_code))
    return ''.join(result)

def caesars_cipher_functional(text, shift):
    return ''.join(map(Haskell(chr) ** flip(mod)(127) ** add_h(shift) ** ord_h, text))

def main():
    text = "Ala ma kota"
    shift = 3

    encoded_for = caesars_cipher_for(text, shift)
    print("Zakodowany napis (for):", encoded_for)
    
    encoded_functional = caesars_cipher_functional(text, shift)
    print("Zakodowany napis (funkcyjny):", encoded_functional)

    decoded_for = caesars_cipher_for(encoded_for, -shift)
    print("Odkodowany napis (for):", decoded_for)
    
    decoded_functional = caesars_cipher_functional(encoded_functional, -shift)
    print("Odkodowany napis (funkcyjny):", decoded_functional)

main()
