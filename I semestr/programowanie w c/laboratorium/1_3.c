#include <stdio.h>

int main()
{
    float a, b;

    printf("Podaj liczbe zmienno przecinkowa a: ");
    scanf(" %f", &a);
    fflush(stdin);
    printf("Podaj liczbe zmienno przecinkowa b: ");
    scanf(" %f", &b);
    fflush(stdin);

    printf("Wynik dodawania: %0.2f, dzielenia: %0.2f \n", a+b,a/b);


    return 0;
}
