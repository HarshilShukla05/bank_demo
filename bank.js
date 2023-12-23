'use strict'

//----variable----//

const welcome = document.querySelector(".welcome");
const user = document.querySelector(".user");
const pswrd = document.querySelector(".pswrd");
const btnlogin = document.querySelector(".btnlogin");
const movement = document.querySelector(".movement");
const cbal = document.querySelector(".cbal");
const in1 = document.querySelector(".in");
const out = document.querySelector(".out");
const int = document.querySelector(".int");
const app = document.querySelector(".app");
const transfer_id = document.querySelector(".transfer_id");
const transfer_amt = document.querySelector(".transfer_amt");
const transfer_btn = document.querySelector(".transfer_btn");
const closeid = document.querySelector(".closeid");
const closepswrd = document.querySelector(".closepswrd");
const close = document.querySelector(".close");
const reqamt = document.querySelector(".reqamt");
const reqbtn = document.querySelector(".reqbtn");
const sort = document.querySelector(".sort");
const details = document.querySelector(".details");



//----values----//


const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300, -1500, 5000],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];


//----logic----//

function updateUI(acc) {
  //display movement
  displaymoment(acc.movements);
  //display balance
  displaycurrentbal(acc);
  //display summary
  summary(acc);
}

//----login----//
let cAccount;
btnlogin.addEventListener('click', login);

function login() {
  cAccount = accounts.find(acc => acc.username === user.value);

  if (cAccount?.pin === Number(pswrd.value)) {
    welcome.textContent = `Welcome back, ${cAccount.owner.split(" ")[0]}`;
    app.style.opacity = 1;
    details.style.position="relative";
    details.style.top="2rem";
  }

 
  user.value = pswrd.value = "";
  //update
  updateUI(cAccount);

}






//----current balance----//

const displaycurrentbal = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, acc.movements[0]);
  cbal.textContent = `₹ ${acc.balance}`;
}


//----display Movement----//

const displaymoment = function (movements, sorting=false) {
  movement.innerHTML = "";
  console.log("sort");
  const moves = sorting?movements.slice().sort((a,b)=>a-b):movements;
  moves.forEach(function (mov, i) {
    const type = mov > 0 ? 'Deposite' : 'Withdrawl';

    const html = `
        <div class="deposite transition">
                 <span class="${type} clr"> ${mov > 0 ? '&downarrow;' : '&uparrow;'} ${type}</span> 
                 <span class="date">TODAY</span> 
                 <span class="money">₹ ${Math.abs(mov)}</span>
        </div>
        `;

    movement.insertAdjacentHTML('afterbegin', html);
  });

};

//----username----//

const createusername = function (accounts) {
  accounts.forEach(function (acc) {
    acc.username = acc.owner.toLowerCase().split(" ").map(name => name[0]).join("");
  });
};
createusername(accounts);
console.log(account1);

//----SUMMARY----//

const summary = function (acc) {

  const deposite = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov);
  in1.textContent = `₹ ${deposite}`;

  const withdwal = acc.movements.filter(mov => mov < 0).length === 0 ? 0 : acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov);
  out.textContent = `₹ ${Math.abs(withdwal)}`;

  const intrest = acc.movements.filter(mov => mov > 0).map((mov) => (mov * acc.interestRate) / 100).reduce((acc, mov) => acc + mov);
  int.textContent = `₹ ${intrest.toFixed(2)}`;
}


//----transfer money----//

transfer_btn.addEventListener('click', function () {

  const tamt = Number(transfer_amt.value);
  const tid = accounts.find(acc => acc.username === transfer_id.value);
  transfer_amt.value = transfer_id.value = "";
  if (tamt <= cAccount.balance && tamt > 0 && tid && tid.username !== cAccount.username) {
    cAccount.movements.push(-tamt);
    tid.movements.push(tamt);
  }
  //update
  updateUI(cAccount);
});


//----Close Account----//

close.addEventListener('click',function(){
  let id = closeid.value;
  let pin = Number(closepswrd.value);
console.log(pin);
  if(id===cAccount.username && pin===cAccount.pin){
    const index = accounts.findIndex(acc => acc.username===cAccount.username);
    accounts.splice(index,1);
    app.style.opacity = 0;
    details.style.position="abslute";
    details.style.top="2rem"
    closeid.value=closepswrd.value="";
    console.log(accounts);
  }
});

//----Request Amount----//

reqbtn.addEventListener('click',function(){
const amt = Number(reqamt.value);
if(amt>0 && cAccount.movements.some(mov => amt*0.1<=mov)){
  cAccount.movements.push(amt);
  updateUI(cAccount);
}
});

//----SORT----//

let sorted = false;
sort.addEventListener('click',function(){
  displaymoment(cAccount.movements,!sorted);
  sorted = !sorted;

});