const Admission = {
    render: async () => {
        // Assume global DB
        // Check if there's a pre-selected course from URL (e.g. #/admission?course=c1)
        const hashFragments = window.location.hash.split('?');
        let preSelectedCourse = '';
        if (hashFragments.length > 1) {
            const params = new URLSearchParams(hashFragments[1]);
            preSelectedCourse = params.get('course') || '';
        }

        const courses = window.DB.courses;
        const batches = window.DB.batches;

        // Generate options
        const courseOptions = courses.map(c =>
            `<option value="${c.course_id}" ${preSelectedCourse === c.course_id ? 'selected' : ''}>${c.name}</option>`
        ).join('');

        const batchOptions = batches.map(b =>
            `<option value="${b.batch_id}" data-course="${b.course_id}">${b.name} (${b.start_date})</option>`
        ).join('');

        // Inject page-specific CSS
        const linkId = 'css-view-Admission';
        if (!document.getElementById(linkId)) {
            const link = document.createElement('link');
            link.id = linkId;
            link.className = 'css-view-dynamic';
            link.rel = 'stylesheet';
            link.href = './css/views/Admission.css';
            document.head.appendChild(link);
        }

        const view = `
            <header class="page-header" style="padding-bottom: 8rem;">
                <div class="container">
                    <h1 class="page-title">Admission Portal</h1>
                    <p class="page-subtitle" style="color:var(--clr-text-muted);">Secure your seat for the upcoming batches. Follow the steps below to complete your enrollment.</p>
                </div>
            </header>

            <section class="container">
                <div class="admission-container">
                    
                    <!-- Progress Tracker -->
                    <div class="progress-tracker" id="progress-tracker">
                        <div class="progress-step active" data-step="1">
                            <div class="step-circle">1</div>
                            <span>Course</span>
                        </div>
                        <div class="progress-step" data-step="2">
                            <div class="step-circle">2</div>
                            <span>Details</span>
                        </div>
                        <div class="progress-step" data-step="3">
                            <div class="step-circle">3</div>
                            <span>Documents</span>
                        </div>
                        <div class="progress-step" data-step="4">
                            <div class="step-circle">4</div>
                            <span>Payment</span>
                        </div>
                    </div>

                    <!-- Step 1: Course Selection -->
                    <div class="form-step active" id="step-1">
                        <h2 style="margin-bottom: var(--space-md);">1. Choose Your Course & Batch</h2>
                        <div class="form-grid">
                            <div class="form-group full-width">
                                <label>Target Course *</label>
                                <select id="form-course" required>
                                    <option value="">-- Select Course --</option>
                                    ${courseOptions}
                                </select>
                            </div>
                            <div class="form-group full-width">
                                <label>Preferred Batch *</label>
                                <select id="form-batch" required>
                                    <option value="">-- Select Batch --</option>
                                    ${batchOptions}
                                </select>
                            </div>
                        </div>
                        <div class="form-actions" style="justify-content: flex-end;">
                            <button class="primary-btn next-btn" data-next="2">Next Step <i class="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>

                    <!-- Step 2: Student Details -->
                    <div class="form-step" id="step-2">
                        <h2 style="margin-bottom: var(--space-md);">2. Applicant Details</h2>
                        <div class="form-grid">
                            <div class="form-group">
                                <label>Full Name *</label>
                                <input type="text" id="form-name" placeholder="E.g. John Doe" required>
                            </div>
                            <div class="form-group">
                                <label>Email Address *</label>
                                <input type="email" id="form-email" placeholder="john@example.com" required>
                            </div>
                            <div class="form-group">
                                <label>Student Phone *</label>
                                <input type="tel" id="form-phone" placeholder="Enter 10 digit number" required>
                            </div>
                            <div class="form-group">
                                <label>Date of Birth</label>
                                <input type="date" id="form-dob" style="width:100%; padding:0.75rem; border:1px solid var(--clr-border); border-radius:var(--radius-md);">
                            </div>
                            <div class="form-group">
                                <label>Parent/Guardian Contact *</label>
                                <input type="tel" id="form-parent-phone" placeholder="Emergency contact number" required>
                            </div>
                            <div class="form-group">
                                <label>Current School/College</label>
                                <input type="text" id="form-school" placeholder="E.g. Delhi Public School">
                            </div>
                        </div>
                        <div class="form-actions">
                            <button class="outline-btn prev-btn" data-prev="1"><i class="fa-solid fa-arrow-left"></i> Back</button>
                            <button class="primary-btn next-btn" data-next="3">Next Step <i class="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>

                    <!-- Step 3: Documents Upload -->
                    <div class="form-step" id="step-3">
                        <h2 style="margin-bottom: var(--space-md);">3. Upload Documents</h2>
                        <p style="color:var(--clr-text-muted); margin-bottom: var(--space-lg);">Please provide the necessary documents for verification. JPG, PNG, or PDF formats only.</p>
                        
                        <div class="form-group">
                            <label>Recent Passport Size Photo *</label>
                            <div class="file-upload-area" onclick="document.getElementById('upload-photo').click()">
                                <i class="fa-regular fa-image"></i>
                                <p>Click to browse or drag and drop</p>
                                <input type="file" id="upload-photo" hidden accept="image/*">
                            </div>
                        </div>

                        <div class="form-group" style="margin-top:var(--space-md);">
                            <label>Previous Year Marks Sheet *</label>
                            <div class="file-upload-area" onclick="document.getElementById('upload-marks').click()">
                                <i class="fa-regular fa-file-pdf"></i>
                                <p>Click to browse or drag and drop</p>
                                <input type="file" id="upload-marks" hidden accept=".pdf,.jpg,.png">
                            </div>
                        </div>

                        <div class="form-actions">
                            <button class="outline-btn prev-btn" data-prev="2"><i class="fa-solid fa-arrow-left"></i> Back</button>
                            <button class="primary-btn next-btn" data-next="4">Next Step <i class="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>

                    <!-- Step 4: Payment & Submit -->
                    <div class="form-step" id="step-4">
                        <h2 style="margin-bottom: var(--space-md);">4. Registration & Payment</h2>
                        
                        <div style="background:var(--clr-bg-main); padding:var(--space-md); border-radius:var(--radius-md); border:1px solid var(--clr-border); margin-bottom:var(--space-md);">
                            <h3 style="margin-bottom:0.5rem;">Fee Breakdown</h3>
                            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
                                <span>Registration Fee</span>
                                <strong>$50.00</strong>
                            </div>
                            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; color:var(--clr-success);">
                                <span>Early Bird Waiver</span>
                                <strong>-$10.00</strong>
                            </div>
                            <hr style="border:0; border-top:1px solid var(--clr-border); margin:0.5rem 0;">
                            <div style="display:flex; justify-content:space-between; font-weight:800; font-size:1.25rem;">
                                <span>Total Payable Now</span>
                                <span>$40.00</span>
                            </div>
                        </div>

                        <div class="form-group" style="margin-bottom: var(--space-lg);">
                            <label><input type="checkbox" id="terms-check" style="margin-right:0.5rem;" required> I agree to the terms and conditions and refund policy of Elite Academy.</label>
                        </div>

                        <div class="form-actions">
                            <button class="outline-btn prev-btn" data-prev="3"><i class="fa-solid fa-arrow-left"></i> Back</button>
                            <button class="primary-btn" id="submit-btn" style="background-color:var(--clr-success);"><i class="fa-solid fa-lock"></i> Pay $40 & Submit</button>
                        </div>
                    </div>

                    <!-- Success State -->
                    <div class="form-step" id="step-5">
                        <div class="success-message">
                            <div class="success-icon"><i class="fa-solid fa-circle-check"></i></div>
                            <h2>Application Submitted Successfully!</h2>
                            <p style="color:var(--clr-text-muted); margin: var(--space-md) auto; max-width:500px;">
                                Thank you for applying to Elite Academy. A confirmation receipt has been sent to your email. You can now login to your student portal using your application ID.
                            </p>
                            <div style="display:flex; gap:1rem; justify-content:center; margin-top:2rem;">
                                <a href="#/student-dashboard" class="primary-btn">Go to Student Dashboard</a>
                                <a href="#/home" class="outline-btn">Return Home</a>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        `;
        return view;
    },

    after_render: async () => {
        const nextBtns = document.querySelectorAll('.next-btn');
        const prevBtns = document.querySelectorAll('.prev-btn');
        const submitBtn = document.getElementById('submit-btn');
        const steps = document.querySelectorAll('.form-step');
        const progressSteps = document.querySelectorAll('.progress-step');
        const courseSelect = document.getElementById('form-course');
        const batchSelect = document.getElementById('form-batch');

        // Dynamic Batch filtering based on course
        const filterBatches = () => {
            const courseId = courseSelect.value;
            const options = batchSelect.querySelectorAll('option');
            options.forEach(opt => {
                if (opt.value === "") return; // keep prompt
                if (opt.getAttribute('data-course') === courseId || !courseId) {
                    opt.style.display = 'block';
                } else {
                    opt.style.display = 'none';
                }
            });
            batchSelect.value = ''; // reset
        };

        if (courseSelect.value) filterBatches();
        courseSelect.addEventListener('change', filterBatches);

        // Navigation Handlers
        const showStep = (stepNumber) => {
            steps.forEach(s => s.classList.remove('active'));
            document.getElementById(`step-${stepNumber}`).classList.add('active');

            // Update tracker (only up to step 4)
            if (stepNumber <= 4) {
                progressSteps.forEach(p => {
                    const idx = parseInt(p.getAttribute('data-step'));
                    p.classList.remove('active', 'completed');
                    if (idx < stepNumber) {
                        p.classList.add('completed');
                    } else if (idx === parseInt(stepNumber)) {
                        p.classList.add('active');
                    }
                });
            }
        };

        nextBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // very basic validation simulation
                const currentStep = e.target.closest('.form-step');
                const inputs = currentStep.querySelectorAll('input[required], select[required]');
                let valid = true;
                inputs.forEach(inp => {
                    if (!inp.value) {
                        valid = false;
                        inp.style.borderColor = 'var(--clr-danger)';
                    } else {
                        inp.style.borderColor = 'var(--clr-border)';
                    }
                });

                if (valid) {
                    const next = btn.getAttribute('data-next');
                    showStep(next);
                } else {
                    alert("Please fill in all required fields.");
                }
            });
        });

        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const prev = btn.getAttribute('data-prev');
                showStep(prev);
            });
        });

        // Form Submit Simulation
        submitBtn.addEventListener('click', () => {
            const terms = document.getElementById('terms-check');
            if (terms.checked) {
                // Simulate processing
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
                submitBtn.disabled = true;
                setTimeout(() => {
                    // Update global state - pretend user is now logged in as student
                    window.DB.loginStudent();
                    showStep(5); // Show success screen
                }, 1500);
            } else {
                alert("You must agree to the terms and conditions.");
            }
        });
    }
};

export default Admission;
