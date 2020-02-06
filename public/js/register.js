'use strict';

const API_BASE_URL = "http://localhost:8080/api/v1";

function register(evt) {
    evt.preventDefault();

    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm_password').value;

    if (!name  && !password && !confirm_password) {
        alert("Fields are required");
        return;
    }
   
    if (password !== confirm_password) {
        alert("Passwords incorrect");
        return;
    }

    const user = {
        name,
        password,
        confirm_password
    }
    doRegister(user)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if(!data.success) {
                alert(data.message);
                return;
            }

            alert(data.message);
            location.href = '/login';
        });
    }

    function doRegister(user) {
        const url = API_BASE_URL+"/users";
        const options = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return fetch(url, options);


}