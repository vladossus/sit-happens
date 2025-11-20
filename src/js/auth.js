document.addEventListener('DOMContentLoaded', function()
{
    const savedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (savedUser) { Auth.updateForLogin(savedUser.name); }
});
const RegisterForm = {
    show()
    {
        if (document.getElementById('register-form')) { return; }
        const htmlform = `
        <div id="register-form" style="display: flex; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5); align-items: center; justify-content: center; z-index: 1000;">
            <div class="register-form-content" style="background: white; padding: 2rem; border-radius: 8px; width: 300px; text-align: center;">
                <h2>Регистрация</h2>
                <input type="text" id="register-name" placeholder="Имя" style="display: block; margin-bottom: 10px; width: 100%; padding: 8px;">
                <input type="email" id="register-email" placeholder="Email" style="display: block; margin-bottom: 10px; width: 100%; padding: 8px;">
                <input type="password" id="register-password" placeholder="Пароль" style="display: block; margin-bottom: 10px; width: 100%; padding: 8px;">
                <button id="register-button" class="btn-primary" style="margin-bottom: 10px; width: 100%;">Зарегистрироваться</button>
                <button id="close-register" class="btn-secondary" style="width: 100%;">Закрыть</button>
            </div>
        </div>
        `
        document.body.insertAdjacentHTML('beforeend', htmlform);
        document.getElementById('register-button').addEventListener('click', () =>
        {
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const result = Auth.signUp(name, email, password);
            if (result) { RegisterForm.hide(); } 
            else { alert('Пользователь уже существует'); }
        });
        document.getElementById('close-register').addEventListener('click', RegisterForm.hide);
    },
    hide()
    {
      const form = document.getElementById('register-form');
      if (form) { form.remove(); }
    }
}
const LoginForm = {
    show() 
    {
        if (document.getElementById('login-form')) { return; }
        const htmlform = `
            <div id="login-form" style="display: flex; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
                <div class="login-form-content" style="background: white; padding: 2rem; border-radius: 8px; width: 300px; text-align: center;">
                    <h2>Войти</h2>
                    <input type="email" id="login-email" placeholder="Email" style="display: block; margin-bottom: 10px; width: 100%; padding: 8px;">
                    <input type="password" id="login-password" placeholder="Password" style="display: block; margin-bottom: 10px; width: 100%; padding: 8px;">
                    <button id="login-button" class="btn-primary" style="margin-bottom: 10px; width: 100%;">Войти</button>
                    <button id="close-login" class="btn-secondary" style="width: 100%;">Закрыть</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', htmlform);
        document.getElementById('login-button').addEventListener('click', () =>
        {
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const result = Auth.login(email, password);
            if (result) { LoginForm.hide(); } 
            else { alert("Неверный логин или пароль :("); }
        });
        document.getElementById('close-login').addEventListener('click', LoginForm.hide);
    },
    hide()
    {
      const form = document.getElementById('login-form');
      if (form) { form.remove(); }
    }
  };
  
const Auth =
{
    signUp(name, email, password)
    {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(user => user.email === email)) { return false; }
        const newUser = {
            name,
            email,
            password: password,
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        this.updateForLogin(newUser.name);
        return true;
    },
    login(email, password) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email);
        if (!user || user.password !== password) { return false; }
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.updateForLogin(user.name)
        return true;
    },
    logout() {
        localStorage.removeItem('currentUser');
        this.updateForLogout();
    },
    updateForLogin(name) {
        const usernameElement = document.getElementById('username');
        if (usernameElement) { usernameElement.textContent = name; }
        document.querySelectorAll('.logged-out-only').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.logged-in-only').forEach(el => el.style.display = 'flex');
    },
    updateForLogout() {
        document.querySelectorAll('.logged-out-only').forEach(el => el.style.display = 'flex');
        document.querySelectorAll('.logged-in-only').forEach(el => el.style.display = 'none');
    },
};