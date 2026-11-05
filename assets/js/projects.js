/*
 * Project data.
 * Every entry here becomes one card in the projects grid and one details dialog.
 * To add a project: copy an entry, change the fields, and drop its images in assets/.
 *
 * id          unique slug
 * cardTitle   title on the card          title      title in the dialog
 * subtitle    one line on the card       badge      optional label on the card image (or null)
 * head        card image                 images     screenshots shown in the dialog gallery
 * cardTags    tags on the card           tags       tags in the dialog
 * description first line is the intro; "emoji Label: text" lines become feature rows;
 *             lines starting with "–" become sub-points of the row above
 * features    bullet list under "Key features"
 */
window.PROJECTS = [
  {
    "id": "artflow-pro",
    "cardTitle": "Artflow Pro",
    "subtitle": "Artist & Gallery Platform with AI, Role-Based Access, and Real-Time Features",
    "head": "assets/project_mian_head/artflowpro.png",
    "badge": "Featured",
    "cardTags": [
      "Flutter",
      "ASP.NET API",
      "AI Integration",
      "SignalR",
      "Cloudinary",
      "Secure Storage",
      "In-App Purchase"
    ],
    "title": "Artflow Pro",
    "description": "Artflow Pro is a feature-rich platform designed for artists and galleries, supporting role-based access and monetization via tiered subscriptions.\n\n🔷 ASP.NET API Integration: Robust backend using ASP.NET Web API for high performance and scalability.\n🔷 AI-Powered Features: AI-generated social media content and promotional materials.\n🔷 User Roles: Artist & Gallery roles with distinct capabilities.\n🔷 Free & Pro Accounts: Tiered access with monetization options and enhanced tools for Pro users.\n🔷 Real-Time Chat: SignalR-based live chat between users.\n🔷 Image Uploads: Optimized Cloudinary integration for image handling.\n🔷 Secure Storage: Environment variables and secure storage for sensitive data.\n🔷 In-App Purchases: Smooth upgrade path from Free to Pro accounts.",
    "images": [
      "assets/artflow_pro_images/artflow_1.png",
      "assets/artflow_pro_images/artflow_2.png",
      "assets/artflow_pro_images/artflow_3.png",
      "assets/artflow_pro_images/artflow_4.png",
      "assets/artflow_pro_images/artflow_5.png",
      "assets/artflow_pro_images/artflow_6.png",
      "assets/artflow_pro_images/artflow_7.png",
      "assets/artflow_pro_images/artflow_8.png",
      "assets/artflow_pro_images/artflow_9.png"
    ],
    "tags": [
      "Flutter",
      "ASP.NET API",
      "AI Integration",
      "SignalR",
      "Cloudinary",
      "Secure Storage",
      "In-App Purchase"
    ],
    "features": [
      "Artist portfolio management",
      "Role-based accounts (Free/Pro)",
      "Secure art transactions",
      "Gallery virtual tours",
      "Community engagement tools"
    ]
  },
  {
    "id": "spheres-app",
    "cardTitle": "Spheres App",
    "subtitle": "AI-powered personal assistant for productivity & well-being",
    "head": "assets/project_mian_head/spheres.png",
    "badge": null,
    "cardTags": [
      "Flutter",
      "Firebase",
      "AI Integration",
      "Calendar API",
      "Google Maps",
      "Secure Storage",
      "Third-Party APIs"
    ],
    "title": "Spheres – AI Personal Assistant",
    "description": "Spheres is a smart AI-powered assistant app designed to boost personal productivity through intelligent task handling and seamless user interaction — blending the capabilities of a chatbot with advanced planning tools.\n\n🧠 AI Chatbot Integration: Built on custom prompt engineering, offering emotionally responsive and contextual conversations.\n🗓️ Smart Task & Meeting Management: Create and manage tasks, meetings, reminders, and notes with AI assistance.\n🔐 Firebase Integration: Real-time data storage, authentication, and notifications.\n⏰ Reminders & Alerts: Supports one-time and recurring schedules — daily, weekly, or monthly.\n🗺️ Maps & Calendar APIs: Location-aware scheduling and Google Calendar syncing.\n🔌 Third-Party APIs: Extendable with external services for added functionality.\n👤 User Profiling: Learns user habits to offer better suggestions.\n💬 Emotionally Aware Chat: Supports personal, emotional conversations beyond productivity.",
    "images": [
      "assets/spheres_images/spheres_1.png",
      "assets/spheres_images/spheres_2.png",
      "assets/spheres_images/spheres_3.png",
      "assets/spheres_images/spheres_4.png",
      "assets/spheres_images/spheres_5.png",
      "assets/spheres_images/spheres_6.png",
      "assets/spheres_images/spheres_7.png",
      "assets/spheres_images/spheres_8.png",
      "assets/spheres_images/spheres_9.png",
      "assets/spheres_images/spheres_10.png",
      "assets/spheres_images/spheres_11.png",
      "assets/spheres_images/spheres_12.png",
      "assets/spheres_images/spheres_13.png",
      "assets/spheres_images/spheres_14.png",
      "assets/spheres_images/spheres_15.png",
      "assets/spheres_images/spheres_16.png",
      "assets/spheres_images/spheres_17.png",
      "assets/spheres_images/spheres_18.png"
    ],
    "tags": [
      "Flutter",
      "Firebase",
      "AI Integration",
      "Google Maps",
      "Calendar API",
      "Third-Party APIs",
      "Secure Storage"
    ],
    "features": [
      "Personal task management",
      "AI-powered conversations",
      "Emotional state tracking",
      "Secure personal journal",
      "Smart reminders"
    ]
  },
  {
    "id": "webination-app",
    "cardTitle": "Webination App",
    "subtitle": "Business insights & analytics platform for U.S. markets",
    "head": "assets/project_mian_head/webnition.png",
    "badge": "New Release",
    "cardTags": [
      "Flutter",
      "ASP.NET API",
      "Data Visualization",
      "Live Location",
      "Firebase"
    ],
    "title": "Webination Business Hub",
    "description": "Webnition is a powerful data-driven mobile application built to visualize and analyze business and personal information across the U.S., offering real-time interaction and advanced UI features.\n\n🌐 ASP.NET API Integration: Seamlessly connects to a powerful backend for real-time data retrieval and complex queries.\n📊 Dynamic Data Visualization: Displays interactive pie charts, bar graphs, and line charts across different time frames (weekly, monthly, yearly).\n⚡ Performance Enhancements: Includes shimmer loading effects and infinite scrolling for large datasets, like YouTube’s smooth feed.\n📍 Location-Based Services: Provides live tracking and shows office locations on map views for both individuals and companies.\n📁 Detailed Profiles: Offers insights into company history, office addresses, and verified user reviews.\n🇺🇸 U.S. Focused: Designed around American datasets and business ecosystem.",
    "images": [
      "assets/webinition_images/webnition_1.jpeg",
      "assets/webinition_images/webnition_2.jpeg",
      "assets/webinition_images/webnition_3.jpeg",
      "assets/webinition_images/webnition_4.jpeg",
      "assets/webinition_images/webnition_5.jpeg",
      "assets/webinition_images/webnition_6.jpeg",
      "assets/webinition_images/webnition_7.jpeg",
      "assets/webinition_images/webnition_8.jpeg",
      "assets/webinition_images/webnition_9.jpeg",
      "assets/webinition_images/webnition_10.jpeg",
      "assets/webinition_images/webnition_11.jpeg"
    ],
    "tags": [
      "Flutter",
      "ASP.NET API",
      "Data Visualization",
      "Live Location",
      "Firebase"
    ],
    "features": [
      "Real-time ASP.NET API integration",
      "Interactive charts and graphs",
      "Shimmer loading UX effects",
      "Infinite data scroll support",
      "Location-based business listings",
      "Detailed company and user profiles",
      "U.S.-focused business data analytics"
    ]
  },
  {
    "id": "carehub",
    "cardTitle": "CareHub",
    "subtitle": "Cross-platform healthcare companion",
    "head": "assets/project_mian_head/carehub.png",
    "badge": null,
    "cardTags": [
      "Flutter",
      "Firebase",
      "Riverpod",
      "FCM",
      "Localization",
      "Realtime Chat"
    ],
    "title": "CareHub Health Platform",
    "description": "CareHub is a scalable mobile healthcare app built for caregivers, patients, and family members, delivering essential real-time features and smooth cross-platform performance on Android and iOS.\n\n🩺 Role-Based Access Control (RBAC): Distinct user roles — Caregiver, Patient, and Family Member — each with tailored views and permissions.\n📱 Cross-Platform Flutter App: Built using Flutter to ensure high performance and consistent UI on both Android and iOS.\n🔒 Firebase Authentication: Secured sign-in via phone number verification.\n💬 Real-Time Chat: Facilitates instant communication between patients, family members, and healthcare providers.\n📲 FCM Notifications: Push updates via Firebase Cloud Messaging.\n⚙️ Riverpod State Management: Clean and maintainable app logic.\n🌐 Multilingual Support: Integrated Flutter Intl for global accessibility.\n🧩 Scalable Design: Responsive, modular, and future-proof architecture.",
    "images": [
      "assets/carhub_images/carehub_1.png",
      "assets/carhub_images/carehub_2.png",
      "assets/carhub_images/carehub_3.png",
      "assets/carhub_images/carehub_4.png",
      "assets/carhub_images/carehub_5.png",
      "assets/carhub_images/carehub_6.png",
      "assets/carhub_images/carehub_7.png",
      "assets/carhub_images/carehub_8.png",
      "assets/carhub_images/carehub_9.png",
      "assets/carhub_images/carehub_10.png",
      "assets/carhub_images/carehub_11.png",
      "assets/carhub_images/carehub_12.png",
      "assets/carhub_images/carehub_13.png",
      "assets/carhub_images/carehub_14.png",
      "assets/carhub_images/carehub_15.png",
      "assets/carhub_images/carehub_16.png"
    ],
    "tags": [
      "Flutter",
      "Firebase",
      "Riverpod",
      "FCM",
      "Localization",
      "Realtime Chat"
    ],
    "features": [
      "Role-based access for caregiver, patient, and family",
      "Cross-platform Flutter app (iOS & Android)",
      "Phone number authentication via Firebase",
      "Real-time chat for connected care",
      "Push notifications with FCM",
      "Riverpod for scalable state management",
      "Multilingual UI with Flutter Intl",
      "Responsive and scalable design"
    ]
  },
  {
    "id": "brake",
    "cardTitle": "BRAKE",
    "subtitle": "Real-time sync & presentation controller",
    "head": "assets/project_mian_head/brake.png",
    "badge": null,
    "cardTags": [
      "Flutter",
      "Firebase",
      "FirebaseServer",
      "ASP.NET API",
      "Real-Time"
    ],
    "title": "BRAKE Automotive",
    "description": "BRAKE is a cross-platform presentation and sync tool that enables real-time slide synchronization across mobile and web devices. It is designed for presenters and audiences to enjoy lag-free collaboration and control.\n\n🎛️ Real-Time Slide Sync: Slide transitions made on one device reflect instantly across all connected platforms — mobile and web.\n📱 Cross-Platform Compatibility: Built using Flutter, supporting Android, iOS, and Web from a single codebase.\n🔄 Firebase Integration: Real-time state synchronization for connected users and live interactions.\n🔐 ASP.NET API Backend: Securely handles user auth, session logic, and data transmission.\n🔁 Two-Way Control: Presenters can operate slides from mobile or web devices.\n📶 Multi-Device Login: Simultaneous login from different devices to manage or view sessions.",
    "images": [
      "assets/Brake_images/brake_1.png",
      "assets/Brake_images/brake_2.png",
      "assets/Brake_images/brake_3.png",
      "assets/Brake_images/brake_4.png",
      "assets/Brake_images/brake_5.png",
      "assets/Brake_images/brake_6.png",
      "assets/Brake_images/brake_7.png",
      "assets/Brake_images/brake_8.png",
      "assets/Brake_images/brake_9.png",
      "assets/Brake_images/brake_10.png",
      "assets/Brake_images/brake_11.png",
      "assets/Brake_images/brake_12.png",
      "assets/Brake_images/brake_13.png"
    ],
    "tags": [
      "Flutter",
      "Firebase",
      "ASP.NET API",
      "Firebase Server",
      "Cross-Platform",
      "Real-Time Sync"
    ],
    "features": [
      "Real-time slide sync across devices",
      "Cross-platform app for Android, iOS, and Web",
      "Live updates via Firebase",
      "ASP.NET API for session control",
      "Two-way control: mobile and web",
      "Multi-device simultaneous login",
      "Professional presenter-viewer experience"
    ]
  },
  {
    "id": "buyspy",
    "cardTitle": "BuySpy",
    "subtitle": "Live eBay deal tracker app",
    "head": "assets/project_mian_head/buyspy.png",
    "badge": null,
    "cardTags": [
      "Flutter",
      "eBay API",
      "Firebase",
      "ASP.NET API",
      "FCM"
    ],
    "title": "BuySpy Marketplace",
    "description": "BuySpy is a real-time eCommerce companion app built to track and alert users about active product listings on eBay. Designed with a focus on deal-hunting and user convenience, it brings live sales directly to your device.\n\n🛒 eBay API Integration: Fetches and displays live product listings from eBay in real time, mimicking an eBay-like browsing experience.\n📱 Cross-Platform Flutter App: Deployed for both Android and iOS, ensuring a consistent and smooth interface across devices.\n🔔 Configurable Notification Alerts: Users can choose how frequently they receive notifications — 1, 5, 15, 30 minutes, or 1 hour.\n📡 Firebase Cloud Messaging: Push notifications for product changes or new listings.\n🔐 ASP.NET Backend: Handles API request management, user data processing, and scheduling logic securely and efficiently.\n⚡ Real-Time Tracking: Instantly alerts users to price drops or new deals, keeping them ahead in the competitive buying process.",
    "images": [
      "assets/project_mian_head/buyspy.png"
    ],
    "tags": [
      "Flutter",
      "eBay API",
      "Firebase",
      "ASP.NET API",
      "FCM",
      "Real-Time Tracking"
    ],
    "features": [
      "Real-time price comparison",
      "Deal alerts & notifications",
      "Product review aggregation",
      "Personalized recommendations",
      "Wishlist tracking"
    ]
  },
  {
    "id": "seabee-study",
    "cardTitle": "Seabee Study",
    "subtitle": "Real-time MCQ learning platform",
    "head": "assets/project_mian_head/seabee.png",
    "badge": null,
    "cardTags": [
      "Flutter",
      "Firebase",
      "Real-Time DB",
      "Authentication",
      "Analytics"
    ],
    "title": "Seabee Learning",
    "description": "Seabee Study is an educational mobile app designed for university students to practice and master course-related MCQs in real time. It supports progress tracking, scoring analytics, and tiered access levels for both casual learners and advanced users.\n\n📘 MCQ-Based Learning: Offers a rich bank of university-level multiple-choice questions, divided into Basic and Advanced phases to suit all learners.\n⚡ Real-Time Scoring: Users receive instant feedback and scores upon answering, helping reinforce learning through immediate correction.\n🔥 Firebase Integration:\n– Real-time Database for syncing MCQs, scores, and user progress.\n– Authentication to manage account types (Free vs. Pro).\n📊 Progress Tracking: Displays individual learning analytics, scores, and performance trends to monitor academic improvement.\n🔓 Tiered Access:\n– Free Account: Access to basic MCQs and features.\n– Pro Account: Unlocks advanced question sets, detailed analytics, and priority content updates.",
    "images": [
      "assets/Seabee_Study_images/seabee_1.png",
      "assets/Seabee_Study_images/seabee_2.png",
      "assets/Seabee_Study_images/seabee_3.png",
      "assets/Seabee_Study_images/seabee_4.png",
      "assets/Seabee_Study_images/seabee_5.png",
      "assets/Seabee_Study_images/seabee_6.png",
      "assets/Seabee_Study_images/seabee_7.png",
      "assets/Seabee_Study_images/seabee_8.png",
      "assets/Seabee_Study_images/seabee_9.png",
      "assets/Seabee_Study_images/seabee_10.png",
      "assets/Seabee_Study_images/seabee_11.png",
      "assets/Seabee_Study_images/seabee_12.png",
      "assets/Seabee_Study_images/seabee_13.png",
      "assets/Seabee_Study_images/seabee_14.png",
      "assets/Seabee_Study_images/seabee_15.png"
    ],
    "tags": [
      "Flutter",
      "Firebase",
      "Real-Time DB",
      "Authentication",
      "Analytics",
      "Tiered Access"
    ],
    "features": [
      "Personalized learning paths",
      "Interactive course content",
      "Progress tracking",
      "Certification preparation",
      "Offline access"
    ]
  },
  {
    "id": "carbid",
    "cardTitle": "Carbid",
    "subtitle": "Real-time vehicle auction platform",
    "head": "assets/project_mian_head/carbid.png",
    "badge": null,
    "cardTags": [
      "Flutter",
      "SignalR",
      "ASP.NET API",
      "Localization",
      "Live Chat"
    ],
    "title": "Carbid Marketplace",
    "description": "Carbid is a real-time product auction app designed for a global audience, offering live bidding, real-time chat, and multilingual support to enhance the online buying and selling experience.\n\n🚗 Live Bidding System: Users can bid on products in real time, with instant updates on auction status and pricing.\n💬 Real-Time Communication: Integrated SignalR in Flutter to support live chat and synchronized bidding notifications across devices.\n🔐 ASP.NET API Integration: Manages backend operations including bidding logic, product listings, and user sessions securely and efficiently.\n🌐 Internationalization & Localization:\n– Supports multiple languages and regions, enabling a globally accessible platform.\n– Dynamically adapts text and formats based on the user's locale.\n⚡ Seamless User Experience: Real-time interactivity delivers a smooth and engaging buying/selling environment across all supported countries.",
    "images": [
      "assets/project_mian_head/carbid.png"
    ],
    "tags": [
      "Flutter",
      "ASP.NET API",
      "SignalR",
      "Localization",
      "Real-Time Bidding",
      "Live Chat"
    ],
    "features": [
      "Verified vehicle listings",
      "Financing options",
      "Vehicle history reports",
      "Secure escrow services",
      "AI pricing recommendations"
    ]
  },
  {
    "id": "wedding-planner",
    "cardTitle": "Wedding Planner",
    "subtitle": "Complete wedding organization",
    "head": "assets/project_mian_head/wedding.png",
    "badge": "Popular",
    "cardTags": [
      "Flutter",
      "Firebase",
      "Task Scheduling",
      "Reminders",
      "Collaboration"
    ],
    "title": "Wedding Planner Pro",
    "description": "Wedding Planner is an elegant and intuitive mobile app designed to help users effortlessly organize their weddings. It offers a feature-rich, visually appealing experience that transforms complex planning into a joyful journey.\n\n💍 Flutter-Powered UI: Built with Flutter for a smooth, responsive, and consistent experience across Android and iOS.\n🔥 Firebase Integration:\n– Real-time data management for tasks, guests, budgets, and event timelines.\n– Cloud Messaging to send personalized reminders and updates.\n📅 Smart Task Scheduling: Keeps users on track with important milestones and deadlines using an intuitive planning system.\n🎨 Engaging User Experience: Designed with a clean and romantic UI to make wedding planning enjoyable and stress-free.\n🔔 Reminders & Notifications: Helps users stay organized with timely alerts for meetings, bookings, and important dates.",
    "images": [
      "assets/wedding_planner_images/wedding_1.png",
      "assets/wedding_planner_images/wedding_2.png",
      "assets/wedding_planner_images/wedding_3.png",
      "assets/wedding_planner_images/wedding_4.png",
      "assets/wedding_planner_images/wedding_5.png",
      "assets/wedding_planner_images/wedding_6.png",
      "assets/wedding_planner_images/wedding_7.png",
      "assets/wedding_planner_images/wedding_8.png",
      "assets/wedding_planner_images/wedding_9.png",
      "assets/wedding_planner_images/wedding_10.png",
      "assets/wedding_planner_images/wedding_11.png"
    ],
    "tags": [
      "Flutter",
      "Firebase",
      "Cloud Messaging",
      "Task Scheduling",
      "Reminders",
      "Collaboration"
    ],
    "features": [
      "Budget tracking tools",
      "Vendor management system",
      "Guest list organization",
      "Seating chart creation",
      "Timeline planning"
    ]
  }
];
