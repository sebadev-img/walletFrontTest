const tableBody = document.getElementById("table-body");
const pagination = document.getElementById("pagination");

const getTransactions = async (page) => {
  tableBody.innerHTML = "";
  pagination.innerHTML = "";
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");
  if (userId && token) {
    try {
      const response = await axios.post("/userTransactions", {
        userId: userId,
        token: token,
        page: page
      });
      console.log(response.data);
      const transactions = response.data.results;
      transactions.map((transaction) => {
        const node = createNode(transaction);
        tableBody.appendChild(node);
      });
      createPagination(response.data);
    } catch (error) {
      console.log(error);
    }
  }
};

const createNode = (transaction) => {
  const node = document.createElement("tr");
  node.innerHTML = `
        <td scope="row">${transaction.transactionId}</td>
        <td>${transaction.accountId}</td>
        <td>${transaction.currency}</td>
        <td>${transaction.type}</td>
        <td>$${transaction.amount}</td>
        <td>${transaction.description}</td>
        <td>${transaction.transactionDate}</td>
    `;
  return node;
};

const createPagination = (response) => {
  const pages = response.pages;
  for (let i = 1; i <= pages; i++) {
    const node = document.createElement("li");
    node.className = "page-item";
    node.innerHTML = `<button class="page-link color-blue" onclick="getTransactions(${i})">${i}</button>`;
    pagination.appendChild(node);
  }
};

getTransactions(1);
