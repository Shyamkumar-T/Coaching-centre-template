const StudentDashboard = {
    render: async () => {
        // Enforce mock auth
        if (!window.DB.currentUser || window.DB.currentUser.role !== 'student') {
            return `
                <div class="container section" style="text-align:center;">
                    <h2>Unauthorized Access</h2>
                    <p>You must be logged in as a student to view this page.</p>
                    <br>
                    <a href="#/login" class="primary-btn">Go to Login</a>
                </div>
            `;
        }

        const user = window.DB.currentUser;

        return `
            <div style="display:flex; min-height: calc(100vh - 80px); background-color:var(--clr-bg-main);">
                <!-- Sidebar -->
                <aside style="width: 250px; background:var(--clr-secondary); color:white; padding:var(--space-md); flex-shrink:0;">
                    <div style="text-align:center; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1);">
                        <img src="https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=4f46e5&color=fff" style="width:80px; height:80px; border-radius:50%; margin: 0 auto 1rem; border:2px solid white;">
                        <h3 style="color:white; font-size:1.1rem;">${user.name}</h3>
                        <p style="font-size:0.8rem; color:rgba(255,255,255,0.7);">ID: ST-20261A</p>
                    </div>

                    <nav style="display:flex; flex-direction:column; gap:0.5rem;" id="dashboard-nav">
                        <a href="#" class="sidebar-link active" data-target="overview"><i class="fa-solid fa-house"></i> Overview</a>
                        <a href="#" class="sidebar-link" data-target="schedule"><i class="fa-regular fa-calendar-days"></i> My Schedule</a>
                        <a href="#" class="sidebar-link" data-target="materials"><i class="fa-solid fa-book"></i> Study Materials</a>
                        <a href="#" class="sidebar-link" data-target="tests"><i class="fa-solid fa-file-pen"></i> Mock Tests</a>
                        <a href="#" class="sidebar-link" data-target="reports"><i class="fa-solid fa-chart-pie"></i> Reports</a>
                        <a href="#/login" id="logout-btn" class="sidebar-link" style="margin-top:2rem; color:var(--clr-danger);"><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</a>
                    </nav>

                    <style>
                        .sidebar-link { color:rgba(255,255,255,0.8); padding:0.75rem 1rem; border-radius:var(--radius-md); display:flex; align-items:center; gap:0.75rem; transition:var(--transition-fast); }
                        .sidebar-link:hover { background:rgba(255,255,255,0.1); color:white; }
                        .sidebar-link.active { background:var(--clr-primary); color:white; }
                    </style>
                </aside>

                <!-- Main Content Area -->
                <main style="flex:1; padding:var(--space-lg); overflow-y:auto;" id="dashboard-content">
                    
                    <!-- Overview Section -->
                    <div id="target-overview" class="dash-section">
                        <h1 style="font-size:2rem; color:var(--clr-secondary); margin-bottom:var(--space-md);">Welcome, ${user.name.split(' ')[0]} 👋</h1>
                        
                        <!-- Course Info Card -->
                        <div style="background:linear-gradient(135deg, var(--clr-primary) 0%, var(--clr-secondary) 100%); color:white; padding:var(--space-lg); border-radius:var(--radius-lg); margin-bottom:var(--space-lg); box-shadow:var(--shadow-md);">
                            <h3 style="color:rgba(255,255,255,0.8); font-size:0.9rem; text-transform:uppercase; letter-spacing:1px; margin-bottom:0.5rem;">Enrolled Course</h3>
                            <h2 style="font-size:1.75rem; color:white; margin-bottom:0.25rem;">${user.course}</h2>
                            <p style="margin-bottom:1.5rem;"><i class="fa-solid fa-users-viewfinder"></i> Batch: ${user.batch}</p>
                            
                            <div style="background:rgba(255,255,255,0.2); height:8px; border-radius:10px; overflow:hidden;">
                                <div style="background:var(--clr-success); width:${user.progress}%; height:100%;"></div>
                            </div>
                            <p style="font-size:0.8rem; margin-top:0.5rem; text-align:right;">Course Completion: ${user.progress}%</p>
                        </div>

                        <!-- Stats Grid -->
                        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:var(--space-md); margin-bottom:var(--space-lg);">
                           
                           <div style="background:var(--clr-bg-card); padding:var(--space-md); border-radius:var(--radius-lg); box-shadow:var(--shadow-sm); display:flex; align-items:center; gap:1rem;">
                               <div style="background:var(--clr-primary-light); color:var(--clr-primary); width:50px; height:50px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:1.5rem;">
                                   <i class="fa-solid fa-clock-rotate-left"></i>
                               </div>
                               <div>
                                   <p style="color:var(--clr-text-muted); font-size:0.875rem;">Next Class</p>
                                   <h4 style="font-size:1.1rem; color:var(--clr-secondary);">Today, 4:00 PM</h4>
                               </div>
                           </div>
                           
                           <div style="background:var(--clr-bg-card); padding:var(--space-md); border-radius:var(--radius-lg); box-shadow:var(--shadow-sm); display:flex; align-items:center; gap:1rem;">
                               <div style="background:#fef3c7; color:#d97706; width:50px; height:50px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:1.5rem;">
                                   <i class="fa-solid fa-file-invoice"></i>
                               </div>
                               <div>
                                   <p style="color:var(--clr-text-muted); font-size:0.875rem;">Pending Tests</p>
                                   <h4 style="font-size:1.1rem; color:var(--clr-secondary);">2 Assignments</h4>
                               </div>
                           </div>

                           <div style="background:var(--clr-bg-card); padding:var(--space-md); border-radius:var(--radius-lg); box-shadow:var(--shadow-sm); display:flex; align-items:center; gap:1rem;">
                               <div style="background:var(--clr-success-bg); color:var(--clr-success); width:50px; height:50px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:1.5rem;">
                                   <i class="fa-solid fa-award"></i>
                               </div>
                               <div>
                                   <p style="color:var(--clr-text-muted); font-size:0.875rem;">Test Average</p>
                                   <h4 style="font-size:1.1rem; color:var(--clr-secondary);">84.5%</h4>
                               </div>
                           </div>

                        </div>
                    </div>

                    <!-- Materials Section Mock -->
                    <div id="target-materials" class="dash-section" style="display:none;">
                        <h2 style="font-size:1.75rem; color:var(--clr-secondary); margin-bottom:var(--space-md);">Study Materials</h2>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-md);">
                            
                            <div style="background:var(--clr-bg-card); border:1px solid var(--clr-border); padding:var(--space-md); border-radius:var(--radius-md); display:flex; justify-content:space-between; align-items:center;">
                                <div style="display:flex; align-items:center; gap:1rem;">
                                    <i class="fa-solid fa-file-pdf" style="font-size:2rem; color:#ef4444;"></i>
                                    <div>
                                        <h4 style="color:var(--clr-secondary);">Physics: Kinematics Notes</h4>
                                        <p style="font-size:0.8rem; color:var(--clr-text-muted);">Uploaded: 2 days ago • 2.4 MB</p>
                                    </div>
                                </div>
                                <button class="outline-btn" style="padding:0.5rem 1rem;"><i class="fa-solid fa-download"></i></button>
                            </div>

                            <div style="background:var(--clr-bg-card); border:1px solid var(--clr-border); padding:var(--space-md); border-radius:var(--radius-md); display:flex; justify-content:space-between; align-items:center;">
                                <div style="display:flex; align-items:center; gap:1rem;">
                                    <i class="fa-solid fa-file-word" style="font-size:2rem; color:#3b82f6;"></i>
                                    <div>
                                        <h4 style="color:var(--clr-secondary);">Math: Calculus Worksheet 01</h4>
                                        <p style="font-size:0.8rem; color:var(--clr-text-muted);">Uploaded: Yesterday • 1.1 MB</p>
                                    </div>
                                </div>
                                <button class="outline-btn" style="padding:0.5rem 1rem;"><i class="fa-solid fa-download"></i></button>
                            </div>

                        </div>
                    </div>

                    <!-- Test Portal Mock -->
                    <div id="target-tests" class="dash-section" style="display:none;">
                         <h2 style="font-size:1.75rem; color:var(--clr-secondary); margin-bottom:var(--space-md);">Online Mock Tests</h2>
                         <div style="background:var(--clr-bg-card); border-left:4px solid var(--clr-accent); padding:var(--space-md); border-radius:var(--radius-md); box-shadow:var(--shadow-sm); display:flex; justify-content:space-between; align-items:center;">
                             <div>
                                 <h3 style="color:var(--clr-secondary);">Weekly Mock Test #04 (Full Syllabus)</h3>
                                 <p style="color:var(--clr-text-muted); font-size:0.9rem; margin-top:0.25rem;"><i class="fa-regular fa-clock"></i> 180 Minutes • 300 Marks</p>
                                 <span style="display:inline-block; margin-top:0.5rem; font-size:0.75rem; background:var(--clr-danger-bg); color:var(--clr-danger); padding:0.25rem 0.5rem; border-radius:var(--radius-md); font-weight:700;">Deadline: Today 11:59 PM</span>
                             </div>
                             <button class="primary-btn">Start Test Now</button>
                         </div>
                    </div>

                </main>
            </div>
        `;
    },

    after_render: async () => {
        if (!window.DB.currentUser || window.DB.currentUser.role !== 'student') return;

        // Simple Tab switching logic
        const links = document.querySelectorAll('.sidebar-link[data-target]');
        const sections = document.querySelectorAll('.dash-section');

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                const target = link.getAttribute('data-target');

                sections.forEach(s => s.style.display = 'none');
                const targetEl = document.getElementById(`target-${target}`);
                if (targetEl) targetEl.style.display = 'block';
                else {
                    // Provide generic placeholder for missing tabs
                    sections.forEach(s => s.style.display = 'none');
                    document.getElementById('target-overview').insertAdjacentHTML('afterend', `
                        <div class="dash-section dynamic-placeholder" style="text-align:center; padding: 4rem 0;">
                            <i class="fa-solid fa-person-digging" style="font-size:4rem; color:var(--clr-border); margin-bottom:1rem;"></i>
                            <h2 style="color:var(--clr-text-muted);">Module in Development</h2>
                            <p>This section is being built securely.</p>
                        </div>
                    `);
                    document.querySelector('.dynamic-placeholder').style.display = 'block';
                }
            });
        });

        // Logout
        document.getElementById('logout-btn').addEventListener('click', () => {
            window.DB.logout();
        });
    }
};

export default StudentDashboard;
