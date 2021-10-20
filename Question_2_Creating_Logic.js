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
      console.log(data.data.profile)

      //store users Id in local storage
      window.localStorage.setItem('userId', JSON.stringify(data.data.profile.id));
      //store Users Profile
      window.localStorage.setItem('user', JSON.stringify(data.data.profile));
    }

}

//Refresh users wallet with stored Id, Experiencing 500 errors when I try to do so using details provided
function refreshWallet () {
  console.log(window.localStorage.getItem('userId'))
  var request = new XMLHttpRequest();
    request.open("POST", "https://api.okra.ng/v2/mock-api/refresh-wallet", true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({
      wallet_id: window.localStorage.getItem('userId'),
      variable: "mockVariable"
    }));
    request.onload = function () {

      var data = JSON.parse(this.responseText);
      console.log(data.data)

      //Display users current Balance
      
    }

}

//Logout function, Unalbe to refresh due to 500 erros on the refresh endpoint
function logOut () {
  
  var request = new XMLHttpRequest();
    request.open("GET", "https://api.okra.ng/v2/mock-api/logout", false);
    request.send();
    var data = JSON.parse(request.responseText);

    let userDetails = JSON.parse(window.localStorage.getItem('user'))
    
      //Display Log out message
      console.log('User => ', {id: userDetails.id, name: userDetails.name}, '\Logout Message =>', data.message)
  

}
