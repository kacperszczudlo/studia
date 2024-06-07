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
    float c = a + b;
    float d = a / b;
    printf("Wynik dodawania: %0.2f, dzielenia: %0.2f \n", c, d);


    return 0;
}
