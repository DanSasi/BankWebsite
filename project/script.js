'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Dan Sasi',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Shaked Cohen',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Omri Nawi',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sveta Dundunchencko',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovments = function(movements){
  containerMovements.innerHTML='';

  movements.forEach(function(mov,i){
    const type = mov>0 ?'deposit' : 'withdrawal';
    const html = 
          `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__value">${mov}${'€'}</div>
          </div>
        `

        containerMovements.insertAdjacentHTML('afterbegin',html)
  });
  
}



const calcDisplayBalance= function(acc){
  acc.balance = acc.movements.reduce((acc,mov)=> 
  acc + mov,0);
  labelBalance.textContent = `${acc.balance} €`;
};


const calcDisplaySummary = function(acc){
  const incomes = acc.movements
  .filter(mov=> mov > 0)
  .reduce((acc,mov)=> acc + mov, 0);
  labelSumIn.textContent= `${incomes} €`

  const out = acc.movements
  .filter(mov=> mov <0)
  .reduce((acc,mov)=> acc + mov,0);
  labelSumOut.textContent= `${Math.abs(out)}€`

  const interest = acc.movements.filter(mov => mov > 0)
  .map(deposit => deposit * acc.interestRate /100)
  .filter((int,i,arr)=> {
    return int >= 1;
  })
    .reduce((acc,int)=> acc + int , 0);
  labelSumInterest.textContent= `${interest} €`
};

const updateUI = function(acc){
  //Display movments
  displayMovments(acc.movements);

  //Display balance 
  calcDisplayBalance(acc);

  // display summary
  calcDisplaySummary(acc);
}

const createUsernames = function(accs){
  accs.forEach(function(acc){
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name=> name[0])
      .join('');
  });
};
createUsernames(accounts);
let currentAccount;
//Event Handlers
btnLogin.addEventListener('click', function (e) {
  //Pervent form from submitting
  e.preventDefault();
  currentAccount =  accounts.find(acc=> acc.username === 
  inputLoginUsername.value);
  
  if(currentAccount?.pin === Number(inputLoginPin.value)){
    //Display Ui and message 
    labelWelcome.textContent = `Wellcome back,
    ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    //Clear input fields 
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const reciverAcc = accounts.find(acc=>
     acc.username === inputTransferTo.value
  ); 
  inputTransferAmount.value = inputTransferTo.value = '';

  if(amount > 0 && 
    reciverAcc && 
    currentAccount.balance >= amount && 
    reciverAcc?.username !== currentAccount.username ){
      //Doing Transfer
      currentAccount.movements.push(-amount);
      reciverAcc.movements.push(amount);

      //UpdateUI
      updateUI(currentAccount);
  }
  
});

btnLoan.addEventListener('click', function(e){
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if(amount > 0  && currentAccount.movements.some(mov => mov >= amount * 0.1)){
    //Add movement
    currentAccount.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
   
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function(e){
  e.preventDefault();

  if(inputCloseUsername.value === currentAccount.username 
    && Number(inputClosePin.value) === currentAccount.pin ){
      const index = accounts.
      findIndex(acc=> acc.username === currentAccount.username
        );
      console.log(index);
      //.indexOf(23)

      //Delete Account
      accounts.splice(index,1);
      //Hide Ui
      containerApp.style.opacity = 0; 
    }
    inputCloseUsername.value = inputClosePin.value = '';

  });





/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
