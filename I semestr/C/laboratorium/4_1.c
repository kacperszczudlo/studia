#include <stdio.h>

#define SIZE 100
int main() {
    int i;
    char tablica[SIZE];
    printf("Podaj tekst: ");
    fgets(tablica, SIZE, stdin);
    for(i=0;tablica[i] != '\0';i++){ }
    i-=1;
    printf("Dlugosc: %d \n", i);
    printf("Wprowadzony tekst: %s \n", tablica);

    return 0;
}
// to samo tylko za pomoca while
//  int i = 0;
//  while(tablica[i] != '\0'){
//  i++;
//  }
