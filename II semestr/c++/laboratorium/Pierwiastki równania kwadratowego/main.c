#include <stdio.h>
#include <math.h>

int calculate_roots(float a, float b, float c, float* address, float* address) {
    float delta = b*b - 4*a*c;

    if (delta > 0) {
        *address = (-b + sqrt(delta)) / (2*a);
        *address = (-b - sqrt(delta)) / (2*a);
        return 2;
    } else if (delta == 0) {
        *address = -b / (2*a);
        return 1;
    } else {
        return 0;
    }
}

int main(){
    float a, b, c, miejscezerowe1, miejscezerowe2;

    printf("Podaj a: ");
    scanf("%f", &a);
    printf("Podaj b: ");
    scanf("%f", &b);
    printf("Podaj c: ");
    scanf("%f", &c);

    int znalezione_miejsca = calculate_roots(a, b, c, &miejscezerowe1, &miejscezerowe2);

    switch(znalezione_miejsca){
    case 2:
        printf("Znaleziono 2 pierwiastki:\n");
        printf("x1 = %.2f\n", miejscezerowe1);
        printf("x2 = %.2f\n", miejscezerowe2);
        break;
    case 1:
        printf("Znaleziono 1 pierwiastek:\n");
        printf("x = %.2f\n", miejscezerowe1);
        break;
    case 0:
        printf("Brak pierwiastków rzeczywistych\n");
        break;
    }

    return 0;
}
