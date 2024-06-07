
fun main() {
    val a = 10.0
    val b = 5.0

    val calc = Calculator(a,b)

    println("Dodawanie: ${calc.sum()}")
    println("Odejmowanie: ${calc.sub()}")
    println("Mnozenie: ${calc.mul()}")
    println("Dzielenie: ${calc.div()}")
}
