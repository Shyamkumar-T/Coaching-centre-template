const Login = {
    render: async () => {
        return `
            <div style="min-height: calc(100vh - 80px); display:flex; align-items:center; justify-content:center; background-color: var(--clr-bg-main); padding: var(--space-xl);">
                <div style="background:var(--clr-bg-card); padding:var(--space-2xl) var(--space-xl); border-radius:var(--radius-lg); box-shadow:var(--shadow-lg); width:100%; max-width:450px;">
                    <div style="text-align:center; margin-bottom: 2rem;">
                        <div class="logo" style="justify-content:center; margin-bottom:1rem; font-size:2rem;">
                            <i class="fa-solid fa-graduation-cap"></i>
                            <span class="logo-text">Elite<span class="highlight">Academy</span></span>
                        </div>
                        <h2 style="color:var(--clr-secondary);">Welcome Back!</h2>
                        <p style="color:var(--clr-text-muted);">Please login to your account</p>
                    </div>

                    <form id="login-form">
                        <div style="margin-bottom:var(--space-md);">
                            <label style="display:block; font-weight:600; margin-bottom:0.5rem; color:var(--clr-text-main);">Email Address / ID</label>
                            <input type="text" id="login-id" required placeholder="example@email.com or Student ID" style="width:100%; padding:0.75rem; border:1px solid var(--clr-border); border-radius:var(--radius-md); font-size:1rem;">
                        </div>

                        <div style="margin-bottom:1rem;">
                            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
                                <label style="font-weight:600; color:var(--clr-text-main);">Password</label>
                                <a href="#" style="font-size:0.875rem; color:var(--clr-primary);">Forgot Password?</a>
                            </div>
                            <input type="password" id="login-pass" required placeholder="••••••••" style="width:100%; padding:0.75rem; border:1px solid var(--clr-border); border-radius:var(--radius-md); font-size:1rem;">
                        </div>

                        <div style="margin-bottom:var(--space-lg); display:flex; align-items:center;">
                            <input type="checkbox" id="remember-me" style="margin-right:0.5rem;">
                            <label for="remember-me" style="font-weight:normal; margin-bottom:0; font-size:0.9rem; color:var(--clr-text-muted);">Remember me</label>
                        </div>

                        <button type="submit" class="primary-btn" style="width:100%;">Login to Portal <i class="fa-solid fa-arrow-right-to-bracket"></i></button>

                        <div style="text-align:center; margin-top:2rem; padding-top:1rem; border-top:1px solid var(--clr-border);">
                            <p style="color:var(--clr-text-muted); font-size:0.9rem;">
                                Don't have an account? <br>
                                <a href="#/admission" style="font-weight:600; margin-top:0.5rem; display:inline-block;">Apply for Admission First</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        `;
    },

    after_render: async () => {
        const form = document.getElementById('login-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('login-id').value.toLowerCase();
            const btn = form.querySelector('button');
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Authenticating...';
            btn.disabled = true;

            setTimeout(() => {
                // Mock Authentication Router
                if (id.includes('admin')) {
                    window.DB.loginAdmin();
                    window.location.hash = '#/admin';
                } else {
                    window.DB.loginStudent();
                    window.location.hash = '#/student-dashboard';
                }
            }, 1000);
        });
    }
};

export default Login;
