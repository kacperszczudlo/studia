#include <stdio.h>

int main()
{
    float a;
    printf("Podaj liczbe zmiennoprzecinkowa: ");
    scanf("%f", &a);

    if (a>10 && a<24){
        printf("Liczba %f jest wieksza od 10 i mniejsza od 24 \n", a);
    }
    else{
        printf("Podales liczbe niezgodna z parametrami \n");
    }
    return 0;
}
