#include <stdio.h>

int main()
{
    int size;
    printf("Podaj rozmiar: ");
    scanf("%d",&size);
    for(int i=0; i<size; i++){
        for(int j=0; j<size-i-1; j++){
            printf(" ");
        }
        for(int j=0; j<1; j++){
            printf("/");
        }
        for(int j=0; j<i; j++){
            printf(" ");
        }
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
    return 0;
}
