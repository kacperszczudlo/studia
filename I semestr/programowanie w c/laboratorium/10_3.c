#include <stdio.h>
#include <stdlib.h>

int** generujTablice(int x, int y) {
    int** tablica = (int**)malloc(x * sizeof(int*));

    if (tablica == NULL) {
        exit(-1);
    }

    for (int i = 0; i < x; i++) {
        tablica[i] = (int*)malloc(y * sizeof(int));

        if (tablica[i] == NULL) {
            exit(-1);
        }

        for (int j = 0; j < y; j++) {
            tablica[i][j] = i + j + 1;
        }
    }
    return tablica;
}

void wyswietlTablice(int** tablica, int x, int y) {
    for (int i = 0; i < x; i++) {
        for (int j = 0; j < y; j++) {
            printf("%2d ", tablica[i][j]);
        }
        printf("\n");
    }
}

int main() {
    int x = 5;
    int y = 7;

    int** mojaTablica = generujTablice(x, y);

    printf("Wygenerowana tablica:\n");
    wyswietlTablice(mojaTablica, x, y);

    for (int i = 0; i < x; i++) {
        free(mojaTablica[i]);
    }
    free(mojaTablica);

    return 0;
}
