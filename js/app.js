// ==========================================================================
// SPA ROUTER AND GLOBAL INITIALIZATION
// ==========================================================================

// Import views (We will implement these sequentially)
// import Home from './views/Home.js';
// import Courses from './views/Courses.js';
// import Admission from './views/Admission.js';

// Define the routes map
const routes = {
    '/': 'Home', // Default
    '/home': 'Home',
    '/about': 'About',
    '/courses': 'Courses',
    '/contact': 'Contact',
    '/gallery': 'Gallery',
    '/admission': 'Admission',
    '/batches': 'Batches',
    '/faculty': 'Faculty',
    '/demo': 'Demo',
    '/login': 'Login',
    '/student-dashboard': 'StudentDashboard',
    '/admin': 'Admin'
};

// Application State
const appState = {
    currentPath: window.location.hash.slice(1).toLowerCase() || '/'
};

// Helper: Load a CSS file specific to a view if needed
function loadViewCSS(viewName) {
    const head = document.head;
    const linkId = `css-${viewName}`;
    classRemoveByPrefix('css-view-');

    if (!document.getElementById(linkId)) {
        const link = document.createElement('link');
        link.id = linkId;
        link.className = 'css-view-dynamic';
        link.rel = 'stylesheet';
        link.href = `./css/views/${viewName}.css`;
        head.appendChild(link);
    }
}

// Remove previously dynamically loaded view css
function classRemoveByPrefix(prefix) {
    const stylesheets = document.querySelectorAll('link[class^="' + prefix + '"]');
    stylesheets.forEach(el => el.remove());
}

// Router functionality
const router = async () => {
    const appElement = document.getElementById('app');

    // Get the current hash. Empty hash goes to /
    let path = window.location.hash.slice(1).toLowerCase() || '/';

    // If route doesn't exist, fallback to home or 404
    const viewName = routes[path] || 'NotFound';

    // UI Update: Active nav links
    updateNavLinks(path);

    // Trigger fade out
    appElement.classList.add('fade-out');

    // Await transition
    await new Promise(r => setTimeout(r, 200));

    try {
        // Dynamically import the required view module
        const module = await import(`./views/${viewName}.js`);

        // Render view HTML
        appElement.innerHTML = await module.default.render();

        // Execute view specific after-render logic (event listeners)
        if (module.default.after_render) {
            await module.default.after_render();
        }

    } catch (e) {
        console.warn(`View ${viewName} not found or error loading: `, e);
        appElement.innerHTML = `
            <div class="container section" style="text-align:center; min-height: 50vh; display:flex; flex-direction:column; justify-content:center; align-items:center;">
                <h2>🚧 Page Under Construction</h2>
                <p>The ${viewName} page is currently being built.</p>
                <br>
                <a href="#/home" class="primary-btn">Return Home</a>
            </div>
        `;
    }

    window.scrollTo(0, 0);
    appElement.classList.remove('fade-out');

    // Close mobile menu if open
    document.getElementById('mobile-menu').classList.remove('open');
};

// Update active states in navigation
function updateNavLinks(path) {
    document.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + path) {
            link.classList.add('active');
        }
    });

    // Handle Admin/Student auth state changes in UI here if needed
}

// Global Event Listeners
window.addEventListener('hashchange', router);
window.addEventListener('load', () => {
    // Add navbar scroll effect
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('global-navbar');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    document.querySelector('.menu-toggle').addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.toggle('open');
    });

    // Initial Route
    router();
});
