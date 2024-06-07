fun main(){
    println("Podaj dlugosc boku kwadratu: ")
    val bok = readln()
    val bokToInt = bok.toInt()
    for (i in 1 .. bokToInt){
        for (j in 1 .. bokToInt){
            if(i==1 || j==1 || i==bokToInt || j==bokToInt){
                print("#")
            }else{
                print(" ")
            }
        }
        println()
    }
}
