#include <stdio.h>
#include <math.h>
#define N 3
typedef struct{
    float x,y,z;
}vec3_t;
typedef struct {
    float a;
    float b;
}zespolona;
float obliczmodul(zespolona l){
    return sqrt(l.a * l.a + l.b * l.b);
}

float vlen(vec3_t *v){
    return sqrt(v->x*v->x + v->y*v->y + v->z*v->z);
}
float min(vec3_t x[]){
    float min = vlen(&x[0]);
    for(int i = 1;i<N;i++){
        float lenght = vlen(&x[i]);
        if(lenght < min){
            min = lenght;
        }
    }
    return min;

}
float max(vec3_t x[]){
    float max = vlen(&x[0]);
    for(int i = 1;i<N;i++){
        float lenght = vlen(&x[i]);
        if(lenght > max){
            max = lenght;
        }
    }
    return max;

}
void multiple(vec3_t *a, vec3_t *b, int k){
    for(int i = 0; i < N; i++){
        b[i].x = (a + i)->x * k;
        b[i].y = (a + i)->y * k;
        b[i].z = (a + i)->z * k;
    }
}
int main()
{
    vec3_t tab[N] = {{0.5,1,1},{4,5,6},{54,76,23}};
    vec3_t tab2[N]={};
    int k = 5;
    float a = min(tab);
    printf("%f \n", a);
    float b = max(tab);
    printf("%f \n", b);
    multiple(tab,tab2,k);
    for(int i = 0; i < N; i++){
        printf("[%.2f, %.2f, %.2f]\n", tab2[i].x, tab2[i].y, tab2[i].z);
    }
    zespolona liczba;
    liczba.a = 3;
    liczba.b = 4;
    float wynik = obliczmodul(liczba);
    printf("%f",wynik);
    return 0;
}
