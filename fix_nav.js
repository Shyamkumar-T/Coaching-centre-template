const fs = require('fs');
const path = require('path');

function processHtmlFiles(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            processHtmlFiles(fullPath);
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // 1. Remove Batches from desktop & mobile navs
            content = content.replace(/<a href="batches\.html" class="nav-link(.*?)">Batches<\/a>\s*/g, '');
            content = content.replace(/<a href="\.\.\/html\/batches\.html" class="nav-link(.*?)">Batches<\/a>\s*/g, '');
            content = content.replace(/<a href="html\/batches\.html" class="nav-link(.*?)">Batches<\/a>\s*/g, '');
            
            content = content.replace(/<a href="batches\.html" class="mobile-link(.*?)">Batches<\/a>\s*/g, '');
            content = content.replace(/<a href="\.\.\/html\/batches\.html" class="mobile-link(.*?)">Batches<\/a>\s*/g, '');
            content = content.replace(/<a href="html\/batches\.html" class="mobile-link(.*?)">Batches<\/a>\s*/g, '');

            // 2. Add Details & Pricing after Courses if not present
            // Handle variations: 'html/courses.html', 'courses.html', '../html/courses.html' etc.
            
            // Desktop nav link
            const desktopDetailsLinkHtmlMatch = content.match(/<a href="[^"]*details\.html" class="nav-link(.*?)">Details \& Pricing<\/a>/);
            if (!desktopDetailsLinkHtmlMatch) {
                // Determine prefix from courses link
                const coursesMatch = content.match(/<a href="([^"]*)courses\.html" class="nav-link(.*?)">Courses<\/a>/);
                if (coursesMatch) {
                    const prefix = coursesMatch[1];
                    const newLink = `\n                <a href="${prefix}details.html" class="nav-link">Details & Pricing</a>`;
                    content = content.replace(/(<a href="[^"]*courses\.html" class="nav-link(.*?)">Courses<\/a>)/, `$1${newLink}`);
                }
            }

            // Mobile nav link
            const mobileDetailsLinkHtmlMatch = content.match(/<a href="[^"]*details\.html" class="mobile-link(.*?)">Details \& Pricing<\/a>/);
            if (!mobileDetailsLinkHtmlMatch) {
                const coursesMatchMobile = content.match(/<a href="([^"]*)courses\.html" class="mobile-link(.*?)">Courses<\/a>/);
                if (coursesMatchMobile) {
                    const prefix = coursesMatchMobile[1];
                    const newLink = `\n        <a href="${prefix}details.html" class="mobile-link">Details & Pricing</a>`;
                    content = content.replace(/(<a href="[^"]*courses\.html" class="mobile-link(.*?)">Courses<\/a>)/, `$1${newLink}`);
                }
            }

            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`Processed: ${fullPath}`);
        }
    }
}

const targetDir = "d:\\Templates\\Coaching centre";
processHtmlFiles(targetDir);
console.log("Done");
