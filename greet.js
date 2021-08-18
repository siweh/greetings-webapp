module.exports = function GreetMe(greetedPeopleList = []){
    var greetedPeople = greetedPeopleList !==  null ? greetedPeopleList : [];
    var greetingMessage = '';
    var errorMessage = '';

    function greeting(name, language){
        function capitalizingFirstLetter() {
            return name[0].toUpperCase() + name.slice(1).toLowerCase();
            //return name.toLowerCase().replace(/^./, str => str.toUpperCase());
        }
        //console.log(language);
        //console.log(name);
        language?.toLowerCase();
        var regName = /^[a-zA-Z]{3,15}$/;
        
        if (name === ''){
            greetingMessage = '';
            errorMessage = 'Please enter a name';
        }else{
            if(regName.test(name)){
                if(language !== undefined){
                    errorMessage= '';
                    if (!greetedPeople.includes(name.toLowerCase())){
                        greetedPeople.push(name.toLowerCase());
                    }
                    
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

    function getErrorMsg() {
        return errorMessage;
    }
    function getMessage() {
        return greetingMessage;
    }

    function greetedPeopleCounter() {
        return greetedPeople.length;
    }

    function getGreetedPeople() {
        return greetedPeople;
    }

    function resetCounter() {
        var reset = greetedPeopleCounter();
        reset = 0;
        location.reload();
        return reset;
    }

    return {
        greeting,
        getMessage,
        greetedPeopleCounter,
        getGreetedPeople,
        getErrorMsg,
        resetCounter
    }
} 