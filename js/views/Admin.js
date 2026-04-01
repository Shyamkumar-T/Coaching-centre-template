const Admin = {
    render: async () => {
        if (!window.DB.currentUser || window.DB.currentUser.role !== 'admin') {
            return `
                <div class="container section" style="text-align:center;">
                    <h2>Admin Restricted Area</h2>
                    <p>You must be an administrator to view this portal.</p>
                    <br>
                    <a href="#/login" class="primary-btn">Admin Login</a>
                </div>
            `;
        }

        const user = window.DB.currentUser;

        return `
            <div style="display:flex; min-height: calc(100vh - 80px); background-color:#f1f5f9;">
                <!-- Sidebar -->
                <aside style="width: 250px; background:#0f172a; color:white; padding:var(--space-md); flex-shrink:0;">
                    <div style="text-align:center; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1);">
                        <i class="fa-solid fa-shield-halved" style="font-size:3rem; color:var(--clr-primary); margin-bottom:1rem; display:block;"></i>
                        <h3 style="color:white; font-size:1.1rem;">Super Administrator</h3>
                        <p style="font-size:0.8rem; color:rgba(255,255,255,0.7);">Platform Controller</p>
                    </div>

                    <nav style="display:flex; flex-direction:column; gap:0.5rem;">
                        <a href="#" class="sidebar-link active"><i class="fa-solid fa-gauge"></i> Dashboard</a>
                        <a href="#" class="sidebar-link"><i class="fa-solid fa-users"></i> Manage Students</a>
                        <a href="#" class="sidebar-link"><i class="fa-solid fa-graduation-cap"></i> Courses & Batches</a>
                        <a href="#" class="sidebar-link"><i class="fa-solid fa-file-invoice-dollar"></i> Track Admissions</a>
                        <a href="#/login" id="admin-logout" class="sidebar-link" style="margin-top:2rem; color:var(--clr-danger);"><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</a>
                    </nav>

                    <style>
                        .sidebar-link { color:rgba(255,255,255,0.8); padding:0.75rem 1rem; border-radius:var(--radius-md); display:flex; align-items:center; gap:0.75rem; transition:var(--transition-fast); }
                        .sidebar-link:hover { background:rgba(255,255,255,0.1); color:white; }
                        .sidebar-link.active { background:var(--clr-primary); color:white; }
                    </style>
                </aside>

                <!-- Main Content Area -->
                <main style="flex:1; padding:var(--space-lg); overflow-y:auto;">
                    
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-lg);">
                        <h1 style="font-size:2rem; color:var(--clr-secondary); margin-bottom:0;">Platform Overview</h1>
                        <button class="primary-btn"><i class="fa-solid fa-plus"></i> New Global Announcement</button>
                    </div>
                    
                    <!-- Stats Grid -->
                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:var(--space-md); margin-bottom:var(--space-lg);">
                       
                       <div style="background:white; padding:var(--space-md); border-radius:var(--radius-md); box-shadow:0 1px 3px rgba(0,0,0,0.1); border-left:4px solid var(--clr-primary);">
                           <p style="color:var(--clr-text-muted); font-size:0.875rem; font-weight:600; text-transform:uppercase;">Total Active Students</p>
                           <h2 style="font-size:2rem; color:var(--clr-secondary); margin-top:0.5rem;">1,245</h2>
                           <p style="color:var(--clr-success); font-size:0.8rem; margin-top:0.25rem;"><i class="fa-solid fa-arrow-trend-up"></i> +12% this month</p>
                       </div>

                       <div style="background:white; padding:var(--space-md); border-radius:var(--radius-md); box-shadow:0 1px 3px rgba(0,0,0,0.1); border-left:4px solid var(--clr-accent);">
                           <p style="color:var(--clr-text-muted); font-size:0.875rem; font-weight:600; text-transform:uppercase;">Pending Admissions</p>
                           <h2 style="font-size:2rem; color:var(--clr-secondary); margin-top:0.5rem;">42</h2>
                           <p style="color:var(--clr-accent); font-size:0.8rem; margin-top:0.25rem;"><i class="fa-solid fa-triangle-exclamation"></i> Requires verification</p>
                       </div>

                       <div style="background:white; padding:var(--space-md); border-radius:var(--radius-md); box-shadow:0 1px 3px rgba(0,0,0,0.1); border-left:4px solid var(--clr-success);">
                           <p style="color:var(--clr-text-muted); font-size:0.875rem; font-weight:600; text-transform:uppercase;">Revenue (MTD)</p>
                           <h2 style="font-size:2rem; color:var(--clr-secondary); margin-top:0.5rem;">$124,500</h2>
                       </div>
                    </div>

                    <!-- Recent Admissions Table -->
                    <div style="background:white; border-radius:var(--radius-md); box-shadow:0 1px 3px rgba(0,0,0,0.1); overflow:hidden;">
                        <div style="padding:var(--space-md); border-bottom:1px solid var(--clr-border); display:flex; justify-content:space-between; align-items:center;">
                            <h3 style="color:var(--clr-secondary);">Recent Admissions Approvals</h3>
                            <a href="#" style="font-size:0.875rem;">View All</a>
                        </div>
                        <table style="width:100%; border-collapse:collapse; text-align:left;">
                            <thead style="background:#f8fafc; color:var(--clr-text-muted); font-size:0.875rem; border-bottom:1px solid var(--clr-border);">
                                <tr>
                                    <th style="padding:1rem;">Applicant Name</th>
                                    <th style="padding:1rem;">Course Applied</th>
                                    <th style="padding:1rem;">Date</th>
                                    <th style="padding:1rem;">Status</th>
                                    <th style="padding:1rem;">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style="border-bottom:1px solid var(--clr-border);">
                                    <td style="padding:1rem; font-weight:600;">Sarah Jenkins</td>
                                    <td style="padding:1rem; color:var(--clr-text-muted);">NEET Medical Foundation</td>
                                    <td style="padding:1rem; color:var(--clr-text-muted);">Oct 12, 2026</td>
                                    <td style="padding:1rem;"><span style="background:var(--clr-danger-bg); color:var(--clr-danger); padding:0.25rem 0.5rem; border-radius:12px; font-size:0.75rem; font-weight:700;">Pending Docs</span></td>
                                    <td style="padding:1rem;"><button class="outline-btn" style="padding:0.25rem 0.75rem; font-size:0.8rem;">Review</button></td>
                                </tr>
                                <tr style="border-bottom:1px solid var(--clr-border);">
                                    <td style="padding:1rem; font-weight:600;">Alex Johnson</td>
                                    <td style="padding:1rem; color:var(--clr-text-muted);">JEE Main & Advanced Mastery</td>
                                    <td style="padding:1rem; color:var(--clr-text-muted);">Oct 11, 2026</td>
                                    <td style="padding:1rem;"><span style="background:var(--clr-success-bg); color:var(--clr-success); padding:0.25rem 0.5rem; border-radius:12px; font-size:0.75rem; font-weight:700;">Approved</span></td>
                                    <td style="padding:1rem;"><button class="outline-btn" style="padding:0.25rem 0.75rem; font-size:0.8rem;">View Profile</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </main>
            </div>
        `;
    },

    after_render: async () => {
        const logoutBtn = document.getElementById('admin-logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                window.DB.logout();
            });
        }
    }
};

export default Admin;
