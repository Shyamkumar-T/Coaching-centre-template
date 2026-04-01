// AdminLayout.js: Injects Sidebar and Topbar into Admin Dashboard pages
// Requires font-awesome for icons.

const SidebarHTML = `
<aside class="admin-sidebar" id="adminSidebar">
    <div class="admin-sidebar-header">
        <i class="fa-solid fa-graduation-cap highlight" style="margin-right:0.5rem;"></i> Elite<span class="highlight" style="font-weight:400">ERP</span>
    </div>
    <nav class="admin-nav" id="adminNavLinks">
        <a href="admin.html" class="admin-nav-link" data-route="admin.html">
            <i class="fa-solid fa-table-columns"></i> Dashboard
        </a>
        <a href="admin-enquiries.html" class="admin-nav-link" data-route="admin-enquiries.html">
            <i class="fa-solid fa-user-plus"></i> Enquiries
        </a>
        <a href="admin-students.html" class="admin-nav-link" data-route="admin-students.html">
            <i class="fa-solid fa-user-graduate"></i> Students
        </a>
        <a href="admin-batches.html" class="admin-nav-link" data-route="admin-batches.html">
            <i class="fa-solid fa-calendar-days"></i> Batches
        </a>
    </nav>
    <div class="admin-sidebar-footer">
        <div class="admin-user-profile">
            <div class="admin-avatar">A</div>
            <div class="admin-user-info">
                <p class="admin-user-name" id="adminUserName">Admin User</p>
                <p class="admin-user-role" id="adminUserRole">Super Admin</p>
            </div>
        </div>
        <button class="admin-logout-btn" id="adminLogoutBtn">
            <i class="fa-solid fa-arrow-right-from-bracket"></i> Logout
        </button>
    </div>
</aside>
`;

const TopbarHTML = `
<header class="admin-topbar">
    <div style="display:flex; align-items:center; gap:1rem;">
        <button class="admin-icon-btn d-md-none" id="mobileSidebarToggle" style="display:none;">
            <i class="fa-solid fa-bars"></i>
        </button>
        <div class="admin-search-box hidden-mobile">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Global search (students, IDs)...">
        </div>
    </div>
    <div class="admin-topbar-actions">
        <button class="admin-icon-btn">
            <i class="fa-regular fa-bell"></i>
            <span class="badge"></span>
        </button>
    </div>
</header>
`;

document.addEventListener("DOMContentLoaded", () => {
    // Determine the current page for highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'admin.html';
    
    // Auth Check
    const currentUser = localStorage.getItem('eliteAdminAuth');
    if (!currentUser && currentPath !== 'admin-login.html') {
        window.location.href = 'admin-login.html';
        return;
    }

    // Skip Layout injection if we are on the login page
    if (currentPath === 'admin-login.html') return;

    // Inject sidebar and topbar
    const appContainer = document.getElementById("admin-app-container");
    if (appContainer) {
        // Insert Sidebar before the main content wrapper
        appContainer.insertAdjacentHTML('afterbegin', SidebarHTML);
        
        // Insert Topbar inside the main content wrapper
        const mainWrapper = appContainer.querySelector('.admin-main-wrapper');
        if (mainWrapper) {
            mainWrapper.insertAdjacentHTML('afterbegin', TopbarHTML);
        }
    }

    // Set active link
    const links = document.querySelectorAll('.admin-nav-link');
    links.forEach(link => {
        if (currentPath.includes(link.getAttribute('data-route'))) {
            link.classList.add('active');
        }
    });

    // Populate user details via localStorage
    if (currentUser) {
        try {
            const userObj = JSON.parse(currentUser);
            document.getElementById("adminUserName").innerText = userObj.name || "Admin User";
            document.getElementById("adminUserRole").innerText = userObj.role || "Super Admin";
            document.querySelector(".admin-avatar").innerText = (userObj.name || "A").charAt(0).toUpperCase();
        } catch (e) {}
    }

    // Logout
    const logoutBtn = document.getElementById('adminLogoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('eliteAdminAuth');
            window.location.href = 'admin-login.html';
        });
    }

    // Mobile Toggle
    const mobileToggle = document.getElementById('mobileSidebarToggle');
    if (mobileToggle) {
        mobileToggle.style.display = window.innerWidth <= 768 ? 'block' : 'none';
        mobileToggle.addEventListener('click', () => {
            document.getElementById('adminSidebar').classList.toggle('open');
        });
    }

    window.addEventListener('resize', () => {
        if (mobileToggle) {
            mobileToggle.style.display = window.innerWidth <= 768 ? 'block' : 'none';
        }
    });
});
