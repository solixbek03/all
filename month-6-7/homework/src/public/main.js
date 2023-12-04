const socket = io({auth: { username}})

socket.on('new-user',  (users) => {
  wrapperUsernames.innerHTML = null
  for (let username in users) {
    let li = document.createElement('li');
    li.textContent = username;
    wrapperUsernames.append(li)
  }
})