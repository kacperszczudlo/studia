#include <stdio.h>
#include <stdbool.h>

int main()
{
    bool a = 1;
    bool b = 1;

    printf(" WEJSCIE: \n a = %d b = %d \n",a,b);

    if (a&&b){
        printf("WYJSCIE: \n Wynik = 0 \n");
    }
    else{
        printf("WYJSCIE: \n Wynik = 1 \n");
    }
    return 0;
}
