#include <stdio.h>
// tabela 5x6 - 5 kolumn 6 wierszy
int main() {
    int a, b;
    printf("Podaj wysokosc: ");
    scanf("%d", &a);
    printf("Podaj szerokosc: ");
    scanf("%d", &b);
    int c = 1, d = a + 1, e = (2 * a + 2 * b) - 8;
    int *pc = &c, *pd = &d, *pe = &e;

    for (int i = 0; i < a; i++) {
        for (int j = 0; j < b; j++) {
            if (i == 0) { // 1 wiersz
                printf("%5d", (*pc)++);
            } else if (j == 0 && i != a - 1) { // 1 kolumna
                printf("%5d", (*pd)++);
            } else if (i == a - 1) { // ostatni wiersz
                printf("%5d", (*pe)--);
            } else if (j == b - 1) { // ostatnia kolumna
                printf("%5d", (*pc)++);
            } else {
                printf("%5d", 0);
            }
        }
        printf("\n");
    }

    return 0;
}
