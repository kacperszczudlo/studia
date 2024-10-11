#include <stdio.h>
#include <stdlib.h>

int main() {
    int length;

    printf("Podaj dlugosc tablicy: ");
    scanf("%d", &length);

    int *array = (int *)malloc(length * sizeof(int));

    if (array == NULL) {
        return -1;
    }
    for (int i = 0; i < length; i++) {
        array[i] = i + 1;
    }
    for (int i = 0; i < length; i++) {
        printf("%d ", array[i]);
    }
    printf("\n");

    int *tempArray = (int *)realloc(array, 2 * length * sizeof(int));
    if (tempArray == NULL) {
        free(array);
        return -1;
    } else {
        array = tempArray;
    }
    for (int i = length; i < 2 * length; i++) {
        array[i] = 2 * length - i;
    }
    for (int i = 0; i < 2 * length; i++) {
        printf("%d ", array[i]);
    }
    printf("\n");

    free(array);

    return 0;
}
