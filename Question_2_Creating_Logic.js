//company ID: 484929849
//customer ID: 573839293

function Login (userName, passWord) {

  var request = new XMLHttpRequest();
    request.open("POST", "https://api.okra.ng/v2/mock-api/login", true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({
      username: userName,
      password: passWord
    }));
    request.onload = function () {

      
      var data = JSON.parse(this.responseText);
      console.log("Login Successful for" + " " + data.data.profile.name)
      console.log('Your current balance is:', data.data.profile.wallet.amount + " " +  data.data.profile.wallet.currency)
     
      //store users Id in local storage
      window.localStorage.setItem('userId', data.data.profile.id);
      //store Users Profile
      window.localStorage.setItem('user', JSON.stringify(data.data.profile));
      //store Users Wallet Amount
      window.localStorage.setItem('wallet', JSON.stringify(data.data.profile.wallet.amount + " " +  data.data.profile.wallet.currency));
    }

}

//Refresh users wallet with stored Id
function refreshWallet () {
  
  var request = new XMLHttpRequest();
    request.open("POST", "https://api.okra.ng/v2/mock-api/refresh-wallet", true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({

      //User stored Id to refresh wallet
      id: window.localStorage.getItem('userId'),
      variable: 'mockVariable'
    }));
    request.onload = function () {

      var data = JSON.parse(this.responseText);
      
      //Save latest balance in local storage
      window.localStorage.setItem('walletAfterRefresh', JSON.stringify(data.data.wallet.amount + " " +  data.data.wallet.currency));
      //Display users current Balance
      console.log('Current Balance => ', {Amount: data.data.wallet.amount, Currency: data.data.wallet.currency})
      
    }

}

//Logout function
function logOut () {
  
  var request = new XMLHttpRequest();
    request.open("GET", "https://api.okra.ng/v2/mock-api/logout", true);
    request.send();
    request.onload = function () {

    var data = JSON.parse(this.responseText);

    let userDetails = JSON.parse(window.localStorage.getItem('user'))
    let walletBeforeRefresh = JSON.parse(window.localStorage.getItem('wallet'))
    let walletAfterRefresh = JSON.parse(window.localStorage.getItem('walletAfterRefresh'))
    
      //Display Log out message
      console.log('User => ', {id: userDetails.id, name: userDetails.name}, '\nBalance Before Refresh =>', walletBeforeRefresh, '\nBalance After Refresh =>', walletAfterRefresh, '\nLogout Message =>', data.message)
  
    }
}
