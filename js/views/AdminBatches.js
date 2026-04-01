document.addEventListener('DOMContentLoaded', () => {
    const db = window.AdminDB;
    if (!db) return;

    // ─── DOM refs ─────────────────────────────────────
    const grid           = document.getElementById('batchesGrid');
    const courseFilter   = document.getElementById('batchCourseFilter');
    const timingFilter   = document.getElementById('batchTimingFilter');
    const categoryFilter = document.getElementById('batchCategoryFilter');

    // Modal controls
    const openBtn    = document.getElementById('openCreateBatchBtn');
    const backdrop   = document.getElementById('createBatchBackdrop');
    const closeBtn   = document.getElementById('batchModalCloseBtn');
    const cancelBtn  = document.getElementById('batchModalCancelBtn');
    const form       = document.getElementById('createBatchForm');
    const toast      = document.getElementById('batchToast');

    // Dropdown + custom input pairs
    const bCourse       = document.getElementById('bCourse');
    const bCourseCustom = document.getElementById('bCourseCustom');
    const bProgram      = document.getElementById('bProgram');
    const bProgramCustom= document.getElementById('bProgramCustom');
    const bBatchYear    = document.getElementById('bBatchYear');
    const bBatchYearCustom = document.getElementById('bBatchYearCustom');
    const bTiming       = document.getElementById('bTiming');
    const bTimingCustom = document.getElementById('bTimingCustom');
    const batchClassTags= document.getElementById('batchClassTags');
    const bClassesCustom= document.getElementById('bClassesCustom');

    // ─── Colour / icon maps ───────────────────────────
    const courseColors = { JEE: 'course-jee', NEET: 'course-neet', UPSC: 'course-upsc', SAT: 'course-sat' };
    const courseIcons  = { JEE: 'J', NEET: 'N', UPSC: 'U', SAT: 'S' };

    // ─── Class code rules ─────────────────────────────
    const YEAR_CLASSES = {
        "Year 1 (Freshers)": ["FR01", "FR02", "FR03", "FR04"],
        "Year 2 (Senior)":   ["SR01", "SR02", "SR03", "SR04"],
        "Drop / Repeater":   ["DR01", "DR02", "DR03"],
    };

    // ─── Utility: class pill HTML ─────────────────────
    function classPill(c) {
        const type = c.startsWith('FR') ? 'fr' : c.startsWith('SR') ? 'sr' : c.startsWith('DR') ? 'dr' : 'custom';
        const styles = {
            fr:     'background:#e0e7ff;color:#4338ca',
            sr:     'background:#d1fae5;color:#065f46',
            dr:     'background:#fef3c7;color:#92400e',
            custom: 'background:#f1f5f9;color:#475569'
        };
        return `<span style="display:inline-block;padding:0.15rem 0.5rem;border-radius:0.25rem;font-size:0.72rem;font-weight:700;font-family:'Courier New',monospace;${styles[type]};">${c}</span>`;
    }

    // ─── Utility: room label from class array ─────────
    function roomLabel(classes) {
        if (!classes || classes.length === 0) return '—';
        return classes.length === 1 ? classes[0] : `${classes[0]} – ${classes[classes.length - 1]}`;
    }

    // ─── Helper: resolve final value (dropdown or custom input) ──
    function resolveField(select, customInput) {
        if (select.value === '__other__') {
            return customInput.value.trim();
        }
        return select.value;
    }

    // ─── Helper: toggle custom text input ─────────────
    function handleOtherToggle(select, customInput) {
        if (select.value === '__other__') {
            customInput.style.display = 'block';
            customInput.required = true;
            customInput.focus();
        } else {
            customInput.style.display = 'none';
            customInput.required = false;
            customInput.value = '';
        }
    }

    // ─── Cascade: Program → Batch Year ────────────────
    function refreshBatchYearOptions(programValue) {
        bBatchYear.innerHTML = '<option value="">— Select Batch Year —</option>';
        bBatchYearCustom.style.display = 'none';
        bBatchYearCustom.required = false;
        batchClassTags.innerHTML = '<span style="color:#94a3b8;font-size:0.8rem;">Select batch year to preview class codes</span>';

        if (programValue === '2 Years Program') {
            bBatchYear.innerHTML += `<option value="Year 1 (Freshers)">Year 1 – Freshers (FR01–FR04)</option>`;
            bBatchYear.innerHTML += `<option value="Year 2 (Senior)">Year 2 – Senior (SR01–SR04)</option>`;
            bBatchYear.disabled = false;
        } else if (programValue === '1 Year Program (Drop)') {
            bBatchYear.innerHTML += `<option value="Drop / Repeater">Drop / Repeater (DR01–DR03)</option>`;
            bBatchYear.disabled = false;
        } else if (programValue === '__other__') {
            // Program is custom — allow manual batch year too
            bBatchYear.innerHTML = '<option value="__other__">✏️ Type manually below</option>';
            bBatchYear.value = '__other__';
            bBatchYearCustom.style.display = 'block';
            bBatchYearCustom.required = true;
            bBatchYear.disabled = false;
        } else {
            bBatchYear.innerHTML += `<option value="__other__">✏️ Other (type manually)</option>`;
            bBatchYear.disabled = programValue ? false : true;
        }
    }

    // ─── Batch Year → Class tags preview ─────────────
    function refreshClassTags(batchYearValue) {
        const autoClasses = YEAR_CLASSES[batchYearValue] || [];
        batchClassTags.innerHTML = autoClasses.length
            ? autoClasses.map(c => `<span class="class-tag${c.startsWith('DR') ? ' drop' : ''}">${c}</span>`).join('')
            : '<span style="color:#64748b;font-size:0.8rem;">Custom batch year — enter class codes manually below</span>';
    }

    // ─── Event: Course dropdown ───────────────────────
    bCourse.addEventListener('change', () => {
        handleOtherToggle(bCourse, bCourseCustom);
    });

    // ─── Event: Program dropdown ──────────────────────
    bProgram.addEventListener('change', () => {
        handleOtherToggle(bProgram, bProgramCustom);
        refreshBatchYearOptions(bProgram.value);
    });

    // ─── Event: Batch Year dropdown ───────────────────
    bBatchYear.addEventListener('change', () => {
        if (bBatchYear.value === '__other__') {
            bBatchYearCustom.style.display = 'block';
            bBatchYearCustom.required = true;
            bBatchYearCustom.focus();
            batchClassTags.innerHTML = '<span style="color:#64748b;font-size:0.8rem;">Custom batch year — enter class codes manually below</span>';
        } else {
            bBatchYearCustom.style.display = 'none';
            bBatchYearCustom.required = false;
            bBatchYearCustom.value = '';
            refreshClassTags(bBatchYear.value);
        }
    });

    // ─── Event: Timing dropdown ───────────────────────
    bTiming.addEventListener('change', () => {
        handleOtherToggle(bTiming, bTimingCustom);
    });

    // ─── Generate batch code ──────────────────────────
    function generateCode(course, batchYear, timing) {
        const safeStr = s => (s || '').replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 4);
        const prefix = batchYear.startsWith('Year 1') ? 'FR'
                     : batchYear.startsWith('Year 2') ? 'SR'
                     : batchYear.startsWith('Drop') ? 'DR'
                     : safeStr(batchYear).slice(0, 2);
        const timingShort = timing === 'Morning' ? 'MOR' : timing === 'Evening' ? 'EVE'
                           : timing === 'Full Day' ? 'FULL' : safeStr(timing).slice(0, 4);
        const seq = String(db.batches.length + 1).padStart(2, '0');
        return `${safeStr(course)}-${prefix}-${timingShort}-${seq}`;
    }

    // ─── Form Submit ──────────────────────────────────
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Resolve each field (dropdown value OR manual text)
        const course    = resolveField(bCourse, bCourseCustom);
        const category  = resolveField(bProgram, bProgramCustom);
        const bYear     = resolveField(bBatchYear, bBatchYearCustom);
        const timing    = resolveField(bTiming, bTimingCustom);

        if (!course || !category || !bYear || !timing) {
            alert('Please fill in all required fields (Course, Program, Batch Year, Timing).');
            return;
        }

        // Resolve class codes: custom input takes priority over auto
        const fd = new FormData(form);
        const customClassStr = (fd.get('classesCustom') || '').trim();
        let classes;
        if (customClassStr) {
            classes = customClassStr.split(',').map(c => c.trim()).filter(Boolean);
        } else {
            classes = YEAR_CLASSES[bYear] || [];
        }

        const codeField = (fd.get('batchCode') || '').trim();
        const newBatch = {
            id:           'BAT-' + Date.now().toString().slice(-6),
            code:         codeField || generateCode(course, bYear, timing),
            batchName:    fd.get('batchName'),
            course,
            timing,
            category,
            batchYear:    bYear,
            classes,
            startDate:    fd.get('startDate'),
            endDate:      fd.get('endDate'),
            schedule:     fd.get('schedule'),
            capacity:     parseInt(fd.get('capacity')) || 40,
            occupiedSeats:0,
            faculty:      fd.get('faculty') || '',
        };

        db.batches.push(newBatch);
        closeModal();
        filterBatches();
        showToast(`✓ Batch "${newBatch.batchName}" created — classes: ${classes.join(', ') || 'none'}`);
    });

    // ─── Modal helpers ────────────────────────────────
    function openModal() {
        backdrop.classList.add('open');
        document.getElementById('bStartDate').valueAsDate = new Date();
    }

    function closeModal() {
        backdrop.classList.remove('open');
        form.reset();
        // Reset custom inputs
        [bCourseCustom, bProgramCustom, bBatchYearCustom, bTimingCustom].forEach(inp => {
            inp.style.display = 'none';
            inp.required = false;
        });
        bBatchYear.innerHTML = '<option value="">— Select Program First —</option>';
        bBatchYear.disabled  = true;
        batchClassTags.innerHTML = '<span style="color:#94a3b8;font-size:0.8rem;">Select batch year above to auto-fill class codes</span>';
    }

    function showToast(msg) {
        toast.innerText = msg;
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = 'none'; }, 4000);
    }

    // ─── Render batch cards ───────────────────────────
    function renderBatches(data) {
        if (!data || data.length === 0) {
            grid.innerHTML = `<p style="color:#94a3b8;text-align:center;padding:3rem;grid-column:1/-1;">No batches match your filters.</p>`;
            return;
        }
        grid.innerHTML = data.map(b => {
            const pct        = Math.round(((b.occupiedSeats || 0) / (b.capacity || 1)) * 100);
            const seatsLeft  = (b.capacity || 0) - (b.occupiedSeats || 0);
            const colorClass = courseColors[b.course] || '';
            const icon       = courseIcons[b.course] || (b.course || '?').charAt(0).toUpperCase();
            const classesHtml= (b.classes || []).map(classPill).join(' ');
            const badgeClass = seatsLeft <= 3 ? 'danger' : seatsLeft <= 10 ? 'warning' : 'success';
            const badgeText  = seatsLeft <= 0 ? 'Full' : seatsLeft <= 3 ? 'Almost Full' : `${seatsLeft} seats left`;
            const roomStr    = roomLabel(b.classes);

            return `
                <div class="batch-card ${colorClass}">
                    <div class="batch-card-header">
                        <div style="display:flex;align-items:center;gap:0.875rem;">
                            <div class="batch-course-icon">${icon}</div>
                            <div>
                                <h3 style="margin:0;font-size:0.95rem;font-weight:700;line-height:1.3;">${b.batchName || b.course + ' — ' + b.timing}</h3>
                                <p style="margin:0.1rem 0 0;font-size:0.72rem;color:#64748b;font-family:'Courier New',monospace;">${b.code}</p>
                            </div>
                        </div>
                        <span class="admin-badge ${badgeClass}" style="flex-shrink:0;white-space:nowrap;">${badgeText}</span>
                    </div>

                    <div class="batch-card-body">
                        <div class="batch-meta-row">
                            <i class="fa-solid fa-layer-group"></i>
                            <strong>${b.category}</strong>&nbsp;·&nbsp;<span>${b.batchYear}</span>
                        </div>
                        <div class="batch-meta-row"><i class="fa-regular fa-clock"></i> ${b.schedule}</div>
                        <div class="batch-meta-row">
                            <i class="fa-solid fa-chalkboard"></i>
                            Classrooms:&nbsp;<strong style="font-family:'Courier New',monospace;">${roomStr}</strong>
                        </div>
                        <div class="batch-meta-row">
                            <i class="fa-regular fa-calendar-days"></i>
                            ${b.startDate} &rarr; ${b.endDate}
                        </div>
                        ${b.faculty ? `<div class="batch-meta-row"><i class="fa-solid fa-chalkboard-user"></i> ${b.faculty}</div>` : ''}
                    </div>

                    <div style="padding:0.75rem 1.5rem;border-top:1px solid #f1f5f9;">
                        <p style="margin:0 0 0.5rem;font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:#94a3b8;">Class Sections</p>
                        <div style="display:flex;flex-wrap:wrap;gap:0.375rem;">
                            ${classesHtml || '<span style="color:#94a3b8;font-size:0.8rem;">No sections defined</span>'}
                        </div>
                    </div>

                    <div class="batch-occupancy-wrap">
                        <div class="batch-occupancy-label">
                            <span>Occupancy</span>
                            <span><strong>${b.occupiedSeats}</strong> / ${b.capacity}&nbsp;(${pct}%)</span>
                        </div>
                        <div class="batch-occ-bar-bg">
                            <div class="batch-occ-bar-fill" style="width:${pct}%;"></div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // ─── Filter ───────────────────────────────────────
    function filterBatches() {
        const course   = courseFilter.value;
        const timing   = timingFilter.value;
        const category = categoryFilter.value;
        renderBatches(db.batches.filter(b =>
            (!course   || b.course === course) &&
            (!timing   || b.timing === timing) &&
            (!category || b.category === category)
        ));
    }

    // ─── Listeners ────────────────────────────────────
    courseFilter.addEventListener('change', filterBatches);
    timingFilter.addEventListener('change', filterBatches);
    categoryFilter.addEventListener('change', filterBatches);
    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });

    // ─── Initial render ───────────────────────────────
    renderBatches(db.batches);
});
