from functools import reduce

def insert(sorted_list, elem):
    match sorted_list:
        case []:
            return [elem]
        case [first, *rest] if elem <= first:
            return [elem] + sorted_list
        case [first, *rest]:
            return [first] + insert(rest, elem)

def insertion_sort(lst):
    return reduce(insert, lst, [])

unsorted_list = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
sorted_list = insertion_sort(unsorted_list)
print(sorted_list)
