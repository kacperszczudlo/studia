#ukończono

from haskell import Haskell, flip
from operator import mul

haskell_sum = Haskell(sum, 1)
sqrt = flip(pow)(1/2)
sq = flip(pow)(2)
map_haskell = Haskell(map, 2)

def vec_len(vec):
    return sqrt(sum(map(sq, vec)))

def vec_len2(vec):
    return (sqrt ** haskell_sum ** map_haskell(sq))(vec)

vec_len3 = sqrt ** haskell_sum ** map_haskell(sq)

haskell_mul = Haskell(mul, 2)

def norm(vec):
    return list(map(haskell_mul(1/vec_len3(vec)), vec))

wektor = [1, 2, 3, 4, 5]
znormalizowany = norm(wektor)
print("Znormalizowany wektor:", znormalizowany)
print("Długość znormalizowanego wektora:", vec_len(znormalizowany))
