//NWD
#include <stdio.h>

int main()
{
    int a,b;

    printf("Podaj pierwsza liczbe: ");
    scanf("%d",&a);

    printf("Podaj podaj druga liczbe: ");
    scanf("%d",&b);

    while(a!=b){
        if(a>b){
            a = a - b;
        }
        else{
            b = b - a;
        }
    }

    printf("Najwieksz wspolny dzielnik to: %d ", a);

    return 0;
}
