#include <stdio.h>

void zliczanie(char *x) {
    int male = 0;
    int duze = 0;
    while (*x) {
        if (*x >= 'A' && *x <= 'Z') {
            duze += 1;
        }
        if (*x >= 'a' && *x <= 'z') {
            male += 1;
        }
        x++;
    }
    printf("Duze litery: %d\n", duze);
    printf("Male litery: %d\n", male);
}

int main() {
    char t[100] = "AABBaabb";
    zliczanie(t);
    return 0;
}
