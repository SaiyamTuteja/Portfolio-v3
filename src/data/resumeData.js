export const resumeData = {
  profile: {
    name: "Saiyam Tuteja",
    role: "Data Analytics Specialist & Software Engineer",
    summary: "Aspiring Data Analyst and Software Engineer with a strong foundation in Python, Data Analytics (Power BI, Tableau), and Full Stack Development (MERN). Proven track record in hackathons and open-source contributions. Passionate about solving real-world problems through code and data insights.",
    location: "Roorkee, Uttarakhand, India",
    email: "saiyamtuteja@gmail.com",
    linkedin: "https://www.linkedin.com/in/saiyam-tuteja",
    github: "https://github.com/SaiyamTuteja",
    phone: "+91-7505835347"
  },
  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Graphic Era Hill University",
      duration: "Sep 2024 - Sep 2026",
      details: "CGPA: 9.32/10. Topper in 1st and 2nd Semester."
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "COER University",
      duration: "2021 - 2024",
      details: "CGPA: 9.7/10. University Topper. Recipient of Academic Excellence Award."
    }
  ],
  experience: [
    {
      role: "Data Analytics Specialist & Mentor",
      company: "Capzora Technologies",
      duration: "Jul 2025 - Aug 2025",
      description: "Developed AI-based interview scheduling software reducing HR screening time by 40%. Mentored teams in Power BI, Tableau, and Python."
    },
    {
      role: "Content Creation Intern",
      company: "NOXALGO LLP",
      duration: "Dec 2024 - Mar 2025",
      description: "Created 30+ technical content pieces on data analytics tools with 95% on-time delivery."
    },
    {
      role: "Data Analyst",
      company: "COER University",
      duration: "Sep 2023 - Sep 2024",
      description: "Designed Power BI dashboards for Academic Quality Management System (AQMS). Analyzed 5,000+ student records using SQL and Python."
    },
    {
      role: "Project Admin & Contributor",
      company: "GirlScript Summer of Code",
      duration: "May 2024 - Aug 2024",
      description: "Led 'ProfPraisal' project. Managed 50+ contributors. Ranked 172/27,000+ participants."
    }
  ],
  projects: [
    {
      title: "ProfPraisal - Faculty Evaluation System",
      tech: ["PHP", "MySQL", "HTML", "CSS"],
      description: "A feedback system with role-based access for admins, faculty, and students. Reduced submission time by 40%.",
      deepDive: "This project solves the manual feedback delay in universities. I architected a role-based database schema in MySQL to handle Admin, Faculty, and Student permissions securely. The frontend uses responsive HTML/CSS for accessibility. I optimized the SQL queries to handle concurrent submissions during exam seasons, reducing server load by 25%."
    },
    {
      title: "UniGo - University Ride Sharing App",
      tech: ["MERN Stack", "React", "Node.js", "MongoDB", "Vite"],
      description: "Real-time ride sharing app for university students. Features chat, ride creation, and search. Boosted engagement by 50%.",
      deepDive: "UniGo addresses campus commute challenges. Built with the MERN stack, it features a RESTful API for ride matching. I implemented real-time socket connections for the in-app chat feature and used MongoDB geospatial queries to find nearby rides. The UI is built with React and Tailwind for a mobile-first experience."
    },
    {
      title: "Library Management System (Patent Filed)",
      tech: ["IoT", "RFID", "AI"],
      description: "Automated book tracking system using RFID and AI algorithms. Reduced manual cataloging time by 70%. Patent filed.",
      deepDive: "This is my most innovative project, resulting in a Patent filing. It integrates hardware (RFID readers) with software logic. I developed a Python script to interface with the RFID sensors, automatically logging book movements into a database. An AI algorithm analyzes borrowing patterns to suggest restocking, reducing manual labor by 70%."
    },
    {
      title: "Employment & Unemployment Analysis",
      tech: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
      description: "Predictive models with 92% accuracy to analyze employment trends. Created 10+ data visualizations.",
      deepDive: "A pure Data Science project. I cleaned a raw dataset of 10,000+ records using Pandas, handling missing values and outliers. I engineered features for the predictive model and used Scikit-learn's Random Forest classifier to achieve 92% accuracy. The results were visualized in an interactive Tableau dashboard."
    }
  ],
  skills: {
    languages: ["Python", "C++", "SQL", "JavaScript", "PHP", "HTML", "CSS"],
    frameworks: ["React", "Node.js", "Express.js", "Pandas", "NumPy", "Scikit-learn"],
    tools: ["Power BI", "Tableau", "Excel", "AWS EC2", "Git", "GitHub", "Postman", "VS Code"],
    soft: ["Leadership", "Mentoring", "Problem Solving", "Communication"]
  },
  achievements: [
    "🏆 Patent Filed: System for Managing Books in Library using RFID/IoT",
    "📜 Google Data Analytics Professional Certificate",
    "⭐ HackerRank 5-Star in Problem Solving",
    "🥈 Top 10 Finalist in Avishkar 2024 (GEHU)",
    "🥇 Winner of Rise of Venture at Graphic Era Grafest"
  ]
};

export const RESUME_CONTEXT = JSON.stringify(resumeData);