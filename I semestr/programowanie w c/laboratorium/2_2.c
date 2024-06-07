#include <stdio.h>

int main()
{
    int a, b, wynik;
    char znak;
    printf("Podaj pierwsza liczbe \n");
    scanf("%d", &a);

    printf("Podaj druga liczbe: \n");
    scanf("%d", &b);

    getchar();
    printf("Podaj znak: \n");
    scanf("%c", &znak);

    switch(znak) {
    case '+':wynik = a+b;
        printf("Wynik: %d \n", wynik);
        break;
    case '-':wynik = a-b;
        printf("Wynik: %d \n", wynik);
        break;
    case '*':wynik = a*b;
        printf("Wynik: %d \n", wynik);
        break;
    case '/':wynik = a/b;

        if (b==0) {
            printf("Nie dzielimy przez zero");
        }
        else{
            printf("Wynik: %d \n", wynik);
        }
        break;
    }
    return 0;
}
