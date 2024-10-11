#include <stdio.h>
#include <math.h>
#define N 3

typedef struct{
    float x,y,z;
}vec3_t;

vec3_t multiple(vec3_t a[N], vec3_t b[N], int k){
    for(int i=0; i<N; i++){
        b[i].x = a[i].x * k;
        b[i].y = a[i].y * k;
        b[i].z = a[i].z * k;
    }
}

int main() {
    vec3_t a[N] = {{1,2,3}, {4,5,6}, {7,8,9}};
    vec3_t b[N];
    int k = 5;

    multiple(a,b,k);
    for(int i=0; i<N; i++){
        printf("[%.2f, %.2f, %.2f]\n", b[i].x, b[i].y, b[i].z);
    }
}
