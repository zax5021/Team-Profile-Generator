const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer")
const Employee = require("./lib/Employee")
const Engineer = require("./lib/Engineer")
const Intern = require("./lib/Intern")
const Manager = require("./lib/Manager")

const team = [];
let manager;

function newManager() {
    console.log("These initial questions are for the Manager, if you aren't the manager please get him/her and have them fill this out:")
    inquirer
        .prompt([{
                type: 'input',
                message: 'What is your name?',
                name: 'managerName',
                default: 'Zack',
            },
            {
                type: 'input',
                message: 'What is your employee ID?',
                name: 'managerId',
                default: '41',
            },
            {
                type: 'input',
                message: 'What is your email address?',
                name: 'managerEmail',
                default: 'zack@gmail.com',
            },
            {
                type: 'input',
                message: 'What is your office number',
                name: 'managerOfficeNo',
                default: '50',
            },
        ])
        .then((answers) => {
            console.log(answers);
            manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNo);
            console.log(manager)
            console.log(manager.name)
            anotherEmployee()
        });
}

function anotherEmployee() {

    inquirer.prompt([{
            type: "confirm",
            message: "Are there more employees to add to your team?",
            name: "additionalTeam",
            default: "y"
        }])
        .then((answer) => {
            if (!answer) {
                console.log("all done, we'll have your page ready in a sec")
                return
            } else {
                nextEmployee()
            }
        });
}

function nextEmployee() {
    inquirer.prompt([{
            type: "list",
            message: "What is this employee's role?",
            name: "employeeRole",
            choices: ["Intern", "Engineer"]
        },
        {
            type: "input",
            message: "What is the employee's name?",
            name: "employeeName"
            default: "Dale"
        },
        {
            type: "input",
            message: "What is the employee's id #?",
            name: "employeeId"
            default: "99"
        },
        {
            type: "input",
            message: "What is the employee's email?",
            name: "employeeEmail"
            default: "email@email.com"
        },
        {
            type: "input",
            message: "Please enter the engineer's gitHub username and password? Just kidding, ONLY username please!",
            name: "github",
            default: "nonyabusiness"
            when: (answer) => answer.employeeRole === "Engineer"
        },
        {
            type: "input",
            message: "Where does the intern go to school? Or where did he/she go to school?",
            name: "school",
            default: "Bootcamp"
            when: (answer) => answer.employeeType === "Intern"
        },
    ]);

}


newManager();