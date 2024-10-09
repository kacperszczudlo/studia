#include <stdio.h> 

int main() {
    int size, i, j, spaces;
    char symbol;

    printf("Podaj liczbe poziomów: ");
    scanf("%d", &size);

start:
    i = 0;
    j = 0;

    if (size % 2 == 0) goto gwiazdka;
    goto hashtag;

gwiazdka:
    symbol = '*';
    goto poziomy;

hashtag:
    symbol = '#';
    goto poziomy;

poziomy:
    if (i == size) goto kolejna;

    spaces = size - i - 1;
    j = 0;

spacje:
    if (j == spaces) goto lewo;
    printf(" ");
    j++;
    goto spacje;

lewo:
    j = 0;

lewo_rysuj:
    if (j == i + 1) goto prawo;
    printf("%c", symbol);
    j++;
    goto lewo_rysuj;

prawo:
    j = 0;

prawo_rysuj:
    if (j == i) goto nowa_linia;
    printf("%c", symbol);
    j++;
    goto prawo_rysuj;

nowa_linia:
    printf("\n");
    i++;
    goto poziomy;

kolejna:
    if (size == 7) return 0;
    printf("Podaj liczbe poziomów: ");
    scanf("%d", &size);
    goto start;

    return 0;
}
