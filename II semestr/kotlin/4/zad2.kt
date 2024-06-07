fun parzyste(lista: MutableList<Int>) {
    for (element in lista) {
        if (element % 2 == 0) {
            println(element)
        }
    }
}

fun main() {
    val lista = mutableListOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    parzyste(lista)
}
