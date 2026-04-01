const Courses = {
    render: async () => {
        // Assume global DB exists from js/data.js
        const courses = window.DB.courses;

        // Inject page-specific CSS into the document head
        const linkId = 'css-view-Courses';
        if (!document.getElementById(linkId)) {
            const link = document.createElement('link');
            link.id = linkId;
            link.className = 'css-view-dynamic';
            link.rel = 'stylesheet';
            link.href = './css/views/Courses.css';
            document.head.appendChild(link);
        }

        // Generate full course HTML
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
                    <div style="display:flex; gap: 0.5rem;">
                        <button class="outline-btn view-details-btn" data-id="${c.course_id}" style="flex:1;">View Details</button>
                        <a href="#/admission?course=${c.course_id}" class="primary-btn" style="flex:1;"><i class="fa-solid fa-clipboard-check"></i> Apply</a>
                    </div>
                </div>
            </div>
        `).join('');

        const view = `
            <header class="page-header">
                <div class="container">
                    <h1 class="page-title">Explore Our Programs</h1>
                    <p class="page-subtitle" style="color:var(--clr-text-muted);">Comprehensive learning paths designed to help you excel in your target examinations.</p>
                </div>
            </header>

            <section class="container">
                <div class="filters-bar">
                    <div class="filter-group">
                        <label>Category</label>
                        <select class="filter-select">
                            <option>All Categories</option>
                            <option>Engineering (JEE)</option>
                            <option>Medical (NEET)</option>
                            <option>Civil Services (UPSC)</option>
                            <option>Study Abroad</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Target Exam</label>
                        <select class="filter-select">
                            <option>All Exams</option>
                            <option>JEE Advanced</option>
                            <option>NEET</option>
                            <option>UPSC CSE</option>
                            <option>SAT</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Duration</label>
                        <select class="filter-select">
                            <option>Any Duration</option>
                            <option>1 Year</option>
                            <option>2 Years</option>
                            <option>Short Term</option>
                        </select>
                    </div>
                    <div style="padding-top: 1.5rem;">
                        <button class="primary-btn"><i class="fa-solid fa-filter"></i> Filter</button>
                    </div>
                </div>

                <div class="courses-grid-full">
                    ${courseCardsHTML}
                </div>
            </section>

            <!-- Modal for Course Details -->
            <div id="course-modal" class="course-detail-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 id="modal-title">Course Name</h2>
                        <button class="close-btn" id="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div style="display:flex; gap: var(--space-md); flex-wrap: wrap;">
                            <img id="modal-img" src="" style="width:100%; max-width: 300px; border-radius: var(--radius-md); object-fit:cover;">
                            <div style="flex:1; min-width: 250px;">
                                <h3 style="margin-bottom: 0.5rem; color: var(--clr-primary);">About Course</h3>
                                <p id="modal-desc" style="color: var(--clr-text-muted); margin-bottom: 1rem;"></p>
                                <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                                    <span class="course-badge" style="position:static; display:inline-block;"><i class="fa-solid fa-tag"></i> <span id="modal-fee"></span></span>
                                    <span class="course-badge" style="position:static; display:inline-block;"><i class="fa-regular fa-clock"></i> <span id="modal-duration"></span></span>
                                </div>
                                <h3 style="margin-top: 1rem;">Core Syllabus Highlights</h3>
                                <ul class="syllabus-list" id="modal-syllabus">
                                </ul>
                            </div>
                        </div>
                        <div style="margin-top: 2rem; border-top: 1px solid var(--clr-border); padding-top: 1rem; text-align:right;">
                             <a href="#/admission" id="modal-apply-btn" class="primary-btn">Proceed to Admission <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return view;
    },

    after_render: async () => {
        // Bind Modal interactions
        const modal = document.getElementById('course-modal');
        const closeBtn = document.getElementById('close-modal');
        const viewBtns = document.querySelectorAll('.view-details-btn');

        viewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const course = window.DB.courses.find(c => c.course_id === id);
                if (course) {
                    document.getElementById('modal-title').innerText = course.name;
                    document.getElementById('modal-desc').innerText = course.description;
                    document.getElementById('modal-img').src = course.image;
                    document.getElementById('modal-fee').innerText = course.fee;
                    document.getElementById('modal-duration').innerText = course.duration;
                    document.getElementById('modal-apply-btn').href = `#/admission?course=${course.course_id}`;

                    document.getElementById('modal-syllabus').innerHTML = course.syllabus.map(s => `<li>${s}</li>`).join('');

                    modal.classList.add('show');
                }
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });

        // Close on outside click
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
};

export default Courses;
