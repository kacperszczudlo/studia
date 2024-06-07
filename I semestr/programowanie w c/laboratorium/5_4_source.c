#include <calc.h>
#include <math.h>
#include <stdio.h>
#include <stdlib.h>

int kalkulator(int liczba1, int liczba2, char znak){
    int wynik = 0;
    switch (znak) {
    case '+':
        wynik = liczba1 + liczba2;
        printf("Wynik dodawania: %d\n", wynik);
        break;
    case '-':
        wynik = liczba1 - liczba2;
        printf("Wynik odejmowania: %d\n", wynik);
        break;
    case '*':
        wynik = liczba1 * liczba2;
        printf("Wynik mnozenia: %d\n", wynik);
        break;
    case '/':
        if(liczba2=!0){
        wynik = liczba1 / liczba2;
        printf("Wynik dzielenia: %d\n", wynik);
        }else{
        printf("NIE MOZNA DZIELIC PRZEZ %d", liczba2);
        }
        break;
    case '^':
        wynik = pow(liczba1, liczba2);
        printf("Wynik potegowania: %d\n", wynik);
        break;
    case '.':
        wynik = pow(liczba1, 1.0/liczba2);
        printf("Wynik pierwiastownia: %d\n", wynik);
        break;
    default:
        printf("Nieznany znak operacji (%d)\n",znak);
    }
    return wynik;
}
