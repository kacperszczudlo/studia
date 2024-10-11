#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main()
{
    int size = 0, matrix[size][size], suma = 0, srednia, max, min, max_i, max_j, min_i, min_j;
    printf("Podaj rozmiar macierzy: ");
    scanf("%d",&size);
    srand(time(NULL));
    for(int i=0; i<size; i++){
        for(int j=0; j<size; j++){
            matrix[i][j] = rand() % 10;
            printf("%d ",matrix[i][j]);
            suma += matrix[i][j];
            if (i == 0 && j == 0) {
                max = min = matrix[i][j];
                max_i = min_i = i;
                max_j = min_j = j;
            } else {
                if (matrix[i][j] > max) {
                    max = matrix[i][j];
                    max_i = i;
                    max_j = j;
                }
                if (matrix[i][j] < min) {
                    min = matrix[i][j];
                    min_i = i;
                    min_j = j;
                }
            }
        }
        printf("\n");
    }
    srednia = suma/(size*size);
    printf("Suma: %d \n", suma);
    printf("Srednia arytmetyczna: %d \n", srednia);
    printf("Max: %d, pozycja:[%d][%d] \n",max, max_i, max_j);
    printf("Min: %d, pozycja: [%d][%d] \n",min, min_i, min_j);
    return 0;
}
