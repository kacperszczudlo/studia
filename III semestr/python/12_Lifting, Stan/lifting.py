#ukończono

from haskell import Haskell, lift1, lift2, flip
from operator import add, pow, truediv
from functools import reduce

add_h = Haskell(add)
map_h = Haskell(map, 2)
truediv_h = flip(truediv)
pow_h = flip(pow)
reduce_h = Haskell(reduce, 2)

lista_plus_1 = map_h(lift1(add_h(1))) 

lista_suma = reduce_h(lift2(add_h))

vec_len = lift1(pow_h(1/2)) ** lista_suma ** map_h(lift1(pow_h(2)))

def vec_norm(vec):
    return map_h(lift2(truediv_h)(vec_len(vec)))(vec)

def main():
    lista = [1, 2, 3, 4, 5]
    lista2 = [1, 2, 3, 4, None]
    print(list(lista_plus_1(lista)))
    print(list(lista_plus_1(lista2)))
    print(lista_suma(lista))
    print(lista_suma(lista2))
    print(vec_len(lista))
    print(vec_len(lista2))
    print(list(vec_norm(lista)))

main()