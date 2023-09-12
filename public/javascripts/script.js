<script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
var oppositeuser;
function addchat(username, profileImage){
    oppositeuser = username
    document.querySelector("#allusers").innerHTML += `<div id="friend" onclick = openchat("${username}","${profileImage}")>
    <img style="height: 35px; width: 35px; border-radius: 50%;" src="${profileImage}" alt="">
    <h3>${username}</h3>
    </div>`
}

// addchat("hello","https://plus.unsplash.com/premium_photo-1688464907358-4cf058635e19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80")
// addchat()

function openchat(username,profileImage){
    document.querySelector("#chatbox").innerHTML = `<div id="chatnav">
    <div id="left"  style="display: flex; align-items: center; justify-content: center;gap: 20px;">
      <img style="height: 40px; width: 40px; border-radius: 50%;" src="${profileImage}" alt="">
      <h3 style="color: white; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; ">${username}</h3>
    </div>
  </div>
  <div id="textarea">
    <div id="person">
      <a id="personimg" href=""></a>
      <div id="textdiv">
        <h5><%= user.username %></h5>
      </div>
    </div>
  </div>
  <div id="typetext">
    <i class="ri-chat-smile-2-line"></i>
    <i class="ri-attachment-2"></i>
    <form action="/sendinput" method="post">
      <input type="text" id="input" placeholder="Type a message">
    </form>
    <button type="submit" id="sendinput"><i class="ri-send-plane-2-fill"></i></button>
  </div>`

}


// var searchuser = document.querySelector("#searchuser")
//       var searchuserinp = document.querySelector("#searchuserinp")
//       searchuser.addEventListener("input",function(){
//       if(searchuserinp.value.trim().length > 0){
//         var value = searchuserinp.value;
//         axios.get(`/find/${value}`).then(function(reply){
//           var clutter = ``;
//           reply.data.allusers.forEach(function(member){
//             console.log(member);
//             clutter += `<a onclick = "addFriend(${member.username},${member.profileImage})" style="display: flex; border-bottom: 1px solid black;align-items: center;
//             justify-content: flex-start; padding: 10px;gap: 10px ; background-color: #2c3941;text-decoration: none; color: white; " id="resultant">
//             <img style="height: 40px; width: 40px; border-radius: 50%; object-fit: cover; object-position: center;" src="${member.profileImage}" alt="">
//             <h3 style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; text-transform: capitalize;">${member.username}</h3>
//           </a>`
//           })
//           document.querySelector("#resultdiv").innerHTML = clutter
//         })
//         }
//         else{
//           document.querySelector("#resultdiv").innerHTML = ``;
//         }
//       })
      // function addFriend(username, profileImage){
      // oppositeuser = username
      // document.querySelector("#allusers").innerHTML += `<div id="friend" onclick = openchat("${username}","${profileImage}")>
      // <img style="height: 35px; width: 35px; border-radius: 50%;" src="${profileImage}" alt="">
      // <h3>${username}</h3>
      // </div>`
      // }     

