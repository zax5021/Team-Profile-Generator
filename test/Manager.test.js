const Manager = require("../lib/Manager");

describe('Manager', () => {
    describe('Initialization', () => {
        it('should create an object with a name, Id, email, github, and role if provided any arguments', () => {
            const manager = new Manager('Zack', 33, 'zack@gmail.com', 314);

            expect(manager.getName()).toEqual('Zack');
            expect(manager.getId()).toEqual(33);
            expect(manager.getEmail()).toEqual('zack@gmail.com');
            expect(manager.getOfficeNo()).toEqual(314);
            expect(manager.getRole()).toEqual('Manager');
        });
    });
});