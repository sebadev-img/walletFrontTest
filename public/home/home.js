//const accountArsTitle = document.getElementById("accountArs-Title");
const accountArsCVU = document.getElementById("accountArs-CVU");
const accountArsBalance = document.getElementById("accountArs-Balance");

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
    } catch (error) {
      console.log(error);
    }
  }
  accountArsCVU.innerText = "00000001";
  accountArsBalance.innerText = "1000000";
};

getAccounts();
