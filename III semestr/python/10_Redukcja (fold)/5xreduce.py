#ukończono

from functools import reduce

def srednia(lst):
    return reduce(lambda a,b: a+b, lst, 0)/len(lst)

def najwieksza(lst):
    return reduce(lambda a,b: a if a>b else b, lst, 0)

def splaszcz(lst):
    return reduce(lambda a,b: a+b, lst, [])

def manhattan(vec1, vec2):
    return reduce(lambda a, b: a + b, [abs(x - y) for x, y in zip(vec1, vec2)], 0)

def odwroc(lst):
    return reduce(lambda a,b: [b] + a, lst, [])

def main():
    lst = [1, 2, 3, 4, 5]
    lst2 = [[1,2,3], [5], [8,9]]
    vec1 = [1, 2, 3] 
    vec2 = [4, 0, 3]

    print(srednia(lst))
    print(najwieksza(lst))
    print(splaszcz(lst2))
    print(manhattan(vec1, vec2))
    print(odwroc(lst))
main()