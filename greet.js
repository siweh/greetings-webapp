module.exports = function GreetMe(dbCredentials){
    var greetingMessage = '';
    var errorMessage = '';
    const { Client } = require('pg');

    async function greeting(username, language){
        function capitalizingFirstLetter() {
            return username[0].toUpperCase() + username.slice(1).toLowerCase();
            //return name.toLowerCase().replace(/^./, str => str.toUpperCase());
        }
        //console.log(language);
        //console.log(name);
        var regName = /^[a-zA-Z]{3,15}$/;
        
        if (username === ''){
            greetingMessage = '';
            errorMessage = 'Please enter a name';
        }else{
            if(regName.test(username)){
                if(language !== undefined){
                    errorMessage= '';
                    var user = await getUser(username.toLowerCase());
                    //console.log(user.rowCount);
                    if (user.rowCount === 0) {
                        await addUser(username.toLowerCase(), 1);
                    }else {
                       await updatePersonCounter(username.toLowerCase());
                    }
                    //console.log(greetedPeople);
                    if (language === 'isixhosa'){
                        greetingMessage = 'Molo, ' + capitalizingFirstLetter();
                    }else if (language === 'isizulu'){
                        greetingMessage = 'Saw`bona, ' + capitalizingFirstLetter();
                    }else if (language === 'english'){
                        greetingMessage = 'Hello, ' + capitalizingFirstLetter();
                    }
                }else{
                    greetingMessage = '';
                    errorMessage = 'Please choose a language to be greeted in';
                }
            }else{
                greetingMessage = '';
                errorMessage = 'Name should not contain numbers or special characters';
            }
        }
    }

    async function updatePersonCounter(username) {
        var user = await getUser(username);
        var counter =  user.rows[0].number_of_greetings + 1;

        await updateUserCounter(username, counter);
    }

    async function getPersonCounter(username) {
        var user = await getUser(username);
        //console.log(user);
        var user =  user.rows[0];
        return user;
    }

    function getErrorMsg() {
        return errorMessage;
    }
    function getMessage() {
        return greetingMessage;
    }

    async function greetedPeopleCounter() {
        var usersGreeted = await getUsers();
       //console.log(usersGreeted.rows);
        return usersGreeted.rows.length;
    }

   async function getGreetedPeople() {
        var usersGreeted = await getUsers();
       //console.log(usersGreeted.rows);
        return usersGreeted.rows;
        
    }

    async function resetCounter() {
        await deleteUsers();
    }

    //database functions
    async function addUser(username, number_of_greetings){
        const client = new Client(dbCredentials);
        const query = `INSERT INTO users (username, number_of_greetings)
            VALUES ('${username}', ${number_of_greetings})
            `;
            try {
                await client.connect();
                //console.log(query);
                client.query(query, async (err, res) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log('Data saved successful');
                    await client.end();
                });
            } catch (error) {
                console.log(error);
            }
            
    }
    async function getUsers(){
        const client = new Client(dbCredentials);
        const query = `SELECT * FROM users`;
        await client.connect();
        
        var results = await client.query(query);
        await client.end();
        return results;
    }
    
    async function getUser(username){
        const client = new Client(dbCredentials);
        const query = `SELECT * FROM users WHERE username='${username}'`;
        await client.connect();
        
        var results = await client.query(query);
        await client.end();
        return results;
    }
    async function deleteUsers(){
        const client = new Client(dbCredentials);
        const query = `DELETE FROM users WHERE users.id >= 1`;
        try {
            await client.connect();
            client.query(query, async (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Data deleted successful');
                await client.end();
            });
        } catch (error) {
            console.log(error);
        }
    }
    
    async function updateUserCounter(username, number_of_greetings){
        const client = new Client(dbCredentials);
        const query = `UPDATE users
        SET number_of_greetings = ${number_of_greetings}
        WHERE username = '${username}'`;
        await client.connect();
        try {
            //await client.connect();
            client.query(query, async (err, res) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Data updated successful');
                await client.end();
            });
        } catch (error) {
            console.log(error);
        }
    }

    //end of database functions

    return {
        greeting,
        getMessage,
        greetedPeopleCounter,
        getGreetedPeople,
        getErrorMsg,
        resetCounter,
        getPersonCounter,
        addUser,
        getUsers,
        getUser,
        deleteUsers,
        updateUserCounter,
    }
} 