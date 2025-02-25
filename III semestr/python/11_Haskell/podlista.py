def find_sublist(lst, sublst, index=0):
    def is_sublist_at_index(lst, sublst, index):
        return lst[index:index+len(sublst)] == sublst

    if index + len(sublst) > len(lst):
        return -1
    elif is_sublist_at_index(lst, sublst, index):
        return index
    else:
        return find_sublist(lst, sublst, index + 1)

lista = [1, 2, 3, 4, 5, 6, 7]
podlista = [4, 5, 6]
indeks = find_sublist(lista, podlista)
print(indeks)
