#include <stdio.h>
/*
z(0) <- x(0)
z(1) <- y(0)
z(2) <- x(1)
z(3) <- y(1)
 */

int main()
{
    int x[N] = {};
    int y[N] = {};
    int z[2*N];
    for(int i=0; i<N; i++){
        z[2i] = x[i];
        z[2i+1] = y[i];
    }
    return 0;
}
