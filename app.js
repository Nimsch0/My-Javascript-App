const passwordNameLabel = document.querySelector('#passwordName')
const passwordLabel = document.querySelector('#passwordText');
const readSubmit = document.querySelector('#readOnly');
const passwordBtn = document.querySelector('#btnCreate');
const historyBtn = document.querySelector('#historyBtn');
const saveBtn = document.querySelector('#saveBtn');
const div = document.querySelector('.historyPassword');
const minlength = 8;
let todos = [];

const lowch = 'abcdefghijklmnopqrstuvwxyz';
const upch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const symb = '!@#$%^&*()_+-={}[]';
const length = 12;
let createdPassword = lowch + upch + nums + symb;

readSubmit.addEventListener('click', attributeControl)
passwordBtn.addEventListener('click', createPassword)
historyBtn.addEventListener('click', showHistory)
saveBtn.addEventListener('click', savePassword);
div.addEventListener('click', removePassword)

function createPassword(e) {
    e.preventDefault();
    passwordLabel.setAttribute('readonly', 'true');
    let npass = '';
    npass += lowch[Math.floor(Math.random() * lowch.length)];
    npass += upch[Math.floor(Math.random() * upch.length)];
    npass += nums[Math.floor(Math.random() * nums.length)];
    npass += symb[Math.floor(Math.random() * symb.length)];
    while (length > npass.length) {
        npass += createdPassword[Math.floor(Math.random() * createdPassword.length)];
    }
    passwordLabel.value = npass;

}

function savePassword() {
    if(passwordLabel.value==="" || passwordNameLabel.value===""){
        alert('Please create a password and enter a password name!')
        return
    }
    else if (passwordLabel.value.length < minlength) {
        alert(`This is not a suitable length for a password. Minimum password length must be ${minlength} !`);
        return;
    }
    let passwordName = passwordNameLabel.value;
    let creationTime = getTime();
    let savedPassword = {
        pName: passwordName.trim(),
        passWord: passwordLabel.value.trim(),
        date: creationTime
    }

    todos = JSON.parse(localStorage.getItem('password')) || [];
    todos.push(savedPassword);
    localStorage.setItem('password', JSON.stringify(todos))

    passwordNameLabel.value='';
    passwordLabel.value='';
    attributeControl(null);
    getPasswords();
}

function removePassword(e) {
    if (e.target.classList.contains('fa-trash')) {
        let isRemove = confirm('Are you sure you want to delete?')
        if (isRemove) {
            const reLi = e.target.parentElement.parentElement;
            const passwordText = reLi.textContent.match(/Password name:\s(\S+)/)[1];
            todos = JSON.parse(localStorage.getItem('password'))
            todos.forEach((item, index) => {
                if (item.pName === passwordText) {
                    todos.splice(index, 1);
                    localStorage.setItem('password', JSON.stringify(todos));
                    reLi.remove();
                }
            })
        }
        else{
            return;
        }

    }
}

function getTime() {
    let creationTime = new Date();
    let year = creationTime.getFullYear();
    let month = (creationTime.getMonth() + 1).toString().padStart(2, '0');
    let day = creationTime.getDate().toString().padStart(2, '0');
    let hours = creationTime.getHours().toString().padStart(2, '0');
    let minutes = creationTime.getMinutes().toString().padStart(2, '0');
    let fulltime = `${day}-${month}-${year} ${hours}:${minutes}`;
    return fulltime;
}

function getPasswords() {
    todos = JSON.parse(localStorage.getItem('password')) || [];
    div.innerHTML = '';
    todos.forEach(element => {
        const ul = document.createElement('ul');
        const li = document.createElement('li');
        let a = document.createElement("a");
        let i = document.createElement("i");
        ul.className = "savePasswords"
        a.className = "delete-item";
        a.href = "#";
        i.className = "fa-solid fa-trash";
        li.innerHTML = `<b>Password name:</b> ${element.pName} <b>Password:</b> ${element.passWord} <b>Created date:</b> ${element.date}     `;
        div.appendChild(ul);
        ul.appendChild(li);
        li.appendChild(a);
        a.appendChild(i)

    });
}

function attributeControl(e) {
    if(e) e.preventDefault();
    
    if (passwordLabel.hasAttribute('readonly')) {
        passwordLabel.removeAttribute('readonly')

    }
   
    else {
        passwordLabel.setAttribute('readonly', 'true');
    }
}

function showHistory(e) {
    let currentDisplay = window.getComputedStyle(div).display;
    if (currentDisplay === 'none') {
        div.setAttribute("style", "display: block");
        div.innerHTML = '';
        getPasswords();
    }
    else {
        div.style.display = 'none';

    }

}

