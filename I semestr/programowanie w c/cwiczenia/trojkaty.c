/* aplikacja która będzie pobierać z klawiatury 2 parametry a i b

| m = 0  | m = 1 | m = 2 | m = 3 |
| *      |     * | ***** | ***** |
| **     |    ** | ****  |  **** |
| ***    |   *** | ***   |   *** |
| ****   |  **** | **    |    ** |
| *****  | ***** | *     |     * |

*/
#include <stdio.h>

int main()
{
    int a = 0, m = 0;
    char c;

    printf("Podaj m ( mod 0,1,2,3 ): ");
    scanf("%d", &m);

    printf("Podaj a ( liczba gwiazdek ): ");
    scanf("%d", &a);

    getchar();
    printf("Podaj znak (*): ");
    scanf("%c",&c);

    if(a>100){
        printf("Za dużo znaków");
    }else if(a<0){
        printf("Nie można podać wartości mniejszej od zera");
    }
    else{
        switch (m) {
        case 0:
            for(int i = 0; i < a; i++){
                for(int j = 0; j<= i; j++){
                    printf("%c",c);
                }
                printf("\n");
            }
            break;
        case 1:
            for(int i = 0; i <= a; i++){

                for(int j = 0; j < a-i; j++){
                    printf(" ");
                }
                for(int k = 0; k < i; k++){
                    printf("*");
                }
                printf("\n");
            }
            break;
        case 2:
            for(int i = 0; i < a; i++){
                for(int j = 0; j< a-i; j++){
                    printf("%c",c);
                }
                printf("\n");
            }
            break;
        case 3:
            for(int i = 0; i <= a; i++){

                for(int j = 0; j < i; j++){
                    printf(" ");
                }
                for(int k = 0; k < a-i; k++){
                    printf("*");
                }
                printf("\n");
            }
            break;
        }

    }
    return 0;
}
