
let users = {};
fetch('users.json')
  .then(response => response.json())
  .then(data => users = data);

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const user = users[email];

  if (user && user.password === password) {
    document.getElementById('login-box').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    document.getElementById('name').textContent = user.name;
    document.getElementById('urlaub').textContent = user.urlaub;
    document.getElementById('stunden').textContent = user.stunden;
    document.getElementById('ueberstunden').textContent = user.ueberstunden;
    document.getElementById('initialen').textContent = user.name.split(" ").map(n => n[0]).join("");

    if (user.role === "admin") {
      document.getElementById('adminLink').style.display = 'block';
      loadUserList();
    } else {
      document.getElementById('adminLink').style.display = 'none';
    }
  } else {
    document.getElementById('login-error').textContent = "Falsche E-Mail oder Passwort";
  }
}

function toggleAdminPanel() {
  const panel = document.getElementById('adminpanel');
  panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
}

function addUser() {
  const name = document.getElementById('newName').value;
  const email = document.getElementById('newEmail').value;
  const password = document.getElementById('newPassword').value;
  if (!name || !email || !password) return alert("Alle Felder ausfüllen!");
  users[email] = { name, password, role: "user", urlaub: 0, stunden: 0, ueberstunden: 0 };
  loadUserList();
  alert("Mitarbeiter hinzugefügt (lokal)");
}

function loadUserList() {
  const list = document.getElementById('userList');
  list.innerHTML = "<h4>Bestehende Benutzer</h4>";
  Object.keys(users).forEach(email => {
    const u = users[email];
    list.innerHTML += `<p>${u.name} – ${email} – PW: ${u.password}</p>`;
  });
}
