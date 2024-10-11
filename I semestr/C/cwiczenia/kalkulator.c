// prosty kalkulator
#include <stdio.h>

int main()
{
    int a, b , c;
    char znak;

    printf("Podaj pierwsza liczbe: \n");
    scanf("%d",&a);

    printf("Podaj druga liczbe: \n");
    scanf("%d",&b);

    getchar();
    printf("Podaj znak : \n");
    scanf("%c",&znak);

    switch (znak) {
    case '+':c=a+b;
        printf("Wynik: %d \n",c);
        break;
    case '-':c=a-b;
        printf("Wynik: %d \n",c);
        break;
    case '*':c=a*b;
        printf("Wynik: %d \n",c);
            break;
    case '/':
        if(b==0){
            printf("Nie można dzielic przez %d!!! \n",b);
        }else{
            c=a/b;
            printf("Wynik: %d \n",c);
        }
        break;
    }

    return 0;
}
