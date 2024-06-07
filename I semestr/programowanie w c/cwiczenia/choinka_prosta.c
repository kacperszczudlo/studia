//prosta choinka
#include <stdio.h>

#define N 5

int main()
{
    for(int l = 0; l <= N; l++){

        for(int k = 0; k <= N-l; k++){
            printf(" ");
        }
        for(int j = 0; j <= l*2; j++){
            printf("*");
        }
        printf("\n");
    }

    for (int k=0;k<=N ;k++){
        printf(" ");
    }
    printf("| \n");

    return 0;
}
