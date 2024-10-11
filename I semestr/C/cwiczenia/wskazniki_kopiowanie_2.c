#include <stdio.h>
/*
na wskaźnikach
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
    int *px, *py, *pz;
    px = x;
    py = y;
    pz = z;
    for(int i=0; i<N; i++){
        *pz++ = *px++;
        *pz++ = *py++;
    }
    return 0;
}
