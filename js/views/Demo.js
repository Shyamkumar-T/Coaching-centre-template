const Demo = {
    render: async () => {
        const courses = window.DB.courses;
        const courseOptions = courses.map(c => `<option value="${c.course_id}">${c.name}</option>`).join('');

        return `
            <header class="page-header">
                <div class="container">
                    <h1 class="page-title">Book a Free Demo Class</h1>
                    <p class="page-subtitle" style="color:var(--clr-text-muted);">Experience our teaching methodology before committing. Seats for demo classes are limited.</p>
                </div>
            </header>

            <section class="section">
                <div class="container" style="max-width: 600px;">
                    <div style="background:var(--clr-bg-card); padding:var(--space-xl); border-radius:var(--radius-lg); box-shadow:var(--shadow-lg);">
                        
                        <div id="demo-success" style="display:none; text-align:center; padding: 2rem 0;">
                            <i class="fa-regular fa-calendar-check" style="font-size: 4rem; color:var(--clr-success); margin-bottom:1rem;"></i>
                            <h2>Demo Booked Successfully!</h2>
                            <p style="color:var(--clr-text-muted); margin-top:1rem;">Our academic counselor will contact you shortly to confirm the link/venue for the demo class.</p>
                            <button class="outline-btn" style="margin-top:2rem;" onclick="location.hash='#/home'">Return Home</button>
                        </div>

                        <form id="demo-form">
                            <div style="margin-bottom:var(--space-md);">
                                <label style="display:block; font-weight:600; margin-bottom:0.5rem;">Student Name *</label>
                                <input type="text" id="demo-name" required placeholder="Full Name" style="width:100%; padding:0.75rem; border:1px solid var(--clr-border); border-radius:var(--radius-md);">
                            </div>
                            
                            <div style="margin-bottom:var(--space-md);">
                                <label style="display:block; font-weight:600; margin-bottom:0.5rem;">Phone Number *</label>
                                <input type="tel" id="demo-phone" required placeholder="10-digit mobile number" style="width:100%; padding:0.75rem; border:1px solid var(--clr-border); border-radius:var(--radius-md);">
                            </div>

                            <div style="margin-bottom:var(--space-md);">
                                <label style="display:block; font-weight:600; margin-bottom:0.5rem;">Course of Interest *</label>
                                <select id="demo-course" required style="width:100%; padding:0.75rem; border:1px solid var(--clr-border); border-radius:var(--radius-md); background:var(--clr-bg-main);">
                                    <option value="">-- Choose Course --</option>
                                    ${courseOptions}
                                </select>
                            </div>

                            <div style="margin-bottom:var(--space-md);">
                                <label style="display:block; font-weight:600; margin-bottom:0.5rem;">Preferred Date *</label>
                                <input type="date" id="demo-date" required style="width:100%; padding:0.75rem; border:1px solid var(--clr-border); border-radius:var(--radius-md);">
                            </div>

                            <div style="margin-bottom:var(--space-lg);">
                                <label style="display:block; font-weight:600; margin-bottom:0.5rem;">Mode of Demo *</label>
                                <div style="display:flex; gap:1rem;">
                                    <label style="display:flex; align-items:center; gap:0.5rem; font-weight:normal;"><input type="radio" name="demo-mode" value="Online" required> Online (Zoom Link)</label>
                                    <label style="display:flex; align-items:center; gap:0.5rem; font-weight:normal;"><input type="radio" name="demo-mode" value="Offline"> Offline (In Campus)</label>
                                </div>
                            </div>

                            <button type="submit" class="primary-btn" style="width:100%;">Confirm Booking</button>
                        </form>
                    </div>
                </div>
            </section>
        `;
    },

    after_render: async () => {
        const form = document.getElementById('demo-form');
        const success = document.getElementById('demo-success');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate processing
            const btn = form.querySelector('button');
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Booking...';
            btn.disabled = true;

            setTimeout(() => {
                form.style.display = 'none';
                success.style.display = 'block';
            }, 1000);
        });
    }
};

export default Demo;
