/*
*---*
|   |
|   |
|   |
*---*
*/
#include <stdio.h>

int main()
{
    int size;
    printf("Wprowadz rozmiar kwadratu: ");
    scanf("%d",&size);
    printf("*");
    for(int i=0; i<size-2;i++){
        printf("-");
    }
    printf("*\n");
    for(int i=0; i<size-2;i++){
        for(int j=0; j<1; j++){
            printf("|");
        }
        for(int j=0; j<size-2; j++){
            printf(" ");
        }
        for(int j=0; j<1; j++){
            printf("|");
        }
        printf("\n");
    }
    printf("*");
    for(int i=0; i<size-2;i++){
        printf("-");
    }
    printf("*\n");
    return 0;
}
