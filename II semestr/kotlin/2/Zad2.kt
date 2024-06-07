fun main(){
    println("Podaj podstawa: ")
    val podstawaAsString = readln()
    println("Podaj wykladnik: ")
    val wykladnikAsString = readln()

    val podstawaAsInt = podstawaAsString.toInt()
    var wykladnikAsInt = wykladnikAsString.toInt()

    var wynik = 1

    if(wykladnikAsInt>0){
        while (wykladnikAsInt>0){
            wynik = wynik * podstawaAsInt
            wykladnikAsInt--
        }
        println("Wynik: ${wynik}")
    }else{
        println("potega musi byc wieksza od 0")
    }

}