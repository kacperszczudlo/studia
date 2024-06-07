#include <stdio.h>
#define N 100

void lovercase(char *s) {
    while (*s) {
        if (*s >= 'a' && *s <= 'z') {
            *s -= 32;
        }
        s++;
    }
}

int main() {
    char t1[N] = {"ABCDefgHIJKLM"};
    lovercase(t1);
    puts(t1);
    return 0;
}
