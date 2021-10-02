const assert = require('assert');
const GreetMe = require('./../greet');

const dbCredentials = {
    user: "fuphzusmlzuxlv",
    password: "d1e77026ad1b268f6c9d181f88d5ae400aac8f443a2a0f82dcdce6ca9b140d70",
    host: "ec2-52-45-238-24.compute-1.amazonaws.com",
    port: 5432,
    database: "dcfs4ju2fpmtri",
    ssl: {
        rejectUnauthorized: false
    }
};

describe('Greetings webapp database', function(){
    beforeEach(async function(){
        console.log("*****");
        let greetings = GreetMe(dbCredentials);
        await greetings.deleteUsers();
    });

    it('should be able to add a user', async function(){
        let greetings = GreetMe(dbCredentials);
        await greetings.addUser('siweh', 1);
        let addedUser = await greetings.getUser('siweh');
        assert.equal('siweh', addedUser.rows[0].username);
    });

    it('should be able to update a user counter', async function(){
        let greetings = GreetMe(dbCredentials);
        await greetings.addUser('siweh', 1);
        await greetings.updateUserCounter('siweh', 2);
        let addedUser = await greetings.getUser('siweh');
        //console.log(addedUser);
        assert.equal(2, addedUser.rows[0].number_of_greetings);
    });

    it('should be able to get all users', async function(){
        let greetings = GreetMe(dbCredentials);
        await greetings.addUser('siweh', 1);
        await greetings.addUser('inga', 1);
        await greetings.addUser('sibusiso', 1);
        let addedUser = await greetings.getUsers();
        //console.log(addedUser);
        assert.equal(3, addedUser.rows.length);
    });
    
});