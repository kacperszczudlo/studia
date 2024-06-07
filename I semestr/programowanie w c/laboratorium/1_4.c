#include <stdio.h>

int main()
{
    char a, b, c, d;

    printf("Podaj a: ");
    scanf("%c",&a);
    fflush(stdin);
    printf("Podaj b: ");
    scanf("%c",&b);
    fflush(stdin);
    printf("Podaj c: ");
    scanf("%c",&c);
    fflush(stdin);
    printf("Podaj d: ");
    scanf("%c",&d);
    fflush(stdin);

    printf("Tekst : %c%c%c%c \n", a,b,c,d);
    return 0;
}
