// singleline comment

/*
1. multiline comments
2. multiline comments
3. multiline comments
*/

// declaring variables
const name = "mike"
let names = "mike"

// const name = "karanja"


//Data types
let age = 35; // number

let AverageMarks = 78.9; // float
const gender = "female"; //string

// operators
let a = 10;
let b = 30;
let sum = a + b;
console.log(sum)
// console.assert()

let rem = a % b
console.log(rem)
let max = Math.max(a, b)
console.log("max value:", max)

// Data structures
let numbers = [1, 2, 3, 5];
console.log(numbers[1])


let student = "velma"

// what happens when you have a class of students

//  Arrays - data same type
let students = ["velma", "jim", "sue", "cephus", "elius", "mike"]

console.log("list of students:", students)

//  Objects - key:values

let listOfStudents = [
    {
        name: "velma",
        id: 44484844,
        phone: "+2547474646464"
    },
    {
        name: "jim",
        id: 4446774,
        phone: "+254747489964"
    },
]


// Accessing Data in Arrays and Objects
// There are two methods ...dot notation and the bracket notation

// Get sue in the students array .....starts from 0--n+
console.log("this is the student that has personal challenges:", students[2]);


// Jimmy wants velma's phone number...

console.log("Velma niaje, nisadie mbana yako:", listOfStudents[0].phone);

