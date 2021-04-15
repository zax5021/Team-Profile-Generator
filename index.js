const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer")
const Employee = require("./lib/Employee")
const Engineer = require("./lib/Engineer")
const Intern = require("./lib/Intern")
const Manager = require("./lib/Manager");


const team = [];
let manager;
let employee;

function newManager() {
    console.log("These initial questions are for the Manager, if you aren't the manager please get him/her and have them fill this out:")
    inquirer
        .prompt([{
                type: 'input',
                message: 'What is your name?',
                name: 'name',
            //    commenting out all defaults and console logs as we aren't testing anymore.
                // default: 'Zack',
            },
            {
                type: 'input',
                message: 'What is your employee ID?',
                name: 'Id',
                // default: '41',
            },
            {
                type: 'input',
                message: 'What is your email address?',
                name: 'email',
                // default: 'zack@gmail.com',
            },
            {
                type: 'input',
                message: 'What is your office number',
                name: 'officeNo',
                // default: '50',
            },
        ])
        .then((answers) => {
            // console.log(answers);
            manager = new Manager(answers.name, answers.Id, answers.email, answers.officeNo);
            // console.log(manager)
            // console.log(manager.name)
            anotherEmployee()
        });
}

function anotherEmployee() {
    inquirer.prompt([{
            type: "confirm",
            message: "Are there more employees to add to your team?",
            name: "additionalTeam",
            // default: "y"
        }])
        .then((answer) => {
            // console.log(answer)
            if (!answer.additionalTeam) {
                // console.log(team[0].getRole())
                // using dummy file data for now, will update with generateHTML(manager,team) when I'm convinced the function is working.
                fs.writeFile("./dist/index.html", generateHTML(), function (err) {
                    if (err) {
                        console.log("error")
                    } else {
                        console.log("Processing..... Please check the page now, you should see all team member cards!")
                    }
                })
            } else {
                nextEmployee()
            }
        })
}


function nextEmployee() {
    inquirer.prompt([{
                type: "list",
                message: "What is this employee's role?",
                name: "role",
                choices: ["Intern", "Engineer"]
            },
            {
                type: "input",
                message: "What is the employee's name?",
                name: "name",
                // default: "Dale"
            },
            {
                type: "input",
                message: "What is the employee's id #?",
                name: "Id",
                // default: "99"
            },
            {
                type: "input",
                message: "What is the employee's email?",
                name: "email",
                // default: "email@email.com"
            },
            {
                type: "input",
                message: "Please enter the engineer's gitHub username and password? Just kidding, ONLY username please!",
                name: "github",
                // default: "nonyabusiness",
                when: (answer) => answer.role === "Engineer"
            },
            {
                type: "input",
                message: "Where does the intern go to school? Or where did he/she go to school?",
                name: "school",
                // default: "Bootcamp",
                when: (answer) => answer.role === "Intern"
            },
        ])
        .then((answers) => {
            // console.log(answers.role)
            switch (answers.role) {
                case "Intern":
                    employee = new Intern(answers.name, answers.Id, answers.email, answers.school);
                    break;
                case "Engineer":
                    employee = new Engineer(answers.name, answers.Id, answers.email, answers.github);
                    break;
            }
            // console.log(employee)
            team.push(employee);
            // console.log(team);
            anotherEmployee();
        })

}

function generateHTML() {
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,400i,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css" />
    <link rel="stylesheet" href="./style.css" />
    <title>Team Members</title>
</head>

<body>
    <header class="jumbotron jumbotron-fluid bg-primary text-white custom-jumbotron">
        <div class="container text-center">
            <h1>Meet the Team!</h1>
        </div>
    </header>
    <main class="container-fluid">
        <div class="row justify-content-center">
            <div class="card-deck justify-content-center col-lg-8 col-md-10 col-sm-12">
            ${generateManagerCards()}
            ${generateTeamCards()}
            </div>
            </section>
        </div>
    </main>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.27.0/moment.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js"></script>
    <script src="./script.js"></script>
</body>

</html>`

}

function generateManagerCards() {
    return `<div class="card" style="min-width: 15rem; max-width: 17rem; margin-bottom: 1rem;">
    <div class="card-body dayForecast bg-primary text-white" style="max-height: 7rem">
        <h4 class="card-title">${manager.getName()}</h4>
        <h5 class="card-text"><i class="fas fa-mug-hot"></i> Manager</h5>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">ID: ${manager.getId()}</li>
        <li class="list-group-item">Email <a href="mailto:${manager.getEmail()}"> ${manager.getEmail()}</a>
        </li>
        <li class="list-group-item">Office number: ${manager.getOfficeNo()}</li>
    </ul>
</div>`

}

function generateTeamCards() {
    const cards = [];
    for (let i = 0; i < team.length; i++) {
        if (team[i].getRole() === "Intern") {
            cards.push(`<div class="card" style="min-width: 15rem; max-width: 17rem; margin-bottom: 1rem;">
    <div class="card-body dayForecast bg-primary text-white" style="max-height: 7rem">
        <h4 class="card-title">${team[i].getName()}</h4>
        <h5 class="card-text"><i class="fas fa-dollar-sign"></i> Intern</h5>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">ID: ${team[i].getId()}</li>
        <li class="list-group-item">Email <a href="mailto:${team[i].getEmail()}"> ${team[i].getEmail()}</a>
        </li>
        <li class="list-group-item">School: ${team[i].getSchool()}</li>
    </ul>
</div>`)
        } else {
            cards.push(`<div class="card" style="min-width: 15rem; max-width: 17rem; margin-bottom: 1rem;">
        <div class="card-body dayForecast bg-primary text-white" style="max-height: 7rem">
            <h4 class="card-title">${team[i].getName()}</h4>
            <h5 class="card-text"><i class="fas fa-hard-hat"></i> Engineer</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: ${team[i].getId()}</li>
            <li class="list-group-item">Email <a href="mailto:${team[i].getEmail()}"> ${team[i].getEmail()}</a>
            </li>
            <li class="list-group-item">GitHub <a href="https://github.com/${team[i].getGithub()}"> ${team[i].getGithub()}</a>
            </li>
        </ul>
    </div>`)

        }
    }
    return cards.join('')
}

newManager();