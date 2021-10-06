let assert = require('assert')
const GreetMe = require('./../greet');

describe('Greet function', function(){
    const greetings = GreetMe(null);

    context('Not given enough inputs', function(){
        const greetings = GreetMe(null);
        it('should give an error saying Please enter a name', async function(){
            await greetings.greeting('', 'english');
            let error = greetings.getErrorMsg();
            assert.strictEqual('Please enter a name', error);
        });

        it('should give an error saying please choose a language to be greeted in', async function(){
            await greetings.greeting('Yolanda', );
            let errors = greetings.getErrorMsg();
            assert.strictEqual('Please choose a language to be greeted in', errors);
        });

        it('should give an error saying Please enter a name when both name and language is not specified', async function(){
            await greetings.greeting('', );
            let emptyFields = greetings.getErrorMsg();
            assert.strictEqual('Please enter a name', emptyFields);
        });
    });

    context('Given invalid inputs', function(){
        it('should give an error saying Name should not contain numbers or special characters', async function(){
            await greetings.greeting('Larry234', 'english');
            let numName = greetings.getErrorMsg();
            assert.strictEqual('Name should not contain numbers or special characters', numName);
        });

        it('should give an error saying Name should not contain numbers or special characters', async function(){
            await greetings.greeting('123', 'isixhosa');
            let numError = greetings.getErrorMsg();
            assert.strictEqual('Name should not contain numbers or special characters', numError);
        });
    });
});