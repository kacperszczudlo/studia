#include <stdio.h>
//todo
int main()
{
    int a;
    printf("Podaj a: \n");
    scanf("%d", &a);
    //if(){

   // }
     if(a%2 == 0 && a%5==0){
        printf("Podana liczba %d jest parzysta i podzielna przez 5 \n",a);
    }
    else if(a%5==0){
        printf("Podaja liczba %d jest nieparzysta i podzielna przez 5 \n",a );
    }
    return 0;
}
