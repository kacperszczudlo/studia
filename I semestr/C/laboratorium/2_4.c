#include <stdio.h>
#include <stdbool.h>

int main()
{
    bool a = 0;
    bool b = 1;

    printf(" WEJSCIE: \n a = %d b = %d \n",a,b);

    if (a==1 && b==1){
        printf("WYJSCIE: \n Wynik = 0");
    }
    else{
        printf("WYJSCIE: \n Wynik = 1 \n");
    }
    return 0;
}
