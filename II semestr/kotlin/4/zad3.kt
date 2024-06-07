fun listaZnakow(lista: MutableList<String>): Int {
    var sumaZnakow = 0
    for (element in lista){
        sumaZnakow += element.length
    }
    return sumaZnakow
}

fun main() {
    val lista = mutableListOf("Kacper", "Oskar", "Bartek", "Mateusz")
    val suma = listaZnakow(lista)
    println("Suma znakow wszystkich imion: ${suma}")
}
