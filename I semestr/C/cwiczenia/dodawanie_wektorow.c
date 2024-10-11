#include <stdio.h>

typedef struct {
    float x, y, z;
} vec3_t;

vec3_t vadd(vec3_t *a, vec3_t *b) {
    vec3_t c;
    c.x = a->x + b->x;
    c.y = a->y + b->y;
    c.z = a->z + b->z;
    return c;
}

int main() {
    vec3_t a = {1, 2, 3};
    vec3_t b = {4, 5, 6};
    vec3_t c;
    c = vadd(&a, &b);
    printf("Wynik dodawania: %.2f %.2f %.2f\n", c.x, c.y, c.z);
    return 0;
}
