#include <stdio.h>
#include <stdint.h>

#define GET_BIT(k, n) (k & (1 << (n)))
#define SET_BIT(k, n) (k |= (1 << (n)))
#define CLR_BIT(k, n) (k &= ~(1 << (n)))

void showbits(uint8_t v)
{
    int l = 8 * sizeof(v);
    for (int i = l - 1; i >= 0; i--) {
        printf("%d", GET_BIT(v, i) ? 1 : 0);
    }
    printf("\n");
}

int main()
{
    printf("Podaj 16-bitowa dodatnia wartosc w formacie dziesietnym: ");
    uint16_t number;
    scanf("%d", &number);

    uint8_t value1 = 0;
    uint8_t value2 = 0;

    value1 = number >> 8;
    value2 = number & 0xFF;

    showbits(value1);
    showbits(value2);
    return 0;
}
