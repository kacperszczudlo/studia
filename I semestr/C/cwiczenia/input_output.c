#include <stdio.h>
#define N 10
int main()
{
    //{...} - jakies elementy
    int x[N] = {...};
    float output = 0;
    for(int i=0; i<N; i++){
        output += x[i];
    }
    output /= N;
    printf("%f", output);
    return 0;
}
