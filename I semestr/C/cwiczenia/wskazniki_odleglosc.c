#include <stdio.h>
#define size 8
int main()
{
    int tab[size] = {0};
    for(int i = 0;i<size;i++){
        printf("Podaj %d liczbe: ",i+1);
        scanf("%d",&tab[i]);
    }
    *(tab) *= 4;
    *(tab+2) *= 4;
    *(tab + size - 1) *=4;
    int *p = tab +1;
    int *q = tab + 6;
    printf("Odległość między wskaźnikami: %d\n", q - p);
    for(int i = 0;i<size;i++){
        printf("%d ", *(tab+i));
    }
    return 0;
}
