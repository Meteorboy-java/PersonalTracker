export const roadmapData = [
  {
    phase: "Phase 1: Linux & The Command Line",
    weeks: [
      { id: "w1", title: "Navigation & File Management", diff: "Easy", hrs: "4h" },
      { id: "w2", title: "Text Manipulation (grep, awk)", diff: "Medium", hrs: "6h" },
      { id: "w3", title: "System Performance (top, htop)", diff: "Easy", hrs: "3h" },
      { id: "w4", title: "Permissions & Users", diff: "Medium", hrs: "5h" },
      { id: "w5", title: "Networking Utilities (curl, ping)", diff: "Easy", hrs: "4h" },
      { id: "w6", title: "Bash Scripting Basics", diff: "Hard", hrs: "8h" }
    ]
  },
  {
    phase: "Phase 2: Core Networking & Security",
    weeks: [
      { id: "w7", title: "Core Protocols (TCP/IP, OSI)", diff: "Medium", hrs: "6h" },
      { id: "w8", title: "Subnetting & IP Addressing", diff: "Hard", hrs: "8h" },
      { id: "w9", title: "DNS (Domain Name System)", diff: "Medium", hrs: "5h" },
      { id: "w10", title: "Secure Access (SSH Keys)", diff: "Easy", hrs: "3h" },
      { id: "w11", title: "Security & Encryption (SSL/TLS)", diff: "Hard", hrs: "7h" }
    ]
  },
  {
    phase: "Phase 3: Web Servers & Reverse Proxy",
    weeks: [
      { id: "w12", title: "Nginx Mastery", diff: "Medium", hrs: "6h" },
      { id: "w13", title: "Reverse Proxying & Load Balancing", diff: "Hard", hrs: "8h" }
    ]
  },
  {
    phase: "Phase 4: Containerization (Docker)",
    weeks: [
      { id: "w14", title: "Docker Daemon & CLI", diff: "Easy", hrs: "4h" },
      { id: "w15", title: "Writing Dockerfiles", diff: "Medium", hrs: "6h" },
      { id: "w16", title: "Volume Management", diff: "Medium", hrs: "5h" },
      { id: "w17", title: "Network Bridging", diff: "Hard", hrs: "7h" },
      { id: "w18", title: "Docker Compose", diff: "Hard", hrs: "8h" }
    ]
  },
  {
    phase: "Phase 5: AWS Cloud Infrastructure",
    weeks: [
      { id: "w19", title: "IAM Policies & Roles", diff: "Medium", hrs: "5h" },
      { id: "w20", title: "VPC Basics", diff: "Hard", hrs: "8h" },
      { id: "w21", title: "VPC Advanced (NAT, Subnets)", diff: "Expert", hrs: "10h" },
      { id: "w22", title: "EC2 Provisioning", diff: "Medium", hrs: "5h" },
      { id: "w23", title: "EC2 Security Groups", diff: "Medium", hrs: "4h" },
      { id: "w24", title: "S3 Storage & Policies", diff: "Easy", hrs: "3h" },
      { id: "w25", title: "RDS Database Basics", diff: "Medium", hrs: "5h" },
      { id: "w26", title: "RDS Backups & Multi-AZ", diff: "Hard", hrs: "7h" },
      { id: "w27", title: "Route 53 Routing", diff: "Medium", hrs: "4h" },
      { id: "w28", title: "CloudFront (CDN)", diff: "Medium", hrs: "5h" },
      { id: "w29", title: "AWS Integration Lab", diff: "Expert", hrs: "12h" },
      { id: "w30", title: "AWS Cert Prep", diff: "Hard", hrs: "15h" }
    ]
  },
  {
    phase: "Phase 6: Infrastructure as Code",
    weeks: [
      { id: "w31", title: "Terraform HCL Syntax", diff: "Medium", hrs: "5h" },
      { id: "w32", title: "Providers & Resources", diff: "Medium", hrs: "6h" },
      { id: "w33", title: "State Management", diff: "Hard", hrs: "8h" },
      { id: "w34", title: "Variables & Outputs", diff: "Medium", hrs: "5h" },
      { id: "w35", title: "Terraform Modules", diff: "Hard", hrs: "7h" },
      { id: "w36", title: "Terraform Full Deployment", diff: "Expert", hrs: "10h" }
    ]
  },
  {
    phase: "Phase 7: CI/CD Pipelines",
    weeks: [
      { id: "w37", title: "Advanced Git (Merge/Rebase)", diff: "Medium", hrs: "6h" },
      { id: "w38", title: "Git Workflows & PRs", diff: "Easy", hrs: "4h" },
      { id: "w39", title: "GitHub Actions Basics", diff: "Medium", hrs: "5h" },
      { id: "w40", title: "Pipeline: Automated Testing", diff: "Hard", hrs: "7h" },
      { id: "w41", title: "Pipeline: Docker Build", diff: "Hard", hrs: "8h" },
      { id: "w42", title: "Pipeline: Registry Push", diff: "Medium", hrs: "5h" },
      { id: "w43", title: "Automated EC2 Deployment", diff: "Expert", hrs: "12h" }
    ]
  },
  {
    phase: "Phase 8: Observability",
    weeks: [
      { id: "w44", title: "Application Logging", diff: "Easy", hrs: "3h" },
      { id: "w45", title: "Prometheus Metrics", diff: "Hard", hrs: "8h" },
      { id: "w46", title: "Grafana Dashboards", diff: "Medium", hrs: "6h" },
      { id: "w47", title: "Alerting Systems", diff: "Medium", hrs: "5h" },
      { id: "w48", title: "Disaster Recovery Drill", diff: "Expert", hrs: "10h" }
    ]
  },
  {
    phase: "Phase 9: The Consultancy Launch",
    weeks: [
      { id: "w49", title: "Capstone Blueprinting", diff: "Medium", hrs: "5h" },
      { id: "w50", title: "Infrastructure Deployment", diff: "Hard", hrs: "10h" },
      { id: "w51", title: "App Deployment & Monitoring", diff: "Expert", hrs: "12h" },
      { id: "w52", title: "Consulting Pitch Deck", diff: "Medium", hrs: "6h" }
    ]
  }
];

export const projectsData = [
  {
    id: "p1",
    title: "Containerized Calculator Tool",
    desc: "Dockerize your mutual fund calculator and serve it via Nginx.",
    diff: "Medium",
    requiredSkills: ["w1", "w12", "w14", "w15", "w18"]
  },
  {
    id: "p2",
    title: "Infrastructure as Code API",
    desc: "Deploy an entire AWS VPC, EC2, and RDS setup without clicking a button.",
    diff: "Expert",
    requiredSkills: ["w19", "w20", "w22", "w25", "w31", "w32", "w36"]
  },
  {
    id: "p3",
    title: "Automated Game Server",
    desc: "A Minecraft server that auto-updates via GitHub Actions.",
    diff: "Hard",
    requiredSkills: ["w16", "w22", "w39", "w41", "w43"]
  },
  {
    id: "p4",
    title: "The Ultimate SaaS Capstone",
    desc: "Global CDN frontend, load-balanced backend, full Grafana monitoring.",
    diff: "Expert",
    requiredSkills: ["w21", "w26", "w28", "w43", "w46", "w47", "w51"]
  }
];