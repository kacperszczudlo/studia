#include <stdio.h>
#include <string.h>
#define N 100
int main() {
    char a[N];
    char b[N];
    char c[2*N]= {0};

    printf("Podaj 1 lancuch znakow: ");
    fgets(a,sizeof(a), stdin);
    printf("Podaj 2 lancuch znakow: ");
    fgets(b,sizeof(b), stdin);

    strncat(c, a, strlen(a)-1);
    strncat(c, b, strlen(b)-1);

    printf("%s", c);

    return 0;
}
