let token = window.localStorage.getItem('token')


const socket = io({auth: { token: token }})



let lastUserId
async function renderUsers () {
  let { data } = await ( await fetch('/users')).json()
  let { userId } = await renderProfile();
  for(let user of data){
    if(userId != user.userId){
    let li = document.createElement('li')
    li.classList.add('chats-item');
    li.innerHTML = `
      <img src="${user.avatar}" alt="profile-picture">
      <p>${user.username}</p>
      <span data-id="${user.userId}" class="${user.socketId ? "online" : ""}"></span>
    `;
    chatList.append(li)
    li.onclick = () => {
      chatMain.innerHTML = null
      renderHeader(user)
      lastUserId = user.userId
      getMessages(user.userId)
    }
    }
  }
}
renderUsers()



async function renderHeader (user) {
  username.textContent = user.username
  imageUser.src = user.avatar
}


async function getMessages (userId) {
  let { data } = await (await fetch('/messages?userId=' + userId, {
    method: "GET",
    headers: {'Content-Type': 'application/json', token: token}
  })).json();
  return renderMessages(data)
}





async function renderMessages (messages) {
  let { userId } = await renderProfile()
  for(let message of messages){
    let div = document.createElement('div')
    div.classList.add('msg-wrapper', message.from.userId == userId ? 'msg-from': null);
    div.innerHTML = `
       <img src="${message.from.avatar}" alt="profile-picture">
          <div class="msg-text">
            <p class="msg-author">${message.from.username}</p>
            <p class="msg">${message.message}</p>
            <p class="time">${message.created_at}</p>
       </div>
    `;
    chatMain.append(div)
    chatMain.scrollTo({top: 10000000})
  }


}




async function renderProfile () {
  let { data } = await (await fetch('/users/' + token)).json();
  profile.innerHTML = `
    <img src="${data.avatar}" alt="profile-avatar" class="profile-avatar">
    <p class="profile-name">${data.username}</p>
  `;
  return data
}
renderProfile()


let timeId
textInput.onkeyup = async (e) => {
  if(e.keyCode == 13 && textInput.value.trim()){
    renderMessages([{ to: lastUserId, from: await renderProfile() ,message: textInput.value, created_at: "10:00"}])
    socket.emit('new-message', { to: lastUserId, message: textInput.value, created_at: "10:00"});
    textInput.value = null
  }

  if(timeId) return

  timeId = setTimeout( () => {
    timeId = undefined
    socket.emit('stop', { to: lastUserId });
  },  1000)

  socket.emit('typing', { to: lastUserId })
}



  // smaylik 
const picker = new EmojiButton({
  showSearch: false,
  showPreview: false,
});

picker.on('emoji', emoji => {
  textInput.value += emoji;
});

trigger.addEventListener('click', () => picker.togglePicker(trigger));







socket.on('send-message', (message) => {
  renderMessages([message])
})


socket.on('typing', () => {
  typing.textContent = '  is typing...'
});

socket.on('stop', () => {
  typing.textContent = null
});


socket.on('exit', () => {
  window.localStorage.clear()
  window.location = '/login'
})


socket.on('user-online', (userId) => {
  let span = document.querySelector(`.chats-item span[data-id="${userId}"]`);
  span.classList.add('online')
})

socket.on('user-disconnect', (userId) => {
  let span = document.querySelector(`.chats-item span[data-id="${userId}"]`);
  span.classList.remove('online');
});

