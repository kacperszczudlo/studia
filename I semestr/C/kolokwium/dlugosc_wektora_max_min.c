#include <stdio.h>
#include <math.h>
#define N 3

typedef struct{
    float x,y,z;
}vec;

float vlen(vec *v){
    return sqrt(v->x*v->x + v->y*v->y + v->z*v->z);
}
float min_vec(vec tab[]){
    float min = vlen(&tab[0]);
    for(int i=1; i<N; i++){
        float length = vlen(&tab[i]);
        if(length < min){
            min = length;
        }
    }
    return min;
}
float max_vec(vec tab[]){
    float max = vlen(&tab[0]);
    for(int i=1; i<N; i++){
        float length = vlen(&tab[i]);
        if(length > max){
            max = length;
        }
    }
    return max;
}


int main() {
    vec array[N] = {{1,2,3},{4,5,6},{7,8,9}};
    float max = max_vec(array);
    float min = min_vec(array);
    printf("Najmniejsza dlugosc wektora: %.2f: \n", min);
    printf("Najwieksza dlugosc wektora: %.2f: \n", max);

    return 0;
}
