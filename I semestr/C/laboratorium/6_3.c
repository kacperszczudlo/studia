#include <stdio.h>

void dlugosc_tekstu(char *text, int *size) {
    char *ptr = text;
    *size = 0;
    while (*ptr != '\0') {
        (*size)++;
        ptr++;
    }
}

int main() {
    char text[100];
    int size = 0;

    printf("Wprowadz tekst: ");

    fgets(text, sizeof(text), stdin);

    dlugosc_tekstu(text, &size);

    printf("\nTwoj tekst: %s", text);
    printf("Dlugosc tekstu: %d\n", size);

    return 0;
}
