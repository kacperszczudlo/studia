#include <stdio.h>

float srednia(int *array, int size) {
    int suma = 0;
    for (int i = 0; i < size; i++) {
        suma += *(array + i);
    }
    return (float)suma / size;
}

int minValue(int *array, int size){

    int min = *array;
    int position = 0;
    for(int i=0; i<size; i++){
        if(*(array+i)<min){
            min = *(array+i);
            position = i;
        }
    }
    return position;
}
int maxValue(int *array, int size){

    int max = *array;
    int position = 0;
    for(int i=0; i<size; i++){
        if(*(array+i)>max){
            max = *(array+i);
            position = i;
        }
    }
    return position;
}

int main() {
    int size;
    printf("Podaj rozmiar tablicy: ");
    scanf("%d", &size);

    int array[size];

    printf("Podaj %d liczb całkowitych oddzielonych spacja:\n", size);
    for (int i = 0; i < size; i++) {
        scanf("%d", &array[i]);
    }

    float avg = srednia(array, size);
    int  min = minValue(array, size);
    int max = maxValue(array, size);

    printf("Srednia arytmetyczna: %.2f\n", avg);
    printf("Pozycja minimalna: %d\n", min);
    printf("Pozycja maksymalna: %d\n", max);
    return 0;
}
