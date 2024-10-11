#include <stdio.h>

int main() {
    char tekst[100];

    printf("Wprowadz tekst: ");
        fgets(tekst, sizeof(tekst), stdin);

    printf("Wprowadzony tekst:\n");
    for (int i = 0; tekst[i] != '\0'; i++) {
        if (tekst[i] == ' ' || tekst[i] == '\n') {
            printf("\n");
        } else {
            printf("%c ", tekst[i]);
        }
    }

    return 0;
}
