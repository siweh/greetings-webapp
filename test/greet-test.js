//const { doesNotMatch } = require('assert');
let assert = require('assert')
const GreetMe = require('./../greet');

describe('Greet function', function(){
    const greetings = GreetMe(null);
    
    // context('Given a name and chosen a language', function(){
    //     it('should greet Siweh in IsiXhosa correctly', async function(){
    //         await greetings.greeting('Siweh', 'isixhosa');
    //         let greet = greetings.getMessage();
    //         assert.strictEqual('Molo, Siweh', greet);
    //     });

    //     it('should greet Sibusiso in IsiZulu correctly', async function(){
    //         await greetings.greeting('Sibusiso', 'isizulu');
    //         let greet = greetings.getMessage();
    //         assert.strictEqual('Saw`bona, Sibusiso', greet);
    //     });

    //      it('should greet Litha in English correctly', async function(){
    //          await greetings.greeting('Litha', 'english');
    //          let greet = greetings.getMessage();
    //          assert.strictEqual('Hello, Litha', greet);
    //      });
    // });

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

    // context('Count greeted people', function(){
    //     it('should count how many people were greeted', async function(){
    //         await greetings.greeting('Kholisa', 'isixhosa');
    //         greetings.greeting('Sivuyile', 'english');
    //         greetings.greeting('Anele', 'isizulu');

    //         assert.strictEqual(6, greetings.greetedPeopleCounter());
    //     });
    // });

    // context('Reset web app', function(){
    //     it('should be able to reset everything in the web app', function(){
    //         assert.strictEqual(0, greetings.resetCounter())
    //     });
    // });

});