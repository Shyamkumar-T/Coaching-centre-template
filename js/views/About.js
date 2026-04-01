const About = {
    render: async () => {
        return `
            <header class="page-header" style="background: linear-gradient(rgba(15,23,42,0.8), rgba(15,23,42,0.8)), url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&fm=webp&fit=crop&w=1920&q=80') center/cover;">
                <div class="container">
                    <h1 class="page-title">About Elite Academy</h1>
                    <p class="page-subtitle" style="color:white;">Pioneering Excellence in Education since 2010.</p>
                </div>
            </header>

            <section class="section">
                <div class="container" style="display:flex; gap: 4rem; align-items:center; flex-wrap:wrap;">
                    <div style="flex:1; min-width:300px;">
                        <h2 class="section-title" style="text-align:left;">Our Mission</h2>
                        <p style="margin-top:2rem; font-size:1.1rem; color:var(--clr-text-muted); line-height:1.8;">
                            At Elite Academy, our mission goes beyond academic excellence. We strive to create an ecosystem of learning where curiosity is nurtured, discipline is built, and success becomes a habit. 
                        </p>
                        <p style="margin-top:1rem; font-size:1.1rem; color:var(--clr-text-muted); line-height:1.8;">
                            Over the last 15 years, our structured pedagogical methods have helped thousands of students crack competitive exams like JEE, NEET, and UPSC, fundamentally altering the trajectory of their careers.
                        </p>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:2rem; margin-top:2rem;">
                            <div style="background:var(--clr-bg-card); padding:1.5rem; border-radius:var(--radius-md); box-shadow:var(--shadow-sm); border-left:4px solid var(--clr-primary);">
                                <h3 style="color:var(--clr-primary); font-size:2rem; margin-bottom:0.5rem;">15+</h3>
                                <p style="font-weight:600; color:var(--clr-secondary);">Years of Trust</p>
                            </div>
                            <div style="background:var(--clr-bg-card); padding:1.5rem; border-radius:var(--radius-md); box-shadow:var(--shadow-sm); border-left:4px solid var(--clr-success);">
                                <h3 style="color:var(--clr-success); font-size:2rem; margin-bottom:0.5rem;">50k+</h3>
                                <p style="font-weight:600; color:var(--clr-secondary);">Lives Changed</p>
                            </div>
                        </div>
                    </div>
                    <div style="flex:1; min-width:300px; position:relative;">
                        <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&fm=webp&fit=crop&w=800&q=80" style="border-radius:var(--radius-lg); box-shadow:var(--shadow-hover);" alt="Campus">
                    </div>
                </div>
            </section>

            <section class="section" style="background-color:var(--clr-bg-main);">
                <div class="container">
                    <div class="section-header">
                        <h2 class="section-title">World-Class Infrastructure</h2>
                        <p class="section-subtitle">Comfortable, tech-enabled learning environments designed to keep you focused.</p>
                    </div>
                    
                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:var(--space-md);">
                        <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&fm=webp&fit=crop&w=600&q=80" style="width:100%; height:250px; object-fit:cover; border-radius:var(--radius-md); box-shadow:var(--shadow-sm);" alt="Smart Classrooms">
                        <img src="https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-4.0.3&fm=webp&fit=crop&w=600&q=80" style="width:100%; height:250px; object-fit:cover; border-radius:var(--radius-md); box-shadow:var(--shadow-sm);" alt="Library">
                        <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&fm=webp&fit=crop&w=600&q=80" style="width:100%; height:250px; object-fit:cover; border-radius:var(--radius-md); box-shadow:var(--shadow-sm);" alt="Discussion Rooms">
                    </div>
                </div>
            </section>
        `;
    }
};

export default About;

