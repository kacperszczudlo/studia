#include <stdio.h>
#include <string.h>
#define N 100
int main() {

    char tekst[N];
    char a[N/2+1];
    char b[N/2+1];
    printf("Podaj lancuch znakow: ");
    fgets(tekst,sizeof(tekst), stdin);

    if(strlen(tekst)%2!=1){
        printf("Podano nieparzysta liczbe znakow");
    }
    strncpy(a, tekst, strlen(tekst) / 2);
    a[strlen(tekst) / 2] = '\0';
    strncpy(b, tekst + strlen(tekst) / 2, strlen(tekst) / 2);
    b[strlen(tekst) / 2] = '\0';

    printf("1 tekst: %s\n", a);
    printf("2 tekst: %s\n", b);
    return 0;
}
