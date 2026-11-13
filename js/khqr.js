// ==========================================================================
//  ARIYAK STORE - KHQR BAKONG & ABA PAY EMVCo GENERATOR (CAMBODIA STANDARD)
// ==========================================================================

const KHR_RATE = 4100; // Default exchange rate: 1 USD = 4,100 KHR

/**
 * Encodes Tag-Length-Value (TLV) for EMVCo KHQR payload string
 * @param {string} tag - 2-character tag identifier
 * @param {string} val - value string
 * @returns {string} formatted TLV string
 */
function tlv(tag, val) {
    const len = val.length.toString().padStart(2, '0');
    return tag + len + val;
}

/**
 * Standard EMVCo CRC-16 Checksum (CCITT-FALSE: polynomial 0x1021, initial 0xFFFF)
 * @param {string} str - input payload string
 * @returns {string} 4-character uppercase hexadecimal checksum
 */
function calculateCRC16(str) {
    let crc = 0xFFFF;
    for (let i = 0; i < str.length; i++) {
        crc ^= (str.charCodeAt(i) << 8);
        for (let j = 0; j < 8; j++) {
            if (crc & 0x8000) {
                crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
            } else {
                crc = (crc << 1) & 0xFFFF;
            }
        }
    }
    return crc.toString(16).toUpperCase().padStart(4, '0');
}

/**
 * Generates an exact-amount KHQR payload following National Bank of Cambodia (NBC) standard.
 * When scanned with ABA Mobile, Bakong, or any Cambodian banking app,
 * it automatically enters the exact price.
 * 
 * @param {string} bakongId - Merchant Bakong ID or phone number (e.g. "ariyak_store@aclb" or "081234567")
 * @param {number} amountUsd - Amount in USD
 * @param {string} currency - 'USD' or 'KHR'
 * @param {string} [merchantName='ARIYAK STORE'] - Name of the store shown in banking app
 * @returns {string} valid EMVCo KHQR string
 */
function generateExactKHQRPayload(bakongId, amountUsd, currency, merchantName = 'ARIYAK STORE') {
    const isKhr = currency === 'KHR';
    const currCode = isKhr ? '116' : '840'; // 840 = USD, 116 = KHR
    const formattedAmount = isKhr ? Math.round(amountUsd * KHR_RATE).toString() : amountUsd.toFixed(2);

    const aid = 'A000000727'; // NBC Bakong Registered Application Identifier
    const merchantInfo = tlv('00', aid) + tlv('01', bakongId);

    let payload = '';
    payload += tlv('00', '01');          // Payload Format Indicator (01)
    payload += tlv('01', '12');          // Point of Initiation: 12 = Dynamic QR (Amount Included)
    payload += tlv('29', merchantInfo);  // Merchant Account Information (Bakong ID)
    payload += tlv('52', '5999');        // Merchant Category Code (General Merchandise)
    payload += tlv('53', currCode);      // Transaction Currency
    payload += tlv('54', formattedAmount); // Exact Transaction Amount
    payload += tlv('58', 'KH');          // Country Code: Cambodia
    payload += tlv('59', merchantName);  // Merchant Name
    payload += tlv('60', 'Phnom Penh');  // Merchant City
    payload += '6304';                   // Checksum CRC Tag (63) and length (04)

    return payload + calculateCRC16(payload);
}

/**
 * Creates an ABA Mobile / Bakong deep link for direct app opening on mobile
 * @param {string} qrPayload - The generated KHQR string
 * @returns {string} deep link URL
 */
function getAbaPayDeepLink(qrPayload) {
    // ABA Mobile and Bakong deep links for opening payment directly
    return `aba://payment?qrcode=${encodeURIComponent(qrPayload)}`;
}

function getBakongDeepLink(qrPayload) {
    return `bakong://qr?data=${encodeURIComponent(qrPayload)}`;
}