fun main() {
    println("Podaj tekst: ")
    val tekst = readln()
    var dlugosc = 0

    for (char in tekst) {
        if (char != ' ' && char != '\t') {
            dlugosc++
        }
    }

    println("Tekst: $tekst, długość: $dlugosc")
}
