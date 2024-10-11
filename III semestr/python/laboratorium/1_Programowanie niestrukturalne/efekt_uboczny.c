#include <stdio.h>

int funkcja(int a, int b, int *c) {
    *c = a * b;
    return a + b;
}

int main() {
    int iloczyn;
    
    printf("Iloczyn: %d, Suma: %d\n", iloczyn, funkcja(3, 4, &iloczyn));

    return 0;
}
