#include <stdio.h>
#include <stdlib.h>

int main() {
    int length;

    printf("Podaj dlugosc tekstu: ");
    scanf("%d", &length);

    char *text = (char *)malloc(length + 1);

    if (text == NULL) {
        return -1;
    }

    printf("Podaj tekst o dlugosci %d: ", length);
    scanf(" ");
    fgets(text, length + 1, stdin);

    printf("Wprowadzony tekst: %s\n", text);

    free(text);

    return 0;
}
