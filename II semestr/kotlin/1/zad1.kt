fun main(){
    var a: Int = 2
    var b: Int = 5
    var wysokosc: Int = 3
    var r: Int = 5
    var pi: Double = 3.14
    var poletrapezu: Int = ((a+b)*wysokosc)/2
    var poletrojkata: Int = (a*wysokosc)/2
    var polekola: Double = pi*(r*r)
    var pierwsza: Double = 1.11
    var druga: Double = 2.22
    var trzecia: Double = 3.33
    var sredniaarytmetyczna: Double = (pierwsza+druga+trzecia)/3
    var message: String = "Pole trapezu wynosi: ${poletrapezu}, pole trojkata wynosi: ${poletrojkata}, pole kola: ${polekola}"
    var wyniksrednia: String = "Srednia arytmetyczna wynosi: ${sredniaarytmetyczna}"

    println(message)
    println(wyniksrednia)
}
