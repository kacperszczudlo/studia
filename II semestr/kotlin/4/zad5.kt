fun logowanie(login: String, haslo: String, mapa: MutableMap<String,String>): Boolean{
    return mapa[login] == haslo
}

fun main(){
    println("Podaj login: ")
    val login = readln()
    println("Podaj haslo: ")
    val haslo = readln()

    val mapa = mutableMapOf<String, String>(
        "user1" to "haslo1",
        "user2" to "haslo2"
    )
    if (login != null && haslo != null) {
        val zalogowany = logowanie(login, haslo, mapa)
        if (zalogowany){
            println("logowanie udane")
        }else{
            println("blad logowania. sprawdz login i haslo")
        }
    }else{
        println("podano niepoprawne dane")
    }
}