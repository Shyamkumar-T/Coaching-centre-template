document.addEventListener('DOMContentLoaded', () => {
    const db = window.AdminDB;
    if (!db) return;

    // --- KPI Stats ---
    document.getElementById('statStudents').innerText = db.stats.activeStudents.toLocaleString();
    document.getElementById('statEnquiries').innerText = db.stats.newEnquiries;
    document.getElementById('statFees').innerText = '₹' + (db.stats.totalFeesCollected / 100000).toFixed(1) + 'L';
    document.getElementById('statDues').innerText = '₹' + (db.stats.pendingDues / 1000).toFixed(0) + 'K';

    // --- Bar Chart (Monthly Enrolments & Revenue) ---
    const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
    const enroll = [85, 92, 78, 110, 130, 145];
    const revenues = [65, 72, 60, 90, 105, 120];
    const maxVal = Math.max(...enroll);

    const chartContainer = document.getElementById('barChart');
    chartContainer.innerHTML = months.map((m, i) => `
        <div class="bar-group">
            <div class="bars">
                <div class="bar bar-enroll" style="height:${(enroll[i]/maxVal)*100}%" title="${enroll[i]} Students"></div>
                <div class="bar bar-revenue" style="height:${(revenues[i]/maxVal)*100}%" title="Revenue: ${revenues[i]}K"></div>
            </div>
            <span class="bar-label">${m}</span>
        </div>
    `).join('');

    // --- Batch Occupancy ---
    const batchContainer = document.getElementById('batchOccupancy');
    const colorMap = { JEE: 'fill-blue', NEET: 'fill-green', UPSC: 'fill-amber', SAT: 'fill-red' };
    batchContainer.innerHTML = db.batches.map(b => {
        const pct = Math.round((b.occupiedSeats / b.capacity) * 100);
        return `
            <div class="occupancy-item">
                <div class="occupancy-item-label">
                    <span>${b.course} - ${b.timing}</span>
                    <span>${b.occupiedSeats}/${b.capacity} <strong>(${pct}%)</strong></span>
                </div>
                <div class="occupancy-bar-bg">
                    <div class="occupancy-bar-fill ${colorMap[b.course] || 'fill-blue'}" style="width:${pct}%"></div>
                </div>
            </div>
        `;
    }).join('');

    // --- Recent Enquiries ---
    const enquiryTable = document.getElementById('recentEnquiries');
    const statusColors = {
        'New Enquiry': 'info',
        'Trial Class Booked': 'warning',
        'Follow-up Pending': 'warning',
        'Admitted': 'success'
    };
    enquiryTable.innerHTML = db.enquiries.slice(0, 4).map(e => `
        <tr>
            <td><strong>${e.name}</strong><br><span style="color:#94a3b8; font-size:0.75rem;">${e.id}</span></td>
            <td>${e.courseInterested}</td>
            <td>${e.assignedCounsellor}</td>
            <td><span class="admin-badge ${statusColors[e.status] || 'default'}">${e.status}</span></td>
        </tr>
    `).join('');
});
