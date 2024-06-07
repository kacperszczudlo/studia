fun konwertowanie(cyfraRzymska: String,lista: MutableMap<String, Int>):Int?{
    return lista[cyfraRzymska]
}

fun main(){
    val lista = mutableMapOf(
        "I" to 1,
        "II" to 2,
        "III" to 3,
        "IV" to 4,
        "V" to 5, 
        "VI" to 6,
        "VII" to 7,
        "VIII" to 8,
        "IX" to 9
    )
    println("Podaj cyfre rzymska (I - IX): ")
    val cyfraRzymska = readln()
    val wynik = konwertowanie(cyfraRzymska, lista)
    if(wynik!=null){
        println("Cyfra rzymska ${cyfraRzymska} odpowiada liczbie arabskiej ${wynik}")
    }else{
        println("Podana cyfra rzymska nie istnieje w mapie")
    }
}