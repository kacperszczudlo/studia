#include <stdio.h>
#define N 3

void multiply(int (*y)[N], int (*x)[N]){
    int *px = (int *)x;
    int *py = (int *)y;

    for(int i = 0; i < N; i++){
        for(int j = 0; j < N; j++){
            int sum = 0;
            for(int k = 0; k < N; k++){
                sum += x[i][k] * y[k][j];
            }
            *py++ = sum;
        }
    }
}

int main() {
    int matrix1[N][N] = {{1,2,3}, {4,5,6}, {7,8,9}};
    int matrix2[N][N] = {{9,8,7}, {6,5,4}, {3,2,1}};

    multiply(matrix2,matrix1);

    for(int j = 0; j < N; j++) {
        for(int i = 0; i < N; i++) {
            printf("%4d ", matrix2[j][i]);
        }
        printf("\n");
    }

    return 0;
}
