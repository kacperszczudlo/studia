#include <stdio.h>

double potega_iteracyjna(double x, int n) {
    double wynik = 1.0;

    if (n >= 0) {
        while (n > 0) {
            wynik *= x;
            n--;
        }
    } else {
        for (int i = 0; i < (-n); i++) {
            wynik /= x;
        }
    }

    return wynik;
}

double potega_rekurencyjna(double x, int n) {
    if (n == 0) {
        return 1.0;
    } else if (n > 0) {
        return x * potega_rekurencyjna(x, n - 1);
    } else {
        return 1.0 / (x * potega_rekurencyjna(x, -(n + 1)));
    }
}

int main() {
    double x1 = potega_iteracyjna(3, -2);
    double x2 = potega_iteracyjna(2, 4);
    double x3 = potega_iteracyjna(4, 0);

    double y1 = potega_rekurencyjna(3, -2);
    double y2 = potega_rekurencyjna(2, 4);
    double y3 = potega_rekurencyjna(4, 0);

    printf("potega iteracyjna \n");
    printf("3^(-2) =  %.2f\n", x1);
    printf("2^4 =  =  %.2f\n", x2);
    printf("4^0  =  %.2f\n", x3);
    printf("potega rekurencyjna\n");
    printf("3^(-2) =  %.2f\n", y1);
    printf("2^4 =  =  %.2f\n", y2);
    printf("4^0  =  %.2f\n", y3);

    return 0;
}
