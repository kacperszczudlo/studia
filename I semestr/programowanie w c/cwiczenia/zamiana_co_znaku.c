#include <stdio.h>

int main() {
    int arr[] = {1, 2, 3, 4, 5,6,7,8,9,10,11};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Original Array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }

    for (int i = 1; i < n; i += 4) {
        int temp = arr[i];
        arr[i] = arr[i + 2];
        arr[i + 2] = temp;
    }

    printf("\nArray with Swapped Second Elements: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }

    return 0;
}
