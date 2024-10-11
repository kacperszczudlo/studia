#include <stdio.h>

int main() {
    int a, b, c;

    printf("Podaj a, b, c (0 lub 1): \n");
    scanf("%d %d %d", &a, &b, &c);

    printf("Tabela prawdy NAND:\n");
    printf("|A\t|B\t|C\t|A NAND B NAND C|\n");
    printf("|%d\t|%d\t|%d\t|%d\t\t|\n", a, b, c, !(a && b && c));

    return 0;
}
