#include <stdio.h>
#include <math.h>

int main()
{
    int a, b, c, delta,x0, x1, x2;
    printf("Podaj a: \n");
    scanf("%d", &a);
    printf("Podaj b: \n");
    scanf("%d", &b);
    printf("Podaj c: \n");
    scanf("%d", &c);

    delta = (b*b) - 4 * a * c;
    x0 = (-b)/2*a;
    x1 = (-b - sqrt(delta))/2*a;
    x2 = (-b + sqrt(delta))/2*a;
    if (delta < 0){
        printf("Delta %d \n NIE MA MIEJSC ZEROWYCH \n", delta);
    }
    else if(delta == 0){
        printf("Delta: %d \n Podane miejsce zerowe: %d i \n", delta, x0);
    }
    else{
        printf("Delta: %d \n Podane 1 miejsce zerowe: %d \n Podane 2 miejsce zerowe: %d \n", delta, x1, x2);
    }
    return 0;
}
