#ukończono

tekst = input("Podaj tekst: ")
sprawdzone = ""

for litera in tekst:
    if litera not in sprawdzone:
        indeksy = []
        for j in range(len(tekst)):
            if tekst[j] == litera:
                indeksy.append(j)
        liczba_wystapien = len(indeksy)
        
        indeksy_str = ""
        for indeks in indeksy:
            indeksy_str += str(indeks) + " "
        
        print(f"{litera}: {indeksy_str.strip()} ({liczba_wystapien})")
        sprawdzone += litera
