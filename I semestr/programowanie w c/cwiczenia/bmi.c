#include <stdio.h>

int main()
{
    float wzrost, waga, BMI;

    printf("Podaj wzrost: (w metrach) \n");
    scanf("%f", &wzrost);

    printf("Podaj wage: (w kilogramach)\n");
    scanf("%f", &waga);

    BMI = waga/(wzrost * wzrost);

    printf("Twoje BMI wynosi: %0.2f \n", BMI);

    if (BMI < 18.5){
        printf("Masz niedowage \n");
    }
    else if (BMI > 18.5 && BMI < 25){
        printf("Masz prawidlowe BMI \n");
    }
    else{
        printf("Masz nadwage \n");
    }
    return 0;
}
