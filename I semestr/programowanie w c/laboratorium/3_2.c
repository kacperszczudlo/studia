#include <stdio.h>
#define size 3
int main()
{
    int matrix1[size][size], matrix2[size][size],wynik[size][size];
    printf("Uzupelnij macierz 1: \n");
    for(int i=0; i<size; i++){
        for(int j=0; j<size; j++){
            printf("podaj wartosc [%d][%d]: ",i,j);
            scanf("%d",&matrix1[i][j]);
        }
    }
    printf("Uzupelnij macierz 2: \n");
    for(int i=0; i<size; i++){
        for(int j=0; j<size; j++){
            printf("podaj wartosc [%d][%d]: ",i,j);
            scanf("%d",&matrix2[i][j]);
        }
    }
    printf("Wynik dodawania macierzy 1 z macierza 2:");
    for(int i=0; i<size; i++){
        for(int j=0; j<size; j++){
            wynik[i][j] = matrix1[i][j] + matrix2[i][j];
            printf("%d ",wynik[i][j]);
        }
        printf("\n");
    }

    return 0;
}
