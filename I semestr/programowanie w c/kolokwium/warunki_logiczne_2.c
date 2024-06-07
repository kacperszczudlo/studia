#include <stdio.h>
#include <stdbool.h>

#define N 3
typedef struct {
    float x, y, z;
} vec3_t;

bool vec_test(vec3_t x[], vec3_t y, int n) {
    for (int i = 0; i < n; i++) {
        if (x[i].x == y.x && x[i].y == y.y && x[i].z == y.z) {
            return true;
        }
    }
    return false;
}

int main() {

    vec3_t x[N] = {{1.0, 2.0, 3.0}, {4.0, 5.0, 6.0}, {7.0, 8.0, 9.0}};
    vec3_t y = {4.0, 5.0, 6.0};

    if (vec_test(x, y, N)) {
        printf("TRUE\n");
    } else {
        printf("FALSE\n");
    }

    return 0;
}
