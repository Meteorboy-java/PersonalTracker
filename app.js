const API_URL = "https://script.google.com/macros/s/AKfycbwFxsj40cP9_JcNBh3bmjIrBkq4zMaqi2m0SF6KFjMTkLCe89M_hXRieJHWRZsyfdxW/exec"; // PASTE YOUR URL HERE!

// --- 1. UPDATED DATA WITH DEEP-DIVE TOPICS ---
const roadmapData = [
  {
    phase: "Phase 1: Linux & The Command Line",
    weeks: [
      { id: "w1", title: "Navigation & File Management", diff: "Easy", hrs: "4h", topics: ["cd, ls, pwd - Directory navigation", "mkdir, rm - Creating and removing", "cp, mv - Copying and moving", "tar - Archiving files"] },
      { id: "w2", title: "Text Manipulation", diff: "Medium", hrs: "6h", topics: ["grep - Searching text inside files", "awk - Pattern scanning and processing", "sed - Stream editor for filtering", "cat, less, tail -f - Viewing live logs"] },
      { id: "w3", title: "System Performance", diff: "Easy", hrs: "3h", topics: ["top, htop - Live system monitoring", "ps, kill - Managing system processes", "df, du - Checking disk space/CPU usage"] },
      { id: "w4", title: "Permissions & Users", diff: "Medium", hrs: "5h", topics: ["chmod - Modifying read/write/execute", "chown - Changing file ownership", "sudo, su - Root access", "Creating and managing user groups"] },
      { id: "w5", title: "Networking Utilities", diff: "Easy", hrs: "4h", topics: ["curl - Testing APIs from the terminal", "ping - Testing connections", "netstat - Checking open ports", "dig, nslookup - Testing DNS routing"] },
      { id: "w6", title: "Bash Scripting Basics", diff: "Hard", hrs: "8h", topics: ["Writing basic .sh files", "Using variables and arguments", "For/While loops in Bash", "Conditional logic (if/then)"] }
    ]
  },
  {
    phase: "Phase 2: Core Networking & Security",
    weeks: [
      { id: "w7", title: "Core Protocols", diff: "Medium", hrs: "6h", topics: ["TCP/IP vs UDP", "Understanding the OSI model layers"] },
      { id: "w8", title: "Subnetting & IP Addressing", diff: "Hard", hrs: "8h", topics: ["Public vs Private IP addresses", "CIDR notation (e.g., 10.0.0.0/16)", "Calculating secure subnets"] },
      { id: "w9", title: "DNS (Domain Name System)", diff: "Medium", hrs: "5h", topics: ["A Records & CNAMEs", "TXT records and ALIAS routing"] },
      { id: "w10", title: "Secure Access (SSH)", diff: "Easy", hrs: "3h", topics: ["Generating RSA/Ed25519 Keys", "Managing authorized_keys", "Passwordless server logins"] },
      { id: "w11", title: "Security & Encryption", diff: "Hard", hrs: "7h", topics: ["Generating SSL/TLS with Certbot", "HTTPS data encryption basics", "Asymmetric cryptography concepts"] }
    ]
  },
  {
    phase: "Phase 3: Web Servers & Reverse Proxy",
    weeks: [
      { id: "w12", title: "Nginx Mastery", diff: "Medium", hrs: "6h", topics: ["Installing Nginx on Ubuntu", "Configuring server blocks (virtual hosts)", "Serving static HTML/React files"] },
      { id: "w13", title: "Reverse Proxy & Load Balancing", diff: "Hard", hrs: "8h", topics: ["Forwarding traffic to Node.js/Java local ports", "Distributing traffic across multiple instances", "Handling Nginx error logs"] }
    ]
  },
  {
    phase: "Phase 4: Containerization (Docker)",
    weeks: [
      { id: "w14", title: "Docker Daemon & CLI", diff: "Easy", hrs: "4h", topics: ["docker run, docker ps", "docker images, docker rm", "docker exec - Entering a running container"] },
      { id: "w15", title: "Writing Dockerfiles", diff: "Medium", hrs: "6h", topics: ["Choosing Alpine Linux base images", "Installing dependencies via Dockerfile", "Exposing internal ports"] },
      { id: "w16", title: "Volume Management", diff: "Medium", hrs: "5h", topics: ["Mapping local storage to container storage", "Ensuring persistent database data on restart"] },
      { id: "w17", title: "Network Bridging", diff: "Hard", hrs: "7h", topics: ["Creating internal Docker networks", "Connecting frontend to backend containers securely"] },
      { id: "w18", title: "Docker Compose", diff: "Hard", hrs: "8h", topics: ["Writing docker-compose.yml", "Spinning up multi-container apps with one command"] }
    ]
  },
  {
    phase: "Phase 5: AWS Cloud Infrastructure",
    weeks: [
      { id: "w19", title: "IAM Policies & Roles", diff: "Medium", hrs: "5h", topics: ["Creating strict user policies", "Securing the root account", "Role-based access control"] },
      { id: "w20", title: "VPC Basics", diff: "Hard", hrs: "8h", topics: ["Building secure virtual networks", "Configuring Internet Gateways", "Setting up Route Tables"] },
      { id: "w21", title: "VPC Advanced", diff: "Expert", hrs: "10h", topics: ["Configuring NAT Gateways", "Locking down private subnets"] },
      { id: "w22", title: "EC2 Provisioning", diff: "Medium", hrs: "5h", topics: ["Launching virtual servers", "Choosing CPU vs RAM optimized instances"] },
      { id: "w23", title: "EC2 Security Groups", diff: "Medium", hrs: "4h", topics: ["Configuring cloud firewalls", "Restricting inbound/outbound port access"] },
      { id: "w24", title: "S3 Storage & Policies", diff: "Easy", hrs: "3h", topics: ["Storing static assets/images", "Managing bucket permissions", "Enabling versioning"] },
      { id: "w25", title: "RDS Database Basics", diff: "Medium", hrs: "5h", topics: ["Deploying managed PostgreSQL/SQL", "Connecting EC2 to RDS securely"] },
      { id: "w26", title: "RDS Backups & Multi-AZ", diff: "Hard", hrs: "7h", topics: ["Configuring automated snapshots", "Setting up Multi-Availability Zone redundancy"] },
      { id: "w27", title: "Route 53 Routing", diff: "Medium", hrs: "4h", topics: ["Routing domains to AWS infrastructure", "Health checks and failover routing"] },
      { id: "w28", title: "CloudFront (CDN)", diff: "Medium", hrs: "5h", topics: ["Caching global web assets", "Reducing latency for React frontends"] },
      { id: "w29", title: "AWS Integration Lab", diff: "Expert", hrs: "12h", topics: ["Tying VPC, EC2, RDS, and S3 together", "End-to-end manual deployment drill"] },
      { id: "w30", title: "AWS Cert Prep", diff: "Hard", hrs: "15h", topics: ["Reviewing AWS core services", "Taking SAA-C03 practice exams"] }
    ]
  },
  {
    phase: "Phase 6: Infrastructure as Code",
    weeks: [
      { id: "w31", title: "Terraform HCL Syntax", diff: "Medium", hrs: "5h", topics: ["Understanding HashiCorp Config Language", "Setting up Terraform CLI"] },
      { id: "w32", title: "Providers & Resources", diff: "Medium", hrs: "6h", topics: ["Defining AWS as a provider", "Scripting VPC and EC2 creation"] },
      { id: "w33", title: "State Management", diff: "Hard", hrs: "8h", topics: ["Understanding terraform.tfstate", "Securing state files in an S3 bucket"] },
      { id: "w34", title: "Variables & Outputs", diff: "Medium", hrs: "5h", topics: ["Writing dynamic reusable code", "Deploying Dev vs Prod environments"] },
      { id: "w35", title: "Terraform Modules", diff: "Hard", hrs: "7h", topics: ["Refactoring code into reusable chunks", "Speeding up future client deployments"] },
      { id: "w36", title: "Terraform Full Deployment", diff: "Expert", hrs: "10h", topics: ["Tearing down and rebuilding AWS entirely via script"] }
    ]
  },
  {
    phase: "Phase 7: CI/CD Pipelines",
    weeks: [
      { id: "w37", title: "Advanced Git", diff: "Medium", hrs: "6h", topics: ["Branching strategies", "Resolving complex merge conflicts"] },
      { id: "w38", title: "Git Workflows & PRs", diff: "Easy", hrs: "4h", topics: ["Interactive rebasing", "Managing team pull requests"] },
      { id: "w39", title: "GitHub Actions Basics", diff: "Medium", hrs: "5h", topics: ["Writing YAML workflow files", "Triggering actions on git push"] },
      { id: "w40", title: "Pipeline: Automated Testing", diff: "Hard", hrs: "7h", topics: ["Checking out code via pipeline", "Running automated Jest tests"] },
      { id: "w41", title: "Pipeline: Docker Build", diff: "Hard", hrs: "8h", topics: ["Automating Docker image building in the cloud"] },
      { id: "w42", title: "Pipeline: Registry Push", diff: "Medium", hrs: "5h", topics: ["Pushing images to Docker Hub or AWS ECR"] },
      { id: "w43", title: "Automated EC2 Deployment", diff: "Expert", hrs: "12h", topics: ["SSHing into production via pipeline", "Pulling and running the new image automatically"] }
    ]
  },
  {
    phase: "Phase 8: Observability",
    weeks: [
      { id: "w44", title: "Application Logging", diff: "Easy", hrs: "3h", topics: ["Structuring logs in backend code", "Exporting logs to standard output"] },
      { id: "w45", title: "Prometheus Metrics", diff: "Hard", hrs: "8h", topics: ["Setting up Prometheus scrapers", "Tracking CPU, memory, and latency"] },
      { id: "w46", title: "Grafana Dashboards", diff: "Medium", hrs: "6h", topics: ["Connecting Prometheus to Grafana", "Building real-time health visualization panels"] },
      { id: "w47", title: "Alerting Systems", diff: "Medium", hrs: "5h", topics: ["Configuring CloudWatch or Grafana alerts", "Setting up Slack/Email notifications for CPU spikes"] },
      { id: "w48", title: "Disaster Recovery Drill", diff: "Expert", hrs: "10h", topics: ["Simulating a database crash", "Recovering from automated RDS backups"] }
    ]
  },
  {
    phase: "Phase 9: The Consultancy Launch",
    weeks: [
      { id: "w49", title: "Capstone Blueprinting", diff: "Medium", hrs: "5h", topics: ["Designing a B2B SaaS architecture", "Mapping out VPC, subnets, and pipelines"] },
      { id: "w50", title: "Infrastructure Deployment", diff: "Hard", hrs: "10h", topics: ["Deploying the full architecture using Terraform"] },
      { id: "w51", title: "App Deployment & Monitoring", diff: "Expert", hrs: "12h", topics: ["Connecting GitHub Actions to live infrastructure", "Attaching Prometheus and Grafana live"] },
      { id: "w52", title: "Consulting Pitch Deck", diff: "Medium", hrs: "6h", topics: ["Creating a 'Cloud Audit' proposal", "Pitching to local small businesses"] }
    ]
  }
];

// ... (KEEP projectsData EXACTLY THE SAME) ...

// --- 2. UPDATED RENDER FUNCTION ---
// (Find your existing renderRoadmap function and replace it with this)
function renderRoadmap() {
  let html = '';
  roadmapData.forEach((p, index) => {
    const isExpanded = index === 0 ? 'expanded' : '';
    html += `
      <div class="phase-card ${isExpanded}">
        <div class="phase-header" onclick="togglePhase(this)">
          <h3 class="phase-title">${p.phase}</h3>
          <span class="chevron">▼</span>
        </div>
        
        <div class="week-grid-wrapper">
          <div class="week-grid-inner">
            <div class="week-grid">
    `;
    
    p.weeks.forEach(w => {
      const checked = completedWeeks.includes(w.id);
      
      // Generate the list items for the topics
      let topicsHtml = w.topics ? w.topics.map(t => `<li>${t}</li>`).join('') : '';

      html += `
        <div class="skill-item ${checked ? 'checked' : ''}" data-id="${w.id}">
          <div class="skill-header-row">
            <div class="custom-checkbox" title="Mark Complete"></div>
            <div style="flex: 1;">
              <p class="skill-title">${w.title}</p>
              <span class="tag tag-${w.diff.toLowerCase()}">${w.diff}</span>
            </div>
          </div>
          
          <div class="subtopics-wrapper">
            <div class="subtopics-inner">
              <ul class="subtopics-list">
                ${topicsHtml}
              </ul>
            </div>
          </div>

          <div class="tooltip">Estimated: ${w.hrs}</div>
        </div>
      `;
    });
    html += `</div></div></div></div>`;
  });
  els.roadmapContent.innerHTML = html;
}

// --- 3. UPDATED EVENT LISTENER LOGIC ---
function setupListeners() {
  els.tabRoadmap.onclick = () => switchTab('roadmap');
  els.tabProjects.onclick = () => switchTab('projects');
  
  els.roadmapContent.onclick = (e) => {
    const card = e.target.closest('.skill-item');
    if (!card) return;

    // If they clicked the checkbox specifically, toggle completion (requires admin)
    if (e.target.closest('.custom-checkbox')) {
      if (isAdmin) {
        toggleWeek(card.dataset.id);
      } else {
        alert("You must unlock Admin mode to mark progress!");
      }
      return;
    }

    // If they clicked anywhere else on the card, toggle the deep-dive accordion
    card.classList.toggle('expanded');
  };
}

// Global function to toggle the Phases
window.togglePhase = function(element) {
  const card = element.closest('.phase-card');
  card.classList.toggle('expanded');
};