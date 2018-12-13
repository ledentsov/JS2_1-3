function validateFunction(){
let tel = document.getElementById("validateTel").value;

let email = document.getElementById("validateEmail").value;

if(!/\+7\(\d\d\d\)\d\d\d-\d\d\d\d/.test(tel)){
    document.getElementById("validate1").innerHTML = "Значение не соотвествует шаблону";
} else document.getElementById("validate1").innerHTML = "Cпасибо за соответствие!";

let w1 = /\w+\@\w+\.\w+/.test(email);
let w2 = /\w+\.\w+\@\w+\.\w+/.test(email);
let w3 = /\w+\-\w+\@\w+\.\w+/.test(email);//не требуется соответствует выражению 1 
console.log(w1);
console.log(w2);
console.log(w3);
if(w1||w2||w3 == true){
    document.getElementById("validate2").innerHTML = "Cпасибо за соответствие!";
} else document.getElementById("validate2").innerHTML = "Значение не соотвествует шаблону";

}
