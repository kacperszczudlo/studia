#include <stdio.h>

void printResult(int liczba){
    if(liczba>5&&liczba<=11){
        printf("%d - miesci sie w przedziale\n", liczba);
    }else{
        printf("%d - NIE miesci sie w przedziale\n", liczba);
    }

}

int main()
{
    int a,b,c;
    printf("Podaj 1 zmienna: ");
    scanf("%d",&a);
    printf("Podaj 2 zmienna: ");
    scanf("%d",&b);
    printf("Podaj 3 zmienna: ");
    scanf("%d",&c);
    printf("Przekazane liczby:\n");
    printResult(a);
    printResult(b);
    printResult(c);
    return 0;
}
