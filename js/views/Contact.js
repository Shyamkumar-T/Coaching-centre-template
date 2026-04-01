const Contact = {
    render: async () => {
        return `
            <header class="page-header">
                <div class="container">
                    <h1 class="page-title">Contact & Support</h1>
                    <p class="page-subtitle" style="color:var(--clr-text-muted);">Have questions? We are here to help you navigate your academic journey.</p>
                </div>
            </header>

            <section class="section">
                <div class="container" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap: var(--space-xl);">
                    
                    <!-- Contact Info -->
                    <div>
                        <h2 style="margin-bottom: 2rem; color:var(--clr-secondary);">Get In Touch</h2>
                        
                        <div style="display:flex; gap:1rem; margin-bottom:1.5rem; align-items:flex-start;">
                            <div style="background:var(--clr-primary-light); color:var(--clr-primary); width:50px; height:50px; display:flex; align-items:center; justify-content:center; border-radius:50%; font-size:1.25rem; flex-shrink:0;">
                                <i class="fa-solid fa-location-dot"></i>
                            </div>
                            <div>
                                <h3 style="margin-bottom:0.25rem;">Head Office</h3>
                                <p style="color:var(--clr-text-muted);">123 Education Hub, Sector 4,<br>Silicon Valley, CA 90210</p>
                            </div>
                        </div>

                        <div style="display:flex; gap:1rem; margin-bottom:1.5rem; align-items:flex-start;">
                            <div style="background:var(--clr-primary-light); color:var(--clr-primary); width:50px; height:50px; display:flex; align-items:center; justify-content:center; border-radius:50%; font-size:1.25rem; flex-shrink:0;">
                                <i class="fa-solid fa-phone"></i>
                            </div>
                            <div>
                                <h3 style="margin-bottom:0.25rem;">Call Us</h3>
                                <p style="color:var(--clr-text-muted);">General: +1 (800) 123-4567<br>Admissions: +1 (800) 987-6543</p>
                            </div>
                        </div>

                        <div style="display:flex; gap:1rem; margin-bottom:1.5rem; align-items:flex-start;">
                            <div style="background:var(--clr-success-bg); color:var(--clr-success); width:50px; height:50px; display:flex; align-items:center; justify-content:center; border-radius:50%; font-size:1.25rem; flex-shrink:0;">
                                <i class="fa-brands fa-whatsapp"></i>
                            </div>
                            <div>
                                <h3 style="margin-bottom:0.25rem;">WhatsApp Chat</h3>
                                <p style="color:var(--clr-text-muted);">Available 9 AM - 8 PM<br><a href="#" style="color:var(--clr-success); font-weight:600;">Start Chat</a></p>
                            </div>
                        </div>

                        <!-- Mock Map -->
                        <div style="width:100%; height:200px; background-color:#e2e8f0; border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; color:var(--clr-text-muted); margin-top:2rem;">
                            <i class="fa-solid fa-map-location-dot" style="font-size:3rem; opacity:0.5;"></i>
                            <span style="margin-left:1rem;">Google Maps Integration</span>
                        </div>
                    </div>

                    <!-- Enquiry Form -->
                    <div style="background:var(--clr-bg-card); padding:var(--space-xl); border-radius:var(--radius-lg); box-shadow:var(--shadow-lg);">
                        <h2 style="margin-bottom: 1.5rem; color:var(--clr-secondary);">Send an Enquiry</h2>
                        <form onsubmit="event.preventDefault(); alert('Enquiry Sent Successfully!'); this.reset();">
                            <div style="margin-bottom:1rem;">
                                <input type="text" placeholder="Your Name" required style="width:100%; padding:0.75rem; border:1px solid var(--clr-border); border-radius:var(--radius-md);">
                            </div>
                            <div style="margin-bottom:1rem;">
                                <input type="email" placeholder="Email Address" required style="width:100%; padding:0.75rem; border:1px solid var(--clr-border); border-radius:var(--radius-md);">
                            </div>
                            <div style="margin-bottom:1rem;">
                                <input type="text" placeholder="Course Interested In" style="width:100%; padding:0.75rem; border:1px solid var(--clr-border); border-radius:var(--radius-md);">
                            </div>
                            <div style="margin-bottom:1.5rem;">
                                <textarea rows="4" placeholder="Your Message / Query" required style="width:100%; padding:0.75rem; border:1px solid var(--clr-border); border-radius:var(--radius-md);"></textarea>
                            </div>
                            <button class="primary-btn" style="width:100%;">Submit Enquiry</button>
                        </form>
                    </div>
                </div>
            </section>

            <!-- FAQ SECTION -->
            <section class="section" style="background-color:var(--clr-bg-main);" id="faq">
                <div class="container" style="max-width:800px;">
                    <div class="section-header">
                        <h2 class="section-title">Frequently Asked Questions</h2>
                    </div>
                    
                    <div style="display:flex; flex-direction:column; gap:1rem;">
                        <details style="background:var(--clr-bg-card); padding:1rem 1.5rem; border-radius:var(--radius-md); box-shadow:var(--shadow-sm); cursor:pointer;">
                            <summary style="font-weight:600; font-size:1.1rem; color:var(--clr-secondary); outline:none; list-style:none;">
                                1. What is the admission procedure?
                            </summary>
                            <p style="color:var(--clr-text-muted); margin-top:1rem; padding-top:1rem; border-top:1px solid var(--clr-border); line-height:1.6;">
                                You can apply online through our Admission Portal. Select your course, fill the multi-step form, upload your previous marksheet, and pay the registration fee.
                            </p>
                        </details>

                        <details style="background:var(--clr-bg-card); padding:1rem 1.5rem; border-radius:var(--radius-md); box-shadow:var(--shadow-sm); cursor:pointer;">
                            <summary style="font-weight:600; font-size:1.1rem; color:var(--clr-secondary); outline:none; list-style:none;">
                                2. Do you provide scholarships?
                            </summary>
                            <p style="color:var(--clr-text-muted); margin-top:1rem; padding-top:1rem; border-top:1px solid var(--clr-border); line-height:1.6;">
                                Yes, we conduct an Elite Scholarship Test (EST) twice a year where students can earn up to 100% tuition fee waiver based on merit.
                            </p>
                        </details>

                        <details style="background:var(--clr-bg-card); padding:1rem 1.5rem; border-radius:var(--radius-md); box-shadow:var(--shadow-sm); cursor:pointer;">
                            <summary style="font-weight:600; font-size:1.1rem; color:var(--clr-secondary); outline:none; list-style:none;">
                                3. What if I miss a live online class?
                            </summary>
                            <p style="color:var(--clr-text-muted); margin-top:1rem; padding-top:1rem; border-top:1px solid var(--clr-border); line-height:1.6;">
                                All live classes are recorded and uploaded to the Student Dashboard within 24 hours. You can watch them unlimited times until your course expires.
                            </p>
                        </details>
                    </div>
                </div>
            </section>
        `;
    }
};

export default Contact;
