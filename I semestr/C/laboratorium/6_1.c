#include <stdio.h>

int main() {
    char text[100];
    char *ptr = text;
    int size = 0;

    printf("Wprowadz text: ");

    fgets(text, sizeof(text), stdin);

    while(*ptr != '\0'){
        size++;
        ptr++;
    }

    printf("\nTwoj text: %s", text);
    printf("Dlugosc tekstu: %d\n", size);

        return 0;
}
