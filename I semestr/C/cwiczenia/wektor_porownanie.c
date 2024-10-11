#include <stdio.h>
#include <math.h>
#include <stdbool.h>
#define N 3
typedef struct{
    float x,y,z;
}vec3_t;

bool check(vec3_t *a, vec3_t b){
    for(int i = 0;i<N;i++){
        if(a[i].x == b.x && a[i].y == b.y && a[i].z == b.z){
            return true;
        }
    }
    return false;
}

int main()
{
    vec3_t tab[N] = {{1,2,3},{4,5,6},{7,8,9}};
    vec3_t vector = {11,2,3};

    if(check(tab,vector)){
        printf("True");
    }
    else{
        printf("False");
    }

    return 0;
}
