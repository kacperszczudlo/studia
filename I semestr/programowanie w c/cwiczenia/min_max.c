// max min
#include <stdio.h>
#define N 10
int main()
{
    //{...} - jakies elementy
    int x[N] = {...};
    int min = x[0];
    int max = x[1];

    for(int i=0; i<N; i++){
        if(x[i]<min){
            min = x[i];
        }
        else if(x[i]>max){
            max = x[i];
        }
    }
    printf("min: %d, max: %d \n", min, max);
    return 0;
}
