let token = window.localStorage.getItem('token')


const socket = io({auth: { token: token }})




async function renderUsers () {
  let { data } = await ( await fetch('/users')).json()
  for(let user of data){
    let li = document.createElement('li')
    li.classList.add('chats-item');
    li.innerHTML = `
      <img src="${user.avatar}" alt="profile-picture">
      <p>${user.username}</p>
      <span data-id="${user.userId}" class="${user.socketId ? "online" : ""}"></span>
    `;
    chatList.append(li)

    li.onclick = async (user) => {
      chatMain.innerHTML = ''
      let { data } = await (await fetch('/messages')).json();
      console.log(data);
      renderMessages(data)
    }
  }
}
renderUsers()





async function renderMessages (messages) {
  let { userId } = await renderProfile()
  for(let message of messages){
    let div = document.createElement('div')
    div.classList.add('msg-wrapper', message.userId == userId ? 'msg-from': null);
    div.innerHTML = `
        <img src="${message.from.avatar}" alt="profile-picture">
        <div class="msg-text">
          <p class="msg-author">${message.from.username}</p>
          <p class="msg">${message.message}</p>
          <p class="time">${message.created_at}</p>
        </div>
    `;
    chatMain.append(div)
  }


}

// sendBtn.onclick = () => {
//   socket.emit('send-message', {
//     message: textInput.value,
//     created_at: '10:10'
//   })
// }








async function renderProfile () {
  let { data } = await (await fetch('/users/' + token)).json();
  profile.innerHTML = `
    <img src="${data.avatar}" alt="profile-avatar" class="profile-avatar">
    <p class="profile-name">${data.username}</p>
  `;
  return data
}
renderProfile()




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

