fun rek(a:Int):Int{
    if (a==0){
        return 0
    }
    else if (a>0){
        return a + rek(a-1)
    }
    else{
        return a + rek(a+1)
    }
}

fun main(){
    var wynik = rek(3)
    println(wynik)
}
