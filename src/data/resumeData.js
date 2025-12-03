// Data extracted from your provided PDFs
export const resumeData = {
  profile: {
    name: "Saiyam Tuteja",
    role: "Data Analyst & Software Engineer",
    location: "Roorkee, Uttarakhand, India",
    email: "saiyamtuteja@gmail.com",
    linkedin: "https://www.linkedin.com/in/saiyam-tuteja/",
    github: "https://github.com/SaiyamTuteja",
    summary: "Enthusiastic Software Engineer and Data Analyst pursuing MCA at Graphic Era Hill University. Skilled in Python, C++, React, and Data Analytics (Power BI, Tableau). Passionate about open source (GSSoC Admin/Contributor) and building user-focused applications."
  },
  skills: {
    languages: ["Python", "C++", "SQL", "JavaScript", "HTML", "CSS", "PHP"],
    frameworks: ["React", "Node.js", "Pandas", "NumPy", "Matplotlib"],
    tools: ["Power BI", "Tableau", "AWS EC2", "Git/GitHub", "Postman", "VS Code"],
    soft: ["Leadership", "Problem Solving", "Mentoring", "Content Creation"]
  },
  experience: [
    {
      role: "Data Analytics Specialist & Mentor",
      company: "Capzora Technologies",
      period: "Jul 2025 - Aug 2025",
      description: "Mentored teams in Power BI, Tableau, and Python. Designed mentorship programs and accepted Letter of Intent for driving data-driven decision-making."
    },
    {
      role: "Content Creation Intern",
      company: "NOXALGO LLP",
      period: "Dec 2024 - Mar 2025",
      description: "Developed 30+ technical content pieces for data analytics projects with 95% on-time delivery. Optimized content for SEO and digital platforms."
    },
    {
      role: "Data Analyst",
      company: "COER University",
      period: "Sep 2023 - Sep 2024",
      description: "Developed Power BI dashboards for Academic Quality Management System (AQMS). Analyzed 5,000+ student records using SQL/Python. Automated reporting workflows reducing manual effort by 60%."
    },
    {
      role: "Project Admin & Contributor",
      company: "GirlScript Summer of Code",
      period: "May 2024 - Aug 2024",
      description: "Led 'ProfPraisal' (Faculty Evaluation System). Managed 50+ contributors. Ranked 172/27,000+ participants."
    },
    {
      role: "Summer Intern",
      company: "F1 Infotech Pvt Ltd.",
      period: "Jul 2022 - Aug 2022",
      description: "Contributed to Fixed Asset Return (FAR) project. Enhanced data integrity using Python validation scripts."
    }
  ],
  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      school: "Graphic Era Hill University",
      period: "Sep 2024 - Sep 2026",
      details: "CGPA: 9.32/10 (Topper in 1st & 2nd Sem)"
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      school: "COER University",
      period: "2021 - 2024",
      details: "CGPA: 9.7/10 (University Topper)"
    }
  ],
  projects: [
    {
      title: "ProfPraisal",
      desc: "Faculty Evaluation System using PHP/MySQL. Reduced submission time by 40%.",
      link: "https://github.com/SaiyamTuteja"
    },
    {
      title: "UniGo",
      desc: "MERN Stack Ride-sharing app with real-time chat and ride management.",
      link: "https://github.com/SaiyamTuteja"
    },
    {
      title: "Library Management System",
      desc: "IoT & RFID based system for automated book tracking (Patent Filed).",
      link: "https://github.com/SaiyamTuteja"
    },
    {
      title: "Employment Data Analysis",
      desc: "Predictive models using Python/Scikit-learn with 92% accuracy.",
      link: "https://github.com/SaiyamTuteja"
    }
  ],
  achievements: [
    "Patent Filed: System for Managing Books using RFID/IoT",
    "Google Data Analytics Professional Certificate",
    "HackerRank 5-Star in Problem Solving",
    "Academic Excellence Award Recipient"
  ]
};

// Stringified version for AI context
export const RESUME_CONTEXT = JSON.stringify(resumeData);
