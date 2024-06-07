
fun main() {
    println("Hello world")
    val a = 10
    val b = 5

    val obliczenia = Obliczenia(a,b)

    println("Roznica: ${obliczenia.sub()}")
    println("Suma: ${obliczenia.add()}")
    println("Min: ${obliczenia.min()}")
    println("Max: ${obliczenia.max()}")
}