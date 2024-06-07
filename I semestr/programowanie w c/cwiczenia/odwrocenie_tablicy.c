#include <stdio.h>

void reverseArray(int arr[], int size) {
    for (int start = 0, end = size - 1; start < end; start++, end--) {
        int temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        fflush(stdin);
    }
}

int main() {
    int size = 10;
    int array[size];

    printf("Podaj 10 liczb:\n");
    for (int i = 0; i < size; i++) {
        scanf("%d", &array[i]);
        fflush(stdin);
    }

    reverseArray(array, size);

    printf("Odwrocona tablica:\n");
    for (int i = 0; i < size; i++) {
        printf("%d ", array[i]);
    }

    return 0;
}
