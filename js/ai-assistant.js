/**
 * Yash Srivastava - AI Portfolio Assistant
 * Highly intelligent, interactive, and premium glassmorphic chat widget.
 * Designed to guide recruiters, showcase projects, and automatically navigate sections.
 */

(function () {
    'use strict';

    // 1. Core Portfolio Data
    const YASH_DATA = {
        name: "Yash Srivastava",
        role: "Full Stack Developer & Machine Learning Enthusiast",
        summary: "An enthusiastic, goal-oriented Computer Science & Engineering student at VIT Bhopal, specializing in Artificial Intelligence and Machine Learning (8.97 CGPA). Yash has a strong foundation in computer vision, deep learning, database management, and responsive full-stack web development. He is driven to build practical, high-impact technological solutions.",
        skills: {
            languages: "Python, JavaScript, Java, C, C++",
            frameworks: "Django, React.js, Node.js, Express.js, Flask, Tailwind CSS, Bootstrap",
            ml: "TensorFlow, Keras, OpenCV, NumPy, Pandas, Scikit-learn, Convolutional Neural Networks (CNN)",
            databases: "MongoDB, SQL, PostgreSQL"
        },
        projects: [
            {
                id: "driver",
                title: "Driver Distraction AI (Driver Distraction Detection)",
                problem: "High rate of vehicular accidents caused by driver inattention and distractions.",
                tech: "Python, TensorFlow, Keras, OpenCV, Deep Learning",
                outcome: "Developed a real-time deep learning system leveraging computer vision to monitor driver behaviors, detect cognitive/visual distractions, and trigger instant alerts to prevent road accidents.",
                github: "https://github.com/Yash-2808/Distracted-Driver-Detection-using-deep-learning"
            },
            {
                id: "plant",
                title: "Plant Disease Recognition AI (using CNN)",
                problem: "Crop health issues and plant diseases are difficult for farmers to diagnose early, resulting in drastically reduced agricultural yields.",
                tech: "Python, Convolutional Neural Networks (CNN), TensorFlow, Keras, Jupyter Notebook",
                outcome: "Created an advanced deep learning system utilizing CNNs to classify and identify various plant/crop leaf diseases with high accuracy, enabling early diagnosis and targeted actions.",
                github: "https://github.com/Yash-2808/Plant-Disease-Recognition-using-CNN"
            },
            {
                id: "chemical",
                title: "Chemical Equipment Visualizer (Parameter Visualizer)",
                problem: "Analyzing and generating professional reports from chemical equipment parameters in CSV files is complex and tedious for engineers.",
                tech: "Python, Django, React, PyQt5, Pandas, Chart.js, PDF Reporting",
                outcome: "Built a sleek hybrid web and desktop application that automates CSV parsing, generates interactive charts, and produces professional PDF reports across both React web and PyQt5 desktop interfaces.",
                github: "https://github.com/Yash-2808/Chemical-Equipment-Parameter-Visualizer"
            },
            {
                id: "medie",
                title: "Medie Genie App (All-in-One Healthcare Hub)",
                problem: "Essential healthcare services like emergency dispatch, doctor appointments, remote consultations, and records are fragmented across multiple platforms.",
                tech: "HTML, CSS, JavaScript, Databases, Web APIs",
                outcome: "Developed an all-in-one healthcare platform that unites doctor consultations, emergency services, appointment bookings, home pathology lab visits, and medical records into a single, unified interface.",
                link: "https://kzmlzy5z83lmaschw1u2.lite.vusercontent.net/"
            }
        ],
        experience: [
            {
                role: "Web Development Intern",
                company: "Ramaya Group Pvt. Ltd",
                period: "Oct 2025 - Jan 2026",
                desc: "Worked on internal web development, designed/developed responsive pages, enhanced frontend functionality, and followed industry-standard software practices."
            },
            {
                role: "Core Member (Content)",
                company: "UX-Club, VIT Bhopal",
                period: "Nov 2025 - Jan 2026",
                desc: "Shape content for user-focused club communication, collaborate with designers and organizers to plan workshops and annual events, and build engaging narratives based on UX principles."
            },
            {
                role: "Volunteer",
                company: "UX-Club, VIT Bhopal",
                period: "Feb 2025",
                desc: "Contributed to event management, promotions, and social media for the club's opening events during the annual fest 'AdVITya'25'."
            },
            {
                role: "Project Contributor",
                company: "Project Exhibition, VIT Bhopal",
                period: "Sep 2024 - Jan 2025",
                desc: "Designed and developed the frontend and database query management for the Medie Genie App, enabling smooth user access to emergency health services."
            }
        ],
        education: [
            {
                degree: "B.Tech in Computer Science & Engineering (AI & ML)",
                institution: "Vellore Institute of Technology (VIT), Bhopal",
                period: "2023 - 2027",
                grade: "8.97 CGPA"
            },
            {
                degree: "Intermediate (12th Grade)",
                institution: "Holy Public School, Agra",
                period: "2021 - 2022",
                grade: "83%"
            },
            {
                degree: "High School (10th Grade)",
                institution: "Holy Public School, Agra",
                period: "2019 - 2020",
                grade: "89%"
            }
        ],
        achievements: [
            "Maintain an excellent B.Tech CGPA of 8.97 in Computer Science (AI/ML) at VIT Bhopal.",
            "Inducted as an official Core Member of the VIT Bhopal UX Club content team.",
            "Designed and built multiple complex end-to-end Machine Learning models and Full Stack applications.",
            "Presented Medie Genie at the VIT Bhopal Project Exhibition, receiving high commendation."
        ],
        resumeUrl: "assets/resume.pdf",
        contact: {
            email: "yashshri682@gmail.com",
            phone: "+91 8791660165",
            whatsapp: "https://wa.me/918791660165",
            github: "https://github.com/Yash-2808",
            linkedin: "https://linkedin.com/in/yash-srivastava-20b710291",
            instagram: "https://www.instagram.com/yash_srivastavaa?igsh=MWRvbHM5cmx3aW9rOQ==",
            location: "Agra, Uttar Pradesh, India"
        }
    };

    // Keep track of chat state and context
    let isChatOpen = false;
    let lastUserQuery = "";
    let lastSuggestedIntent = "";
    let conversationHistory = [];

    // 2. Inject CSS Styles Dynamically
    function injectStyles() {
        if (document.getElementById('ai-assistant-styles')) return;

        const style = document.createElement('style');
        style.id = 'ai-assistant-styles';
        style.textContent = `
            /* Chatbot Floating Action Button */
            .ai-chat-fab {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: linear-gradient(135deg, #ffb400 0%, #ff8c00 100%);
                box-shadow: 0 8px 32px rgba(255, 180, 0, 0.4);
                cursor: pointer;
                z-index: 2147483640; /* stay above everything except overlay */
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                border: 2px solid rgba(255, 255, 255, 0.2);
            }
            .ai-chat-fab:hover {
                transform: scale(1.1) translateY(-5px);
                box-shadow: 0 12px 40px rgba(255, 180, 0, 0.6);
            }
            .ai-chat-fab i {
                color: #1e1e22;
                font-size: 24px;
                transition: transform 0.4s ease;
            }
            .ai-chat-fab.open i {
                transform: rotate(90deg);
            }
            .ai-chat-fab .online-indicator {
                position: absolute;
                top: 2px;
                right: 2px;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: #00ff66;
                border: 2px solid #1e1e22;
                box-shadow: 0 0 10px #00ff66;
                animation: ai-pulse-green 2s infinite;
            }
            @keyframes ai-pulse-green {
                0% { box-shadow: 0 0 0 0 rgba(0, 255, 102, 0.7); }
                70% { box-shadow: 0 0 0 10px rgba(0, 255, 102, 0); }
                100% { box-shadow: 0 0 0 0 rgba(0, 255, 102, 0); }
            }

            /* Pulse glow for FAB */
            .ai-chat-fab::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: inherit;
                top: 0;
                left: 0;
                z-index: -1;
                opacity: 0.4;
                animation: ai-fab-pulse 2s infinite;
            }
            @keyframes ai-fab-pulse {
                0% { transform: scale(1); opacity: 0.4; }
                100% { transform: scale(1.4); opacity: 0; }
            }

            /* Chat Window Container */
            .ai-chat-container {
                position: fixed;
                bottom: 105px;
                right: 30px;
                width: 380px;
                height: 580px;
                border-radius: 24px;
                background: rgba(18, 18, 22, 0.85);
                backdrop-filter: blur(25px);
                -webkit-backdrop-filter: blur(25px);
                border: 1px solid rgba(255, 255, 255, 0.08);
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.05);
                z-index: 2147483639;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                transform: translateY(30px) scale(0.9);
                opacity: 0;
                pointer-events: none;
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.15);
            }
            .ai-chat-container.active {
                transform: translateY(0) scale(1);
                opacity: 1;
                pointer-events: all;
            }
            @media (max-width: 480px) {
                .ai-chat-container {
                    right: 15px;
                    bottom: 95px;
                    width: calc(100% - 30px);
                    height: calc(100% - 120px);
                    max-height: 550px;
                }
                .ai-chat-fab {
                    right: 20px;
                    bottom: 20px;
                }
            }

            /* Chat Header */
            .ai-chat-header {
                padding: 16px 20px;
                background: rgba(255, 255, 255, 0.02);
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .ai-chat-header-info {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .ai-chat-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: linear-gradient(135deg, #12c2e9, #c471ed, #ffb400);
                padding: 2px;
                box-shadow: 0 4px 15px rgba(18, 194, 233, 0.3);
            }
            .ai-chat-avatar-inner {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: #1e1e22;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                font-size: 14px;
                color: #ffb400;
                letter-spacing: 0.5px;
                overflow: hidden;
            }
            .ai-chat-avatar-inner img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            .ai-chat-header-text h6 {
                margin: 0;
                font-family: 'Outfit', sans-serif;
                font-weight: 600;
                font-size: 14.5px;
                color: #fff;
                letter-spacing: 0.2px;
            }
            .ai-chat-header-text span {
                font-size: 11px;
                color: #00ff66;
                font-family: 'Poppins', sans-serif;
                display: flex;
                align-items: center;
                gap: 4px;
            }
            .ai-chat-header-text span::before {
                content: '';
                display: inline-block;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: #00ff66;
            }
            .ai-chat-close {
                background: none;
                border: none;
                color: rgba(255, 255, 255, 0.4);
                cursor: pointer;
                font-size: 18px;
                padding: 4px;
                transition: color 0.2s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .ai-chat-close:hover {
                color: #fff;
            }

            /* Chat Messages Box */
            .ai-chat-messages {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            /* Custom Scrollbar for messages */
            .ai-chat-messages::-webkit-scrollbar {
                width: 4px;
            }
            .ai-chat-messages::-webkit-scrollbar-track {
                background: transparent;
            }
            .ai-chat-messages::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
            }
            .ai-chat-messages::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.25);
            }

            /* Message Bubbles */
            .ai-message {
                max-width: 80%;
                padding: 12px 16px;
                border-radius: 18px;
                font-size: 13px;
                line-height: 1.5;
                font-family: 'Poppins', sans-serif;
                animation: ai-message-fade-in 0.3s cubic-bezier(0.1, 0.8, 0.2, 1) forwards;
                position: relative;
            }
            @keyframes ai-message-fade-in {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .ai-message.assistant {
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.05);
                color: #e4e4e7;
                align-self: flex-start;
                border-bottom-left-radius: 4px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            .ai-message.user {
                background: linear-gradient(135deg, rgba(255, 180, 0, 0.15) 0%, rgba(255, 140, 0, 0.25) 100%);
                border: 1px solid rgba(255, 180, 0, 0.3);
                color: #ffffff;
                align-self: flex-end;
                border-bottom-right-radius: 4px;
                box-shadow: 0 4px 15px rgba(255, 180, 0, 0.1);
            }

            /* Interactive UI Elements inside bubbles */
            .ai-message .btn-action {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                background: linear-gradient(90deg, #ffb400, #ff8c00);
                border: none;
                color: #1e1e22 !important;
                font-weight: 600;
                font-size: 11.5px;
                padding: 6px 14px;
                border-radius: 20px;
                margin-top: 10px;
                cursor: pointer;
                text-decoration: none;
                transition: all 0.25s ease;
                box-shadow: 0 4px 10px rgba(255, 180, 0, 0.2);
            }
            .ai-message .btn-action:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 15px rgba(255, 180, 0, 0.4);
            }
            .ai-message ul {
                margin: 8px 0 0 0;
                padding-left: 20px;
            }
            .ai-message li {
                margin-bottom: 4px;
            }
            .ai-message strong {
                color: #ffb400;
            }

            /* Typing Indicator Animation */
            .ai-typing-indicator {
                display: flex;
                gap: 5px;
                padding: 14px 18px;
                border-radius: 18px;
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.05);
                align-self: flex-start;
                border-bottom-left-radius: 4px;
                animation: ai-message-fade-in 0.3s ease;
            }
            .ai-typing-indicator span {
                width: 7px;
                height: 7px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                animation: ai-bounce 1.4s infinite ease-in-out both;
            }
            .ai-typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
            .ai-typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
            @keyframes ai-bounce {
                0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
                40% { transform: scale(1); opacity: 1; }
            }

            /* Dynamic Suggestion Chips */
            .ai-chat-chips-outer {
                padding: 5px 15px 12px 15px;
                border-top: 1px solid transparent;
                overflow-x: auto;
                white-space: nowrap;
                display: flex;
                gap: 8px;
            }
            .ai-chat-chips-outer::-webkit-scrollbar {
                height: 3px;
            }
            .ai-chat-chips-outer::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.08);
                border-radius: 10px;
            }
            .ai-chat-chip {
                display: inline-block;
                padding: 7px 14px;
                border-radius: 30px;
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.07);
                color: #d1d1d6;
                font-size: 11.5px;
                font-family: 'Poppins', sans-serif;
                cursor: pointer;
                transition: all 0.25s ease;
                box-shadow: 0 2px 6px rgba(0,0,0,0.1);
            }
            .ai-chat-chip:hover {
                background: rgba(255, 180, 0, 0.1);
                border-color: rgba(255, 180, 0, 0.4);
                color: #ffb400;
                transform: translateY(-1.5px);
            }

            /* Input Area */
            .ai-chat-input-area {
                padding: 15px 20px;
                background: rgba(0, 0, 0, 0.2);
                border-top: 1px solid rgba(255, 255, 255, 0.05);
                display: flex;
                gap: 10px;
                align-items: center;
            }
            .ai-chat-input-wrapper {
                flex: 1;
                position: relative;
                display: flex;
                align-items: center;
            }
            .ai-chat-input {
                width: 100%;
                padding: 11px 16px;
                border-radius: 30px;
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.07);
                color: #fff;
                font-size: 12.5px;
                font-family: 'Poppins', sans-serif;
                outline: none;
                transition: all 0.3s ease;
            }
            .ai-chat-input:focus {
                border-color: rgba(255, 180, 0, 0.5);
                background: rgba(255, 255, 255, 0.05);
                box-shadow: 0 0 12px rgba(255, 180, 0, 0.15);
            }
            .ai-chat-send {
                width: 38px;
                height: 38px;
                border-radius: 50%;
                background: linear-gradient(135deg, #ffb400 0%, #ff8c00 100%);
                border: none;
                color: #1e1e22;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.25s ease;
                box-shadow: 0 4px 10px rgba(255, 180, 0, 0.2);
            }
            .ai-chat-send:hover {
                transform: scale(1.05);
                box-shadow: 0 6px 14px rgba(255, 180, 0, 0.4);
            }
            .ai-chat-send i {
                font-size: 13.5px;
                margin-left: 2px;
            }
        `;
        document.head.appendChild(style);
    }

    // 3. Inject HTML Widget Dynamically
    function injectWidget() {
        if (document.getElementById('ai-assistant-container')) return;

        // Create Container
        const container = document.createElement('div');
        container.id = 'ai-assistant-container';
        container.innerHTML = `
            <!-- Floating Action Button -->
            <div id="ai-chat-fab" class="ai-chat-fab" title="Talk to Yash's AI Assistant">
                <i class="fa-solid fa-comments"></i>
                <div class="online-indicator"></div>
            </div>

            <!-- Chat Drawer Window -->
            <div id="ai-chat-window" class="ai-chat-container">
                <!-- Header -->
                <div class="ai-chat-header">
                    <div class="ai-chat-header-info">
                        <div class="ai-chat-avatar">
                            <div class="ai-chat-avatar-inner">
                                <img src="images/profile-pic.jpg" onerror="this.src='';this.innerHTML='YS';" alt="YS">
                            </div>
                        </div>
                        <div class="ai-chat-header-text">
                            <h6>Yash's Assistant</h6>
                            <span>Online & Active</span>
                        </div>
                    </div>
                    <button id="ai-chat-close" class="ai-chat-close" title="Minimize chat">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <!-- Messages -->
                <div id="ai-chat-messages" class="ai-chat-messages">
                    <!-- Initial Welcome Message gets injected here -->
                </div>

                <!-- Dynamic Suggestion Chips -->
                <div id="ai-chat-chips" class="ai-chat-chips-outer">
                    <!-- Chips go here -->
                </div>

                <!-- Input area -->
                <form id="ai-chat-input-form" class="ai-chat-input-area">
                    <div class="ai-chat-input-wrapper">
                        <input type="text" id="ai-chat-input" class="ai-chat-input" placeholder="Ask about skills, projects, contact..." autocomplete="off">
                    </div>
                    <button type="submit" class="ai-chat-send" title="Send message">
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        `;
        document.body.appendChild(container);

        // Bind events
        document.getElementById('ai-chat-fab').addEventListener('click', toggleChat);
        document.getElementById('ai-chat-close').addEventListener('click', toggleChat);
        document.getElementById('ai-chat-input-form').addEventListener('submit', handleFormSubmit);

        // Render Welcome message and standard chips
        sendAssistantWelcome();
    }

    // Toggle Chat visibility
    function toggleChat() {
        isChatOpen = !isChatOpen;
        const windowEl = document.getElementById('ai-chat-window');
        const fabEl = document.getElementById('ai-chat-fab');
        const inputEl = document.getElementById('ai-chat-input');

        if (isChatOpen) {
            windowEl.classList.add('active');
            fabEl.classList.add('open');
            // Auto focus input on desktop
            if (window.innerWidth > 768) {
                setTimeout(() => inputEl.focus(), 300);
            }
        } else {
            windowEl.classList.remove('active');
            fabEl.classList.remove('open');
        }
    }

    // Scroll chat window to bottom
    function scrollToBottom() {
        const msgContainer = document.getElementById('ai-chat-messages');
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }

    // Append a message to the box
    function appendMessage(sender, textHtml) {
        const msgContainer = document.getElementById('ai-chat-messages');
        const msg = document.createElement('div');
        msg.className = `ai-message ${sender}`;
        msg.innerHTML = textHtml;
        msgContainer.appendChild(msg);
        scrollToBottom();
    }

    // Show/Hide typing indicator
    let typingIndicatorElement = null;
    function showTypingIndicator() {
        if (typingIndicatorElement) return;
        const msgContainer = document.getElementById('ai-chat-messages');
        const indicator = document.createElement('div');
        indicator.className = 'ai-typing-indicator';
        indicator.innerHTML = '<span></span><span></span><span></span>';
        msgContainer.appendChild(indicator);
        typingIndicatorElement = indicator;
        scrollToBottom();
    }

    function removeTypingIndicator() {
        if (typingIndicatorElement) {
            typingIndicatorElement.remove();
            typingIndicatorElement = null;
        }
    }

    // Send Assistant Reply with realistic delay
    function sendAssistantReply(textHtml, delayMs = 900) {
        showTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator();
            appendMessage('assistant', textHtml);
        }, delayMs);
    }

    // Render interactive chips
    function setChips(chipList) {
        const chipsContainer = document.getElementById('ai-chat-chips');
        chipsContainer.innerHTML = '';
        chipList.forEach(chip => {
            const btn = document.createElement('div');
            btn.className = 'ai-chat-chip';
            btn.textContent = chip.label;
            btn.addEventListener('click', () => {
                // Mimic typing and submitting this chip
                document.getElementById('ai-chat-input').value = chip.value || chip.label;
                handleFormSubmit(new Event('submit'));
            });
            chipsContainer.appendChild(btn);
        });
    }

    // Initial Chips
    const DEFAULT_CHIPS = [
        { label: "Introduce Yash 🙋‍♂️", value: "Who is Yash?" },
        { label: "Show Projects 🚀", value: "Show me your projects" },
        { label: "Technical Skills 🛠️", value: "What skills do you have?" },
        { label: "Get Resume 📄", value: "Download resume" },
        { label: "Hire / Contact 📞", value: "How can I contact you?" }
    ];

    function sendAssistantWelcome() {
        const welcomeText = `Hi there! 👋 I am Yash's virtual assistant. I'm here to help you learn about his computer science background, machine learning projects, skills, education, and how to contact him.
        <br><br>
        Ask me anything, or tap a suggestion below to get started!`;
        appendMessage('assistant', welcomeText);
        setChips(DEFAULT_CHIPS);
    }

    // 4. Intelligent Natural Language Processing Engine
    function processQuery(query) {
        const q = query.toLowerCase().trim();
        lastUserQuery = q;

        // Contextual memory checking
        // E.g., if user asks about a project, then asks "what tech did you use?"
        let hasContext = false;

        // Navigation Intents
        if (matches(q, ["project", "portfolio", "case study", "works"]) && matches(q, ["show", "go to", "navigate", "explore", "redirect"])) {
            return handleNavigationIntent("projects", "Sure! Redirecting you to my Projects section, where you can explore details, watch videos, and view source codes.");
        }
        if (matches(q, ["resume", "cv", "resume link", "download resume"]) && matches(q, ["show", "go to", "navigate", "view"])) {
            return handleNavigationIntent("resume", "Certainly! Directing you to my Resume page, featuring educational stats, experiences, and a PDF download button.");
        }
        if (matches(q, ["skills", "tech stack", "skillset", "technologies"]) && matches(q, ["show", "go to", "navigate", "view"])) {
            return handleNavigationIntent("skills", "Absolutely! Redirecting you to my Skills dashboard to visualize my technical proficiencies.");
        }
        if (matches(q, ["experience", "jobs", "timeline", "work history"]) && matches(q, ["show", "go to", "navigate", "view"])) {
            return handleNavigationIntent("experience", "Of course! Let's explore my Work History and Experience timeline.");
        }
        if (matches(q, ["education", "college", "schooling", "university"]) && matches(q, ["show", "go to", "navigate", "view"])) {
            return handleNavigationIntent("achievements", "Got it! Guiding you directly to the Education and Academics timeline on my Resume page.");
        }
        if (matches(q, ["contact", "email", "phone", "address", "reach out"]) && matches(q, ["show", "go to", "navigate", "write to"])) {
            return handleNavigationIntent("contact", "Right away! Leading you to the Contact section where you can mail me or shoot a quick text.");
        }

        // Standard Q&A Intent Routing

        // 1. Greet
        if (matches(q, ["hello", "hi", "hey", "hola", "greetings", "good morning", "good afternoon", "good evening", "howdy"])) {
            return {
                reply: `Hello! Great to have you visiting Yash's portfolio today. 😊 I'm his AI assistant. How can I help you in your search or recruitment process today?`,
                chips: DEFAULT_CHIPS
            };
        }

        // 2. Introduce Yash
        if (matches(q, ["who is", "about yash", "tell me about yourself", "who are you", "introduce", "summary", "background"])) {
            return {
                reply: `Yash Srivastava is a highly analytical and goal-oriented Computer Science & Engineering student at **VIT Bhopal** (specializing in AI & Machine Learning, graduating 2027) maintaining an excellent CGPA of **8.97**.
                <br><br>
                He operates as a **Full Stack Web Developer** and an active **Machine Learning Enthusiast**, combining modern frontend styling (React.js, Tailwind CSS) with robust AI backends (Python, TensorFlow, Django). Yash is also a content Core Member at the VIT Bhopal UX Club, applying design thinking to tech!`,
                chips: [
                    { label: "Show Projects 🚀", value: "What projects has he built?" },
                    { label: "Technical Skills 🛠️", value: "Tell me about his technical skills" },
                    { label: "Get Resume 📄", value: "Show me his resume" }
                ]
            };
        }

        // 3. Skills Details
        if (matches(q, ["skills", "technologies", "languages", "know", "good at", "proficient", "stack", "databases", "programming"])) {
            return {
                reply: `Yash has structured his skill set into core developer categories:
                <br><br>
                • 💻 **Programming**: Python, JavaScript, Java, C, C++
                <br>• 🤖 **AI & Machine Learning**: TensorFlow, Keras, OpenCV, CNN, NumPy, Pandas, Scikit-learn
                <br>• 🌐 **Frameworks & Web**: React.js, Django, Node.js, Express.js, Flask, Tailwind CSS, HTML/CSS
                <br>• 🗄️ **Databases**: MongoDB, SQL (MySQL/PostgreSQL)
                <br><br>
                Would you like to navigate directly to his interactive Skills panel to see his proficiency bars?`,
                chips: [
                    { label: "Yes, Navigate to Skills 🛠️", value: "Show skills section" },
                    { label: "What projects use Python? 🐍", value: "Python projects" },
                    { label: "Tell me about experiences 👨‍💻", value: "What experiences does he have?" }
                ]
            };
        }

        // 4. Distracted Driver Detection Project Details
        if (matches(q, ["driver", "distract", "attention", "accident", "behaviour"])) {
            const proj = YASH_DATA.projects.find(p => p.id === "driver");
            lastSuggestedIntent = "project_driver";
            return {
                reply: `🚘 **${proj.title}**
                <br><br>
                • **Problem Statement**: High rate of vehicular accidents due to driver distractions and inattentiveness.
                <br>• **Technologies**: ${proj.tech}
                <br>• **Outcome**: A real-time deep learning architecture built using CNNs that monitors drivers, flags visual/cognitive distractions, and sounds alerts.
                <br><br>
                <a href="${proj.github}" target="_blank" class="btn-action">View on GitHub <i class="fa-brands fa-github"></i></a>`,
                chips: [
                    { label: "Plant Disease AI 🌿", value: "Tell me about the Plant Disease project" },
                    { label: "Medie Genie App 🏥", value: "Tell me about Medie Genie" },
                    { label: "Other Projects 📁", value: "Show all projects page" }
                ]
            };
        }

        // 5. Plant Disease Project Details
        if (matches(q, ["plant", "crop", "agriculture", "leaf", "disease"])) {
            const proj = YASH_DATA.projects.find(p => p.id === "plant");
            lastSuggestedIntent = "project_plant";
            return {
                reply: `🌿 **${proj.title}**
                <br><br>
                • **Problem Statement**: Undetected plant diseases destroy substantial crop yields and farmer livelihoods.
                <br>• **Technologies**: ${proj.tech}
                <br>• **Outcome**: An advanced convolutional neural network (CNN) model engineered to identify various crop health conditions and leaf anomalies, offering fast diagnosis and mitigation suggestions.
                <br><br>
                <a href="${proj.github}" target="_blank" class="btn-action">View on GitHub <i class="fa-brands fa-github"></i></a>`,
                chips: [
                    { label: "Driver Distraction AI 🚗", value: "Tell me about the driver distraction project" },
                    { label: "Chemical Equipment Visualizer 🧪", value: "Chemical Equipment Visualizer project" },
                    { label: "Show all projects 🚀", value: "Show me your projects" }
                ]
            };
        }

        // 6. Chemical Parameter Visualizer Details
        if (matches(q, ["chemical", "visualizer", "parameter", "pyqt5", "django", "pdf report"])) {
            const proj = YASH_DATA.projects.find(p => p.id === "chemical");
            lastSuggestedIntent = "project_chemical";
            return {
                reply: `🧪 **${proj.title}**
                <br><br>
                • **Problem Statement**: Traditional methods of parsing and reviewing chemical equipment CSV parameters are inefficient and difficult to visualize dynamically.
                <br>• **Technologies**: ${proj.tech}
                <br>• **Outcome**: A premium dual React (Web) and PyQt5 (Desktop) hybrid system with automated CSV parsing, custom Chart.js visualizations, and polished PDF report compiling.
                <br><br>
                <a href="${proj.github}" target="_blank" class="btn-action">View on GitHub <i class="fa-brands fa-github"></i></a>`,
                chips: [
                    { label: "Medie Genie App 🏥", value: "Tell me about Medie Genie" },
                    { label: "Show All Projects 🚀", value: "Show me your projects" },
                    { label: "Get Resume 📄", value: "Download resume" }
                ]
            };
        }

        // 7. Medie Genie Details
        if (matches(q, ["medie", "genie", "healthcare", "all-in-one", "doctor", "appointment"])) {
            const proj = YASH_DATA.projects.find(p => p.id === "medie");
            lastSuggestedIntent = "project_medie";
            return {
                reply: `🏥 **${proj.title}**
                <br><br>
                • **Problem Statement**: Healthcare services (doctor booking, emergency dispatch, test scheduling) are highly fragmented, frustrating users.
                <br>• **Technologies**: ${proj.tech}
                <br>• **Outcome**: A responsive unified portal streamlining ambulance dispatch, doctor consultations, lab tests, and clinical medical records. Features interactive web flows and query caching.
                <br><br>
                <a href="${proj.link}" target="_blank" class="btn-action">Launch Live Site <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`,
                chips: [
                    { label: "Driver Distraction AI 🚗", value: "Tell me about the driver distraction project" },
                    { label: "Plant Disease AI 🌿", value: "Tell me about the plant disease AI" },
                    { label: "Contact Yash 📞", value: "Get in touch" }
                ]
            };
        }

        // 8. General Projects Inquiry
        if (matches(q, ["project", "projects", "built", "developed", "portfolio", "code", "github link"])) {
            return {
                reply: `Yash has engineered multiple highly innovative software products:
                <br><br>
                • 🚗 **Driver Distraction AI**: Real-time CNN driver behavior monitor (Python/TensorFlow/OpenCV).
                <br>• 🌿 **Plant Disease AI**: Advanced crop leaf infection classification (Python/CNN).
                <br>• 🧪 **Chemical Parameter Visualizer**: React + PyQt5 dual CSV chart engine.
                <br>• 🏥 **Medie Genie**: All-in-one healthcare unified platform.
                <br><br>
                Would you like to redirect to the Projects catalog to interact with all of them?`,
                chips: [
                    { label: "Yes, Navigate to Projects 🚀", value: "Show projects section" },
                    { label: "Plant Disease AI info 🌿", value: "Tell me about plant disease AI" },
                    { label: "Medie Genie App 🏥", value: "Tell me about Medie Genie" }
                ]
            };
        }

        // 9. Work Experience / UX Club Details
        if (matches(q, ["experience", "work", "job", "ux club", "volunteer", "exhibition", "employ"])) {
            return {
                reply: `Yash has acquired excellent collaborative and engineering experiences:
                <br><br>
                • 💻 **Web Development Intern - Ramaya Group Pvt. Ltd** (Oct 2025 - Jan 2026): Designed/developed responsive pages, enhanced frontend functionality, and completed internal projects.
                <br>• ✍️ **Core Content Member - UX-Club VIT Bhopal** (Nov 2025 - Jan 2026): Crafts user-centric event storylines, plans design workshops, and collaborates with web developers for the university annual fests.
                <br>• 🤝 **Volunteer - UX-Club VIT Bhopal** (Feb 2025): Assisted in managing promotions and operations for AdVITya'25 (annual fest).
                <br>• 🛠️ **Project Exhibition Contributor** (Sep 2024 - Jan 2025): Developed frontend UI and queries for the Medie Genie App.
                <br><br>
                I can redirect you to his interactive Resume page to view the chronological timeline.`,
                chips: [
                    { label: "Navigate to Resume 📄", value: "Go to resume page" },
                    { label: "Academics / Education 🎓", value: "What is his education?" },
                    { label: "Download PDF CV 📥", value: "Download resume" }
                ]
            };
        }

        // 10. Education
        if (matches(q, ["education", "academic", "college", "vit", "bhopal", "gpa", "cgpa", "school", "grade", "study", "studying"])) {
            return {
                reply: `Yash maintains an elite academic standing:
                <br><br>
                • 🎓 **B.Tech in Computer Science (AI & ML)**
                Vellore Institute of Technology (VIT), Bhopal (2023 - 2027)
                • **Grade**: **8.97 CGPA**
                <br>• 🏫 **Holy Public School, Agra**
                • Intermediate (12th): **83%** (2022)
                • High School (10th): **89%** (2020)
                <br><br>
                His studies heavily emphasize advanced algorithms, deep learning neural networks, computer vision, data structures, and database query optimization.`,
                chips: [
                    { label: "View Resume Page 📄", value: "Navigate to resume" },
                    { label: "Technical Skills 🛠️", value: "What skills do you have?" },
                    { label: "Contact Info 📞", value: "How can I contact you?" }
                ]
            };
        }

        // 11. Achievements
        if (matches(q, ["achievement", "award", "success", "extra", "activity", "win", "won"])) {
            return {
                reply: `Some of Yash's notable achievements include:
                <br><br>
                • Maintaining a stellar cumulative CGPA of **8.97** at VIT Bhopal.
                • Earned a key selection as an official **Core Member** in the VIT Bhopal UX Club content team out of numerous candidates.
                • Developed and deployed robust AI systems like the **Driver Distraction Detection** model.
                • Awarded high ratings during the academic project exhibition for the **Medie Genie** system.`,
                chips: [
                    { label: "Download Resume PDF 📥", value: "Download resume" },
                    { label: "View Experience 👨‍💻", value: "Tell me about your experience" },
                    { label: "Main Skills 🛠️", value: "What are your skills?" }
                ]
            };
        }

        // 12. Contact / Hiring Details
        if (matches(q, ["contact", "hire", "email", "phone", "location", "address", "number", "github", "linkedin", "write to", "whatsapp", "instagram"])) {
            return {
                reply: `You can reach out to Yash directly using any of these professional channels:
                <br><br>
                • ✉️ **Email**: <a href="mailto:${YASH_DATA.contact.email}">${YASH_DATA.contact.email}</a>
                <br>• 📞 **WhatsApp/Call**: <a href="${YASH_DATA.contact.whatsapp}" target="_blank">${YASH_DATA.contact.phone}</a>
                <br>• 📍 **Location**: ${YASH_DATA.contact.location}
                <br>• 💻 **GitHub**: <a href="${YASH_DATA.contact.github}" target="_blank">github.com/Yash-2808</a>
                <br>• 🔗 **LinkedIn**: <a href="${YASH_DATA.contact.linkedin}" target="_blank">LinkedIn Profile</a>
                <br>• 📸 **Instagram**: <a href="${YASH_DATA.contact.instagram}" target="_blank">@yash_srivastavaa</a>
                <br><br>
                Would you like me to redirect you to the Contact Form page to send him a direct message?`,
                chips: [
                    { label: "Navigate to Contact Page 📞", value: "Show contact section" },
                    { label: "Download Resume PDF 📄", value: "Download resume" },
                    { label: "Tell me about yourself 🙋‍♂️", value: "Who is Yash?" }
                ]
            };
        }

        // 13. Resume PDF Link
        if (matches(q, ["resume", "cv", "pdf", "resume link", "download", "document"])) {
            return {
                reply: `You can instantly download Yash's fully verified, recruiter-friendly single-page PDF resume using the action below.
                <br><br>
                <a href="${YASH_DATA.resumeUrl}" download="Yash_Srivastava_Resume.pdf" class="btn-action"><i class="fa-solid fa-download"></i> Download Resume PDF</a>
                <br><br>
                Or, if you prefer, I can transition you directly to the online Resume catalog.`,
                chips: [
                    { label: "Go to Resume Section 📄", value: "Show resume section" },
                    { label: "Explore Projects 🚀", value: "What projects has he built?" },
                    { label: "Get Contact Details 📞", value: "How to contact him?" }
                ]
            };
        }

        // Context-aware questions
        if (matches(q, ["technologies", "tech", "languages", "libraries", "tools"]) && matches(q, ["use", "built with", "written in", "leverage"])) {
            if (lastSuggestedIntent === "project_driver") {
                return {
                    reply: `The **Driver Distraction AI** leverages a highly optimized machine learning stack:
                    <br>• **Core Programming**: Python
                    <br>• **Neural Network Models**: TensorFlow, Keras, CNN architectures
                    <br>• **Real-time Video Processing**: OpenCV
                    <br><br>
                    It applies advanced image classification to analyze driver facial and posture frames in milliseconds.`,
                    chips: [{ label: "View Plant Disease AI 🌿", value: "Plant Disease AI" }]
                };
            }
            if (lastSuggestedIntent === "project_plant") {
                return {
                    reply: `The **Plant Disease Recognition AI** employs:
                    <br>• **Core Languages**: Python
                    <br>• **Architectures**: Convolutional Neural Networks (CNN) for high-accuracy feature extraction.
                    <br>• **Libraries**: TensorFlow, Keras, NumPy, Matplotlib for data plotting
                    <br>• **IDE**: Jupyter Notebook for active prototyping.`,
                    chips: [{ label: "View Chemical Visualizer 🧪", value: "Chemical Equipment Visualizer" }]
                };
            }
            if (lastSuggestedIntent === "project_chemical") {
                return {
                    reply: `The **Chemical Equipment Parameter Visualizer** uses a unique dual architecture:
                    <br>• **Backend Engine**: Python, Django REST Framework
                    <br>• **Desktop Client**: PyQt5 desktop framework
                    <br>• **Web Frontend**: React.js, Tailwind CSS, Chart.js for interactive analytics
                    <br>• **Data Science**: Pandas for automatic CSV ingestion.`,
                    chips: [{ label: "View Medie Genie App 🏥", value: "Medie Genie" }]
                };
            }
            if (lastSuggestedIntent === "project_medie") {
                return {
                    reply: `The **Medie Genie App** uses a highly polished frontend and query stack:
                    <br>• **Frontend Layout**: Responsive CSS grid and flexbox, vanilla JavaScript
                    <br>• **Integrations**: Interactive maps, medical dispatch APIs, and caching to ensure immediate emergency routing.`,
                    chips: [{ label: "View Driver Distraction AI 🚗", value: "Driver Distraction AI" }]
                };
            }
        }

        // Unrelated/Harmful request filtering
        if (matches(q, ["hack", "virus", "crack", "steal", "kill", "weapons", "drugs", "illegal", "harmful", "spam"])) {
            return {
                reply: `I apologize, but I am specifically designed to assist recruiters and visitors in exploring Yash Srivastava's portfolio, engineering projects, and technical qualifications. I cannot assist with unrelated or harmful inquiries.
                <br><br>
                Would you like to examine Yash's technical skills or read about his deep learning systems?`,
                chips: DEFAULT_CHIPS
            };
        }

        // Default Fallback
        return {
            reply: `I'm not sure I fully caught that! 🧐 I can introduce Yash, detail his Machine Learning/Full-Stack projects (Driver Distraction AI, Plant Disease AI, Chemical Visualizer, Medie Genie), display his academic timeline (8.97 CGPA at VIT Bhopal), or automatically navigate you to specific sections.
            <br><br>
            What would you like to explore first?`,
            chips: DEFAULT_CHIPS
        };
    }

    // Helper function to match keywords
    function matches(str, keywords) {
        return keywords.some(keyword => str.includes(keyword.toLowerCase()));
    }

    // Handle navigation redirection commands and alert chatbot response
    function handleNavigationIntent(section, textPrefix) {
        // We trigger navigation after a slight delay so the user can read the polite chatbot message
        setTimeout(() => {
            navigate(section);
        }, 1100);

        return {
            reply: `${textPrefix}
            <br><br>
            ✨ **Guiding you to the ${section.charAt(0).toUpperCase() + section.slice(1)} section now...**`,
            chips: [
                { label: "Other Skills 🛠️", value: "What skills do you have?" },
                { label: "Read Projects 🚀", value: "Show me your projects" },
                { label: "Contact Details 📞", value: "Get contact info" }
            ]
        };
    }

    // 5. Section Navigation Handler
    function navigate(section) {
        const sectionMap = {
            about: "index.html",
            skills: "resume.html#skills",
            projects: "projects.html",
            experience: "resume.html#experience",
            achievements: "resume.html#education",
            resume: "resume.html",
            contact: "contact.html"
        };

        const targetUrl = sectionMap[section.toLowerCase()];
        if (!targetUrl) return;

        // Check current path
        const currentPath = window.location.pathname;
        const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || "index.html";

        // Parse target
        const parts = targetUrl.split('#');
        const targetPage = parts[0];
        const targetHash = parts[1] ? '#' + parts[1] : '';

        // If we are already on the target page, scroll smoothly
        if (currentPage === targetPage) {
            if (targetHash) {
                scrollToElement(targetHash);
            } else {
                // Scroll to top
                if (typeof scrollbar !== 'undefined' && scrollbar) {
                    scrollbar.scrollTo(0, 0, 1000);
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        } else {
            // If on another page, let's navigate
            // First check if there is an explicit nav link with this href to click (respecting transitions)
            const navLink = document.querySelector(`header nav ul li a[href="${targetPage}"]`);

            if (targetHash) {
                sessionStorage.setItem('scrollTargetHash', targetHash);
            }

            if (navLink) {
                navLink.click();
            } else {
                // Fallback standard navigation with matching transition preloader
                if (typeof showTransitionLoader === 'function') {
                    showTransitionLoader();
                }
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 700);
            }
        }
    }

    // Scroll smoothly to target element taking smooth-scrollbar into account
    function scrollToElement(hash) {
        let selector = '';
        if (hash === '#skills') selector = '.skills';
        else if (hash === '#experience') selector = '.timeline-caption-outer';
        else if (hash === '#education') {
            // Find second timeline caption outer (education)
            const captions = document.querySelectorAll('.timeline-caption-outer');
            if (captions.length > 1) {
                // Check smooth scrollbar
                if (typeof scrollbar !== 'undefined' && scrollbar) {
                    const rect = captions[1].getBoundingClientRect();
                    const currentScroll = scrollbar.offset.y;
                    scrollbar.scrollTo(0, currentScroll + rect.top - 80, 1000);
                    return;
                } else {
                    captions[1].scrollIntoView({ behavior: 'smooth' });
                    return;
                }
            }
            selector = '.timeline-caption-outer';
        }

        if (!selector) return;

        const targetEl = document.querySelector(selector);
        if (!targetEl) return;

        setTimeout(() => {
            if (typeof scrollbar !== 'undefined' && scrollbar) {
                const rect = targetEl.getBoundingClientRect();
                const currentScroll = scrollbar.offset.y;
                scrollbar.scrollTo(0, currentScroll + rect.top - 80, 1000);
            } else {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    }

    // Check if there is a pending scroll target hash stored in session storage (from previous page)
    function checkAndScrollToHash() {
        const hash = sessionStorage.getItem('scrollTargetHash');
        if (hash) {
            sessionStorage.removeItem('scrollTargetHash');
            // Give some buffer for transition to end and DOM to render
            setTimeout(() => {
                scrollToElement(hash);
            }, 500);
        }
    }

    // 6. Form Submission / Chat Input Handling
    function handleFormSubmit(e) {
        e.preventDefault();
        const inputEl = document.getElementById('ai-chat-input');
        const text = inputEl.value.trim();
        if (!text) return;

        // Clear input
        inputEl.value = '';

        // Add user bubble
        appendMessage('user', text);

        // Process response
        const result = processQuery(text);

        // Send assistant bubble
        sendAssistantReply(result.reply, 850);

        // Set chips if present, otherwise set default
        if (result.chips) {
            setTimeout(() => {
                setChips(result.chips);
            }, 850);
        }
    }

    // 7. Initialization
    function init() {
        injectStyles();
        injectWidget();
        checkAndScrollToHash();

        // Hook into Barba transition after enter to support scroll redirection and widget state
        if (typeof barba !== 'undefined') {
            barba.hooks.afterEnter(() => {
                checkAndScrollToHash();
                // Ensure widget remains properly injected inside body
                // In Barba, body tags are usually preserved, but in case they are wiped, let's keep check:
                injectWidget();
            });
        }
    }

    // Initialize on DOM load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Make navigate function available globally
    window.navigate = navigate;

})();
