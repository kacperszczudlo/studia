#include <stdio.h>
#include <string.h>
#define N 100
int main() {
    char a[N];
    printf("Podaj lancuch znakowy: ");
    fgets(a, sizeof(a),stdin);

    for(int i=0; i<strlen(a); i++){
        if(a[i] >= '0' && a[i]<= '9'){
            printf("Liczba znajduje sie na pozycji %d\n", i+1);
            break;
        }
    }

    return 0;
}
