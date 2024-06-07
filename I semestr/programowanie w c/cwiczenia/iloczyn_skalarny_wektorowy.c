#include <stdio.h>
// vdot - iloczyn skalarny
// vcross -  iloczyn wektorowy
typedef struct {
    float x, y, z;
} vec3_t;

float vdot(vec3_t *a, vec3_t *b) { return (a->x * b->x + a->y * b->y + a->z * b->z); }

vec3_t vcross(vec3_t *a, vec3_t *b) {
    vec3_t c;
    c.x = a->y * b->z - a->z * b->y;
    c.y = a->z * b->x - a->x * b->z;
    c.z = a->x * b->y - a->y * b->x;
    return c;
}

int main() {
    vec3_t a = {1, 2, 3};
    vec3_t b = {4, 5, 6};
    float c = vdot(&a, &b);
    vec3_t d = vcross(&a, &b);
    printf("Iloczyn skalarny: %.2f: ", c);
    printf("Iloczyn wektorowy: [%.2f, %.2f, %.2f]: ", d.x, d.y, d.z);
    return 0;
}
