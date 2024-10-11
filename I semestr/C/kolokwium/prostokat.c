#include <stdio.h>

int main() {
    int x, y;

    printf("Podaj szerokosc: ");
    scanf("%d", &x);

    printf("Podaj wysokosc: ");
    scanf("%d", &y);

    FILE *pFile = NULL;
    pFile = fopen("prostokat.txt", "w");

    if (pFile == NULL) {
        printf("Nie udało się otworzyć pliku\n");
        return -1;
    }

    for (int i = 0; i < y; i++) {
        for (int j = 0; j < x; j++) {
            if (i == 0 || i == y - 1) {
                fprintf(pFile, "-");
            }
            else if(j == 0 || j == x - 1){
                fprintf(pFile, "|");
            }
            else {
                fprintf(pFile, " ");
            }
        }
        fprintf(pFile, "\n");
    }

    fclose(pFile);
    printf("Pomyślnie zapisano do pliku prostokat.txt.\n");

    return 0;
}
