#include <stdio.h>
void generatearray(int *array,int sizeArray){
    for(int i = 1;i < sizeArray + 1;i++){
        *array++ = i;
    }

}
int main()
{
    int sizeArray;
    printf("Podaj rozmiar tablicy: ");
    scanf("%d", &sizeArray);
    int array[sizeArray];
    generatearray(array,sizeArray);
    for(int i=0;i<sizeArray;i++){
        printf("%d\n",array[i]);
    }
    return 0;
}
