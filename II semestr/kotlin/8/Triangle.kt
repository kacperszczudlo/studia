import kotlin.math.sqrt

class Triangle (val a: Double, val b: Double, val c: Double) {
    fun pole():Double {
        val p = (a+b+c)/2
        return sqrt(p*(p-a)*(p-b)*(p-c))
    }
    fun obwod():Double {
        return a+b+c
    }
}