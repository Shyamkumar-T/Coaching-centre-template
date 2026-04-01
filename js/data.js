// Global Database Mock
window.DB = {
    // ----------------------------------------------------------------------
    // 1. COURSES
    // ----------------------------------------------------------------------
    courses: [
        {
            course_id: "c1",
            name: "JEE Main & Advanced Mastery",
            target_exam: "JEE main/Advanced",
            description: "Rigorous 2-year preparation program for engineering aspirants focusing on deep conceptual clarity and extensive problem-solving.",
            duration: "Variable",
            fee: "$1,000",
            category: "Engineering",
            tags: ["Physics", "Chemistry", "Mathematics"],
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&fm=webp&fit=crop&w=600&q=80",
            icon: "fa-rocket",
            color: "var(--clr-primary)",
            syllabus: ["Mechanics", "Electromagnetism", "Calculus", "Organic Chemistry"]
        },
        {
            course_id: "c2",
            name: "NEET Medical Foundation",
            target_exam: "NEET",
            description: "Comprehensive medical entrance coaching aligned with NCERT, offering highly specialized biology, chemistry, and physics modules.",
            duration: "Variable",
            fee: "$2,000",
            category: "Medical",
            tags: ["Biology", "Chemistry", "Physics"],
            image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&fm=webp&fit=crop&w=600&q=80",
            icon: "fa-stethoscope",
            color: "var(--clr-success)",
            syllabus: ["Human Anatomy", "Genetics", "Plant Physiology", "Mechanics"]
        },
        {
            course_id: "c3",
            name: "UPSC Civil Services Foundation",
            target_exam: "UPSC CSE",
            description: "Intense preparation for India's toughest exam. Covers Prelims and Mains with current affairs integration.",
            duration: "Variable",
            fee: "$1,500",
            category: "Civil Services",
            tags: ["History", "Polity", "Economics"],
            image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&fm=webp&fit=crop&w=600&q=80",
            icon: "fa-landmark",
            color: "var(--clr-accent)",
            syllabus: ["Indian Polity", "Geography", "Modern History", "Ethics"]
        },
        {
            course_id: "c4",
            name: "SAT Prep & College Counseling",
            target_exam: "SAT",
            description: "Targeted SAT preparation coupled with end-to-end university application counseling for studying abroad.",
            duration: "Variable",
            fee: "$2,500",
            category: "Study Abroad",
            tags: ["Math", "English Reading", "Writing"],
            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&fm=webp&fit=crop&w=600&q=80",
            icon: "fa-globe",
            color: "var(--clr-danger)",
            syllabus: ["Algebra", "Advanced Grammar", "Reading Comprehension", "Essay Writing"]
        }
    ],

    // ----------------------------------------------------------------------
    // 2. BATCHES
    // ----------------------------------------------------------------------
    batches: [
        // JEE Batches
        { batch_id: "c1_b1", course_id: "c1", name: "Morning", start_date: "April 15, 2026", timings: "09:00 AM - 02:00 PM (Mon-Sat)", capacity: 50, enrolled: 42, mode: "Offline" },
        { batch_id: "c1_b2", course_id: "c1", name: "Evening", start_date: "April 15, 2026", timings: "03:00 PM - 08:00 PM (Mon-Sat)", capacity: 100, enrolled: 89, mode: "Offline" },
        { batch_id: "c1_b3", course_id: "c1", name: "Full Day", start_date: "April 20, 2026", timings: "09:00 AM - 08:00 PM (Mon-Sat)", capacity: 60, enrolled: 60, mode: "Offline" },

        // NEET Batches
        { batch_id: "c2_b1", course_id: "c2", name: "Morning", start_date: "April 15, 2026", timings: "09:00 AM - 02:00 PM (Mon-Sat)", capacity: 50, enrolled: 45, mode: "Offline" },
        { batch_id: "c2_b2", course_id: "c2", name: "Evening", start_date: "April 15, 2026", timings: "03:00 PM - 08:00 PM (Mon-Sat)", capacity: 80, enrolled: 70, mode: "Offline" },
        { batch_id: "c2_b3", course_id: "c2", name: "Full Day", start_date: "April 20, 2026", timings: "09:00 AM - 08:00 PM (Mon-Sat)", capacity: 60, enrolled: 55, mode: "Offline" },

        // SAT Batches
        { batch_id: "c4_b1", course_id: "c4", name: "Morning", start_date: "May 01, 2026", timings: "09:00 AM - 02:00 PM (Sat-Sun)", capacity: 30, enrolled: 15, mode: "Online Live" },
        { batch_id: "c4_b2", course_id: "c4", name: "Evening", start_date: "May 01, 2026", timings: "03:00 PM - 08:00 PM (Sat-Sun)", capacity: 40, enrolled: 25, mode: "Online Live" },
        { batch_id: "c4_b3", course_id: "c4", name: "Full Day", start_date: "June 01, 2026", timings: "09:00 AM - 08:00 PM (Sat-Sun)", capacity: 20, enrolled: 18, mode: "Offline" },

        // UPSC Batches
        { batch_id: "c3_b1", course_id: "c3", name: "Morning", start_date: "May 10, 2026", timings: "09:00 AM - 02:00 PM (Mon-Fri)", capacity: 40, enrolled: 25, mode: "Offline" },
        { batch_id: "c3_b2", course_id: "c3", name: "Evening", start_date: "May 10, 2026", timings: "05:00 PM - 09:00 PM (Mon-Fri)", capacity: 40, enrolled: 25, mode: "Offline" },
        { batch_id: "c3_b3", course_id: "c3", name: "Full Day", start_date: "May 15, 2026", timings: "09:00 AM - 05:00 PM (Sat-Sun)", capacity: 50, enrolled: 30, mode: "Offline" }
    ],

    // ----------------------------------------------------------------------
    // 3. FACULTY
    // ----------------------------------------------------------------------
    faculty: [
        {
            id: "f1",
            name: "Dr. Arvind Sharma",
            qualification: "Ph.D. in Physics, IIT Delhi",
            experience: "15+ Years",
            subject: "Physics",
            image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&fm=webp&fit=crop&w=300&h=300&q=80",
            bio: "Former HOD at a premier institute, known for simplifying complex mechanics."
        },
        {
            id: "f2",
            name: "Prof. Meera K.",
            qualification: "M.Sc. Gold Medalist, AIIMS",
            experience: "12+ Years",
            subject: "Biology",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&fm=webp&fit=crop&w=300&h=300&q=80",
            bio: "Has mentored over 500+ successful NEET candidates."
        },
        {
            id: "f3",
            name: "Rajat Kapoor",
            qualification: "B.Tech, IIT Bombay",
            experience: "8+ Years",
            subject: "Mathematics",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&fm=webp&fit=crop&w=300&h=300&q=80",
            bio: "Specializes in Algebra and Calculus tricks for fast problem solving."
        }
    ],

    // ----------------------------------------------------------------------
    // 4. ACHIEVEMENTS & STATS (For Home Page)
    // ----------------------------------------------------------------------
    stats: {
        selections: "5,000+",
        topRankers: "150+",
        facultyCount: "45+",
        successRate: "89%"
    },

    // ----------------------------------------------------------------------
    // 5. CURRENT USER (Simulated Auth state)
    // ----------------------------------------------------------------------
    currentUser: null, // null means not logged in.

    loginStudent: function () {
        this.currentUser = {
            role: "student",
            name: "Alex Johnson",
            course: "JEE Main & Advanced Mastery",
            batch: "JEE Zenith 2026",
            progress: 45
        };
    },
    loginAdmin: function () {
        this.currentUser = {
            role: "admin",
            name: "Super Admin",
        };
    },
    logout: function () {
        this.currentUser = null;
    }
};

