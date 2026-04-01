document.addEventListener('DOMContentLoaded', () => {
    const db = window.AdminDB;
    if (!db) return;

    let enquiries = [...db.enquiries];
    const tbody = document.getElementById('enquiryTableBody');
    const searchInput = document.getElementById('enquirySearch');
    const courseFilter = document.getElementById('courseFilter');
    const statusFilter = document.getElementById('statusFilter');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const drawerPanel = document.getElementById('enquiryDrawer');
    const drawerCloseBtn = document.getElementById('drawerCloseBtn');

    const statusColors = {
        'New Enquiry': 'info',
        'Trial Class Booked': 'warning',
        'Follow-up Pending': 'warning',
        'Admitted': 'success'
    };

    function renderTable(data) {
        tbody.innerHTML = data.length === 0
            ? `<tr><td colspan="6" style="text-align:center;padding:2rem;color:#94a3b8;">No results found.</td></tr>`
            : data.map(e => `
                <tr data-id="${e.id}">
                    <td>
                        <strong>${e.name}</strong>
                        <br><span style="font-size:0.75rem;color:#94a3b8;">${e.id}</span>
                    </td>
                    <td>${e.phone}</td>
                    <td>${e.courseInterested}</td>
                    <td>${e.batchTimingPreferred}</td>
                    <td>${e.assignedCounsellor}</td>
                    <td><span class="admin-badge ${statusColors[e.status] || 'default'}">${e.status}</span></td>
                </tr>
            `).join('');

        // Row click to open drawer
        tbody.querySelectorAll('tr[data-id]').forEach(row => {
            row.addEventListener('click', () => {
                const item = db.enquiries.find(e => e.id === row.dataset.id);
                openDrawer(item);
            });
        });
    }

    function filterData() {
        const q = searchInput.value.toLowerCase();
        const course = courseFilter.value;
        const status = statusFilter.value;

        const filtered = db.enquiries.filter(e => {
            const matchQ = e.name.toLowerCase().includes(q) || e.id.toLowerCase().includes(q) || e.phone.includes(q);
            const matchCourse = !course || e.courseInterested === course;
            const matchStatus = !status || e.status === status;
            return matchQ && matchCourse && matchStatus;
        });

        renderTable(filtered);
    }

    function openDrawer(e) {
        if (!e) return;
        document.getElementById('drawerName').innerText = e.name;
        document.getElementById('drawerID').innerText = e.id;
        document.getElementById('drawerStatus').innerHTML = `<span class="admin-badge ${statusColors[e.status] || 'default'}">${e.status}</span>`;
        document.getElementById('drawerPhone').innerText = e.phone;
        document.getElementById('drawerEmail').innerText = e.email || '—';
        document.getElementById('drawerParent').innerText = e.parentName || '—';
        document.getElementById('drawerCourse').innerText = e.courseInterested;
        document.getElementById('drawerBatchTiming').innerText = e.batchTimingPreferred;
        document.getElementById('drawerBatchCategory').innerText = e.batchCategoryPreferred;
        document.getElementById('drawerSource').innerText = e.source || '—';
        document.getElementById('drawerCounsellor').innerText = e.assignedCounsellor;
        document.getElementById('drawerFollowUp').innerText = e.followUpDate || '—';
        document.getElementById('drawerNotes').innerText = e.notes || 'No notes.';

        drawerOverlay.classList.add('open');
        drawerPanel.classList.add('open');
    }

    function closeDrawer() {
        drawerOverlay.classList.remove('open');
        drawerPanel.classList.remove('open');
    }

    searchInput.addEventListener('input', filterData);
    courseFilter.addEventListener('change', filterData);
    statusFilter.addEventListener('change', filterData);
    drawerCloseBtn.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);

    renderTable(db.enquiries);
});
