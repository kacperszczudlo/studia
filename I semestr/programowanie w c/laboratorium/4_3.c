#include <stdio.h>

int main()
{
    int n, tablica[n], tablica_parzyste[n], tablica_nieparzyste[n], parzyste = 0, nieparzyste = 0;

    printf("Podaj dlugosc tablicy: ");
    scanf("%d", &n);

    for(int i=0; i<n; i++){
        printf("Podaj liczbe %d: ", i+1);
        scanf("%d",&tablica[i]);
        if(tablica[i]%2==0){
            tablica_parzyste[parzyste] = tablica[i];
            parzyste++;
        }
        else{
            tablica_nieparzyste[nieparzyste] = tablica[i];
            nieparzyste++;
        }
    }
    printf("liczby parzyste: ");
    for(int i=0; i<parzyste; i++){
        printf("%d ", tablica_parzyste[i]);
    }
    printf("liczby nieparzyste: ");
    for(int i=0; i<nieparzyste; i++){
        printf("%d, ", tablica_nieparzyste[i]);
    }
    return 0;
}
