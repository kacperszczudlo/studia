#include <stdio.h>

int main()
{
    int wzrost;
    float waga;
    printf("Podaj wzrost: \n");
        scanf("%d", &wzrost);
    printf("Podaj wage:\n");
            scanf("%f", &waga);
    printf("Zosia ma wzorstu: %d i wazy: %0.2f \n", wzrost, waga);
    return 0;
}
