/* ================================================================
   DiasporaConnect — Interactive Prototype Logic (Functional Version)
   Hackathon MIABE 2026 — Full Functional with Mock API Support
   ================================================================ */

// Configuration
const API_BASE = '';  // Empty for mock mode - app works offline/demo mode
const USE_MOCK = true; // Set to false when real backend is available

// Exchange rates (fallback values)
let EXCHANGE_RATES = {
    USD: 592,
    EUR: 655.957,
    GBP: 746,
    CAD: 435
};

// Utility functions
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function fmt(num) {
    return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function fmtDecimal(num) {
    return num.toFixed(2).replace('.', ',');
}

function generateTransferId() {
    return 'DC-2026-' + Math.random().toString(36).substring(2, 6).toUpperCase();
}

function generateTxId() {
    return 'TXN-' + Date.now().toString(36).toUpperCase();
}

// Mock API functions
const mockApi = {
    async getRates() {
        await delay(800);
        return EXCHANGE_RATES;
    },

    async sendOTP(phone) {
        await delay(1200);
        return { success: true, message: 'OTP envoyé (simulation)', phone: phone };
    },

    async verifyOTP(phone, otp) {
        await delay(1000);
        if (otp === '123456') {
            return { success: true, message: 'OTP vérifié', token: 'mock_token_' + Date.now() };
        }
        return { success: false, message: 'Code OTP incorrect' };
    },

    async sendTransfer(data) {
        await delay(1500);
        const transferId = generateTransferId();
        const rate = EXCHANGE_RATES[data.currency] || 655.957;
        const amountXof = Math.round(data.amount * rate);
        const fee = data.amount * 0.008;
        
        return {
            success: true,
            transferId: transferId,
            amount: data.amount,
            currency: data.currency,
            amountXof: amountXof,
            fee: fee,
            netXof: amountXof,
            status: 'LOCKED',
            message: 'Transfert réussi'
        };
    },

    async getTransferByPhone(phone) {
        await delay(1000);
        // Pour la démo, on retourne toujours un résultat si le numéro est valide
        if (phone.length > 5) {
            return {
                success: true,
                transfers: [{
                    id: 'DC-2026-DEMO',
                    senderName: 'Kofi Mensah',
                    amountXof: 65596,
                    status: 'LOCKED',
                    statusLabel: 'En attente de retrait'
                }]
            };
        }
        return { success: false, message: 'Aucun transfert trouvé' };
    },

    async requestWithdrawal(data) {
        await delay(1500);
        return {
            success: true,
            reference: 'MW-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
            amount: data.amount,
            operator: data.operator,
            message: 'Retrait effectué'
        };
    }
};

// Real API wrapper
async function apiCall(endpoint, options = {}) {
    if (USE_MOCK) return mockApiCall(endpoint, options);
    
    try {
        const res = await fetch(`${API_BASE}${endpoint}`, {
            ...options,
            headers: { 'Content-Type': 'application/json', ...options.headers }
        });
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.warn('API failed, falling back to mock:', error);
        return mockApiCall(endpoint, options);
    }
}

function mockApiCall(endpoint, options = {}) {
    const method = options.method || 'GET';
    const body = options.body ? JSON.parse(options.body) : {};
    
    if (endpoint === '/api/rates') return mockApi.getRates();
    if (endpoint === '/api/auth/send-otp') return mockApi.sendOTP(body.phone);
    if (endpoint === '/api/auth/verify-otp') return mockApi.verifyOTP(body.phone, body.otpCode);
    if (endpoint === '/api/transfer/send') return mockApi.sendTransfer(body);
    if (endpoint.startsWith('/api/transfer/')) return mockApi.getTransferByPhone(endpoint.split('/').pop());
    if (endpoint === '/api/withdraw') return mockApi.requestWithdrawal(body);
    
    return { success: false, message: 'Endpoint inconnu' };
}

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
    initApp();
});

function initApp() {
    // Navigation
    window.openPortal = function(portal) {
        document.getElementById('portalSelector').classList.remove('active-view');
        document.getElementById('diasporaApp').classList.remove('active-view');
        document.getElementById('beninApp').classList.remove('active-view');
        document.getElementById(portal + 'App').classList.add('active-view');
        if (window.lucide) lucide.createIcons();
    };

    window.showPortalSelector = function() {
        document.getElementById('diasporaApp').classList.remove('active-view');
        document.getElementById('beninApp').classList.remove('active-view');
        document.getElementById('portalSelector').classList.add('active-view');
    };

    window.goScreen = function(screenId) {
        const target = document.getElementById(screenId);
        if (!target) return;
        const shell = target.closest('.app-shell');
        shell.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        target.classList.add('active');
        
        // Update nav
        const nav = shell.querySelector('.bottom-nav');
        if (nav) {
            const items = nav.querySelectorAll('.bnav-item');
            const dMap = { 'd-home': 0, 'd-transfer': 1, 'd-summary': 1, 'd-sent': 1, 'd-history': 2, 'd-profile': 3, 'd-otp': 1, 'd-verify': 1 };
            const bMap = { 'b-home': 0, 'b-search': 1, 'b-bills': 2, 'b-withdraw': 3, 'b-withdraw-success': 3, 'b-profile': -1 };
            const map = screenId.startsWith('d-') ? dMap : bMap;
            const idx = map[screenId];
            items.forEach((item, i) => item.classList.toggle('active', i === idx));
        }
        if (window.lucide) lucide.createIcons();
        
        // Specific screen logic
        if (screenId === 'd-summary') updateSummary();
    };

    // Calculator Home
    const dSendAmt = document.getElementById('dSendAmt');
    const dSendCur = document.getElementById('dSendCur');
    if (dSendAmt) dSendAmt.addEventListener('input', updateHomeCalc);
    if (dSendCur) dSendCur.addEventListener('change', updateHomeCalc);

    function updateHomeCalc() {
        const amt = parseFloat(dSendAmt.value) || 0;
        const cur = dSendCur.value;
        const rate = EXCHANGE_RATES[cur] || 655.957;
        document.getElementById('dRecvAmt').textContent = fmt(amt * rate);
        document.getElementById('dFee').textContent = fmtDecimal(amt * 0.008) + ' ' + cur;
        document.getElementById('dSendFlag').src = `https://flagcdn.com/w40/${dSendCur.options[dSendCur.selectedIndex].dataset.flag}.png`;
    }

    // Calculator Transfer
    const tfAmount = document.getElementById('tfAmount');
    const tfCurrency = document.getElementById('tfCurrency');
    if (tfAmount) tfAmount.addEventListener('input', updateTransferCalc);
    if (tfCurrency) tfCurrency.addEventListener('change', updateTransferCalc);

    function updateTransferCalc() {
        const amt = parseFloat(tfAmount.value) || 0;
        const cur = tfCurrency.value;
        const rate = EXCHANGE_RATES[cur] || 655.957;
        document.getElementById('tfRecv').textContent = fmt(amt * rate);
        document.getElementById('tfRateDisplay').textContent = `1 ${cur} = ${fmtDecimal(rate)} XOF`;
    }

    function updateSummary() {
        const amt = parseFloat(tfAmount.value) || 0;
        const cur = tfCurrency.value;
        const rate = EXCHANGE_RATES[cur] || 655.957;
        const fee = amt * 0.008;
        document.getElementById('sumRateDisplay').textContent = `1 ${cur} = ${fmtDecimal(rate)} XOF`;
        document.getElementById('sumRecvAmount').textContent = fmt(amt * rate);
        document.getElementById('sumSendAmount').textContent = amt + ' ' + cur;
        document.getElementById('sumFeeAmount').textContent = fmtDecimal(fee) + ' ' + cur;
        document.getElementById('sumTotalAmount').textContent = fmtDecimal(amt + fee) + ' ' + cur;
    }

    // Forms
    document.getElementById('otpForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const phone = document.getElementById('otpPhone').value;
        if (!phone) return showAlert('Entrez un numéro');
        const btn = document.getElementById('sendOtpBtn');
        btn.disabled = true; btn.innerHTML = '<span class="spinner"></span>...';
        const res = await apiCall('/api/auth/send-otp', { method: 'POST', body: JSON.stringify({ phone }) });
        btn.disabled = false; btn.innerHTML = 'Envoyer le code <i data-lucide="send"></i>';
        if (res.success) goScreen('d-verify');
        lucide.createIcons();
    });

    document.getElementById('verifyForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const otp = Array.from(document.querySelectorAll('.otp-input')).map(i => i.value).join('');
        if (otp.length < 6) return showAlert('Code incomplet');
        const btn = document.getElementById('verifyOtpBtn');
        btn.disabled = true; btn.innerHTML = '<span class="spinner"></span>...';
        const res = await apiCall('/api/auth/verify-otp', { method: 'POST', body: JSON.stringify({ otpCode: otp }) });
        btn.disabled = false; btn.innerHTML = 'Vérifier <i data-lucide="check"></i>';
        if (res.success) goScreen('d-transfer');
        else showAlert('Code erroné (utilisez 123456)');
        lucide.createIcons();
    });

    document.getElementById('summaryForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('confirmTransferBtn');
        btn.disabled = true; btn.innerHTML = '<span class="spinner"></span>...';
        const data = {
            amount: parseFloat(tfAmount.value),
            currency: tfCurrency.value,
            recipient: document.getElementById('tfRecipient').value,
            recipientPhone: document.getElementById('tfRecipientPhone').value
        };
        const res = await apiCall('/api/transfer/send', { method: 'POST', body: JSON.stringify(data) });
        btn.disabled = false; btn.innerHTML = 'Confirmer et envoyer <i data-lucide="check"></i>';
        if (res.success) {
            document.getElementById('confRecipient').textContent = data.recipient;
            document.getElementById('confRecipientName').textContent = data.recipient;
            document.getElementById('confAmount').innerHTML = `${fmt(res.amountXof)} <span class="sent-cur">XOF</span>`;
            document.getElementById('confAmountUsd').textContent = `(${data.amount} ${data.currency})`;
            document.getElementById('confTxId').textContent = res.transferId;
            goScreen('d-sent');
        }
        lucide.createIcons();
    });

    document.getElementById('searchForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const phone = document.getElementById('searchPhone').value;
        const btn = document.getElementById('searchBtn');
        btn.disabled = true; btn.innerHTML = '<span class="spinner"></span>...';
        const res = await apiCall('/api/transfer/' + phone);
        btn.disabled = false; btn.innerHTML = 'Rechercher <i data-lucide="search"></i>';
        if (res.success) {
            document.getElementById('resultSender').textContent = res.transfers[0].senderName;
            document.getElementById('resultAmount').textContent = fmt(res.transfers[0].amountXof) + ' XOF';
            document.getElementById('searchForm').classList.add('hidden');
            document.getElementById('searchResults').classList.remove('hidden');
        } else showAlert('Non trouvé');
        lucide.createIcons();
    });

    document.getElementById('withdrawForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('withdrawBtn');
        btn.disabled = true; btn.innerHTML = '<span class="spinner"></span>...';
        const amt = document.getElementById('withdrawAmount').value;
        const res = await apiCall('/api/withdraw', { method: 'POST', body: JSON.stringify({ amount: amt }) });
        btn.disabled = false; btn.innerHTML = 'Retirer maintenant';
        if (res.success) {
            document.getElementById('withdrawRef').textContent = res.reference;
            document.getElementById('withdrawAmountConf').textContent = fmt(amt) + ' XOF';
            goScreen('b-withdraw-success');
        }
        lucide.createIcons();
    });

    // OTP Inputs auto-focus
    const inputs = document.querySelectorAll('.otp-input');
    inputs.forEach((input, i) => {
        input.addEventListener('input', () => {
            if (input.value && i < inputs.length - 1) inputs[i+1].focus();
        });
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !input.value && i > 0) inputs[i-1].focus();
        });
    });
}

window.selectMethod = function(el) {
    document.querySelectorAll('.wm-item').forEach(i => {
        i.classList.remove('selected');
        i.querySelector('i').setAttribute('data-lucide', 'chevron-right');
        i.querySelector('i').style.color = '';
    });
    el.classList.add('selected');
    el.querySelector('i').setAttribute('data-lucide', 'check-circle');
    el.querySelector('i').style.color = 'var(--green)';
    lucide.createIcons();
};

window.resetSearch = function() {
    document.getElementById('searchForm').classList.remove('hidden');
    document.getElementById('searchResults').classList.add('hidden');
    document.getElementById('searchPhone').value = '';
};

function showAlert(msg) {
    const div = document.createElement('div');
    div.className = 'alert-toast show';
    div.style.background = '#EF4444';
    div.textContent = msg;
    document.body.appendChild(div);
    setTimeout(() => { div.classList.remove('show'); setTimeout(() => div.remove(), 300); }, 3000);
}

function updateHomeCalc() {
    const dSendAmt = document.getElementById('dSendAmt');
    const dSendCur = document.getElementById('dSendCur');
    if (!dSendAmt || !dSendCur) return;
    const amt = parseFloat(dSendAmt.value) || 0;
    const cur = dSendCur.value;
    const rate = EXCHANGE_RATES[cur] || 655.957;
    document.getElementById('dRecvAmt').textContent = fmt(amt * rate);
    document.getElementById('dFee').textContent = fmtDecimal(amt * 0.008) + ' ' + cur;
    document.getElementById('dSendFlag').src = `https://flagcdn.com/w40/${dSendCur.options[dSendCur.selectedIndex].dataset.flag}.png`;
}
