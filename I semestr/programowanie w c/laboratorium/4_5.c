#include <stdio.h>
#define SIZE 100

int main()
{
    int i;
    char tablica[SIZE];
    printf("Podaj tekst: ");

    fgets(tablica,SIZE,stdin);

    for(i=0;tablica[i]!='\0';i++){ }
    i-=1;
    printf("Dlugosc tablicy: %d \n",i);

    if(i>10){
        printf("Wprowadzony tekst jest dluzszy od 10 \n");
        printf("Tekst w odwrotnej kolejnosci: \n");
            for (int j = i - 1; j >= 0; j--) {
            printf("%c \n", tablica[j]);
        }
    }
    else{
        printf("Wprowadzony tekst jest mniejszy od 10");
    }
    return 0;
}
