/*
*
|\
| \
|  \
*---*
*/
#include <stdio.h>

int main()
{
    int size;
    printf("Wprowadz rozmiar trojkata: ");
    scanf("%d",&size);
    printf("*\n");
    for(int i=0; i<size-2; i++){
        for(int j=0; j<1; j++){
            printf("|");
        }
        for(int j=0; j<i; j++){
            printf(" ");
        }
        for(int j=0; j<1; j++){
            printf("\\");
        }
        printf("\n");
    }
    printf("*");
    for(int i=0; i<size-2; i++){
        printf("-");
    }
    printf("*\n");
    return 0;
}
