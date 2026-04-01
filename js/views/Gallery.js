const Gallery = {
    render: async () => {
        const images = [
            "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&fm=webp&fit=crop&w=800&q=80", // Classroom
            "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&fm=webp&fit=crop&w=800&q=80", // Lecture
            "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&fm=webp&fit=crop&w=800&q=80", // Study Hall
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&fm=webp&fit=crop&w=800&q=80", // Seminar
            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&fm=webp&fit=crop&w=800&q=80", // Campus
            "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&fm=webp&fit=crop&w=800&q=80", // Students working
        ];

        const galleryHTML = images.map(img => `
            <div style="border-radius:var(--radius-md); overflow:hidden; box-shadow:var(--shadow-sm); transition:transform 0.3s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                <img src="${img}" style="width:100%; height:250px; object-fit:cover; display:block;" alt="Gallery Image">
            </div>
        `).join('');

        return `
            <header class="page-header">
                <div class="container">
                    <h1 class="page-title">Life at Elite Academy</h1>
                    <p class="page-subtitle" style="color:var(--clr-text-muted);">Glimpses of our vibrant campus, classes, and events.</p>
                </div>
            </header>

            <section class="section">
                <div class="container">
                    <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: var(--space-md);">
                        ${galleryHTML}
                    </div>
                </div>
            </section>
        `;
    }
};

export default Gallery;

