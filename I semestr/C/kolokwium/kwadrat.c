#include <stdio.h>

int main()
{
    int size;
    printf("Podaj rozmiar kwadratu:");
    scanf("%d",&size);

    for(int i=0; i<size; i++){
        for(int j=0; j<size; j++){
            printf("*");
        }
        printf("\n");
    }
    return 0;
}
