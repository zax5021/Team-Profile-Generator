const Employee = require('./Employee');

class Engineer extends Employee {
    constructor(empname, id, email, github){
        super(empname, id, email);
        this.github= github;
     }

     getRole(){
         return "Engineer";
     
    }
}

module.exports = Engineer;