#include <stdio.h>

int main() {
    int size;

    printf("Podaj wysokosc: ");
    scanf("%d", &size);

    for (int i = 1; i <= size; i++) {
        for (int j = 1; j <= i; j++) {
            if (j == i) {
                printf("<>");
            } else {
                printf("--");
            }
        }
        printf("\n");
    }

    return 0;
}
