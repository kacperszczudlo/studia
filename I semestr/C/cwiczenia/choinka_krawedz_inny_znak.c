// choinka
#include <stdio.h>

int main()
{
    int size = 0;
    printf("Wprowadz wartosc choinki: ");
    scanf("%d",&size);
    for (int i = 0; i < size; i++) {
        for(int j = 0; j < size-i-1;j++){
            printf(" ");
        }
        for(int j = 0; j<1; j++){
            printf("*");
        }
        for(int j = 0; j < i*2;j++){
            printf(" ");
        }
        for(int j = 0; j<1; j++){
            printf("\\");
        }
        printf("\n");
    }
    for(int i = 0; i<size*2;i++){
        printf("-");
    }
    printf("\n");
    for(int i =0; i<size-1; i++){
        printf(" ");
    }
    printf("||\n");

    return 0;
}
