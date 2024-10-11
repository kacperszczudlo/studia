// 1 2 4 5 6 10
// 10 6 5 4 2 1
#include <stdio.h>
#define N
int main()
{
    //{...} - jakies elementy
    int x[N] = {...};
    int p=0, q=0;
    for (int i = 0; i<N/2; i++) {
        p = x[i];
        x[i]=x[N-i-1];
        x[N-i-1]=p;
    }
    return 0;
}
