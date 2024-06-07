#include <stdio.h>
#define N 3

void multipling(int (*a)[N],int (*b)[N], int skalar){
    for(int i = 0;i<N*N;i++){
        *(*b+i) = *(*a+i) * skalar;

    }
}
int main()
{
    int matrix[N][N] = {{1,2,3},{4,5,6},{7,8,9}};
    int matrix1[N][N] = {0};
    int skalar = -5;
    multipling(matrix,matrix1,skalar);
    for(int i = 0;i<N;i++){
        for(int j = 0;j<N;j++){
            printf("%d ",matrix1[i][j]);
        }
        printf("\n");
    }
    return 0;
}
