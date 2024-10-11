// na wskaźnikach
#include <stdio.h>
#define N
int main()
{
    int x[N] = {};
    int y[N] = {};
    int z[2*N];
    int *px, *py, *pz, *pz2;
    px = x;
    py = y;
    pz = z;
    pz2 = (z+N); // lub pz2 = &z[N]
    for(int i=0; i<N; i++){
        *pz++ = *px++;
        *pz2++ = *py++;

    }
    return 0;
}
