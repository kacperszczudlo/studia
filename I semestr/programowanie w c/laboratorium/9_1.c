#include <stdio.h>
#include <stdint.h>
#include <string.h>

#define GET_BIT(k, n) (k & (1 << (n)))
#define SET_BIT(k, n) (k |= (1 << (n)))
#define CLR_BIT(k, n) (k &= ~(1 << (n)))

void showbits(uint8_t v)
{
    printf("Wartość zapisana binarnie: ");
    int l=8*sizeof(v);
    for(int i=l-1; i>=0 ;i--) {
        printf("%d", GET_BIT(v, i) ? 1 : 0);
    }
    printf("\n");
}

void saveBytes(char* text, uint8_t* number){
    int l=8*sizeof(*number);
    for(int i=l-1; i>=0; i--){
        text[l-i-1] == '1' ? SET_BIT(*number, i) : CLR_BIT(*number, i);
    }
}

int main()
{
    char text[100];

    printf("Wprowadz 8 bitowa wartosc w zapisie binarnym: ");
    fgets(text, 100, stdin);

    if(strlen(text)-1 != 8){
        printf("Wprowadzona wartosc nie jest 8 bitowa");
        return -1;
    }

    for (int i = 0; i<8; i++){
        if(text[i] != '1' && text[i] != '0'){
            printf("Wprowadzona wartosc nie jest w formacie binarnym!");
            return -1;
        }
    }

    uint8_t num;
    saveBytes(text, &num);
    showbits(num);
    printf("Wartosc zapisana dziesietnie: %d", num);

    return 0;
}
