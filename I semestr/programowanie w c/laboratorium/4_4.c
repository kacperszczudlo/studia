#include <stdio.h>
#define SIZE 100
int main()
{
    int i;
    char tablica[SIZE];
    printf("Podaj tekst: ");

    fgets(tablica,SIZE,stdin);
    for(i=0;tablica[i]!='\0';i++){
    char znak = tablica[i];
    if (znak >= 'a' && znak <= 'z') {
        znak = znak - 32;
    }
    else if (znak >= 'A' && znak <= 'Z') {
        znak = znak + 32;
    }
    tablica[i] = znak;
    }

    printf("Tekst po zmianie: %s \n", tablica);

    return 0;
}
