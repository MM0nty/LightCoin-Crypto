class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    let balance = 50;
    for (const transaction of this.transactions) {
      balance += transaction.value;
    }
    return balance;
  }
  history(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    this.time = new Date();
    this.account.history(this);
  }
}
class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  commit() {
    const funds = (this.account.balance - this.amount);
    if (funds < 0) {
      return console.log("Not enough funds in account for withdrawal");
    }
      this.time = new Date();
      this.account.history(this);
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
}


const myAccount = new Account("snow-patrol");
console.log("Balance", myAccount.balance);

t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1);
console.log("Balance", myAccount.balance);
t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2);
console.log("Balance", myAccount.balance);

t3 = new Deposit(120.000, myAccount);
t3.commit();
console.log("Transaction 3: ", t3);

console.log("Balance", myAccount.balance);
