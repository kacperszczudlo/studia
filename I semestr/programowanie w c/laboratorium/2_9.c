#include <stdio.h>

int main()
{
    int a;
    printf("Podaj liczbe staloprzecinkowa a: ");
    scanf("%d", &a);

    int b = a%2==0 ? a/2 : a;

    printf("Otrzymany wynik to: %d \n", b);
    return 0;
}
