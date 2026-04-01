const Home = {
    render: async () => {
        // Assume global DB exists from js/data.js
        const stats = window.DB.stats;
        const courses = window.DB.courses.slice(0, 3); // Featured first 3 courses

        // Inject page-specific CSS into the document head
        const linkId = 'css-view-Home';
        if (!document.getElementById(linkId)) {
            const link = document.createElement('link');
            link.id = linkId;
            link.className = 'css-view-dynamic';
            link.rel = 'stylesheet';
            link.href = './css/views/Home.css';
            document.head.appendChild(link);
        }

        // Generate course HTML
        const courseCardsHTML = courses.map(c => `
            <div class="course-card">
                <div class="course-badge"><i class="fa-solid ${c.icon}"></i> ${c.target_exam}</div>
                <img src="${c.image}" alt="${c.name}" class="course-img">
                <div class="course-content">
                    <h3 class="course-title">${c.name}</h3>
                    <p class="course-desc">${c.description}</p>
                    <div class="course-meta">
                        <div><i class="fa-regular fa-clock"></i> ${c.duration}</div>
                        <div><i class="fa-solid fa-tag"></i> ${c.fee}</div>
                    </div>
                    <a href="#/courses" class="outline-btn" style="width: 100%;">View Details</a>
                </div>
            </div>
        `).join('');

        const view = `
            <!-- Hero Section -->
            <section class="hero">
                <div class="container">
                    <div class="hero-badge">Ranked #1 Coaching Institute in 2025</div>
                    <h1 class="hero-title">Shape Your Dreams Into <span class="highlight">Reality</span></h1>
                    <p class="hero-subtitle">Join Elite Academy and prepare with the nation's best educators. Engineering, Medical, Civil Services, and Beyond.</p>
                    <div class="hero-actions">
                        <a href="#/admission" class="primary-btn">Apply for Admission <i class="fa-solid fa-arrow-right"></i></a>
                        <a href="#/demo" class="outline-btn" style="color:white; border-color:white;">Book Free Demo <i class="fa-regular fa-calendar-check"></i></a>
                    </div>
                </div>
            </section>

            <!-- Stats Bar -->
            <section class="stats-section">
                <div class="container">
                    <div class="stats-grid">
                        <div class="stat-item">
                            <div class="stat-number">${stats.selections}</div>
                            <div class="stat-label">Total Selections</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">${stats.topRankers}</div>
                            <div class="stat-label">Top 100 Rankers</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">${stats.facultyCount}</div>
                            <div class="stat-label">Expert Faculty</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">${stats.successRate}</div>
                            <div class="stat-label">Success Rate</div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Trusted / About Section snippet -->
            <section class="section about-snippet" id="explore">
                <div class="container" style="display:flex; gap: 3rem; align-items: center; flex-wrap: wrap;">
                    <div style="flex:1; min-width:300px;">
                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&fm=webp&fit=crop&w=800&q=80" alt="Students Studying" style="border-radius: var(--radius-lg); box-shadow: var(--shadow-lg);">
                    </div>
                    <div style="flex:1; min-width:300px;">
                        <h2 class="section-title" style="text-align:left; margin-bottom: 2rem;">Why Choose Elite Academy?</h2>
                        <ul style="display:flex; flex-direction:column; gap: 1rem;">
                            <li style="display:flex; gap:1rem; align-items:flex-start;">
                                <div style="background:var(--clr-primary-light); color:var(--clr-primary); padding: 0.5rem; border-radius:50%;"><i class="fa-solid fa-chalkboard-user"></i></div>
                                <div><strong>Expert Faculty</strong><p style="color:var(--clr-text-muted); font-size: 0.9rem;">Learn from IITians, Doctors, and Civil Servants.</p></div>
                            </li>
                            <li style="display:flex; gap:1rem; align-items:flex-start;">
                                <div style="background:var(--clr-primary-light); color:var(--clr-primary); padding: 0.5rem; border-radius:50%;"><i class="fa-solid fa-book-open"></i></div>
                                <div><strong>Comprehensive Study Material</strong><p style="color:var(--clr-text-muted); font-size: 0.9rem;">Updated & extensively researched modules.</p></div>
                            </li>
                            <li style="display:flex; gap:1rem; align-items:flex-start;">
                                <div style="background:var(--clr-primary-light); color:var(--clr-primary); padding: 0.5rem; border-radius:50%;"><i class="fa-solid fa-chart-line"></i></div>
                                <div><strong>Rigorous Testing</strong><p style="color:var(--clr-text-muted); font-size: 0.9rem;">All-India Mock Test Series with detailed analytics.</p></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <!-- Featured Courses -->
            <section class="section courses-section">
                <div class="container">
                    <div class="section-header">
                        <h2 class="section-title">Our Premium Programs</h2>
                        <p class="section-subtitle">Discover the perfect course tailored to help you crack your target examination.</p>
                    </div>
                    <div class="course-grid">
                        ${courseCardsHTML}
                    </div>
                    <div style="text-align: center; margin-top: var(--space-lg);">
                        <a href="#/courses" class="outline-btn">View All Courses <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
            </section>

            <!-- Admission CTA Section -->
            <section class="section">
                <div class="container">
                    <div class="cta-section">
                        <div class="cta-content">
                            <h2>Admissions for Session 2026-27 Are Open!</h2>
                            <p>Secure your future. Apply now to get an early bird scholarship up to 50% based on your merit.</p>
                            <div class="cta-buttons">
                                <a href="#/admission" class="secondary-btn">Start Admission Process</a>
                                <a href="#/contact" class="outline-btn" style="border-color:white; color:white;">Contact Counselor</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
        return view;
    },

    after_render: async () => {
        // Any DOM manipulations or event binding for Home view goes here
    }
};

export default Home;

