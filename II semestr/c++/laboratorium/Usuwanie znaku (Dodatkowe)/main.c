#include <stdio.h>

void usun_znak(char napis[], char znak) {
    int i, j;
    for (i = 0, j = 0; napis[i] != '\0'; i++) {
        if (napis[i] != znak) {
            napis[j++] = napis[i];
        }
    }
    napis[j] = '\0';
}

int main() {
    char tekst[] = "Zaawansowane techniki programowania!";
    char znak = 'a';

    printf("Tekst przed usunięciem: %s\n", tekst);

    usun_znak(tekst, znak);

    printf("Tekst po usunięciu '%c': %s\n", znak, tekst);

    return 0;
}
