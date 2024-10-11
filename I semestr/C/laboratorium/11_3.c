#include <stdio.h>

int main() {
    float liczba1, liczba2, liczba3;

    printf("Podaj pierwsza liczbe: ");
    scanf("%f", &liczba1);

    printf("Podaj druga liczbe: ");
    scanf("%f", &liczba2);

    printf("Podaj trzecia liczbe: ");
    scanf("%f", &liczba3);

    FILE *plik = fopen("dane.txt", "w");

    if (plik == NULL) {
        printf("Blad otwarcia pliku do zapisu.\n");
        return 1;
    }

    fprintf(plik, "%f\n%f\n%f\n", liczba1, liczba2, liczba3);

    fclose(plik);

    plik = fopen("dane.txt", "r");

    if (plik == NULL) {
        printf("Blad otwarcia pliku do odczytu.\n");
        return 1;
    }

    printf("Zawartosc pliku:\n");

    float odczytanaLiczba;

    while (fscanf(plik, "%f", &odczytanaLiczba) == 1) {
        printf("%f\n", odczytanaLiczba);
    }

    fclose(plik);

    return 0;
}
