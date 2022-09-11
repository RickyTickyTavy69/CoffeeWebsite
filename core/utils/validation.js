function getCode(){
let number = new Date();
number = number.getTime();
number = String(number).slice(String(number).length - 5);
return number;
}

let code = getCode();


export default code;