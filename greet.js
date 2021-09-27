const { getUsers, deleteUsers, insertUsers, getUser, updateUserCounter } = require("./dbConnect");

module.exports = function GreetMe(){
    var greetingMessage = '';
    var errorMessage = '';

    async function greeting(username, language){
        function capitalizingFirstLetter() {
            return username[0].toUpperCase() + username.slice(1).toLowerCase();
            //return name.toLowerCase().replace(/^./, str => str.toUpperCase());
        }
        //console.log(language);
        //console.log(name);
        language?.toLowerCase();
        var regName = /^[a-zA-Z]{3,15}$/;
        
        if (username === ''){
            greetingMessage = '';
            errorMessage = 'Please enter a name';
        }else{
            if(regName.test(username)){
                if(language !== undefined){
                    errorMessage= '';
                    var user = await getUser(username.toLowerCase());
                    console.log(user.rowCount);
                    if (user.rowCount === 0) {
                        await insertUsers(username.toLowerCase(), 1);
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
        console.log(user);
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

    return {
        greeting,
        getMessage,
        greetedPeopleCounter,
        getGreetedPeople,
        getErrorMsg,
        resetCounter,
        getPersonCounter
    }
} 