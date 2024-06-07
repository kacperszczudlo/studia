fun main(){
    val message = "dowolnyciagznakowy"
    var tekst = 1
    for(char in message){
        if(tekst%2==0){
            println(char)
        }
        tekst++
    }
}