class Circle(val radius :Double, val pi:Double) {
    fun pole():Double{
        return pi * (radius  * radius )
    }
    fun obwod():Double{
        return 2 * pi * radius
    }
}