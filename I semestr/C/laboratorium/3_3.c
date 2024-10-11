#include <stdio.h>
#define size 3
int main()
{
    int matrix[size][size], wyznacznik = 0;
    printf("Uzupelnij macierzy : \n");
    for(int i=0; i<size; i++){
        for(int j=0; j<size; j++){
            printf("podaj wartosc [%d][%d]: ",i,j);
            scanf("%d",&matrix[i][j]);
        }
    }
    wyznacznik = (matrix[0][0] * matrix[1][1] * matrix[2][2]) + (matrix[0][1] * matrix[1][2] * matrix[2][0]) + (matrix[0][2] * matrix[1][0] * matrix[2][1]) -
                 (matrix[0][2] * matrix[1][1] * matrix[2][0]) - (matrix[0][0] * matrix[1][2] * matrix[2][1]) - (matrix[0][1] * matrix[1][0] * matrix[2][2]);
    // 00 10 20
    // 01 11 21
    // 02 12 22
    printf("Wyznacznik macierzy %d ",wyznacznik);
    return 0;
}
