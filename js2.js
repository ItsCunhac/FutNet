const getDB = (key) => JSON.parse(localStorage.getItem(key)) || (key === 'users' ? {"Fidec": "1234"} : {});
    const saveDB = (key, data) => localStorage.setItem(key, JSON.stringify(data));

    let currentUser = localStorage.getItem("activeUser");

    window.onload = () => {
        updateUI();
    };

    function updateUI() {
        const users = getDB('users');
        const memberships = getDB('memberships');
        const navSocio = document.getElementById('nav-socio');
        const adminPanel = document.getElementById('admin-panel');
        const authBtn = document.getElementById('authBtn');

        if (currentUser) {
            authBtn.innerText = "Sair (" + currentUser + ")";
            authBtn.onclick = logout;

            if (memberships[currentUser]) {
                navSocio.style.display = "flex";
            } else {
                navSocio.style.display = "none";
                showSection('home');
            }

            if (currentUser === "Fidec") {
                adminPanel.style.display = "block";
                populateAdminList();
            } else {
                adminPanel.style.display = "none";
            }
        } else {
            authBtn.innerText = "Login";
            authBtn.onclick = toggleModal;
            navSocio.style.display = "none";
            adminPanel.style.display = "none";
            showSection('home');
        }
    }

    function showSection(id) {
        document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        if (id === 'socio-area') renderCard();
    }

    function toggleModal() {
        const m = document.getElementById('loginModal');
        m.style.display = m.style.display === 'flex' ? 'none' : 'flex';
    }

    function handleLogin() {
        const u = document.getElementById('login-user').value;
        const p = document.getElementById('login-pass').value;
        const users = getDB('users');

        if (users[u] === p) {
            currentUser = u;
            localStorage.setItem("activeUser", u);
            toggleModal();
            updateUI();
            alert("Bem-vindo, " + u + "!");
        } else {
            alert("Credenciais erradas.");
        }
    }

    function handleRegister() {
        const u = document.getElementById('login-user').value;
        const p = document.getElementById('login-pass').value;
        if (!u || !p) return alert("Preencha os campos.");
        
        const users = getDB('users');
        if (users[u]) return alert("Utilizador já existe.");
        
        users[u] = p;
        saveDB('users', users);
        alert("Conta criada! Inicie sessão.");
    }

    function logout() {
        localStorage.removeItem("activeUser");
        currentUser = null;
        updateUI();
        location.reload();
    }

    function populateAdminList() {
        const list = document.getElementById('admin-user-list');
        const users = getDB('users');
        list.innerHTML = "";
        Object.keys(users).forEach(u => {
            if (u !== "Fidec") {
                let opt = new Option(u, u);
                list.add(opt);
            }
        });
    }

    function grantMembership() {
        const target = document.getElementById('admin-user-list').value;
        const date = document.getElementById('admin-date').value;
        if (!date) return alert("Escolha a validade.");

        const memberships = getDB('memberships');
        memberships[target] = date;
        saveDB('memberships', memberships);

        alert(target + " agora é sócio oficial!");
        updateUI();
    }

    function renderCard() {
        const memberships = getDB('memberships');
        if (memberships[currentUser]) {
            document.getElementById('card-name').innerText = currentUser;
            document.getElementById('card-date').innerText = memberships[currentUser].split('-').reverse().join('/');
        }
    }
    function grantMembership() {
    const target = document.getElementById('admin-user-list').value;
    const date = document.getElementById('admin-date').value;
    const number = document.getElementById('admin-number').value;

    if (!date || !number) return alert("Preencha o número de sócio e a validade.");

    const memberships = getDB('memberships');
    memberships[target] = {
        validade: date,
        numero: number
    };
    
    saveDB('memberships', memberships);
    alert("Sócio " + target + " atualizado com sucesso!");
    updateUI();
}

function removeMembership() {
    const target = document.getElementById('admin-user-list').value;
    const memberships = getDB('memberships');

    if (memberships[target]) {
        if (confirm("Deseja remover o estatuto de sócio de " + target + "?")) {
            delete memberships[target];
            saveDB('memberships', memberships);
            alert("Estatuto removido.");
            updateUI();
        }
    } else {
        alert("Este utilizador não é sócio.");
    }
}

function renderCard() {
    const memberships = getDB('memberships');
    const dataSocio = memberships[currentUser];

    if (dataSocio) {
        document.getElementById('card-name').innerText = currentUser;
        document.getElementById('card-date').innerText = dataSocio.validade.split('-').reverse().join('/');
        document.getElementById('card-number').innerText = dataSocio.numero.padStart(4, '0');
    }
}