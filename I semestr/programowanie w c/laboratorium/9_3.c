#include <stdio.h>
#include <stdint.h>

#define GET_BIT(k, n) (k & (1 << (n)))
#define SET_BIT(k, n) (k |= (1 << (n)))
#define CLR_BIT(k, n) (k &= ~(1 << (n)))

void showbits(uint8_t v)
{
    int l=8*sizeof(v);
    for(int i=l-1; i>=0 ;i--) {
        printf("%d", GET_BIT(v, i) ? 1 : 0);
    }
    printf(" ");
}

union myFloat {
    float number;
    uint8_t memory[4];
};

int main()
{
    union myFloat floatMy;

    printf("Podaj wartosc float: ");
    scanf("%f", &floatMy.number);

    showbits(floatMy.memory[3]);
    showbits(floatMy.memory[2]);
    showbits(floatMy.memory[1]);
    showbits(floatMy.memory[0]);
    return 0;
}
