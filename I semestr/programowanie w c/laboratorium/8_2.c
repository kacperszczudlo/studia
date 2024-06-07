#include <stdio.h>
#include <string.h>
#define N 100
int main() {

    char a[N];

    printf("Podaj lancuch znakow: ");
    fgets(a,sizeof(a), stdin);
    for(int i=0; i<strlen(a); i++){
        if(a[i]=='-'){
            break;
        }
    printf("%c", a[i]);
    }

    return 0;
}
