#include <stdio.h>
void invcopy(int *y, int *x, int n)
{
    x+= (n-1);
    for(int i=0; i<n; i++) {
        *y++ = *x--;
    }
}


int main()
{
    int size;
    printf("Podaj rozmiar tablicy: ");
    scanf("%d",&size);
    int array[size];
    int reversearray[size];
    for(int i = 0;i<size;i++){
        printf("Podaj %d liczbe: ",i+1);
        scanf("%d",&array[i]);
    }
    invcopy(reversearray,array,size);
    for(int i = 0;i<size;i++){
        printf("%d\n",array[i]);
    }
    printf("Odwrocona tablica: \n");
    for(int i = 0;i<size;i++){
        printf("%d\n",reversearray[i]);
    }
    return 0;
}
