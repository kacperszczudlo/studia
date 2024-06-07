#include <stdio.h>

#define MAX_SIZE 100

char * znajdz_znak(char *napis, char szuk_znak) {
    do {
        if (*napis == szuk_znak) {
            return napis;
        }
    } while (*napis++);

    return NULL;
}

int main(){
    char tab[MAX_SIZE];
    char szukany_znak;
    char *znaleziony;

    printf("Podaj napis: ");
    fgets(tab, MAX_SIZE, stdin);

    printf("Podaj szukany znak: ");
    scanf(" %c", &szukany_znak);

    znaleziony = znajdz_znak(tab, szukany_znak);

    if (znaleziony != NULL) {
        printf("Znaleziony znak: %c\n", *znaleziony);
    } else {
        printf("Szukany znak nie został znaleziony.\n");
    }

    return 0;
}
