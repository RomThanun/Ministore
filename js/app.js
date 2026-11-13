// ==========================================================================
//  ARIYAK STORE - MAIN APPLICATION CONTROLLER (app.js)
//  Fully Integrated with Telegram Mini App & Automatic ABA Pay / KHQR
// ==========================================================================

// ==========================================================================
//  1. STORE & ADMIN CONFIGURATION (EDIT ADMIN TELEGRAM & ABA HERE)
// ==========================================================================
const STORE_CONFIG = {
    // 1. Telegram Bot Token provided by owner
    botToken: localStorage.getItem('ariyak_bot_token') || '9174197595:AAFy9sSS8DiGEjVwJee2OTAHdP45bsDVJIE',
    adminChatId: localStorage.getItem('ariyak_admin_chat_id') || '',
    botUsername: localStorage.getItem('ariyak_bot_username') || '',

    // 2. Admin Telegram Link (Requirement 1: https://web.telegram.org/k/)
    adminTelegramLink: localStorage.getItem('ariyak_admin_tele') || 'https://web.telegram.org/k/',
    adminTelegramUsername: '@RomThanun',

    // 3. ABA Bank / Bakong Merchant ID (Requirement 2: Automatic price & payment)
    bakongId: localStorage.getItem('ariyak_bakong_id') || 'ariyak_store@aclb',
    merchantName: localStorage.getItem('ariyak_merchant_name') || 'ARIYAK STORE',

    // 4. Optional: Custom ABA PayWay Link or Custom QR Image URL
    abaPayLink: localStorage.getItem('ariyak_aba_pay_link') || '',
    customQrImageUrl: localStorage.getItem('ariyak_custom_qr_url') || ''
};

// Safe Language Resolution (Khmer or English)
let safeLang = localStorage.getItem('ariyak_lang');
if (safeLang !== 'km' && safeLang !== 'en') {
    safeLang = 'km';
    localStorage.setItem('ariyak_lang', 'km');
}

// Safe Currency Resolution (USD or KHR)
let safeCurrency = localStorage.getItem('ariyak_currency');
if (safeCurrency !== 'USD' && safeCurrency !== 'KHR') {
    safeCurrency = 'USD';
    localStorage.setItem('ariyak_currency', 'USD');
}

// Global Application State
let appState = {
    lang: safeLang,
    currency: safeCurrency,
    currentCategory: 'all',
    filterInStockOnly: false,
    activeProduct: null,
    selectedPlanIndex: 0,
    timerInterval: null,
    currentQrPayload: '',
    currentOrderRef: ''
};

// Saved Orders from LocalStorage
let orderHistory = [];
try {
    orderHistory = JSON.parse(localStorage.getItem('ariyak_orders') || '[]');
} catch(e) {
    orderHistory = [];
}

// Stock Overrides (Persisted in LocalStorage)
let savedStock = {};
try {
    savedStock = JSON.parse(localStorage.getItem('ariyak_stock_overrides') || '{}');
} catch(e) {
    savedStock = {};
}

// Check if a product is in stock
function isProductInStock(productId) {
    if (savedStock && savedStock.hasOwnProperty(productId)) {
        return savedStock[productId];
    }
    const p = PRODUCTS.find(item => item.id === productId);
    return p ? p.defaultInStock : true;
}

// Toggle product stock state (From Settings page)
function toggleProductStock(productId) {
    const current = isProductInStock(productId);
    savedStock[productId] = !current;
    localStorage.setItem('ariyak_stock_overrides', JSON.stringify(savedStock));

    renderProductsList();
    renderStockManagementList();

    const p = PRODUCTS.find(item => item.id === productId);
    const statusName = savedStock[productId] ? 'In Stock (មានក្នុងស្តុក)' : 'Out of Stock (អស់ស្តុក)';
    showToast(`${p ? p.name : productId}: ${statusName}`);

    if (window.Telegram?.WebApp?.HapticFeedback) {
        Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    }
}

// Format Price based on active Currency
function formatPrice(amountUsd) {
    if (appState.currency === 'KHR') {
        const khr = Math.round(amountUsd * KHR_RATE);
        return `${khr.toLocaleString()} ៛`;
    }
    return `$${amountUsd.toFixed(2)}`;
}

// ==========================================================================
//  2. PRODUCTS CATALOG RENDERING & FILTERING
// ==========================================================================
function renderProductsList() {
    try {
        const grid = document.getElementById('productsGrid');
        if (!grid) return;

        const searchInput = document.getElementById('searchInput');
        const searchVal = searchInput ? searchInput.value.trim().toLowerCase() : '';
        const lang = appState.lang || 'km';

        const filtered = PRODUCTS.filter(p => {
            const matchesCat = appState.currentCategory === 'all' || p.category === appState.currentCategory;
            const descText = (p.desc && p.desc[lang]) ? p.desc[lang].toLowerCase() : (p.desc && p.desc.km ? p.desc.km.toLowerCase() : '');
            const nameText = p.name.toLowerCase();
            const matchesSearch = !searchVal || nameText.includes(searchVal) || descText.includes(searchVal);
            const inStock = isProductInStock(p.id);
            const matchesStockFilter = !appState.filterInStockOnly || inStock;

            return matchesCat && matchesSearch && matchesStockFilter;
        });

        const counterEl = document.getElementById('itemCounter');
        if (counterEl) {
            counterEl.textContent = `${filtered.length} items`;
        }

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px 10px; color: var(--text-muted);">
                    <div style="font-size: 40px; margin-bottom: 8px;">🔍</div>
                    <p>${lang === 'km' ? 'រកមិនឃើញទំនិញទេ' : 'No products found'}</p>
                </div>
            `;
            return;
        }

        const dictionary = i18n[lang] || i18n.km;

        grid.innerHTML = filtered.map(p => {
            const basePrice = p.plans[0].priceUsd;
            const inStock = isProductInStock(p.id);
            const desc = (p.desc && p.desc[lang]) ? p.desc[lang] : p.desc.km;

            const stockPillHtml = inStock
                ? `<span class="stock-status-pill stock-in"><span class="status-dot-sm"></span><span class="stock-label-text">${dictionary.inStockLabel}</span></span>`
                : `<span class="stock-status-pill stock-out"><span class="status-dot-sm"></span><span class="stock-label-text">${dictionary.outStockLabel}</span></span>`;

            const actionBtnHtml = inStock
                ? `<button class="buy-mini-btn">${dictionary.buyNow}</button>`
                : `<button class="buy-mini-btn btn-out-stock" disabled>${dictionary.soldOut}</button>`;

            return `
                <div class="product-card ${!inStock ? 'card-out-stock' : ''}" onclick="openProductModal('${p.id}')">
                    <div class="card-header-icon">
                        <div class="prod-icon-box">
                            <img src="${p.image}" class="prod-brand-icon" alt="${p.name}" loading="lazy">
                        </div>
                        <span class="prod-tag ${p.tagClass}">${p.tag}</span>
                    </div>
                    <div>
                        ${stockPillHtml}
                        <div class="prod-title">${p.name}</div>
                        <div class="prod-snippet">${desc}</div>
                    </div>
                    <div class="card-footer-price">
                        <div class="price-stack">
                            <span class="price-starting">${dictionary.startingAt}</span>
                            <span class="price-figure">${formatPrice(basePrice)}</span>
                        </div>
                        ${actionBtnHtml}
                    </div>
                </div>
            `;
        }).join('');
    } catch(e) {
        console.error("renderProductsList error:", e);
    }
}

function filterProducts() {
    renderProductsList();
}

function toggleInStockFilter() {
    appState.filterInStockOnly = !appState.filterInStockOnly;
    const btn = document.getElementById('inStockFilterBtn');
    if (btn) {
        if (appState.filterInStockOnly) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    }
    renderProductsList();
}

function selectCategory(cat, btn) {
    document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
    if (btn) btn.classList.add('active');
    appState.currentCategory = cat;
    renderProductsList();
}

// ==========================================================================
//  3. UNIFIED MODAL: DETAILS + INSTANT KHQR + ABA PAY AUTO-JOIN
// ==========================================================================
function openProductModal(productId) {
    appState.activeProduct = PRODUCTS.find(p => p.id === productId);
    if (!appState.activeProduct) return;
    appState.selectedPlanIndex = 0;

    const p = appState.activeProduct;
    const lang = appState.lang || 'km';
    const dictionary = i18n[lang] || i18n.km;
    const inStock = isProductInStock(p.id);

    // Populate Details with Brand Icon
    const modalIconBox = document.getElementById('modalProductIcon');
    modalIconBox.innerHTML = `<img src="${p.image}" class="prod-brand-icon" alt="${p.name}">`;

    document.getElementById('modalProductName').textContent = p.name;
    document.getElementById('modalProductBadge').textContent = p.tag;
    document.getElementById('modalProductBadge').className = `prod-tag ${p.tagClass}`;

    const stockEl = document.getElementById('modalProductStock');
    stockEl.className = `stock-status-pill ${inStock ? 'stock-in' : 'stock-out'}`;
    stockEl.innerHTML = `<span class="status-dot-sm"></span><span class="stock-text">${inStock ? dictionary.inStockLabel : dictionary.outStockLabel}</span>`;

    document.getElementById('modalProductDesc').textContent = (p.desc && p.desc[lang]) ? p.desc[lang] : p.desc.km;

    // Features List
    const featuresUl = document.getElementById('modalProductFeatures');
    const feats = (p.features && p.features[lang]) ? p.features[lang] : p.features.km;
    featuresUl.innerHTML = feats.map(f => `<li>${f}</li>`).join('');

    // Generate Unique Order Reference
    appState.currentOrderRef = '#AK-' + Math.floor(1000 + Math.random() * 9000);
    document.getElementById('displayOrderRef').textContent = appState.currentOrderRef;
    document.getElementById('displayBakongId').textContent = STORE_CONFIG.bakongId;

    // Render Plans & Dynamic QR
    renderModalPlans();
    updateModalQR();

    // 15-Minute Countdown Timer
    startCountdownTimer(15 * 60);

    openModal('productModal');

    // Telegram BackButton support
    if (window.Telegram?.WebApp?.BackButton) {
        Telegram.WebApp.BackButton.show();
        Telegram.WebApp.BackButton.onClick(() => {
            closeModal('productModal');
            Telegram.WebApp.BackButton.hide();
        });
    }

    if (window.Telegram?.WebApp?.HapticFeedback) {
        Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    }
}

function renderModalPlans() {
    const p = appState.activeProduct;
    const lang = appState.lang || 'km';
    const plansDiv = document.getElementById('modalPlansList');

    plansDiv.innerHTML = p.plans.map((plan, idx) => {
        const isSelected = idx === appState.selectedPlanIndex;
        const label = lang === 'km' ? plan.labelKm : plan.labelEn;
        return `
            <div class="plan-box ${isSelected ? 'selected' : ''}" onclick="pickPlan(${idx})">
                <div class="plan-box-title">${label}</div>
                <div class="plan-box-price">${formatPrice(plan.priceUsd)}</div>
            </div>
        `;
    }).join('');
}

function pickPlan(idx) {
    appState.selectedPlanIndex = idx;
    renderModalPlans();
    updateModalQR();
    if (window.Telegram?.WebApp?.HapticFeedback) {
        Telegram.WebApp.HapticFeedback.selectionChanged();
    }
}

// Generate & Update Live Exact KHQR with dynamic price
function updateModalQR() {
    const p = appState.activeProduct;
    if (!p) return;
    const inStock = isProductInStock(p.id);
    const qrSection = document.getElementById('modalQRSection');
    const outStockBanner = document.getElementById('modalOutStockBanner');

    if (!inStock) {
        if (qrSection) qrSection.style.display = 'none';
        if (outStockBanner) outStockBanner.style.display = 'block';
        return;
    }

    if (qrSection) qrSection.style.display = 'block';
    if (outStockBanner) outStockBanner.style.display = 'none';

    const plan = p.plans[appState.selectedPlanIndex];
    const lang = appState.lang || 'km';
    const planLabel = lang === 'km' ? plan.labelKm : plan.labelEn;

    document.getElementById('qrPlanSubtitle').textContent = `${p.name} • ${planLabel}`;

    const exactUsd = plan.priceUsd;
    const exactKhr = Math.round(exactUsd * KHR_RATE);

    if (appState.currency === 'USD') {
        document.getElementById('qrExactAmountDisplay').textContent = `$${exactUsd.toFixed(2)}`;
        document.getElementById('qrDualCurrencyDisplay').textContent = `≈ ${exactKhr.toLocaleString()} KHR (៛)`;
    } else {
        document.getElementById('qrExactAmountDisplay').textContent = `${exactKhr.toLocaleString()} ៛`;
        document.getElementById('qrDualCurrencyDisplay').textContent = `≈ $${exactUsd.toFixed(2)} USD`;
    }

    // Dynamic button text showing exact price
    const btnAba = document.getElementById('btnPayAba');
    if (btnAba) {
        const priceStr = appState.currency === 'USD' ? `$${exactUsd.toFixed(2)}` : `${exactKhr.toLocaleString()} ៛`;
        btnAba.innerHTML = `📲 <span>${lang === 'km' ? 'បើក ABA Mobile ទូទាត់' : 'Pay via ABA Mobile'} (${priceStr})</span>`;
    }

    const qrContainer = document.getElementById('qrCodeArea');
    qrContainer.innerHTML = '';

    // Check if custom static QR image URL is configured by owner
    if (STORE_CONFIG.customQrImageUrl) {
        qrContainer.innerHTML = `<img src="${STORE_CONFIG.customQrImageUrl}" style="width:220px; height:220px; object-fit:contain; border-radius:8px;" alt="Store QR">`;
        appState.currentQrPayload = STORE_CONFIG.customQrImageUrl;
    } else {
        // Generate Standard EMVCo NBC KHQR string with exact dynamic price
        appState.currentQrPayload = generateExactKHQRPayload(
            STORE_CONFIG.bakongId,
            exactUsd,
            appState.currency,
            STORE_CONFIG.merchantName
        );

        new QRCode(qrContainer, {
            text: appState.currentQrPayload,
            width: 220,
            height: 220,
            colorDark: '#0b0e17',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.M
        });
    }
}

// 1-Click Pay directly in ABA Mobile / Bakong
function triggerAbaPay() {
    if (window.Telegram?.WebApp?.HapticFeedback) {
        Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
    }

    const p = appState.activeProduct;
    const plan = p ? p.plans[appState.selectedPlanIndex] : null;
    const amountStr = plan ? formatPrice(plan.priceUsd) : '';

    // If custom ABA PayWay link is configured
    if (STORE_CONFIG.abaPayLink) {
        if (window.Telegram?.WebApp) {
            Telegram.WebApp.openLink(STORE_CONFIG.abaPayLink);
        } else {
            window.open(STORE_CONFIG.abaPayLink, '_blank');
        }
        return;
    }

    // Launch ABA Mobile deep link with KHQR payload
    const deepLink = getAbaPayDeepLink(appState.currentQrPayload);
    const bakongLink = getBakongDeepLink(appState.currentQrPayload);

    // Attempt opening ABA Mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        // Try ABA deep link, fallback to Bakong deep link
        window.location.href = deepLink;

        setTimeout(() => {
            showToast('💡 បើ ABA មិនបើកដោយស្វ័យប្រវត្តិ សូមចុច "រក្សាទុករូប QR" រួចបើក ABA ស្កេនពី Album');
        }, 1200);
    } else {
        showToast('📱 សូមស្កេន QR ខាងលើជាមួយ ABA Mobile ឬ Bakong App លើទូរស័ព្ទរបស់អ្នក!');
    }
}

// Download / Save QR Code Image so customer can open in ABA Mobile Album
function saveQRCodeImage() {
    try {
        const qrCanvas = document.querySelector('#qrCodeArea canvas');
        const qrImg = document.querySelector('#qrCodeArea img');

        let dataUrl = '';
        if (qrCanvas) {
            dataUrl = qrCanvas.toDataURL('image/png');
        } else if (qrImg && qrImg.src) {
            dataUrl = qrImg.src;
        }

        if (dataUrl) {
            const link = document.createElement('a');
            link.download = `AriyakStore_KHQR_${appState.currentOrderRef}.png`;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showToast('✅ បានរក្សាទុករូបភាព QR! បើក ABA Mobile -> Scan -> Album ដើម្បីទូទាត់');
        } else {
            showToast('📸 សូម Screenshot អេក្រង់នេះរួចបើកស្កេនក្នុង ABA Mobile');
        }
    } catch(e) {
        showToast('📸 សូម Screenshot អេក្រង់នេះរួចបើកស្កេនក្នុង ABA Mobile');
    }
}

function startCountdownTimer(seconds) {
    clearInterval(appState.timerInterval);
    let timeLeft = seconds;
    const el = document.getElementById('qrCountdownClock');

    function tick() {
        const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
        const s = (timeLeft % 60).toString().padStart(2, '0');
        if (el) el.textContent = `${m}:${s}`;
        if (timeLeft <= 0) {
            clearInterval(appState.timerInterval);
            if (el) el.textContent = 'Expired';
            showToast('⏰ QR Code has expired. Please select again.');
        }
        timeLeft--;
    }
    tick();
    appState.timerInterval = setInterval(tick, 1000);
}

// ==========================================================================
//  4. PAYMENT CONFIRMATION & ORDER TRACKING
// ==========================================================================
function completePayment() {
    if (!appState.activeProduct) return;
    const p = appState.activeProduct;
    const plan = p.plans[appState.selectedPlanIndex];
    const orderRef = appState.currentOrderRef || document.getElementById('displayOrderRef').textContent;
    const lang = appState.lang || 'km';

    const newOrder = {
        id: orderRef,
        productName: p.name,
        planName: lang === 'km' ? plan.labelKm : plan.labelEn,
        amount: formatPrice(plan.priceUsd),
        date: new Date().toLocaleDateString(),
        status: 'pending'
    };

    orderHistory.unshift(newOrder);
    localStorage.setItem('ariyak_orders', JSON.stringify(orderHistory));

    // Send Instant Order Notification to Admin via Telegram Bot
    sendTelegramOrderAlert(newOrder);

    closeModal('productModal');

    const successText = lang === 'km'
        ? `✅ បានកត់ត្រាការទូទាត់សម្រាប់ ${p.name} (${newOrder.id})! Admin នឹងផ្ទៀងផ្ទាត់ក្នុងពេលឆាប់ៗ។`
        : `✅ Payment recorded for ${p.name} (${newOrder.id})! Admin will verify shortly.`;

    showToast(successText);

    if (window.Telegram?.WebApp) {
        Telegram.WebApp.HapticFeedback.notificationOccurred('success');
        Telegram.WebApp.showPopup({
            title: lang === 'km' ? '✅ ការបញ្ជាទិញជោគជ័យ' : '✅ Order Submitted',
            message: `${newOrder.productName} (${newOrder.planName})\nAmount: ${newOrder.amount}\nRef: ${newOrder.id}\n\nPlease click "Contact Admin" to send your receipt!`,
            buttons: [{ type: 'ok' }]
        });
    }

    renderOrdersPage();
}

function renderOrdersPage() {
    const container = document.getElementById('ordersListContainer');
    if (!container) return;
    const lang = appState.lang || 'km';
    const dictionary = i18n[lang] || i18n.km;

    if (!orderHistory || orderHistory.length === 0) {
        container.innerHTML = `
            <div class="empty-orders">
                <div class="empty-orders-icon">📦</div>
                <p style="font-size:14px; font-weight:600; margin-bottom:8px;">${dictionary.orderEmpty}</p>
                <p style="font-size:12px; color:var(--text-muted);">${lang === 'km' ? 'ទំនិញដែលអ្នកបានទិញនឹងបង្ហាញនៅទីនេះ' : 'Your purchases will appear here.'}</p>
            </div>
        `;
        return;
    }

    container.innerHTML = orderHistory.map(ord => {
        const statusBadge = ord.status === 'active'
            ? `<span class="order-status-badge status-active">Active</span>`
            : `<span class="order-status-badge status-pending">${dictionary.orderPending}</span>`;

        return `
            <div class="order-card">
                <div class="order-card-header">
                    <div>
                        <span style="font-size:12px; color:var(--text-muted);">${ord.date}</span>
                        <h4 style="font-size:15px; font-weight:700;">${ord.productName}</h4>
                    </div>
                    ${statusBadge}
                </div>
                <div style="font-size:12px; color:var(--text-secondary); margin-bottom:8px;">
                    ${ord.planName} • <strong style="color:var(--accent-green);">${ord.amount}</strong>
                </div>
                <div style="font-size:11px; color:var(--text-muted); display:flex; justify-content:space-between; align-items:center;">
                    <span>Ref: <b style="color:var(--accent-amber);">${ord.id}</b></span>
                    <button class="buy-mini-btn" style="padding:4px 10px; font-size:10px;" onclick="openAdminTelegram('${ord.id}', '${ord.productName}')">
                        💬 Get Account
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// ==========================================================================
//  5. STOCK MANAGEMENT (FOR SETTINGS PAGE)
// ==========================================================================
function renderStockManagementList() {
    const container = document.getElementById('stockManagementList');
    if (!container) return;

    container.innerHTML = PRODUCTS.map(p => {
        const inStock = isProductInStock(p.id);
        const btnClass = inStock ? 'btn-state-in' : 'btn-state-out';
        const label = inStock ? '🟢 In Stock (មានស្តុក)' : '🔴 Out of Stock (អស់)';

        return `
            <div class="stock-toggle-row">
                <div style="display:flex; align-items:center; gap:8px;">
                    <div style="width:26px; height:26px; border-radius:6px; overflow:hidden; display:flex; align-items:center; justify-content:center; background:var(--bg-surface-elevated); padding:3px;">
                        <img src="${p.image}" style="width:100%; height:100%; object-fit:contain;" alt="${p.name}">
                    </div>
                    <span style="font-size:13px; font-weight:600;">${p.name}</span>
                </div>
                <button class="stock-btn-action ${btnClass}" onclick="toggleProductStock('${p.id}')">
                    ${label}
                </button>
            </div>
        `;
    }).join('');
}

// ==========================================================================
//  6. PAGE SWITCHING & TELEGRAM INTEGRATION
// ==========================================================================
function switchPage(pageName, btn) {
    document.querySelectorAll('.page-view').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

    const targetPage = document.getElementById(`page-${pageName}`);
    if (targetPage) targetPage.classList.add('active');
    if (btn) btn.classList.add('active');

    if (pageName === 'orders') renderOrdersPage();
    if (pageName === 'settings') renderStockManagementList();

    if (window.Telegram?.WebApp?.HapticFeedback) {
        Telegram.WebApp.HapticFeedback.selectionChanged();
    }
}

// Requirement 1: Admin Tele Link (https://web.telegram.org/k/)
function openAdminTelegram(orderRef = '', prodName = '') {
    const baseLink = STORE_CONFIG.adminTelegramLink || 'https://web.telegram.org/k/';
    let finalUrl = baseLink;

    if (orderRef) {
        const text = encodeURIComponent(`Hello Admin, I have paid for ${prodName} (Order Ref: ${orderRef}). Here is my receipt:`);
        // If it's a t.me link or web telegram
        if (baseLink.includes('t.me/')) {
            finalUrl = `${baseLink}?text=${text}`;
        }
    }

    if (window.Telegram?.WebApp) {
        Telegram.WebApp.openTelegramLink(finalUrl);
    } else {
        window.open(finalUrl, '_blank');
    }
}

// ==========================================================================
//  7. LANGUAGE & CURRENCY TOGGLE
// ==========================================================================
function toggleLanguage() {
    appState.lang = appState.lang === 'km' ? 'en' : 'km';
    localStorage.setItem('ariyak_lang', appState.lang);
    applyLanguage();
    renderProductsList();
    renderOrdersPage();
    showToast(appState.lang === 'km' ? '🇰🇭 បានប្តូរទៅជាភាសាខ្មែរ' : '🇬🇧 Switched to English');
}

function applyLanguage() {
    try {
        const l = appState.lang || 'km';
        const d = i18n[l] || i18n.km;
        document.documentElement.lang = l;

        const langFlag = document.getElementById('langFlag');
        if (langFlag) langFlag.textContent = l === 'km' ? '🇰🇭' : '🇬🇧';

        const langText = document.getElementById('langText');
        if (langText) langText.textContent = l === 'km' ? 'ខ្មែរ' : 'EN';

        const topBrandSub = document.getElementById('topBrandSubtitle');
        if (topBrandSub) topBrandSub.textContent = d.brandSub;

        const heroBadge = document.getElementById('heroBadge');
        if (heroBadge) heroBadge.textContent = d.heroBadge;

        const heroTitle = document.getElementById('heroTitle');
        if (heroTitle) heroTitle.textContent = d.heroTitle;

        const heroSub = document.getElementById('heroSubtitle');
        if (heroSub) heroSub.textContent = d.heroSub;

        const pInstant = document.getElementById('perkInstant');
        if (pInstant) pInstant.textContent = d.instant;

        const pWarranty = document.getElementById('perkWarranty');
        if (pWarranty) pWarranty.textContent = d.warranty;

        const pKHQR = document.getElementById('perkKHQR');
        if (pKHQR) pKHQR.textContent = d.khqr;

        const searchInp = document.getElementById('searchInput');
        if (searchInp) searchInp.placeholder = d.searchPlaceholder;

        const stockFil = document.getElementById('stockFilterText');
        if (stockFil) stockFil.textContent = `${d.filterInStock} (${l === 'km' ? 'In Stock Only' : 'មានក្នុងស្តុក'})`;

        const catTitle = document.getElementById('catalogTitle');
        if (catTitle) catTitle.textContent = d.popularTitle;

        const sheetHeading = document.getElementById('modalSheetHeading');
        if (sheetHeading) sheetHeading.textContent = d.modalHeading;

        const featLabel = document.getElementById('modalFeaturesLabel');
        if (featLabel) featLabel.textContent = d.featuresLabel;

        const choosePlan = document.getElementById('modalChoosePlanLabel');
        if (choosePlan) choosePlan.textContent = d.chooseDuration;

        const timerLabel = document.getElementById('timerLabel');
        if (timerLabel) timerLabel.textContent = d.expiresIn;

        const qrNotice = document.getElementById('qrScanNotice');
        if (qrNotice) qrNotice.textContent = d.scanNote;

        const btnConfirm = document.getElementById('btnConfirmPaid');
        if (btnConfirm) btnConfirm.textContent = d.iHavePaid;

        const btnContact = document.getElementById('btnContactAdmin');
        if (btnContact) btnContact.textContent = d.contactAdmin;

        const btnSaveQr = document.getElementById('btnSaveQrImage');
        if (btnSaveQr) btnSaveQr.textContent = d.saveQrBtn;

        const nStore = document.getElementById('navStore');
        if (nStore) nStore.textContent = d.navStore;

        const nOrders = document.getElementById('navOrders');
        if (nOrders) nOrders.textContent = d.navOrders;

        const nSupport = document.getElementById('navSupport');
        if (nSupport) nSupport.textContent = d.navSupport;

        const nSettings = document.getElementById('navSettings');
        if (nSettings) nSettings.textContent = d.navSettings;

        const ordTitle = document.getElementById('ordersPageTitle');
        if (ordTitle) ordTitle.textContent = l === 'km' ? 'ប្រវត្តិនៃការបញ្ជាទិញ (My Orders)' : 'My Orders';

        const settLang = document.getElementById('settLangDisplay');
        if (settLang) settLang.textContent = l === 'km' ? '🇰🇭 ខ្មែរ (Khmer)' : '🇬🇧 English';
    } catch(e) {
        console.error("applyLanguage error:", e);
    }
}

function toggleCurrency() {
    appState.currency = appState.currency === 'USD' ? 'KHR' : 'USD';
    localStorage.setItem('ariyak_currency', appState.currency);

    document.getElementById('currencyBadge').textContent = appState.currency === 'USD' ? 'USD $' : 'KHR ៛';
    document.getElementById('settCurrDisplay').textContent = appState.currency === 'USD' ? 'USD ($)' : 'KHR (៛)';

    renderProductsList();
    if (appState.activeProduct) {
        renderModalPlans();
        updateModalQR();
    }
    showToast(`Currency: ${appState.currency}`);
}

// ==========================================================================
//  TELEGRAM BOT NOTIFICATION & API HELPERS
// ==========================================================================

// Auto-fetch Bot details (Username, Name) on launch
async function initTelegramBotInfo() {
    if (!STORE_CONFIG.botToken) return;
    try {
        const res = await fetch(`https://api.telegram.org/bot${STORE_CONFIG.botToken}/getMe`);
        const data = await res.json();
        if (data.ok && data.result) {
            STORE_CONFIG.botUsername = data.result.username;
            localStorage.setItem('ariyak_bot_username', data.result.username);

            // Update support button if exists
            const suppBtn = document.querySelector('#page-support .primary-action-btn');
            if (suppBtn) {
                suppBtn.innerHTML = `✈️ ផ្ញើសារតាម Telegram (@${data.result.username})`;
            }

            console.log("Connected Telegram Bot:", data.result);
        }
    } catch(e) {
        console.warn("Could not connect to Telegram Bot API:", e);
    }
}

// Send Instant Order Notification to Admin Telegram
async function sendTelegramOrderAlert(order) {
    if (!STORE_CONFIG.botToken) return;

    // Use configured adminChatId or Telegram user's ID
    const tgUserId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
    const targetChatId = STORE_CONFIG.adminChatId || tgUserId;

    if (!targetChatId) {
        console.log("Admin Chat ID not yet configured. Please set Chat ID in Settings.");
        return;
    }

    const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
    const customerInfo = tgUser 
        ? `@${tgUser.username || 'NoUsername'} (${tgUser.first_name || ''} - ID: \`${tgUser.id}\`)`
        : '🌐 Web Browser User';

    const messageText = 
`🔔 *ការបញ្ជាទិញថ្មី (NEW ORDER RECEIVED)*
━━━━━━━━━━━━━━━━━━
📦 *ទំនិញ:* *${order.productName}*
📋 *គម្រោង:* ${order.planName}
💰 *តម្លៃ:* *${order.amount}*
🏷️ *លេខកូដកុម្ម៉ង់:* \`${order.id}\`
👤 *អតិថិជន:* ${customerInfo}
⏰ *កាលបរិច្ឆេទ:* ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━
💬 *សូមពិនិត្យវិក្កយបត្រ និងផ្ញើ Email/Password ជូនអតិថិជន!*`;

    try {
        const res = await fetch(`https://api.telegram.org/bot${STORE_CONFIG.botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: targetChatId,
                text: messageText,
                parse_mode: 'Markdown'
            })
        });
        const resData = await res.json();
        if (resData.ok) {
            console.log("✅ Order sent to Telegram Bot successfully!");
        } else {
            console.warn("Telegram API response:", resData);
        }
    } catch(err) {
        console.error("Failed to send telegram order notification:", err);
    }
}

// Auto-detect Admin Chat ID by checking recent bot updates
async function detectMyChatId() {
    if (!STORE_CONFIG.botToken) {
        showToast('⚠️ Please enter Bot Token first.');
        return;
    }
    showToast('🔍 កំពុងស្វែងរក Chat ID របស់អ្នក...');

    try {
        const res = await fetch(`https://api.telegram.org/bot${STORE_CONFIG.botToken}/getUpdates`);
        const data = await res.json();

        if (data.ok && data.result && data.result.length > 0) {
            // Find the most recent message sender
            const lastUpdate = data.result[data.result.length - 1];
            const sender = lastUpdate.message?.from || lastUpdate.channel_post?.chat || lastUpdate.my_chat_member?.from;

            if (sender && sender.id) {
                const detectedId = sender.id.toString();
                STORE_CONFIG.adminChatId = detectedId;
                localStorage.setItem('ariyak_admin_chat_id', detectedId);

                const inputChat = document.getElementById('settingAdminChatId');
                if (inputChat) inputChat.value = detectedId;

                showToast(`✅ រកឃើញ Chat ID: ${detectedId} (${sender.first_name || sender.username || 'Admin'})!`);
                return;
            }
        }
        showToast('⚠️ រកមិនឃើញសារទេ! សូមបើក Telegram ហើយផ្ញើសារ /start ទៅកាន់ Bot របស់អ្នកសិន');
    } catch(err) {
        showToast('❌ Failed to fetch updates: ' + err.message);
    }
}

// Test Telegram Bot Message Notification
async function testBotNotification() {
    const inputChat = document.getElementById('settingAdminChatId')?.value.trim() || STORE_CONFIG.adminChatId;
    if (!inputChat) {
        showToast('⚠️ សូមបញ្ចូល Admin Chat ID ឬចុច Auto-Detect សិន');
        return;
    }

    showToast('🚀 កំពុងផ្ញើសារតេស្ត...');
    try {
        const res = await fetch(`https://api.telegram.org/bot${STORE_CONFIG.botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: inputChat,
                text: `✅ *Ariyak Store Bot ដំណើរការបានជោគជ័យ!*\n\nBot Token របស់អ្នកត្រូវបានតភ្ជាប់រួចរាល់។ រាល់ពេលមានការបញ្ជាទិញថ្មី Bot នឹងផ្ញើសារមកកាន់ទីនេះស្វ័យប្រវត្តិ។`,
                parse_mode: 'Markdown'
            })
        });
        const data = await res.json();
        if (data.ok) {
            showToast('✅ ផ្ញើសារជោគជ័យ! សូមពិនិត្យមើល Telegram របស់អ្នក');
        } else {
            showToast('❌ Telegram Error: ' + data.description);
        }
    } catch(err) {
        showToast('❌ Network Error: ' + err.message);
    }
}

// Save Merchant Settings from Settings Tab
function saveMerchantSettings() {
    const inputBakong = document.getElementById('settingBakongId')?.value.trim();
    const inputTele = document.getElementById('settingAdminTele')?.value.trim();
    const inputCustomQr = document.getElementById('settingCustomQr')?.value.trim();
    const inputAbaPayLink = document.getElementById('settingAbaPayLink')?.value.trim();
    const inputBotToken = document.getElementById('settingBotToken')?.value.trim();
    const inputChatId = document.getElementById('settingAdminChatId')?.value.trim();

    if (inputBakong) {
        STORE_CONFIG.bakongId = inputBakong;
        localStorage.setItem('ariyak_bakong_id', inputBakong);
    }
    if (inputTele) {
        STORE_CONFIG.adminTelegramLink = inputTele;
        localStorage.setItem('ariyak_admin_tele', inputTele);
    }
    if (inputBotToken) {
        STORE_CONFIG.botToken = inputBotToken;
        localStorage.setItem('ariyak_bot_token', inputBotToken);
    }
    if (inputChatId) {
        STORE_CONFIG.adminChatId = inputChatId;
        localStorage.setItem('ariyak_admin_chat_id', inputChatId);
    }
    STORE_CONFIG.customQrImageUrl = inputCustomQr || '';
    localStorage.setItem('ariyak_custom_qr_url', inputCustomQr || '');

    STORE_CONFIG.abaPayLink = inputAbaPayLink || '';
    localStorage.setItem('ariyak_aba_pay_link', inputAbaPayLink || '');

    showToast('✅ បានរក្សាទុកការកំណត់ជោគជ័យ (Settings Saved)');
}

// ==========================================================================
//  8. MODAL HELPERS & TOAST
// ==========================================================================
function openModal(id) {
    document.getElementById(id).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
    document.body.style.overflow = '';
    clearInterval(appState.timerInterval);
    if (window.Telegram?.WebApp?.BackButton) {
        Telegram.WebApp.BackButton.hide();
    }
}

document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal.id);
        }
    });
});

function showToast(msg) {
    const bubble = document.getElementById('toastBubble');
    if (!bubble) return;
    document.getElementById('toastMsg').textContent = msg;
    bubble.classList.add('show');
    setTimeout(() => bubble.classList.remove('show'), 3000);
}

// ==========================================================================
//  9. TELEGRAM MINI APP INITIALIZATION
// ==========================================================================
if (window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
    tg.setHeaderColor('#0b0e17');
    tg.setBackgroundColor('#0b0e17');

    // Display Telegram User Info if available
    if (tg.initDataUnsafe?.user) {
        const u = tg.initDataUnsafe.user;
        const nameDisplay = u.username ? `@${u.username}` : `${u.first_name || ''}`;
        const userEl = document.getElementById('tgUserInfo');
        if (userEl) {
            userEl.style.display = 'inline-flex';
            userEl.textContent = `👋 ${nameDisplay}`;
        }
    }
}

// Launch Initialization
try {
    applyLanguage();
    renderProductsList();
    renderStockManagementList();

    const setBakong = document.getElementById('settingBakongId');
    if (setBakong) setBakong.value = STORE_CONFIG.bakongId;

    const setTele = document.getElementById('settingAdminTele');
    if (setTele) setTele.value = STORE_CONFIG.adminTelegramLink;

    const setCustomQr = document.getElementById('settingCustomQr');
    if (setCustomQr) setCustomQr.value = STORE_CONFIG.customQrImageUrl;

    const setAbaPayLink = document.getElementById('settingAbaPayLink');
    if (setAbaPayLink) setAbaPayLink.value = STORE_CONFIG.abaPayLink;

    const setBotToken = document.getElementById('settingBotToken');
    if (setBotToken) setBotToken.value = STORE_CONFIG.botToken;

    const setChatId = document.getElementById('settingAdminChatId');
    if (setChatId) setChatId.value = STORE_CONFIG.adminChatId;

    const currBadge = document.getElementById('currencyBadge');
    if (currBadge) currBadge.textContent = appState.currency === 'USD' ? 'USD $' : 'KHR ៛';

    const settCurr = document.getElementById('settCurrDisplay');
    if (settCurr) settCurr.textContent = appState.currency === 'USD' ? 'USD ($)' : 'KHR (៛)';

    // Connect and verify Telegram Bot Token
    initTelegramBotInfo();
} catch(err) {
    console.error("Initialization error:", err);
}