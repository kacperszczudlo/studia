// zamienic elementy z x[N] do y[N]
// y(0) <- x(1-1)
// y(1) <- x(1-2)
#include <stdio.h>
#define N
int main()
{
    //{...} - jakies elementy
    int x[N] = {...};
    int y[N];

    for (int i = 0; i < N; i++) {
        y[i] = x[N-i-1];
    }
    return 0;
}
