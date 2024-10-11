#include <stdio.h>
void addUnitMatrix(int *matrix, int size){
    for(int i = 0; i < size;i++){
        for(int j = 0; j < size;j++){
            if(i == j){
                *matrix +=1;
            }
            matrix++;
        }
    }


}
int main()
{
    int size;
    printf("Podaj rozmiar tablicy: ");
    scanf("%d", &size);
    int matrix[size][size];
    for(int i = 0; i < size; i++){
        for(int j = 0; j < size;j++){
            printf("Podaj %d liczbę w %d kolumnie: ",j+1,i+1);
                scanf("%d",&matrix[i][j]);
        }
    }
    printf("\n");
    int *ptr = (int*)matrix;
    addUnitMatrix(ptr,size);
    for(int i = 0;i<size;i++){
        for(int j = 0; j<size;j++){
                printf("%3d",*ptr++);
        }
        printf("\n");
    }



    return 0;
}

