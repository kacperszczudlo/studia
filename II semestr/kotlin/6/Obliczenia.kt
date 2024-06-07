class Obliczenia (val a:Int, val b:Int) {
    fun sub(): Int {
        return a - b
    }
    fun add(): Int{
        return a + b
    }
    fun min(): Int{
        if (a<b) return a
        else return b
    }
    fun max(): Int{
        if (a>b) return a
        else return b
    }
}