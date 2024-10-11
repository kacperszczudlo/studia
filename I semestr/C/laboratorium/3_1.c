#include <stdio.h>

int main()
{
    int size = 0, matrix[size][size];
    printf("Podaj rozmiar macierzy: ");
    scanf("%d",&size);

    for (int i=0; i<size; i++) {
        for (int j=0; j<size; j++) {
            matrix[i][j] = i + j + 1;
        }
    }
    for(int i=0; i<size; i++){
        for(int j=0; j<size; j++){
            printf("%d ",matrix[i][j]);
        }
        printf("\n");
    }
    return 0;
}
