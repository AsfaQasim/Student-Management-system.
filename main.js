#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import showBanner from "node-banner";
class student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = student.counter++;
        this.name = name;
        this.courses = []; // initialize an array for courses
        this.balance = 100;
    }
    // Method to enroll a student in a course 
    enroll_course(course) {
        this.courses.push(chalk.bgBlack.italic(course));
    }
    // Method to view a student balance
    view_balance() {
        console.log(chalk.bgBlackBright.italic(`Balance for ${this.name}: $${this.balance}`));
    }
    // Method to pay student fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$${amount} Fees paid successfully ${this.name}`);
        console.log(chalk.bgBlackBright.italic(`Remaining balance : $${this.balance}`));
    }
    // Method to display student status
    show_status() {
        console.log(chalk.bgBlue.bold(`ID: ${this.id}`));
        console.log(chalk.bgBlue.bold(`Name: ${this.name}`));
        console.log(chalk.bgBlue.bold(`Courses: ${this.courses} `));
        console.log(chalk.bgBlue.bold(`Balance: ${this.balance}`));
    }
}
// Defining a student_manager class to manage students
class student_manager {
    students;
    constructor() {
        this.students = [];
    }
    // Method to add a new student
    add_student(name) {
        let Student = new student(name);
        this.students.push(Student);
        console.log(chalk.bgBlackBright.italic(`Student: ${name} added successfully. student ID: ${Student.id}`));
    }
    // Method to enroll a student in a course
    enroll_student(student_id, course) {
        let student = this.students.find(std => std.id === student_id);
        if (student) {
            student.enroll_course(course);
            console.log(chalk.bgBlackBright.italic(`${student.name} enrolled in ${course} successfully`));
        }
    }
    // Method to view a student balance
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log(chalk.bgBlackBright.italic("student not found, please enter a correct student id"));
        }
    }
    // Method to pay student fees
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log(chalk.bgBlackBright.italic("Student not found, please enter a correct student id"));
        }
    }
    // Method to display student status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    // Method to find student by student id
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
// Main function to run the program
async function main() {
    let newBanner = async () => {
        await showBanner("SMS", "Code With Asifa M.Qasim");
    };
    await newBanner();
    let Student_manager = new student_manager();
    // While loop to keep program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "Choice",
                type: "list",
                message: "Select an option",
                choices: ["Add Student", "Enroll Student", "View Student Balance", "Pay Fees", "Show Status", "Exit"]
            }
        ]);
        // Using  switch case to handle user choice
        switch (choice.Choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "Name",
                        type: "input",
                        message: "Enter a student name",
                    }
                ]);
                Student_manager.add_student(name_input.Name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID"
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a course name"
                    }
                ]);
                Student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student id",
                    }
                ]);
                Student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay",
                    }
                ]);
                Student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID"
                    }
                ]);
                Student_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log("Exiting...");
                process.exit();
        }
    }
}
// calling a main function
main();
