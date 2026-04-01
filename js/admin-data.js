// Dummy Seed Data for Admin Dashboard - Vanilla JS

// ─────────────────────────────────────────────────────
// CLASS NAMING CONVENTION
//  FR01–FR04 → 2 Years Program (All Courses), Year 1
//  SR01–SR04 → 2 Years Program (All Courses), Year 2
//  DR01–DR03 → Drop/Repeater (1 Year Program, Drop category only)
//  All classes exist per course (JEE, NEET, UPSC, SAT)
// ─────────────────────────────────────────────────────

const CLASS_STRUCTURE = {
    JEE: {
        "2 Years Program": {
            "Year 1 (Freshers)": ["FR01", "FR02", "FR03", "FR04"],
            "Year 2 (Senior)":   ["SR01", "SR02", "SR03", "SR04"],
        },
        "1 Year Program (Drop)": {
            "Drop / Repeater":   ["DR01", "DR02", "DR03"],
        }
    },
    NEET: {
        "2 Years Program": {
            "Year 1 (Freshers)": ["FR01", "FR02", "FR03", "FR04"],
            "Year 2 (Senior)":   ["SR01", "SR02", "SR03", "SR04"],
        },
        "1 Year Program (Drop)": {
            "Drop / Repeater":   ["DR01", "DR02", "DR03"],
        }
    },
    UPSC: {
        "2 Years Program": {
            "Year 1 (Freshers)": ["FR01", "FR02", "FR03", "FR04"],
            "Year 2 (Senior)":   ["SR01", "SR02", "SR03", "SR04"],
        },
        "1 Year Program (Drop)": {
            "Drop / Repeater":   ["DR01", "DR02", "DR03"],
        }
    },
    SAT: {
        "2 Years Program": {
            "Year 1 (Freshers)": ["FR01", "FR02", "FR03", "FR04"],
            "Year 2 (Senior)":   ["SR01", "SR02", "SR03", "SR04"],
        },
        "1 Year Program (Drop)": {
            "Drop / Repeater":   ["DR01", "DR02", "DR03"],
        }
    }
};

const AdminDB = {
    stats: {
        activeStudents: 1245,
        newEnquiries: 42,
        totalFeesCollected: 1450000,
        pendingDues: 80000,
        batchOccupancy: 82
    },

    // ──── ENQUIRIES ────────────────────────────────────
    enquiries: [
        {
            id: "ENQ-1001", name: "Rahul Sharma", phone: "9876543210",
            email: "rahul.s@example.com", parentName: "Sanjay Sharma",
            courseInterested: "JEE", batchTimingPreferred: "Morning",
            batchCategoryPreferred: "2 Years Program",
            background: "Class 10 CBSE, 92%", targetYear: "2028",
            source: "Google Ads", assignedCounsellor: "Priya",
            notes: "Very interested, scheduled trial class.",
            followUpDate: "2026-04-01", status: "Trial Class Booked", createdAt: "2026-03-28",
        },
        {
            id: "ENQ-1002", name: "Aisha Khan", phone: "9123456780",
            email: "aisha.k@example.com", parentName: "Imran Khan",
            courseInterested: "NEET", batchTimingPreferred: "Evening",
            batchCategoryPreferred: "1 Year Program (Drop)",
            background: "Class 12 PCB, Dropper", targetYear: "2027",
            source: "Referral", assignedCounsellor: "Amit",
            notes: "Requires fee discount.", followUpDate: "2026-03-30",
            status: "Follow-up Pending", createdAt: "2026-03-29",
        },
        {
            id: "ENQ-1003", name: "Vikram Singh", phone: "9988776655",
            email: "vikram.s@example.com", parentName: "Ranjit Singh",
            courseInterested: "UPSC", batchTimingPreferred: "Full Day",
            batchCategoryPreferred: "1 Year Program (Drop)",
            background: "B.Tech Graduate", targetYear: "2027",
            source: "Website", assignedCounsellor: "Neha",
            notes: "Wants to start from next month.", followUpDate: "2026-04-05",
            status: "New Enquiry", createdAt: "2026-03-29",
        },
        {
            id: "ENQ-1004", name: "Sneha Patel", phone: "9876512345",
            email: "sneha.p@example.com", parentName: "Kamlesh Patel",
            courseInterested: "SAT", batchTimingPreferred: "Morning",
            batchCategoryPreferred: "2 Years Program",
            background: "Class 11 IB", targetYear: "2027",
            source: "Instagram", assignedCounsellor: "Priya",
            notes: "Needs online plus offline.", followUpDate: "",
            status: "Admitted", createdAt: "2026-03-25",
        }
    ],

    // ──── STUDENTS ─────────────────────────────────────
    students: [
        {
            id: "STU-001", studentId: "2026/JEE/001",
            name: "Ananya Desai", dob: "2009-05-14", gender: "Female",
            contactNumber: "9871234560", parentName: "Rajiv Desai",
            address: "Navrangpura, Ahmedabad",
            course: "JEE", programCategory: "2 Years Program",
            batchYear: "Year 1 (Freshers)", className: "FR02",
            batchTiming: "Morning",
            joiningDate: "2026-03-10", targetExamYear: "2028",
            status: "Active", attendancePercentage: 95,
            totalFees: 120000, paidFees: 40000, pendingDues: 80000, riskFlag: false,
        },
        {
            id: "STU-002", studentId: "2026/NEET/045",
            name: "Rohan Gupta", dob: "2008-11-20", gender: "Male",
            contactNumber: "9876541234", parentName: "Sunil Gupta",
            address: "SG Highway, Ahmedabad",
            course: "NEET", programCategory: "1 Year Program (Drop)",
            batchYear: "Drop / Repeater", className: "DR01",
            batchTiming: "Evening",
            joiningDate: "2026-03-15", targetExamYear: "2027",
            status: "Active", attendancePercentage: 65,
            totalFees: 90000, paidFees: 90000, pendingDues: 0, riskFlag: true,
        },
        {
            id: "STU-003", studentId: "2026/SAT/002",
            name: "Sneha Patel", dob: "2009-02-10", gender: "Female",
            contactNumber: "9876512345", parentName: "Kamlesh Patel",
            address: "Satellite, Ahmedabad",
            course: "SAT", programCategory: "2 Years Program",
            batchYear: "Year 1 (Freshers)", className: "FR01",
            batchTiming: "Morning",
            joiningDate: "2026-03-26", targetExamYear: "2027",
            status: "Active", attendancePercentage: 100,
            totalFees: 60000, paidFees: 20000, pendingDues: 40000, riskFlag: false,
        }
    ],

    // ──── BATCHES ──────────────────────────────────────
    batches: [
        // JEE
        { id: "BAT-JEE-M1", code: "JEE-FR-MOR", batchName: "JEE Morning Freshers 2026–28",
          course: "JEE", timing: "Morning",
          category: "2 Years Program", batchYear: "Year 1 (Freshers)",
          classes: ["FR01", "FR02", "FR03", "FR04"],
          startDate: "2026-04-01", endDate: "2028-03-31",
          capacity: 40, occupiedSeats: 35,
          schedule: "Mon-Sat, 8:00 AM – 12:00 PM" },
        { id: "BAT-JEE-E1", code: "JEE-SR-EVE", batchName: "JEE Evening Senior 2026–28",
          course: "JEE", timing: "Evening",
          category: "2 Years Program", batchYear: "Year 2 (Senior)",
          classes: ["SR01", "SR02", "SR03", "SR04"],
          startDate: "2026-04-01", endDate: "2028-03-31",
          capacity: 40, occupiedSeats: 22,
          schedule: "Mon-Sat, 4:00 PM – 8:00 PM" },
        { id: "BAT-JEE-D1", code: "JEE-DR-FULL", batchName: "JEE Full Day Drop 2026–27",
          course: "JEE", timing: "Full Day",
          category: "1 Year Program (Drop)", batchYear: "Drop / Repeater",
          classes: ["DR01", "DR02", "DR03"],
          startDate: "2026-05-01", endDate: "2027-04-30",
          capacity: 35, occupiedSeats: 28,
          schedule: "Mon-Sat, 9:00 AM – 5:00 PM" },

        // NEET
        { id: "BAT-NEET-M1", code: "NEET-FR-MOR", batchName: "NEET Morning Freshers 2026–28",
          course: "NEET", timing: "Morning",
          category: "2 Years Program", batchYear: "Year 1 (Freshers)",
          classes: ["FR01", "FR02", "FR03", "FR04"],
          startDate: "2026-04-01", endDate: "2028-03-31",
          capacity: 50, occupiedSeats: 48,
          schedule: "Mon-Sat, 7:30 AM – 12:00 PM" },
        { id: "BAT-NEET-D1", code: "NEET-DR-EVE", batchName: "NEET Evening Drop 2026–27",
          course: "NEET", timing: "Evening",
          category: "1 Year Program (Drop)", batchYear: "Drop / Repeater",
          classes: ["DR01", "DR02", "DR03"],
          startDate: "2026-05-15", endDate: "2027-04-30",
          capacity: 40, occupiedSeats: 30,
          schedule: "Mon-Sat, 4:00 PM – 8:00 PM" },

        // UPSC
        { id: "BAT-UPSC-F1", code: "UPSC-FR-FULL", batchName: "UPSC Full Day Freshers 2026–28",
          course: "UPSC", timing: "Full Day",
          category: "2 Years Program", batchYear: "Year 1 (Freshers)",
          classes: ["FR01", "FR02", "FR03", "FR04"],
          startDate: "2026-06-01", endDate: "2028-05-31",
          capacity: 60, occupiedSeats: 20,
          schedule: "Mon-Fri, 9:00 AM – 5:00 PM" },
        { id: "BAT-UPSC-D1", code: "UPSC-DR-MOR", batchName: "UPSC Morning Drop 2026–27",
          course: "UPSC", timing: "Morning",
          category: "1 Year Program (Drop)", batchYear: "Drop / Repeater",
          classes: ["DR01", "DR02", "DR03"],
          startDate: "2026-06-01", endDate: "2027-05-31",
          capacity: 40, occupiedSeats: 15,
          schedule: "Mon-Sat, 7:00 AM – 11:00 AM" },

        // SAT
        { id: "BAT-SAT-M1", code: "SAT-FR-TTS", batchName: "SAT Morning Freshers 2026–28",
          course: "SAT", timing: "Morning",
          category: "2 Years Program", batchYear: "Year 1 (Freshers)",
          classes: ["FR01", "FR02", "FR03", "FR04"],
          startDate: "2026-04-15", endDate: "2028-03-31",
          capacity: 30, occupiedSeats: 15,
          schedule: "Tue-Thu-Sat, 8:00 AM – 11:00 AM" },
        { id: "BAT-SAT-D1", code: "SAT-DR-EVE", batchName: "SAT Evening Drop 2026–27",
          course: "SAT", timing: "Evening",
          category: "1 Year Program (Drop)", batchYear: "Drop / Repeater",
          classes: ["DR01", "DR02", "DR03"],
          startDate: "2026-05-01", endDate: "2027-04-30",
          capacity: 25, occupiedSeats: 10,
          schedule: "Tue-Thu-Sat, 4:00 PM – 7:00 PM" },
    ]
};

// ── Helper: get class options for a course + program ─
AdminDB.getClasses = function(course, programCategory, batchYear) {
    try {
        return CLASS_STRUCTURE[course][programCategory][batchYear] || [];
    } catch(e) {
        return [];
    }
};

// ── Helper: get batch years for course + program ─────
AdminDB.getBatchYears = function(course, programCategory) {
    try {
        return Object.keys(CLASS_STRUCTURE[course][programCategory]);
    } catch(e) {
        return [];
    }
};

// ── Helper: get programs for course ─────────────────
AdminDB.getPrograms = function(course) {
    try {
        return Object.keys(CLASS_STRUCTURE[course]);
    } catch(e) {
        return [];
    }
};

// ── Helper: generate next student ID ─────────────────
AdminDB.nextStudentId = function(course) {
    const existing = AdminDB.students.filter(s => s.course === course);
    const num = String(existing.length + 1).padStart(3, '0');
    return `2026/${course}/${num}`;
};

// export CLASS_STRUCTURE for forms
window.CLASS_STRUCTURE = CLASS_STRUCTURE;
window.AdminDB = AdminDB;
