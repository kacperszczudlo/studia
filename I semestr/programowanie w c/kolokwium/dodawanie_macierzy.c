#include <stdio.h>
#define N 3

void copy(int (*y)[N], int (*x)[N]){
    int *px = (int *)x;
    int *py = (int *)y;

    for(int i=0; i<N*N; i++){
        *py++ += *px++;
    }
}

int main() {
    int matrix1[N][N] = {{1,2,3}, {4,5,6}, {7,8,9}};
    int matrix2[N][N] = {{1,2,3}, {4,5,6}, {7,8,9}};

    copy(matrix2,matrix1);
    for(int i=0; i<N; i++){
        for(int j=0; j<N; j++){
            printf("%3d", matrix2[i][j]);
        }
        printf("\n");
    }
    return 0;
}
