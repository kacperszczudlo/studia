#include <stdio.h>
#include <stdlib.h>
int main()
{
    int size;
    int *x;
    printf("Podaj dlugosc tablicy: ");
    scanf("%d", &size);
    while (size <= 0) {
        printf("Wprowadź poprawną liczbe dodatnia: ");
        scanf("%d", &size);
    }
    x = (int*)malloc(size*sizeof(int));
    if(x == NULL) {

        return -1;
    }

    for(int i = 0;i<size;i++){
        x[i] = size - i;
    }
    size = size * 2;
    x = (int*)realloc(x,size*sizeof(int));
    if(x == NULL) {
        return -1;
    }
    for(int i = size/2;i<size;i++){
        x[i] = i - size/2;
    }
    for(int i=0; i<size; i++) {
        printf("%d ", x[i]);
    }

    free(x);

    return 0;
}
