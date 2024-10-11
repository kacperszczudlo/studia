#include <stdio.h>

int main() {
    int a , b ;
      printf("Podaj wysokosc: ");
      scanf("%d", &a);
      printf("Podaj szerokosc: ");
      scanf("%d", &b);
    int c = 1;
    int d = (2 * a + 2 * b) - 4; // 2*4 + 2*4 - 4 = 16
    int *pc = &c;
    int *pd = &d;
    for (int i = 0; i < a; i++) {
        for (int j = 0; j < b; j++) {
            if (i == 0) { // 1 wiersz
                printf("%5d", (*pc)++);
            } else if (j == 0) { // 1 kolumna
                printf("%5d", (*pd)--);
            } else if (j == b - 1) { // 4 kolumna
                printf("%5d", (*pc)++);
            } else if (i == a - 1) { // 4 wiersz
                printf("%5d", (*pd)--);
            } else {
                printf("%5d", 0);
            }
        }
        printf("\n");
    }

    return 0;
}
