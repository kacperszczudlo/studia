class PalindromeChecker(val napis: String) {
val str = napis.lowercase()
fun isPalindrome(): Boolean {
var start = 0
var end = str.length - 1
while (start < end) {
if (str[start] != str[end]) {
return false
}
start++
end--
}
return true
}
}
