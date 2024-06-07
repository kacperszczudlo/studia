fun trojkat(bok:Int){
    for(x in 1..bok ){
        for(y in 1..x){
                print("#")
        }
        println()
    }
}

fun main(){
    trojkat(10)
}
