const Employee = require("../lib/Employee");

describe('Employee', () => {
    describe('Initialization', () => {
        it('should create an object with a name, Id, email, and role if provided any arguments', () => {
            const employee = new Employee('Zack', 33, 'zack@gmail.com');

            expect(employee.getName()).toEqual('Zack');
            expect(employee.getId()).toEqual(33);
            expect(employee.getEmail()).toEqual('zack@gmail.com');
            expect(employee.getRole()).toEqual('Employee');
        });
    });
});