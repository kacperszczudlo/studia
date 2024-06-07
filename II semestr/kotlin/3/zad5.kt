fun FizzBuzz(a:Int){
    for (result in 1..a){
        if (result%3==0 && result%5==0){
            println("${result} - FizzBuzz")
        }
        else if (result%3==0){
            println("${result} - Fizz")
        }
        else if (result%5==0){
            println("${result} - Buzz")
        }
        else{
            println(result)
        }
    }
}

fun main(){
    FizzBuzz(100)
}