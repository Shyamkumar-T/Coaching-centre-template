document.addEventListener('DOMContentLoaded', () => {
    
    // Check if already logged in
    if(localStorage.getItem('eliteAdminAuth')) {
        window.location.href = 'admin.html';
        return;
    }

    const loginForm = document.getElementById('adminLoginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMsg = document.getElementById('loginError');
    const submitBtn = document.getElementById('loginSubmitBtn');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            errorMsg.style.display = 'none';
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Authenticating...';

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            // Simulate network delay
            setTimeout(() => {
                if (email === 'admin@eliteacademy.edu' && password === 'password') {
                    
                    const sessionData = {
                        name: 'Admin User',
                        email: email,
                        role: 'Super Admin',
                        token: 'abc-123-token-fake',
                        loggedInAt: new Date().toISOString()
                    };
                    
                    localStorage.setItem('eliteAdminAuth', JSON.stringify(sessionData));
                    
                    window.location.href = 'admin.html';
                } else {
                    errorMsg.innerText = "Invalid credentials. Try admin@eliteacademy.edu / password";
                    errorMsg.style.display = 'block';
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Sign In to Dashboard <i class="fa-solid fa-arrow-right"></i>';
                }
            }, 800);
        });
    }
});
