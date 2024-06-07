fun main() {
    println("Hello AT!")

    val bok1 = 3.0
    val bok2 = 4.0
    val bok3 = 5.0
    val promien = 10.0
    val pi = 3.14

    val triangle = Triangle(bok1, bok2, bok3)
    val circle = Circle(promien, pi)

    println("Pole trójkąta wynosi: ${triangle.pole()}")
    println("Obwód trójkąta wynosi: ${triangle.obwod()}")

    println("Pole koła wynosi: ${circle.pole()}")
    println("Obwód koła wynosi: ${circle.obwod()}")
}
