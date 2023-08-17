

// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register(){
    first_name = document.getElementById('first_name').value
    last_name = document.getElementById('last_name').value
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    confirm_password = document.getElementById('confirm-password').value

    if(validate_email(email) == false || validate_password(password) == false || validate_password(confirm_password) == false){
        alert('Email or Password is Outta Line!!')
        return
    }

    if(validate_field(first_name) == false || validate_field(last_name) == flase){
        alert('One or more fields is Outta Line!!')
        return
    }

    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function(){

        var user = auth.currentUser

        var database_ref = database.ref()

        var user_data = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            last_login: Data.now() 
        }

        database_ref.child('users/' + user.uid).set(user_data)
        alert('User Created!!')
    })
    .catch(function(error){
        var error_code = error.code
        var error_message = error.message

        alert(error_message)
    })
}

function validate_email(email){
    expression = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(expression.test(email) == true){
        return true // Email is good.
    }else{
        return false // Email is not good.
    }
}

function validate_password(password){
    if(password < 6){
        return false
    } else {
        return true
    }
}

function validate_field(field){
    if(field == null){
        return false
    }

    if(field.length <= 0){
        return false
    } else {
        return true
    }
}


