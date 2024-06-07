#include <stdio.h>
#include <string.h>
#define N 100
int main() {
    char a[N];
    printf("Podaj lancuch znakowy: ");
    fgets(a, sizeof(a),stdin);
    char b[N];
    char *l;

    l = strchr(a, '\"');

    if (l == NULL) {
        printf("Blad: Brak cudzysłowia otwierajacego '\"'.\n");
    }

    strcpy(b, l);
    printf("Tekst w nawiasie: %s\n", b);

    return 0;
}
