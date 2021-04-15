const Intern = require("../lib/Intern");

describe('Intern', () => {
    describe('Initialization', () => {
        it('should create an object with a name, Id, email, github, and role if provided any arguments', () => {
            const intern = new Intern('Zack', 33, 'zack@gmail.com', "USC");

            expect(intern.getName()).toEqual('Zack');
            expect(intern.getId()).toEqual(33);
            expect(intern.getEmail()).toEqual('zack@gmail.com');
            expect(intern.getSchool()).toEqual('USC');
            expect(intern.getRole()).toEqual('Intern');
        });
    });
});