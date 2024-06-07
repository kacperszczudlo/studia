#include <math.h>
#include <stdio.h>

typedef struct {
    float Re;
    float Im;
} LiczbaZespolona;

float ObliczModul(LiczbaZespolona a, LiczbaZespolona b) {
    return sqrt(a.Re * a.Re + b.Im * b.Im);
}

int main() {
    LiczbaZespolona a, b;
    float modul;

    a.Re = 1.0;
    b.Im = sqrt(3.0);

    modul = ObliczModul(a,b);

    printf("Liczba zespolona: %.2f \n", a.Re);
    printf("Czesc urojona: %.2fi\n", b.Im);
    printf("Modul liczby zespolonej: %.2f\n", modul);

    return 0;
}
