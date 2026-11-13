# 🚀 Ariyak Store - Telegram Mini App

កម្មវិធី **Telegram Mini App (TMA)** ទំនើបកម្រិតខ្ពស់សម្រាប់លក់គណនីឌីជីថល (AI & Creative Subscriptions) ភ្ជាប់ដោយស្វ័យប្រវត្តិជាមួយ **ABA Mobile / Bakong KHQR** តាមតម្លៃជាក់ស្តែង និងរូបតំណាង Brand Logo ពិតៗ (SVG/Image)។

---

## 📌 មាតិកាសំខាន់ៗដែលបានធ្វើបច្ចុប្បន្នភាព (Key Updates)

1. **Admin Telegram Link**: ភ្ជាប់ទៅកាន់ `https://web.telegram.org/k/` ឬ Telegram Username របស់អ្នកដោយស្វ័យប្រវត្តិ។
2. **ABA Mobile & KHQR Auto Price**: ស្កេន ឬចុចប៊ូតុង **"📲 បើក ABA Mobile ទូទាត់"** នោះ App ធនាគារ ABA នឹងលោតឡើងជាមួយតម្លៃទំនិញជាក់ស្តែងដោយស្វ័យប្រវត្តិ (មិនបាច់វាយបញ្ចូលតម្លៃដោយដៃឡើយ)។
3. **Product Brand Icons (SVG)**: បានប្តូរពី Emoji ទៅជារូបភាព Logo Brand ពិតៗ (Gemini, CapCut, ChatGPT, Claude, Canva, Midjourney, Cursor, Adobe...) នៅក្នុង Folder `assets/icons/`។
4. **កូដស្អាត ងាយស្រួលមើល និងកែសម្រួល (Clean & Modular Code)**: បំបែកឯកសារច្បាស់លាស់ ងាយស្រួលកែតម្លៃ គណនី និងរូបភាព។
5. **ការណែនាំធ្វើ Link Public ដាក់លក់លើ Telegram**: ការណែនាំមួយជំហានម្តងៗជាមួយ GitHub Pages, Cloudflare Pages និង @BotFather។

---

## 📁 រចនាសម្ព័ន្ធឯកសារ (Project Structure)

```text
ariyak_store/
│
├── index.html              # ទំព័រ HTML មេ (UI Layout, Pages, Header, Bottom Nav, Modals)
│
├── assets/
│   └── icons/              # រូបភាព Logo Brands ពិតៗកម្រិតច្បាស់ (Vector SVG)
│       ├── capcut.svg      # Logo CapCut Pro
│       ├── gemini.svg      # Logo Google Gemini
│       ├── chatgpt.svg     # Logo OpenAI ChatGPT
│       ├── claude.svg      # Logo Claude AI
│       ├── canva.svg       # Logo Canva Pro
│       ├── midjourney.svg  # Logo Midjourney
│       ├── cursor.svg      # Logo Cursor AI
│       ├── adobe.svg       # Logo Adobe Creative Cloud
│       ├── perplexity.svg  # Logo Perplexity Pro
│       ├── elevenlabs.svg  # Logo ElevenLabs Voice
│       ├── copilot.svg     # Logo GitHub Copilot
│       ├── youtube.svg     # Logo YouTube Premium
│       ├── netflix.svg     # Logo Netflix 4K
│       ├── spotify.svg     # Logo Spotify Premium
│       └── nordvpn.svg     # Logo NordVPN
│
├── css/
│   └── style.css           # ស្ទីល Dark Cyberpunk, Responsive Mobile, ប៊ូតុង ABA Pay
│
├── js/
│   ├── products.js         # បញ្ជីទំនិញទាំង ១៥ មុខ (តម្លៃ, រយៈពេល, រូបភាព Logo, Features)
│   ├── khqr.js             # កូដបង្កើត KHQR EMVCo និង Deep Link ទៅកាន់ ABA Mobile
│   ├── i18n.js             # អក្សរភាសាខ្មែរ និង English
│   └── app.js              # State មេ, Telegram SDK, Order Logic, ការកំណត់ Admin & ABA
│
├── bot.js                  # Telegram Bot Server (ឆ្លើយតប /start និងបើក Mini App)
└── README.md               # សៀវភៅណែនាំលម្អិត
```

---

## 🤖 ការតភ្ជាប់ជាមួយ Telegram Bot (`9174197595:AAFy9sSS8DiGEjVwJee2OTAHdP45bsDVJIE`)

Bot Token របស់អ្នកត្រូវបានបញ្ចូលក្នុងប្រព័ន្ធដោយស្វ័យប្រវត្តិ៖
1. **ផ្ញើសារ Alert ពេលមាន Order ថ្មី**: រាល់ពេលអតិថិជនចុចទិញ ឬទូទាត់ជោគជ័យ ប្រព័ន្ធនឹងផ្ញើសារលម្អិត (ឈ្មោះទំនិញ, តម្លៃ, Order Ref, ឈ្មោះអតិថិជន) ទៅកាន់ Telegram របស់អ្នកភ្លាមៗ!
2. **របៀបកំណត់ Chat ID ដើម្បីទទួល Order**:
   - បើក App -> ចូលទំព័រ **Settings**
   - ត្រង់ផ្នែក **"Telegram Bot Notifications"** ចុចប៊ូតុង **"🔍 Auto-Detect"**
   - *(ចំណាំ៖ ត្រូវប្រាកដថាអ្នកបានបើក Telegram ហើយផ្ញើសារ `/start` ទៅកាន់ Bot របស់អ្នករួចរាល់)*
   - ចុចប៊ូតុង **"🚀 តេស្តផ្ញើសារ (Test)"** ដើម្បីតេស្តសាកល្បង!
3. **ដំណើរការ Bot Standalone (Optional)**:
   - ប្រសិនបើអ្នកចង់ដំណើរការ Bot លើ Server/Computer របស់អ្នក គ្រាន់តែវាយពាក្យបញ្ជា៖
     ```bash
     node bot.js
     ```
   - វានឹងដំណើរការ Bot ដោយស្វ័យប្រវត្តិ មិនត្រូវការ install library បន្ថែមឡើយ (Zero-dependency pure Node.js)។

---

## 💳 ចម្លើយ៖ ឯកសារសម្រាប់កែតម្លៃ និងប្រព័ន្ធទូទាត់ ABA Pay ស្វ័យប្រវត្តិ

### ១. ចង់កែប្រែតម្លៃទំនិញ (Change Product Price)
👉 **ឯកសារត្រូវកែ**: `js/products.js`  
- ក្នុង File នេះ រាល់ទំនិញនីមួយៗមាន `plans` និង `priceUsd` ដូចជា៖
  ```javascript
  plans: [
      { labelKm: '១ ខែ (1 Month)', labelEn: '1 Month', priceUsd: 4.50 },
      { labelKm: '៣ ខែ (3 Months)', labelEn: '3 Months', priceUsd: 11.50 },
      { labelKm: '១ ឆ្នាំ (1 Year)', labelEn: '1 Year', priceUsd: 32.00 }
  ]
  ```
- នៅពេលអ្នកកែលេខ `priceUsd` (ឧទាហរណ៍ពី `4.50` ទៅ `5.00`) នោះ QR Code និងប៊ូតុង **ABA Mobile Pay** នឹងគណនាតម្លៃ `$5.00` ដោយស្វ័យប្រវត្តិតាមនោះភ្លាម!

---

### ២. ចង់កែគណនីទទួលលុយ ABA / Bakong ឬ Admin Telegram
អ្នកអាចកែបាន **២ វិធីយ៉ាងងាយស្រួល**:

#### វិធីទី ១ (កែតាមអេក្រង់ App ផ្ទាល់ - ស្រួលបំផុត):
1. បើក App រួចចុចលើ Menu **"Settings" (ការកំណត់)** នៅខាងក្រោម។
2. ត្រង់កន្លែង **"គណនីទូទាត់ និង Admin (Store Payment & Tele Config)"**:
   - **Admin Telegram URL**: ដាក់ Link ឬ Username Telegram របស់អ្នក (ឧ. `https://web.telegram.org/k/` ឬ `https://t.me/YourUsername`)
   - **Bakong ID / Phone**: ដាក់លេខទូរស័ព្ទគណនី Bakong ឬ ABA របស់អ្នក (ឧ. `081234567` ឬ `yourname@aba`)
   - **Custom ABA PayWay Link (បើមាន)**: អាចដាក់ Link PayWay ផ្ទាល់ខ្លួន
   - **Custom Static QR (បើមាន)**: អាចដាក់ Link រូបភាព QR ផ្ទាល់ខ្លួន
3. ចុចប៊ូតុង **"💾 រក្សាទុកការកំណត់ (Save Settings)"** ជាការស្រេច!

#### វិធីទី ២ (កែក្នុងកូដ):
👉 **ឯកសារត្រូវកែ**: `js/app.js` (នៅជួរទី 9-20 ខាងលើបង្អស់):
```javascript
const STORE_CONFIG = {
    adminTelegramLink: 'https://web.telegram.org/k/',  // Link Telegram របស់អ្នក
    bakongId: 'ariyak_store@aclb',                    // លេខ ABA / Bakong របស់អ្នក
    merchantName: 'ARIYAK STORE'                      // ឈ្មោះហាងរបស់អ្នកក្នុង ABA
};
```

---

### ៣. ដំណើរការ ABA Pay ស្វ័យប្រវត្តិតាមតម្លៃទំនិញ
- **របៀបដែល QR ស្គាល់តម្លៃស្វ័យប្រវត្តិ**: `js/khqr.js` ប្រើប្រាស់ស្តង់ដារ **EMVCo NBC KHQR** ដោយបង្កប់ Tag 54 (Amount: តម្លៃជាក់ស្តែង) និង Tag 29 (Merchant Info)។
- **ពេលអតិថិជនចុច "📲 បើក ABA Mobile ទូទាត់"**:
  - ប្រព័ន្ធនឹងបើកកម្មវិធី **ABA Mobile** ដោយផ្ទាល់តាមរយៈ Deep Link `aba://payment?qrcode=...`។
  - ប្រសិនបើបើកមិនបាន អតិថិជនគ្រាន់តែចុចប៊ូតុង **"📥 រក្សាទុករូបភាព QR ទុកស្កេន"** រួចចូល ABA Mobile -> Scan -> Album រូបភាព ជាការស្រេច។

---

## 🎨 របៀបប្តូរ ឬបន្ថែមរូបភាព Icon ទំនិញ (Change Brand Icons)

រាល់ Icon ទាំងអស់ត្រូវបានរក្សាទុកក្នុង Folder `assets/icons/`:
- `assets/icons/capcut.svg`
- `assets/icons/gemini.svg`
- `assets/icons/chatgpt.svg`
- ...

បើអ្នកចង់ប្តូររូបថ្មី៖
1. ចម្លងរូបភាព Logo របស់អ្នក (ជា `.svg`, `.png` ឬ `.webp`) ដាក់ចូលក្នុង `assets/icons/`
2. បើក `js/products.js` រួចកែត្រង់ `image: 'assets/icons/ឈ្មោះរូបរបស់អ្នក.png'`

---

## 🌐 របៀបបង្កើត Public Link ដើម្បីដាក់លក់លើ Telegram (Step-by-Step)

ដើម្បីអាចភ្ជាប់ជាមួយ Telegram Mini App បាន អ្នកត្រូវមាន Public Link (HTTPS) ជាមុនសិន។ ខាងក្រោមនេះជាវិធីឥតគិតថ្លៃ ១០០% និងងាយស្រួលបំផុត៖

### វិធីទី ១៖ ប្រើប្រាស់ GitHub Pages (ឥតគិតថ្លៃ & ប្រើបានរហូត)
1. បង្កើតគណនីលើ [github.com](https://github.com) រួចបង្កើត Repository ថ្មីមួយ (ឧ. `ariyak_store`)។
2. Upload ឯកសារទាំងអស់នៃ Folder `ariyak_store` នេះចូលទៅក្នុង GitHub Repository នោះ។
3. ចូលទៅកាន់ **Settings** ក្នុង Repository -> ជ្រើសរើស **Pages** (នៅខាងឆ្វេង)។
4. ត្រង់ **Branch** ជ្រើសរើសយក `main` (ឬ `master`) រួចចុច **Save**។
5. រង់ចាំប្រហែល ១ នាទី អ្នកនឹងទទួលបាន Public Link ដូចជា:  
   `https://yourusername.github.io/ariyak_store/`

---

### វិធីទី ២៖ ប្រើប្រាស់ Cloudflare Pages ឬ Vercel (អូសដាក់ ៣០ វិនាទី)
1. ចូលទៅកាន់ [pages.cloudflare.com](https://pages.cloudflare.com) ឬ [vercel.com](https://vercel.com)
2. ចុច "Upload Assets" ឬ "Deploy Project" រួចអូស Folder `ariyak_store` ទាំងមូលទម្លាក់ចូល។
3. អ្នកនឹងទទួលបាន Public Link ភ្លាមៗ (ឧ. `https://ariyak-store.pages.dev`)។

---

### 🤖 របៀបភ្ជាប់ Link ទៅក្នុង Telegram Bot ជាមួយ @BotFather

នៅពេលអ្នកមាន Public Link រួចរាល់ សូមធ្វើតាមជំហាននេះលើ Telegram៖

1. បើក Telegram រួចស្វែងរក **@BotFather**
2. ផ្ញើពាក្យបញ្ជា `/newbot`
   - ដាក់ឈ្មោះ Bot (ឧ. `Ariyak Store`)
   - ដាក់ Username Bot (ឧ. `AriyakOfficialBot`)
   - BotFather នឹងផ្តល់ Bot Token ជូនអ្នក។
3. បង្កើត Telegram Mini App ដោយផ្ញើពាក្យបញ្ជា `/newapp` ទៅកាន់ @BotFather:
   - ជ្រើសរើស Bot ដែលទើបតែបង្កើត
   - បញ្ចូល Title: `Ariyak Store`
   - បញ្ចូល Description: `Premium AI & Creative Accounts Store`
   - ផ្ញើរូបភាពទំហំ 640x360 pixels មួយសន្លឹក
   - **បញ្ចូល Public Link របស់អ្នក** (ឧ. `https://yourusername.github.io/ariyak_store/`)
   - ជ្រើសរើស Short Name (ឧ. `shop`)
4. កំណត់ប៊ូតុង Menu ក្នុង Telegram Chat ដោយផ្ញើ `/setmenubutton` ទៅកាន់ @BotFather:
   - ជ្រើសរើស Bot របស់អ្នក
   - វាយអក្សរប៊ូតុង: `🛍️ Open Store`
   - ដាក់ Public Link របស់អ្នក!
5. **រួចរាល់!** ឥឡូវនេះរាល់ពេលអតិថិជនចុចលើ Bot របស់អ្នក ពួកគេនឹងឃើញប៊ូតុង "🛍️ Open Store" បើកឡើងជាផ្ទាំង Telegram Mini App យ៉ាងស្រស់ស្អាតភ្លាមៗ!