#include <stdio.h>

int main()
{
    int a;
    printf("Podaj liczbe staloprzecinkowa a: ");
    scanf(" %d", &a);
    fflush(stdin);
    int b =  (a + 2)*(-1);
    printf(" Wynik operacji: %d \n", b);
    return 0;
}
