const Faculty = {
    render: async () => {
        const facultyData = window.DB.faculty;

        const facultyCards = facultyData.map(f => `
            <div style="background:var(--clr-bg-card); border-radius:var(--radius-lg); overflow:hidden; box-shadow:var(--shadow-md); text-align:center; transition:var(--transition-normal);" class="faculty-card">
                <img src="${f.image}" alt="${f.name}" style="width:100%; height:300px; object-fit:cover;">
                <div style="padding:var(--space-md);">
                    <h3 style="font-size:1.5rem; margin-bottom:0.25rem;">${f.name}</h3>
                    <div style="color:var(--clr-primary); font-weight:600; margin-bottom:0.5rem; font-size:0.875rem;">${f.subject} Expert</div>
                    <p style="color:var(--clr-text-muted); font-size:0.9rem; margin-bottom:1rem;">${f.bio}</p>
                    <div style="display:flex; justify-content:space-around; border-top:1px solid var(--clr-border); padding-top:1rem; font-size:0.875rem;">
                        <div>
                            <div style="font-weight:700; color:var(--clr-secondary);">${f.experience}</div>
                            <div style="color:var(--clr-text-muted); font-size:0.75rem; text-transform:uppercase;">Experience</div>
                        </div>
                        <div>
                            <div style="font-weight:700; color:var(--clr-secondary); font-size:0.85rem; max-width:120px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${f.qualification}</div>
                            <div style="color:var(--clr-text-muted); font-size:0.75rem; text-transform:uppercase;">Education</div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        return `
            <header class="page-header">
                <div class="container">
                    <h1 class="page-title">Meet Our Experts</h1>
                    <p class="page-subtitle" style="color:var(--clr-text-muted);">Learn from the best minds in the industry. Our educators are passionate about shaping your future.</p>
                </div>
            </header>

            <section class="section">
                <div class="container">
                    <style>
                        .faculty-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-hover); }
                    </style>
                    <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: var(--space-lg);">
                        ${facultyCards}
                    </div>
                </div>
            </section>
        `;
    }
};

export default Faculty;
