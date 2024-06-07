#include <stdio.h>
#define N 3
void showvalues(int *matrix,int size, int wymiary){
    int count = size;
    for(int i = 0;i < wymiary - 1;i++){
        count = count * size;

    }
    for(int i = 0; i<count;i++){
        printf("%d ",*matrix++);
    }
    printf("\n");



}
int main()
{
    int tab[N] = {1,2,3};
    int tab2[N][N] = {{1, 2, 3},
                   {4, 5, 6},
                   {7, 8, 9}};
    int tab3[N][N][N] = {{{1,2,3}, {3,4,5}, {5,6,7}},
                      {{7,8,9}, {9,10,11}, {11,12,13}},
                      {{13,14,15},{15,16,17}, {17,18,19}}
                      };
    int *ptr1 = tab;
    int *ptr2 = tab2;
    int *ptr3 = tab3;

    showvalues(ptr1,N,1);
    showvalues(ptr2,N,2);
    showvalues(ptr3,N,3);
    return 0;
}
