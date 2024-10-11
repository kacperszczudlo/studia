#include <stdio.h>
#include <math.h>

typedef struct {
    float x, y, z;
} vec3_t;

float vlen(vec3_t *a) {
    return sqrt((a->x * a->x) + (a->y * a->y) + (a->z * a->z));
}

int main() {
    vec3_t a = {1, 2, 3};
    float l;
    l = vlen(&a);
    printf("Length of vector: %f\n", l);
    return 0;
}
