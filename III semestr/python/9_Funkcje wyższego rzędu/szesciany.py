#ukończono

def wyrazenie_generowane(lista):
    return list((
        x**3
    for x in lista
        if x%2!=0
    ))
    
def filter_map(lista):
    return list(map(lambda x: x**3, filter(lambda x: x%2!=0,lista)))

def main():
    lista = [1,2,3,4,5,6,7,8,9] 

    print(wyrazenie_generowane(lista))
    print(filter_map(lista))
main()