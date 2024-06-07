#include <stdio.h>

int main() {
    float min, max, sred = 0;
    int n;

    printf("Podaj dlugosc tablicy: ");
    scanf("%d", &n);

    float tablica[n];

    for(int i=0; i<n; i++){
        printf("Podaj liczbe %d: ", i+1);
        scanf("%f", &tablica[i]);
        if(i==0){
            min = tablica[i];
            max = tablica[i];
        }
        else{
            if(min<tablica[i]){
                min=tablica[i];
            }
            if(max>tablica[i]){
                max=tablica[i];
            }
        }
         sred += tablica[i];
    }
    sred /= n;

    printf("Minimalna liczba tablicy: %.2f \n", min);
    printf("Maksymalna liczba tablicy: %.2f \n", max);
    printf("Srednia arytmetyczna tablicy: %.2f \n", sred);

    return 0;
}

