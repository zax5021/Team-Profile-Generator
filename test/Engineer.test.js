const Engineer = require("../lib/Engineer");

describe('Engineer', () => {
    describe('Initialization', () => {
        it('should create an object with a name, Id, email, github, and role if provided any arguments', () => {
            const engineer = new Engineer('Zack', 33, 'zack@gmail.com', "zax5021");

            expect(engineer.getName()).toEqual('Zack');
            expect(engineer.getId()).toEqual(33);
            expect(engineer.getEmail()).toEqual('zack@gmail.com');
            expect(engineer.getGithub()).toEqual('zax5021');
            expect(engineer.getRole()).toEqual('Engineer');
        });
    });
});