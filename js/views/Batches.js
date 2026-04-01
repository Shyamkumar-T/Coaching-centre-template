const Batches = {
    render: async () => {
        const batches = window.DB.batches;
        const courses = window.DB.courses;

        // Inject CSS
        const linkId = 'css-view-Batches';
        if (!document.getElementById(linkId)) {
            const link = document.createElement('link');
            link.id = linkId;
            link.className = 'css-view-dynamic';
            link.rel = 'stylesheet';
            link.href = './css/views/Batches.css';
            document.head.appendChild(link);
        }

        const batchesHTML = batches.map(b => {
            const course = courses.find(c => c.course_id === b.course_id);
            const courseName = course ? course.name : 'General Course';
            const percentFilled = Math.round((b.enrolled / b.capacity) * 100);
            let statusClass = 'success';
            if (percentFilled > 75) statusClass = 'warning';
            if (percentFilled > 95) statusClass = 'danger';

            return `
                <div class="batch-card">
                    <div class="batch-header">
                        <div class="batch-title">
                            <h3>${b.name}</h3>
                            <div class="batch-course">${courseName}</div>
                        </div>
                        <div class="batch-mode" style="margin-top:0.5rem;"><i class="fa-solid fa-laptop-house"></i> ${b.mode}</div>
                    </div>
                    
                    <div class="batch-details">
                        <div class="batch-detail-item">
                            <i class="fa-regular fa-calendar-days"></i> Starts: ${b.start_date}
                        </div>
                        <div class="batch-detail-item">
                            <i class="fa-regular fa-clock"></i> ${b.timings}
                        </div>
                        <div style="width: 100%; max-width: 250px;">
                            <div style="display:flex; justify-content:space-between; font-size:0.8rem; margin-bottom:0.25rem;">
                                <span>Seats Filled: <strong>${b.enrolled}/${b.capacity}</strong></span>
                                <span style="font-weight:700;" class="clr-${statusClass}">${percentFilled}%</span>
                            </div>
                            <div class="seat-indicator">
                                <div class="seat-fill ${statusClass}" style="width: ${percentFilled}%"></div>
                            </div>
                            ${percentFilled > 95 ? '<span style="color:var(--clr-danger); font-size:0.75rem; font-weight:700;"><i class="fa-solid fa-fire"></i> Filling Fast!</span>' : ''}
                        </div>
                    </div>
                    
                    <div class="batch-footer">
                        <a href="#/admission?course=${b.course_id}" class="primary-btn">Enroll in Batch</a>
                    </div>
                </div>
             `;
        }).join('');

        return `
            <header class="page-header">
                <div class="container">
                    <h1 class="page-title">Batch Schedules & Availability</h1>
                    <p class="page-subtitle" style="color:var(--clr-text-muted);">Stay updated with the latest batch timings and secure your seat before they are filled.</p>
                </div>
            </header>

            <section class="section">
                <div class="container">
                    <div class="section-header">
                        <h2 class="section-title">Upcoming & Ongoing Batches</h2>
                    </div>
                    <div style="display:flex; justify-content:flex-end; margin-bottom: 2rem;">
                         <select class="filter-select" style="max-width: 300px;">
                             <option>Filter by Course</option>
                             <option>JEE Programs</option>
                             <option>NEET Programs</option>
                         </select>
                    </div>

                    <div class="batches-list">
                        ${batchesHTML}
                    </div>

                    <div style="text-align:center; margin-top: 3rem;">
                        <p style="color:var(--clr-text-muted); margin-bottom:1rem;">Can't find a suitable batch timing?</p>
                        <a href="#/contact" class="outline-btn">Contact Academic Counselor</a>
                    </div>
                </div>
            </section>
        `;
    }
};

export default Batches;
