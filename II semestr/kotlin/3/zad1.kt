fun calculateSum(n: Int): Int {
    var sum = 0


    for (i in 1.. n) {
        sum += i
    }


    return sum
}


fun main() {
    val n = 3
    val sum = calculateSum(n)
    println("Sum from 1 to $n: $sum")
}
