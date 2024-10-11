/*
m = 0  m = 1
+---+ +---+
|   | |***|
|   | |***|
|   | |***|
+---+ +---+
*/
#include <stdio.h>

int main()
{
    int size,m;
    printf("Wprowadz rozmiar kwadratu: ");
    scanf("%d",&size);
    printf("Wprowadz mod(0,1): ");
    scanf("%d", &m);
    printf("+");
    for(int i=0; i<size-2;i++){
        printf("-");
    }
    printf("+\n");
    for(int i=0; i<size-2;i++){
        for(int j=0; j<1; j++){
            printf("|");
        }
        switch(m){
        case 0:
            for(int j=0; j<size-2; j++){
                printf(" ");
        }
            break;
        case 1:
            for(int j=0; j<size-2; j++){
                printf("*");
            }
            break;
        }
        for(int j=0; j<1; j++){
            printf("|");
        }
        printf("\n");
    }
    printf("+");
    for(int i=0; i<size-2;i++){
        printf("-");
    }
    printf("+\n");
    return 0;
}
