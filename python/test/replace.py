def zamiana(txt, a, x):
    if a in txt:
        y = txt.replace(a,x)
        print(txt," zamieniony na: ",y)
        return y
    else:
        print(f"Litera '{a}' nie znajduje sie w tekście")
        return txt

wynik = zamiana("ananas",'a','x')

