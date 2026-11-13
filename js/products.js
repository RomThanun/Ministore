// ==========================================================================
//  ARIYAK STORE - PRODUCTS CATALOG (15 DIGITAL SUBSCRIPTION PRODUCTS)
//  Clean, Modular, Easy to Edit. Change prices, plans, or icons here!
// ==========================================================================

const PRODUCTS = [
    {
        id: 'capcut',
        name: 'CapCut Pro VIP',
        image: 'assets/icons/capcut.svg',
        fallbackIcon: '🎬',
        category: 'creative',
        tag: 'HOT',
        tagClass: 'tag-hot',
        defaultInStock: true,
        desc: {
            km: 'ដោះសោគ្រប់ Effect VIP, AI Auto-Captions, 4K 60FPS គ្មាន Watermark លើ PC និងទូរស័ព្ទ។',
            en: 'Unlock VIP effects, AI Auto-Captions, remove watermarks, and render 4K 60FPS on PC and Mobile.'
        },
        features: {
            km: [
                'ដោះសោគ្រប់ Effect & Template VIP',
                'AI Auto-Captions បម្លែងសំឡេងជាអក្សរស្វ័យប្រវត្តិ',
                'លុប Background ដោយ ១ ចុច (1-Click Remove)',
                'Render វីដេអូកម្រិត 4K 60FPS គ្មាន Watermark'
            ],
            en: [
                'Unlock all VIP effects and premium templates',
                'AI Auto-Captions and speech-to-text',
                '1-Click smart background removal',
                'Export crisp 4K 60FPS without watermark'
            ]
        },
        plans: [
            { labelKm: '១ ខែ (1 Month)', labelEn: '1 Month', priceUsd: 4.50 },
            { labelKm: '៣ ខែ (3 Months)', labelEn: '3 Months', priceUsd: 11.50 },
            { labelKm: '១ ឆ្នាំ (1 Year)', labelEn: '1 Year', priceUsd: 32.00 }
        ]
    },
    {
        id: 'gemini',
        name: 'Gemini Advanced',
        image: 'assets/icons/gemini.svg',
        fallbackIcon: '💎',
        category: 'ai',
        tag: 'NEW',
        tagClass: 'tag-new',
        defaultInStock: true,
        desc: {
            km: 'Gemini 1.5 Pro Context 1M tokens ថែមជូនទំហំ Google One 2TB និងដំណើរការក្នុង Docs/Gmail។',
            en: 'Google top model Gemini 1.5 Pro with 1M context tokens and 2TB Google One cloud storage included.'
        },
        features: {
            km: [
                'Gemini 1.5 Pro Context 1,000,000 tokens',
                'ថែមជូនទំហំផ្ទុក Google One 2TB Cloud Storage',
                'ដំណើរការក្នុង Google Docs, Gmail, Sheets, Drive',
                'វិភាគវីដេអូវែងៗ និងកូដស្មុគស្មាញបានយ៉ាងលឿន'
            ],
            en: [
                'Gemini 1.5 Pro with 1M tokens context window',
                '2TB Google One cloud storage included',
                'Deep integration in Docs, Gmail, Sheets, Drive',
                'Analyze long video footage and complex codebases'
            ]
        },
        plans: [
            { labelKm: '១ ខែ (1 Month)', labelEn: '1 Month', priceUsd: 8.50 },
            { labelKm: '៣ ខែ (3 Months)', labelEn: '3 Months', priceUsd: 22.00 },
            { labelKm: '១ ឆ្នាំ (1 Year)', labelEn: '1 Year', priceUsd: 79.00 }
        ]
    },
    {
        id: 'chatgpt',
        name: 'ChatGPT Plus (GPT-4o)',
        image: 'assets/icons/chatgpt.svg',
        fallbackIcon: '🤖',
        category: 'ai',
        tag: 'HOT',
        tagClass: 'tag-hot',
        defaultInStock: true,
        desc: {
            km: 'ចូលប្រើប្រាស់ GPT-4o, GPT-4 Turbo, DALL·E 3, Advanced Data Analysis និង Custom GPTs គ្មានដែនកំណត់។',
            en: 'Access unlimited GPT-4o, GPT-4 Turbo, DALL·E 3 image generator, Advanced Data Analysis and Custom GPTs.'
        },
        features: {
            km: [
                'GPT-4o & GPT-4 Turbo ឆ្លើយលឿនគ្មានដែនកំណត់',
                'បង្កើតរូបភាពជាមួយ DALL·E 3 កម្រិតច្បាស់បំផុត',
                'វិភាគទិន្នន័យ & ឯកសារ Excel, PDF, Word ស្វ័យប្រវត្តិ',
                'ប្រើប្រាស់ Custom GPTs គ្រប់ប្រភេទក្នុង Store'
            ],
            en: [
                'Fast unlimited GPT-4o & Turbo intelligence',
                'DALL·E 3 ultra-high resolution artwork',
                'Advanced data & spreadsheet analysis',
                'Access thousands of custom GPT plugins'
            ]
        },
        plans: [
            { labelKm: '១ ខែ (1 Month)', labelEn: '1 Month', priceUsd: 9.50 },
            { labelKm: '៣ ខែ (3 Months)', labelEn: '3 Months', priceUsd: 25.00 },
            { labelKm: '១ ឆ្នាំ (1 Year)', labelEn: '1 Year', priceUsd: 89.00 }
        ]
    },
    {
        id: 'claude',
        name: 'Claude Pro (Sonnet 3.5)',
        image: 'assets/icons/claude.svg',
        fallbackIcon: '🧠',
        category: 'ai',
        tag: 'PRO',
        tagClass: 'tag-pro',
        defaultInStock: true,
        desc: {
            km: 'ឆ្លាតវៃបំផុតផ្នែកសរសេរកូដ និងវិភាគស៊ីជម្រៅ ជាមួយ Claude 3.5 Sonnet និងមុខងារ Artifacts។',
            en: 'The #1 AI for coding and reasoning. Includes Claude 3.5 Sonnet, 200K context, and live Artifacts.'
        },
        features: {
            km: [
                'Claude 3.5 Sonnet & Claude 3 Opus ម៉ូដែលកំពូល',
                'Context Window 200,000 tokens ផ្ទុកឯកសារធំៗ',
                'មុខងារ Artifacts មើលកូដ កែកូដ និង UI ភ្លាមៗ',
                'ជំនាញខ្ពស់បំផុតក្នុងការសរសេរ និងវិភាគទិន្នន័យ'
            ],
            en: [
                'Claude 3.5 Sonnet & Opus flagship intelligence',
                '200,000 tokens deep context window',
                'Interactive live Artifacts workspace',
                'Superior human-grade writing and coding'
            ]
        },
        plans: [
            { labelKm: '១ ខែ (1 Month)', labelEn: '1 Month', priceUsd: 9.50 },
            { labelKm: '៣ ខែ (3 Months)', labelEn: '3 Months', priceUsd: 25.00 },
            { labelKm: '១ ឆ្នាំ (1 Year)', labelEn: '1 Year', priceUsd: 89.00 }
        ]
    },
    {
        id: 'canva',
        name: 'Canva Pro',
        image: 'assets/icons/canva.svg',
        fallbackIcon: '🎨',
        category: 'creative',
        tag: 'NEW',
        tagClass: 'tag-new',
        defaultInStock: true,
        desc: {
            km: 'លុប Background, 100M+ រូបភាព/វីដេអូ, Magic Studio AI, ទំហំផ្ទុក Cloud 1TB។',
            en: 'Full Canva Pro account with 100M+ premium assets, Background Remover, and Magic Studio AI.'
        },
        features: {
            km: [
                'លុប Background រូបភាព និងវីដេអូដោយ ១ ចុច',
                'ទាញយក File PNG ថ្លា និង SVG Vector គុណភាពខ្ពស់',
                'Magic Resize ប្តូរទំហំគ្រប់បណ្តាញសង្គមក្នុងមួយវិនាទី',
                'ទំហំផ្ទុក Cloud 1TB រួមជាមួយ Brand Kit ផ្ទាល់ខ្លួន'
            ],
            en: [
                '1-Click photo & video background remover',
                'Transparent PNG & SVG vector download',
                'Magic Resize across all social platforms',
                '1TB cloud storage & complete Brand Kit'
            ]
        },
        plans: [
            { labelKm: '១ ខែ (1 Month)', labelEn: '1 Month', priceUsd: 3.00 },
            { labelKm: '៦ ខែ (6 Months)', labelEn: '6 Months', priceUsd: 8.50 },
            { labelKm: '១ ឆ្នាំ (1 Year)', labelEn: '1 Year', priceUsd: 14.00 }
        ]
    },
    {
        id: 'midjourney',
        name: 'Midjourney v6.1',
        image: 'assets/icons/midjourney.svg',
        fallbackIcon: '🖼️',
        category: 'ai',
        tag: 'PRO',
        tagClass: 'tag-pro',
        defaultInStock: true,
        desc: {
            km: 'បង្កើតរូបភាព AI គុណភាពដូចរូបថតពិតៗ ជាមួយម៉ូដែល v6.1 និង Fast GPU hours មិនបាច់រង់ចាំ។',
            en: 'Generate hyper-realistic AI artwork with Midjourney v6.1 and fast dedicated GPU hours.'
        },
        features: {
            km: [
                'Midjourney v6.1 & Niji Mode រូបតុក្កតា Anime',
                'Fast GPU hours ដំណើរការលឿនមិនបាច់រង់ចាំ',
                'សិទ្ធិប្រើប្រាស់បែបពាណិជ្ជកម្ម (Commercial Use)',
                'មុខងារ Inpaint, Zoom-out, Pan បង្កើតរូបភាពតាមចិត្ត'
            ],
            en: [
                'Latest v6.1 and anime Niji mode styles',
                'Fast GPU processing hours with zero queue',
                'Full commercial rights license',
                'Inpaint, Zoom-out, and Pan generation controls'
            ]
        },
        plans: [
            { labelKm: 'Standard (1 ខែ)', labelEn: 'Standard (1 Mo)', priceUsd: 14.00 },
            { labelKm: 'Pro (1 ខែ)', labelEn: 'Pro (1 Mo)', priceUsd: 28.00 }
        ]
    },
    {
        id: 'cursor',
        name: 'Cursor Pro AI',
        image: 'assets/icons/cursor.svg',
        fallbackIcon: '⚡',
        category: 'dev',
        tag: 'HOT',
        tagClass: 'tag-hot',
        defaultInStock: true,
        desc: {
            km: '500 Fast Requests Claude 3.5 Sonnet, Composer កែកូដច្រើន Files លើ Codebase ទាំងមូល។',
            en: 'AI-first code editor powered by Claude 3.5 Sonnet and GPT-4o with multi-file Composer editing.'
        },
        features: {
            km: [
                '500 Fast Requests Claude 3.5 Sonnet ក្នុងមួយខែ',
                'Composer កែកូដច្រើន Files ដំណាលគ្នាក្នុងគម្រោង',
                'Chat ជាមួយ Codebase ទាំងមូលយល់ដឹងស៊ីជម្រៅ',
                'Terminal AI បញ្ជាកូដស្វ័យប្រវត្តិតាម Terminal'
            ],
            en: [
                '500 monthly fast requests Claude 3.5 Sonnet',
                'Multi-file Composer codebase generation',
                'Full codebase semantic context indexing',
                'Terminal AI natural language command execution'
            ]
        },
        plans: [
            { labelKm: '១ ខែ (1 Month)', labelEn: '1 Month', priceUsd: 9.50 },
            { labelKm: '៣ ខែ (3 Months)', labelEn: '3 Months', priceUsd: 25.00 }
        ]
    },
    {
        id: 'adobe',
        name: 'Adobe Creative Cloud',
        image: 'assets/icons/adobe.svg',
        fallbackIcon: '🅰️',
        category: 'creative',
        tag: 'HOT',
        tagClass: 'tag-hot',
        defaultInStock: true,
        desc: {
            km: 'Photoshop ជាមួយ AI Generative Fill, Premiere Pro, Illustrator, 100GB Cloud។',
            en: 'All Apps suite: Photoshop, Premiere Pro, After Effects, Illustrator with AI Generative Fill.'
        },
        features: {
            km: [
                'Photoshop ជាមួយ AI Generative Fill & Expand',
                'Premiere Pro & After Effects កាត់តវីដេអូកម្រិតខ្ពស់',
                'Adobe Illustrator & InDesign ឌីហ្សាញ Vector',
                'Cloud Storage 100GB + Adobe Fonts រាប់ម៉ឺនពុម្ព'
            ],
            en: [
                'Photoshop with AI Generative Fill & Expand',
                'Premiere Pro & After Effects motion suite',
                'Full vector workflows in Illustrator',
                '100GB Adobe cloud storage + Adobe Fonts access'
            ]
        },
        plans: [
            { labelKm: '១ ខែ (1 Month)', labelEn: '1 Month', priceUsd: 12.00 },
            { labelKm: '៣ ខែ (3 Months)', labelEn: '3 Months', priceUsd: 32.00 },
            { labelKm: '១ ឆ្នាំ (1 Year)', labelEn: '1 Year', priceUsd: 99.00 }
        ]
    },
    {
        id: 'perplexity',
        name: 'Perplexity Pro AI',
        image: 'assets/icons/perplexity.svg',
        fallbackIcon: '🔎',
        category: 'ai',
        tag: 'NEW',
        tagClass: 'tag-new',
        defaultInStock: true,
        desc: {
            km: 'ស្វែងរក Pro Searches គ្មានដែនកំណត់ Real-time ជាមួយ GPT-4o & Claude 3.5 Sonnet។',
            en: 'AI search assistant with real-time web references, GPT-4o, and Claude 3.5 Sonnet reasoning.'
        },
        features: {
            km: [
                'ការស្វែងរក Pro Searches គ្មានដែនកំណត់ប្រចាំថ្ងៃ',
                'ជ្រើសរើស AI Models: GPT-4o ឬ Claude 3.5 Sonnet',
                'អាប់ឡូតឯកសារវិភាគ និងសង្ខេប PDF/Word',
                'ព័ត៌មានថ្មីៗបំផុតពីទូទាំងពិភពលោក Real-time'
            ],
            en: [
                'Unlimited Pro search queries every day',
                'Toggle between GPT-4o and Claude 3.5 Sonnet',
                'Deep document analysis & multi-file upload',
                'Up-to-date real-time citations & academic mode'
            ]
        },
        plans: [
            { labelKm: '១ ខែ (1 Month)', labelEn: '1 Month', priceUsd: 7.50 },
            { labelKm: '៣ ខែ (3 Months)', labelEn: '3 Months', priceUsd: 19.50 },
            { labelKm: '១ ឆ្នាំ (1 Year)', labelEn: '1 Year', priceUsd: 65.00 }
        ]
    },
    {
        id: 'elevenlabs',
        name: 'ElevenLabs Voice AI',
        image: 'assets/icons/elevenlabs.svg',
        fallbackIcon: '🎙️',
        category: 'ai',
        tag: 'PRO',
        tagClass: 'tag-pro',
        defaultInStock: true,
        desc: {
            km: 'Voice Cloning ចម្លងសំឡេងផ្ទាល់ខ្លួន និង Text-to-Speech ២៩ ភាសាដូចមនុស្សពិត។',
            en: 'Lifelike AI voice generator, ultra-realistic voice cloning, and audio dubbing studio.'
        },
        features: {
            km: [
                'Voice Cloning ចម្លងសំឡេងផ្ទាល់ខ្លួនបានយ៉ាងដូចបេះបិទ',
                'Text-to-Speech ច្រើនជាង ២៩ ភាសា សំឡេងធម្មជាតិ',
                'Dubbing Studio បម្លែងសំឡេងវីដេអូជាភាសាផ្សេងៗ',
                'ទទួលបាន 100,000 characters ក្នុងមួយខែ'
            ],
            en: [
                'Instant lifelike voice cloning technology',
                'Text-to-speech in 29+ natural languages',
                'Automated multi-language video dubbing studio',
                '100,000 characters included monthly'
            ]
        },
        plans: [
            { labelKm: '១ ខែ (1 Month)', labelEn: '1 Month', priceUsd: 6.50 },
            { labelKm: '៣ ខែ (3 Months)', labelEn: '3 Months', priceUsd: 17.50 }
        ]
    },
    {
        id: 'copilot',
        name: 'GitHub Copilot',
        image: 'assets/icons/copilot.svg',
        fallbackIcon: '🐙',
        category: 'dev',
        tag: 'NEW',
        tagClass: 'tag-new',
        defaultInStock: true,
        desc: {
            km: 'Autocomplete កូដក្នុង VS Code, Copilot Chat ឆ្លើយសំនួរ, ស្វែងរក Bug ស្វ័យប្រវត្តិ។',
            en: 'AI pair programmer in VS Code and JetBrains. Real-time auto-completion and Copilot Chat.'
        },
        features: {
            km: [
                'Autocomplete កូដពេលកំពុងវាយយ៉ាងលឿន',
                'Copilot Chat សួរដេញដោល និងពន្យល់កូដក្នុង IDE',
                'ស្វែងរក Bug និងបង្កើត Unit Test ដោយស្វ័យប្រវត្តិ',
                'គាំទ្រគ្រប់ភាសាកូដ: Python, JS, TypeScript, C++...'
            ],
            en: [
                'Real-time predictive code autocompletion',
                'In-editor Copilot Chat and refactoring',
                'Auto-generate tests and bug fixes',
                'Supports all major programming languages'
            ]
        },
        plans: [
            { labelKm: '១ ខែ (1 Month)', labelEn: '1 Month', priceUsd: 5.50 },
            { labelKm: '១ ឆ្នាំ (1 Year)', labelEn: '1 Year', priceUsd: 48.00 }
        ]
    },
    {
        id: 'youtube',
        name: 'YouTube Premium',
        image: 'assets/icons/youtube.svg',
        fallbackIcon: '▶️',
        category: 'media',
        tag: 'PRO',
        tagClass: 'tag-pro',
        defaultInStock: true,
        desc: {
            km: 'គ្មានពាណិជ្ជកម្ម ១០០%, ចាក់សំឡេងពេលបិទអេក្រង់, រួមបញ្ចូល YouTube Music។',
            en: 'Ad-free YouTube, background playback with screen locked, offline downloads, and YouTube Music.'
        },
        features: {
            km: [
                'គ្មានពាណិជ្ជកម្ម ១០០% (No Ads) លើគ្រប់ឧបករណ៍',
                'ចាក់សំឡេងពេលបិទអេក្រង់ទូរស័ព្ទ (Background Play)',
                'Download វីដេអូមើលពេលគ្មាន Internet Offline',
                'រួមបញ្ចូល YouTube Music Premium មិនគិតថ្លៃបន្ថែម'
            ],
            en: [
                '100% ad-free experience across all devices',
                'Background playback when screen is locked',
                'Offline high-definition video downloads',
                'Full YouTube Music Premium catalog included'
            ]
        },
        plans: [
            { labelKm: '១ ខែ (1 Month)', labelEn: '1 Month', priceUsd: 2.00 },
            { labelKm: '៣ ខែ (3 Months)', labelEn: '3 Months', priceUsd: 5.50 },
            { labelKm: '១ ឆ្នាំ (1 Year)', labelEn: '1 Year', priceUsd: 18.00 }
        ]
    },
    {
        id: 'netflix',
        name: 'Netflix Premium 4K',
        image: 'assets/icons/netflix.svg',
        fallbackIcon: '🍿',
        category: 'media',
        tag: 'HOT',
        tagClass: 'tag-hot',
        defaultInStock: true,
        desc: {
            km: '4K Ultra HD + HDR, Dolby Atmos, Profile ផ្ទាល់ខ្លួន មានលេខកូដសម្ងាត់។',
            en: 'Watch movies in 4K Ultra HD + HDR with dedicated profile and uninterrupted streaming.'
        },
        features: {
            km: [
                'រូបភាពច្បាស់កម្រិត 4K Ultra HD + HDR ភ្លឺច្បាស់',
                'សំឡេងពិរោះរណ្តំ Dolby Atmos Spatial Audio',
                'Profile ផ្ទាល់ខ្លួន មានលេខកូដសម្ងាត់ការពារ (Private PIN)',
                'ទស្សនាបានលើ Smart TV, ទូរស័ព្ទ, Tablet, PC'
            ],
            en: [
                'Ultra-crisp 4K Ultra HD + HDR video',
                'Dolby Atmos cinematic spatial sound',
                'Dedicated private profile with PIN lock',
                'Compatible with TV, Mobile, Tablet, PC'
            ]
        },
        plans: [
            { labelKm: '១ ខែ (1 Month)', labelEn: '1 Month', priceUsd: 3.50 },
            { labelKm: '៣ ខែ (3 Months)', labelEn: '3 Months', priceUsd: 9.50 },
            { labelKm: '១ ឆ្នាំ (1 Year)', labelEn: '1 Year', priceUsd: 34.00 }
        ]
    },
    {
        id: 'spotify',
        name: 'Spotify Premium',
        image: 'assets/icons/spotify.svg',
        fallbackIcon: '🎵',
        category: 'media',
        tag: 'HOT',
        tagClass: 'tag-hot',
        defaultInStock: true,
        desc: {
            km: 'ស្តាប់ចម្រៀងមិនកំណត់ គ្មានពាណិជ្ជកម្ម សំឡេងកម្រិតខ្ពស់ HiFi, ទាញយក Offline។',
            en: 'Listen to unlimited ad-free music with high audio fidelity and offline listening mode.'
        },
        features: {
            km: [
                'គ្មានពាណិជ្ជកម្មកាត់ផ្តាច់អារម្មណ៍',
                'ទាញយកស្តាប់ Offline ពេលគ្មានអ៊ីនធឺណិត',
                'គុណភាពសំឡេងខ្ពស់បំផុត 320kbps HiFi Audio',
                'ប្តូរចម្រៀងបានតាមចិត្តគ្មានកម្រិត (Unlimited Skips)'
            ],
            en: [
                '100% ad-free uninterrupted music streaming',
                'Download music for offline listening',
                'Very high 320kbps audio fidelity',
                'Unlimited song skips & Spotify AI DJ'
            ]
        },
        plans: [
            { labelKm: '១ ខែ (1 Month)', labelEn: '1 Month', priceUsd: 1.80 },
            { labelKm: '៣ ខែ (3 Months)', labelEn: '3 Months', priceUsd: 4.80 },
            { labelKm: '១ ឆ្នាំ (1 Year)', labelEn: '1 Year', priceUsd: 16.00 }
        ]
    },
    {
        id: 'nordvpn',
        name: 'NordVPN Premium',
        image: 'assets/icons/nordvpn.svg',
        fallbackIcon: '🛡️',
        category: 'dev',
        tag: 'PRO',
        tagClass: 'tag-pro',
        defaultInStock: true,
        desc: {
            km: 'ម៉ាស៊ីនបម្រើ 6000+ ក្នុង 60+ ប្រទេស, No-Log Policy, Threat Protection ការពារមេរោគ។',
            en: 'Fast and secure VPN with 6000+ servers in 60+ countries and strict no-log policy.'
        },
        features: {
            km: [
                'ម៉ាស៊ីនបម្រើល្បឿនលឿន 6000+ ក្នុង 60+ ប្រទេស',
                'គោលការណ៍ No-Log Policy ធានាសុវត្ថិភាពទិន្នន័យ ១០០%',
                'Threat Protection ការពារមេរោគ និងការលួចទិន្នន័យ',
                'ប្រើប្រាស់បាន 6 ឧបករណ៍ដំណាលគ្នាលើ PC/Phone'
            ],
            en: [
                '6,000+ ultra-fast servers across 60+ nations',
                'Strict verified no-logs privacy policy',
                'Built-in Threat Protection against malware',
                'Connect up to 6 devices simultaneously'
            ]
        },
        plans: [
            { labelKm: '១ ខែ (1 Month)', labelEn: '1 Month', priceUsd: 2.50 },
            { labelKm: '១ ឆ្នាំ (1 Year)', labelEn: '1 Year', priceUsd: 22.00 }
        ]
    }
];