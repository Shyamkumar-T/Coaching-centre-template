document.addEventListener('DOMContentLoaded', () => {
    const db = window.AdminDB;
    if (!db) return;

    // ─── DOM refs ───────────────────────────────────────
    const tbody       = document.getElementById('studentTableBody');
    const searchInput = document.getElementById('studentSearch');
    const courseFilter= document.getElementById('studentCourseFilter');
    const statusFilter= document.getElementById('studentStatusFilter');
    const drawerOverlay  = document.getElementById('studentDrawerOverlay');
    const drawerPanel    = document.getElementById('studentDrawer');
    const drawerCloseBtn = document.getElementById('studentDrawerCloseBtn');

    // Modal
    const modalBackdrop  = document.getElementById('addStudentBackdrop');
    const openModalBtn   = document.getElementById('openAddStudentBtn');
    const modalCloseBtn  = document.getElementById('modalCloseBtn');
    const addStudentForm = document.getElementById('addStudentForm');

    // Form cascade selects
    const fCourse   = document.getElementById('fCourse');
    const fProgram  = document.getElementById('fProgram');
    const fBatchYear= document.getElementById('fBatchYear');
    const fClass    = document.getElementById('fClass');
    const classTags = document.getElementById('classTags');

    // ─── Utility ────────────────────────────────────────
    function getAttColor(pct) {
        if (pct >= 80) return '#10b981';
        if (pct >= 65) return '#f59e0b';
        return '#ef4444';
    }

    function getClassPillClass(cn) {
        if (cn.startsWith('FR')) return 'fr';
        if (cn.startsWith('SR')) return 'sr';
        if (cn.startsWith('DR')) return 'dr';
        return '';
    }

    // ─── Render Table ────────────────────────────────────
    function renderTable(data) {
        tbody.innerHTML = data.length === 0
            ? `<tr><td colspan="8" style="text-align:center;padding:2rem;color:#94a3b8;">No students found.</td></tr>`
            : data.map(s => `
                <tr data-id="${s.id}" style="cursor:pointer;">
                    <td>
                        <strong>${s.name}</strong>
                        <br><span style="font-size:0.75rem;color:#94a3b8;">${s.studentId}</span>
                        ${s.riskFlag ? `<br><span class="risk-flag"><i class="fa-solid fa-circle-exclamation"></i> At Risk</span>` : ''}
                    </td>
                    <td>${s.course}</td>
                    <td>
                        <span style="font-size:0.8rem;color:#64748b;">${s.programCategory}</span><br>
                        <span style="font-size:0.75rem;color:#94a3b8;">${s.batchYear}</span>
                    </td>
                    <td>
                        <span class="class-pill ${getClassPillClass(s.className)}">${s.className}</span>
                        <span style="font-size:0.75rem;color:#94a3b8;margin-left:4px;">${s.batchTiming}</span>
                    </td>
                    <td>
                        <div class="attendance-mini">
                            <div class="attendance-mini-bar">
                                <div class="attendance-mini-fill" style="width:${s.attendancePercentage}%;background:${getAttColor(s.attendancePercentage)};"></div>
                            </div>
                            <span style="color:${getAttColor(s.attendancePercentage)};font-weight:600;">${s.attendancePercentage}%</span>
                        </div>
                    </td>
                    <td class="dues-cell ${s.pendingDues > 0 ? 'has-dues' : 'no-dues'}">
                        ${s.pendingDues > 0 ? '₹' + s.pendingDues.toLocaleString() : 'Cleared ✓'}
                    </td>
                    <td><span class="admin-badge ${s.status === 'Active' ? 'success' : 'default'}">${s.status}</span></td>
                    <td>
                        <button class="admin-btn admin-btn-outline" style="font-size:0.75rem;padding:0.3rem 0.7rem;">
                            <i class="fa-solid fa-eye"></i> View
                        </button>
                    </td>
                </tr>
            `).join('');

        tbody.querySelectorAll('tr[data-id]').forEach(row => {
            row.addEventListener('click', (e) => {
                if (e.target.closest('button')) return;
                const item = db.students.find(s => s.id === row.dataset.id);
                openDrawer(item);
            });
        });
    }

    // ─── Filter ──────────────────────────────────────────
    function filterData() {
        const q      = searchInput.value.toLowerCase();
        const course = courseFilter.value;
        const status = statusFilter.value;
        const filtered = db.students.filter(s =>
            (!q      || s.name.toLowerCase().includes(q) || s.studentId.toLowerCase().includes(q)) &&
            (!course || s.course === course) &&
            (!status || s.status === status)
        );
        renderTable(filtered);
    }

    // ─── Student Detail Drawer ───────────────────────────
    function openDrawer(s) {
        if (!s) return;
        document.getElementById('sDrawerName').innerText   = s.name;
        document.getElementById('sDrawerID').innerText     = s.studentId;
        document.getElementById('sDrawerStatus').innerHTML = `<span class="admin-badge ${s.status === 'Active' ? 'success' : 'default'}">${s.status}</span>`;
        document.getElementById('sDrawerPhone').innerText  = s.contactNumber;
        document.getElementById('sDrawerParent').innerText = s.parentName;
        document.getElementById('sDrawerDob').innerText    = s.dob;
        document.getElementById('sDrawerGender').innerText = s.gender;
        document.getElementById('sDrawerAddress').innerText= s.address;
        document.getElementById('sDrawerCourse').innerText = s.course;
        document.getElementById('sDrawerProgram').innerText= s.programCategory;
        document.getElementById('sDrawerClass').innerHTML  = `<span class="class-pill ${getClassPillClass(s.className)}">${s.className}</span> (${s.batchYear})`;
        document.getElementById('sDrawerTiming').innerText = s.batchTiming;
        document.getElementById('sDrawerJoining').innerText= s.joiningDate;
        document.getElementById('sDrawerTarget').innerText = s.targetExamYear;
        document.getElementById('sDrawerAttendance').innerText = s.attendancePercentage + '%';
        document.getElementById('sDrawerTotalFees').innerText = '₹' + s.totalFees.toLocaleString();
        document.getElementById('sDrawerPaid').innerText   = '₹' + s.paidFees.toLocaleString();
        const duesEl = document.getElementById('sDrawerDues');
        duesEl.innerText  = s.pendingDues > 0 ? '₹' + s.pendingDues.toLocaleString() : 'Cleared ✓';
        duesEl.style.color= s.pendingDues > 0 ? '#ef4444' : '#10b981';
        document.getElementById('sDrawerRisk').style.display = s.riskFlag ? 'block' : 'none';
        drawerOverlay.classList.add('open');
        drawerPanel.classList.add('open');
    }

    function closeDrawer() {
        drawerOverlay.classList.remove('open');
        drawerPanel.classList.remove('open');
    }

    // ─── Add Student Modal ───────────────────────────────
    function openModal()  { modalBackdrop.classList.add('open'); }
    function closeModal() {
        modalBackdrop.classList.remove('open');
        addStudentForm.reset();
        fProgram.innerHTML   = '<option value="">— Select Course First —</option>';
        fBatchYear.innerHTML = '<option value="">— Select Program First —</option>';
        fClass.innerHTML     = '<option value="">— Select Batch Year First —</option>';
        classTags.innerHTML  = '<span style="color:#94a3b8;font-size:0.8rem;">Class codes will appear here</span>';
        fProgram.disabled = fBatchYear.disabled = fClass.disabled = true;
    }

    // Cascade: Course → Program
    fCourse.addEventListener('change', () => {
        const course = fCourse.value;
        fProgram.innerHTML = '<option value="">— Select a Program —</option>';
        fBatchYear.innerHTML = '<option value="">— Select Program First —</option>';
        fClass.innerHTML = '<option value="">— Select Batch Year First —</option>';
        classTags.innerHTML = '<span style="color:#94a3b8;font-size:0.8rem;">Class codes will appear here</span>';
        fBatchYear.disabled = fClass.disabled = true;

        if (course) {
            const programs = db.getPrograms(course);
            programs.forEach(p => {
                fProgram.innerHTML += `<option value="${p}">${p}</option>`;
            });
            fProgram.disabled = false;
        } else {
            fProgram.disabled = true;
        }
    });

    // Cascade: Program → Batch Year
    fProgram.addEventListener('change', () => {
        const course = fCourse.value;
        const program = fProgram.value;
        fBatchYear.innerHTML = '<option value="">— Select a Batch Year —</option>';
        fClass.innerHTML = '<option value="">— Select Batch Year First —</option>';
        classTags.innerHTML = '<span style="color:#94a3b8;font-size:0.8rem;">Class codes will appear here</span>';
        fClass.disabled = true;

        if (program) {
            const years = db.getBatchYears(course, program);
            years.forEach(y => {
                fBatchYear.innerHTML += `<option value="${y}">${y}</option>`;
            });
            fBatchYear.disabled = false;
        } else {
            fBatchYear.disabled = true;
        }
    });

    // Cascade: Batch Year → Class
    fBatchYear.addEventListener('change', () => {
        const course   = fCourse.value;
        const program  = fProgram.value;
        const batchYear= fBatchYear.value;
        fClass.innerHTML = '<option value="">— Select a Class —</option>';
        classTags.innerHTML = '';

        if (batchYear) {
            const classes = db.getClasses(course, program, batchYear);
            classes.forEach(c => {
                fClass.innerHTML += `<option value="${c}">${c}</option>`;
                const tag = document.createElement('span');
                tag.className = 'class-tag' + (c.startsWith('DR') ? ' drop' : '');
                tag.innerText = c;
                classTags.appendChild(tag);
            });
            fClass.disabled = false;
        } else {
            fClass.disabled = true;
            classTags.innerHTML = '<span style="color:#94a3b8;font-size:0.8rem;">Class codes will appear here</span>';
        }
    });

    // Form submit
    addStudentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(addStudentForm);
        const course = fd.get('course');
        const newStudent = {
            id:          'STU-' + String(Date.now()).slice(-4),
            studentId:   db.nextStudentId(course),
            name:        fd.get('name'),
            dob:         fd.get('dob') || '—',
            gender:      fd.get('gender'),
            contactNumber: fd.get('phone'),
            parentName:  fd.get('parentName'),
            address:     fd.get('address') || '—',
            course:      course,
            programCategory: fd.get('program'),
            batchYear:   fd.get('batchYear'),
            className:   fd.get('className'),
            batchTiming: fd.get('timing'),
            joiningDate: new Date().toISOString().split('T')[0],
            targetExamYear: fd.get('targetYear'),
            status:      'Active',
            attendancePercentage: 0,
            totalFees:   parseInt(fd.get('totalFees')) || 0,
            paidFees:    0,
            pendingDues: parseInt(fd.get('totalFees')) || 0,
            riskFlag:    false,
        };
        db.students.push(newStudent);
        db.stats.activeStudents++;
        closeModal();
        renderTable(db.students);
        // Flash success
        const toast = document.getElementById('successToast');
        toast.innerText = `✓ ${newStudent.name} (${newStudent.studentId}) added successfully!`;
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = 'none'; }, 3500);
    });

    // ─── Event listeners ─────────────────────────────────
    searchInput.addEventListener('input', filterData);
    courseFilter.addEventListener('change', filterData);
    statusFilter.addEventListener('change', filterData);
    openModalBtn.addEventListener('click', openModal);
    modalCloseBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', (e) => { if (e.target === modalBackdrop) closeModal(); });
    drawerCloseBtn.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', (e) => { if (e.target === drawerOverlay) closeDrawer(); });

    // ─── Initial Render ──────────────────────────────────
    renderTable(db.students);
});
