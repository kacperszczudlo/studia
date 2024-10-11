#include <stdio.h>
#include <calc.h>
int main()
{
    int a,b, wynik = 0;
    char znak;
    printf("Podaj 1 liczbe: ");
    scanf("%d",&a);
    printf("Podaj 2 liczbe: ");
    scanf("%d",&b);
    getchar();
    printf("\ndodawanie (+)\nodejmnowanie (-)\nmnozenie (*)\ndzielenie (/)\npotegowanie (^)\npierwiastkowanie (.)\n\nPodaj znak:    ");
    scanf("%c",&znak);

    kalkulator(a,b,znak);

    return 0;
}
