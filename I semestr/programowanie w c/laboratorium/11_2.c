#include <stdio.h>

int main() {
    int first, last;

    printf("Podaj poczatek przedzialu: ");
    scanf("%d", &first);

    printf("Podaj koniec przedzialu: ");
    scanf("%d", &last);

    FILE *pFile = NULL;
    pFile = fopen("przedzial.csv", "w");

    if (pFile == NULL) {
        printf("Failed to open file\n");
        return -1;
    }

    fprintf(pFile, "zakres liczb od %d do %d\n", first, last);

    for (int i = first; i <= last; i++) {
        fprintf(pFile, "%d\n", i);
    }

    fclose(pFile);
    printf("Pomyslnie zapisano do pliku przedzial.csv.\n");

    return 0;
}
