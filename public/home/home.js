//const accountArsTitle = document.getElementById("accountArs-Title");
const accountArsCVU = document.getElementById("accountArs-CVU");
const accountArsBalance = document.getElementById("accountArs-Balance");
const accountUsdCVU = document.getElementById("accountUsd-CVU");
const accountUsdBalance = document.getElementById("accountUsd-Balance");
const transactionList = document.getElementById("transaction-list");

const getAccounts = async () => {
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  if (userId && token) {
    try {
      console.log(userId, token);
      const response = await axios.post("/userAccounts", {
        userId: userId,
        token: token
      });
      console.log(response.data);
      response.data.map((account) => {
        if (account.currency === "ARS") {
          sessionStorage.setItem("accountArs", account.accountId);
          accountArsCVU.innerText = account.accountId;
          accountArsBalance.innerText = account.balance;
        } else {
          sessionStorage.setItem("accountUsd", account.accountId);
          accountUsdCVU.innerText = account.accountId;
          accountUsdBalance.innerText = account.balance;
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  //accountArsCVU.innerText = "00000001";
  //accountArsBalance.innerText = "1000000";
};

const getTransactions = async () => {
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  if (userId && token) {
    try {
      const response = await axios.post("/userTransactions", {
        userId: userId,
        token: token
      });
      console.log(response.data.results);
      const transactions = response.data.results;
      transactions.map((transaction) => {
        // crear el node y agregarlo a la lista
        const node = createNode(transaction);
        transactionList.appendChild(node);
      });
    } catch (error) {
      console.log(error);
    }
  }
};

const getDate = (date) => {
  const dateComponents = date.split("-");
  const d = dateComponents[2];
  const m = dateComponents[1];
  const y = dateComponents[0];
  return d + "-" + m + "-" + y;
};

const createNode = (transaction) => {
  let title;
  let account;
  let amount;
  let date;
  switch (transaction.type) {
    case "DEPOSIT":
      title = "Hiciste un deposito";
      amount = "+";
      break;
    case "PAYMENT":
      title = "Hiciste un pago";
      amount = "-";
      break;
    case "INCOME":
      title = "Recibiste una transferencia";
      amount = "+";
      break;
  }
  if (transaction.currency === "ARS") {
    account = "En tu cuenta en pesos";
    amount += " AR$ " + transaction.amount;
  } else {
    account = "En tu cuenta en dolares";
    amount += " US$ " + transaction.amount;
  }
  date = getDate(transaction.transactionDate.slice(0, 10));

  const node = document.createElement("div");
  node.className = "container transaction-container aling-items-center";
  node.innerHTML = `
  <div class="row h-100">
    <div class="col d-flex flex-column justify-content-center">
      <div class="row color-33">${title}</div>
      <div class="row color-99">${account}</div>
    </div>
    <div class="col d-flex flex-column justify-content-center">
      <div class="row d-flex justify-content-end color-33">
        ${amount}
      </div>
      <div class="row d-flex justify-content-end color-99">
        ${date}
      </div>
    </div>
  </div>`;
  return node;
};

getAccounts();
getTransactions();
