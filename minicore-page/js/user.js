// Validate full registration form
async function registration() {
    const d = document;
    var valid = true;
    const firstName = d.getElementById("firstName")
    const lastName = d.getElementById("lastName")
    const gender = d.querySelector('input[name="genderOption"]:checked')
    const birthday = d.querySelector(".birthdayDate")
    const email = d.getElementById("email")
    const formPass = d.querySelector("#formPassP")
    const phone = d.getElementById("phoneNumber")

    valid = validName(firstName) && valid
    valid = validName(lastName) && valid
    valid = validDate(birthday) && valid
    valid = validEmail(email) && valid
    valid = validPass() && valid
    valid = validPhone(phone) && valid

    if (valid) {
        var newEntry = {
            "user": firstName.value,
            "surn": lastName.value,
            "pass": formPass.value,
            "email": email.value,
            "bday": birthday.value,
            "gender": gender.value,
            "lastCart": []
        }

        console.log("ended")

        localStorage.setItem('user', JSON.stringify(newEntry))

        window.location.replace("./index.html")
        alert("Su cuenta fue creada de forma correcta.")
    }
}

function validName(input) {
    var valid = false
    valid = /^[a-zA-Z()]+$/.test(input.value)
    border(input, valid)
    return valid
}

function validDate(bdayClass) {
    var valid = false
    bday = bdayClass.value.split("-")
    bday = [parseInt(bday[0]), parseInt(bday[1]), parseInt(bday[2])]

    if (bday[0] <= 2003 && bday[0] > 1900) {
        switch (bday[1]) {
            case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                valid = bday[2] <= 31
                break
            case 4: case 6: case 9: case 11:
                valid = bday[2] <= 30
                break
            case 2:
                leapyear = ((bday[0] % 4 == 0) && (bday[0] % 100 != 0)) || (bday[0] % 400 == 0)
                if (leapyear) {
                    valid = bday[2] <= 29
                } else {
                    valid = bday[2] <= 28
                }
                break;
        }
    }

    border(bdayClass, valid)
    return valid
}

function validEmail(input) {
    var valid = false
    valid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input.value)
    border(input, valid)
    if (input.value == 'admin') {
        valid = true;
        border(input, valid)
    }
    return valid
}

function validPhone(input) {
    var valid = false
    valid = /^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{7})$/.test(input.value)
    border(input, valid)
    return valid
}

function validPass(input = "") {
    if (input == "") {
        var valid = false
        const d = document;
        const p = d.querySelector('#formPassP')
        const pr = d.querySelector('#formPassRepeat')

        var validP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(p.value)
        var validR = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pr.value)
        samePass = p.value == pr.value

        if (validP) {
            border(p, validP)
            if (samePass) {
                border(pr, validR)
            } else {
                border(pr, false)
            }
        } else {
            border(p, false)
            border(pr, false)
        }

        return samePass
    } else {
        if (input.value == 'admin') {
            border(input, true)
        } else {
            border(input, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(input.value))
        }
    }
}

function isAdmin() {
    const email = document.querySelector('#formEmail')
    const pass = document.querySelector('#formPassword')
    if (email.value == 'admin' && pass.value == 'admin') {
        alert("\nLogin successful to admin account.\nIngreso exitoso a la cuenta de admin.")
    }
}

function border(element, status) {
    if (status) {
        element.style.borderColor = "green";
    } else {
        element.style.borderColor = "red";
    }
}