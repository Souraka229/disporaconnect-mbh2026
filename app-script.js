/* ================================================================
   DiasporaConnect — Interactive Prototype Logic (Functional Version)
   Hackathon MIABE 2026 — Full Functional with Mock API Support
   ================================================================ */

// Configuration
const API_BASE = '';  // Empty for mock mode - app works offline/demo mode
const USE_MOCK = true; // Set to false when real backend is available

// Exchange rates (fallback values)
const EXCHANGE_RATES = {
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
    // GET /api/rates
    async getRates() {
        await delay(800);
        return {
            USD: 592,
            EUR: 655.957,
            GBP: 746,
            CAD: 435,
            usdcToXof: 592,
            eurToUsdc: 1.08,
            eurToXof: 655.957
        };
    },

    // POST /api/auth/send-otp
    async sendOTP(phone) {
        await delay(1200);
        return {
            success: true,
            message: 'OTP envoyé (simulation)',
            phone: phone
        };
    },

    // POST /api/auth/verify-otp
    async verifyOTP(phone, otp) {
        await delay(1000);
        // Accept any 6-digit code for demo
        if (otp && otp.length === 6 && /^\d+$/.test(otp)) {
            return {
                success: true,
                message: 'OTP vérifié',
                token: 'mock_token_' + Date.now()
            };
        }
        return {
            success: false,
            message: 'Code OTP incorrect'
        };
    },

    // POST /api/transfer/send
    async sendTransfer(data) {
        await delay(1500);
        const transferId = generateTransferId();
        const txId = generateTxId();
        const amountXof = Math.round(data.amount * EXCHANGE_RATES[data.currency] || 0);
        const fee = data.amount * 0.008;
        
        return {
            success: true,
            transferId: transferId,
            txId: txId,
            amount: data.amount,
            currency: data.currency,
            amountXof: amountXof,
            fee: fee,
            feePercent: 0.8,
            netXof: amountXof - (fee * EXCHANGE_RATES[data.currency]),
            status: 'INITIATED',
            message: 'Transfert initiated successfully'
        };
    },

    // GET /api/transfer/:id
    async getTransferById(transferId) {
        await delay(800);
        return {
            success: true,
            transfer: {
                id: transferId,
                senderName: 'Kofi Mensah',
                senderPhone: '+33 6 12 34 56 78',
                amountXof: 65596,
                amountCurrency: 100,
                currency: 'EUR',
                status: 'LOCKED',
                statusLabel: 'En cours de livraison',
                createdAt: new Date().toISOString()
            }
        };
    },

    // GET /api/transfer/phone/:phone
    async getTransferByPhone(phone) {
        await delay(1000);
        return {
            success: true,
            transfers: [
                {
                    id: 'DC-2026-ABCD-1234',
                    senderName: 'Kofi Mensah',
                    amountXof: 118400,
                    amountCurrency: 200,
                    currency: 'USD',
                    status: 'LOCKED',
                    statusLabel: 'En cours de livraison',
                    createdAt: new Date().toISOString()
                }
            ]
        };
    },

    // POST /api/retrait (withdraw)
    async requestWithdrawal(data) {
        await delay(1500);
        const refNumber = 'MW-' + Date.now().toString(36).toUpperCase();
        
        return {
            success: true,
            reference: refNumber,
            amount: data.amount,
            operator: data.operator,
            phone: data.phone,
            message: 'Demande de retrait traitée avec succès'
        };
    }
};

// Real API wrapper (when backend is available)
async function apiCall(endpoint, options = {}) {
    if (USE_MOCK) {
        return mockApiCall(endpoint, options);
    }
    
    try {
        const res = await fetch(`${API_BASE}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        
        if (!res.ok) {
            throw new Error(`API Error: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('API call failed:', error);
        return mockApiCall(endpoint, options);
    }
}

function mockApiCall(endpoint, options = {}) {
    const method = options.method || 'GET';
    const body = options.body ? JSON.parse(options.body) : {};
    
    if (endpoint === '/api/rates' && method === 'GET') {
        return mockApi.getRates();
    }
    if (endpoint === '/api/auth/send-otp' && method === 'POST') {
        return mockApi.sendOTP(body.phone);
    }
    if (endpoint === '/api/auth/verify-otp' && method === 'POST') {
        return mockApi.verifyOTP(body.phone, body.otpCode);
    }
    if (endpoint === '/api/transfer/send' && method === 'POST') {
        return mockApi.sendTransfer(body);
    }
    if (endpoint.startsWith('/api/transfer/') && method === 'GET') {
        const id = endpoint.split('/').pop();
        if (id.includes('@') || id.startsWith('+')) {
            return mockApi.getTransferByPhone(id);
        }
        return mockApi.getTransferById(id);
    }
    if (endpoint === '/api/retrait' && method === 'POST') {
        return mockApi.requestWithdrawal(body);
    }
    
    return { error: 'Unknown endpoint' };
}

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
    
    initApp();
});

function initApp() {
    // ==================== PORTAL NAVIGATION ====================
    const portalSelector = document.getElementById('portalSelector');
    const diasporaApp = document.getElementById('diasporaApp');
    const beninApp = document.getElementById('beninApp');

    window.openPortal = function(portal) {
        portalSelector.classList.remove('active-view');
        diasporaApp.classList.remove('active-view');
        beninApp.classList.remove('active-view');

        if (portal === 'diaspora') {
            diasporaApp.classList.add('active-view');
        } else {
            beninApp.classList.add('active-view');
        }
        
        if (window.lucide) lucide.createIcons();
    };

    window.showPortalSelector = function() {
        diasporaApp.classList.remove('active-view');
        beninApp.classList.remove('active-view');
        portalSelector.classList.add('active-view');
    };

    // ==================== SCREEN NAVIGATION ====================
    window.goScreen = function(screenId) {
        const targetScreen = document.getElementById(screenId);
        if (!targetScreen) return;
        
        const appShell = targetScreen.closest('.app-shell');
        const screens = appShell.querySelectorAll('.screen');
        screens.forEach(s => s.classList.remove('active'));

        targetScreen.classList.add('active');

        const nav = appShell.querySelector('.bottom-nav');
        const navItems = nav.querySelectorAll('.bnav-item');

        const dMap = { 'd-home': 0, 'd-transfer': 1, 'd-summary': 1, 'd-sent': 1, 'd-history': 2, 'd-profile': 3, 'd-otp': 1 };
        const bMap = { 'b-home': 0, 'b-receive': 1, 'b-bills': 2, 'b-withdraw': 3, 'b-profile': -1, 'b-search': 0, 'b-withdraw-confirm': 3 };
        const map = screenId.startsWith('d-') ? dMap : bMap;
        const activeIdx = map[screenId] ?? -1;

        navItems.forEach((item, i) => {
            item.classList.toggle('active', i === activeIdx);
        });

        if (window.lucide) lucide.createIcons();
        
        if (screenId === 'd-otp') {
            const otpForm = document.getElementById('otpForm');
            if (otpForm) otpForm.reset();
            const otpInputs = document.querySelectorAll('.otp-input');
            otpInputs.forEach((input, i) => {
                input.value = '';
                if (i === 0) input.focus();
            });
        }
        
        if (screenId === 'b-withdraw') {
            const withdrawAmount = document.getElementById('withdrawAmount');
            if (withdrawAmount) withdrawAmount.value = '50000';
            const methodItems = document.querySelectorAll('.wm-item');
            methodItems.forEach(item => item.classList.remove('selected'));
        }
    };

    // ==================== CALCULATOR ====================
    const rates = EXCHANGE_RATES;
    const flagMap = { USD: 'us', EUR: 'eu', GBP: 'gb', CAD: 'ca' };

    const dSendAmt = document.getElementById('dSendAmt');
    const dSendCur = document.getElementById('dSendCur');
    const dSendFlag = document.getElementById('dSendFlag');
    const dRecvAmt = document.getElementById('dRecvAmt');
    const dFee = document.getElementById('dFee');

    function updateCalc() {
        if (!dSendAmt || !dRecvAmt) return;
        
        const amount = parseFloat(dSendAmt.value) || 0;
        const cur = dSendCur.value;
        const rate = rates[cur] || 592;
        const fee = amount * 0.008;
        const received = amount * rate;

        dRecvAmt.textContent = fmt(received);
        
        if (dFee) {
            dFee.textContent = fmtDecimal(fee) + ' ' + cur;
        }

        const code = flagMap[cur] || 'us';
        if (dSendFlag) {
            dSendFlag.src = `https://flagcdn.com/w40/${code}.png`;
        }
    }

    if (dSendAmt) {
        dSendAmt.addEventListener('input', updateCalc);
    }
    if (dSendCur) {
        dSendCur.addEventListener('change', updateCalc);
    }
    updateCalc();

    const tfAmount = document.getElementById('tfAmount');
    const tfRecv = document.getElementById('tfRecv');
    const tfCurrency = document.getElementById('tfCurrency');
    
    function updateTransferCalc() {
        if (!tfAmount || !tfRecv) return;
        
        const v = parseFloat(tfAmount.value) || 0;
        const cur = tfCurrency ? tfCurrency.value : 'EUR';
        const rate = rates[cur] || 655.957;
        
        tfRecv.textContent = fmt(v * rate);
    }

    if (tfAmount) {
        tfAmount.addEventListener('input', updateTransferCalc);
    }
    if (tfCurrency) {
        tfCurrency.addEventListener('change', updateTransferCalc);
    }

    // ==================== DIASPORA OTP FLOW ====================
    const otpForm = document.getElementById('otpForm');
    if (otpForm) {
        otpForm.addEventListener('submit', handleOTPSubmit);
    }

    const otpInputs = document.querySelectorAll('.otp-input');
    otpInputs.forEach((input, idx) => {
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
            if (e.target.value && idx < otpInputs.length - 1) {
                otpInputs[idx + 1].focus();
            }
        });
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && idx > 0) {
                otpInputs[idx - 1].focus();
            }
        });
        
        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const paste = (e.clipboardData.getData('text') || '').replace(/\D/g, '');
            paste.split('').forEach((char, i) => {
                if (idx + i < otpInputs.length) {
                    otpInputs[idx + i].value = char;
                }
            });
            if (paste.length > 0 && idx + paste.length < otpInputs.length) {
                otpInputs[idx + paste.length].focus();
            } else if (paste.length > 0) {
                otpInputs[otpInputs.length - 1].focus();
            }
        });
    });

    const summaryForm = document.getElementById('summaryForm');
    if (summaryForm) {
        summaryForm.addEventListener('submit', handleSummarySubmit);
    }

    // ==================== BENIN SEARCH & WITHDRAW ====================
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearchSubmit);
    }

    const wmItems = document.querySelectorAll('.wm-item');
    wmItems.forEach(item => {
        item.addEventListener('click', () => {
            wmItems.forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
        });
    });

    const withdrawForm = document.getElementById('withdrawForm');
    if (withdrawForm) {
        withdrawForm.addEventListener('submit', handleWithdrawSubmit);
    }
};

// ========== HANDLERS ==========

async function handleOTPSubmit(e) {
    e.preventDefault();
    
    const phone = document.getElementById('otpPhone')?.value;
    const sendBtn = document.getElementById('sendOtpBtn');
    
    if (!phone || phone.length < 8) {
        showAlert('Veuillez entrer un numéro de téléphone valide');
        return;
    }

    if (sendBtn) {
        sendBtn.disabled = true;
        sendBtn.innerHTML = '<span class="spinner"></span> Envoi...';
    }

    try {
        const result = await apiCall('/api/auth/send-otp', {
            method: 'POST',
            body: JSON.stringify({ phone })
        });

        if (result.success) {
            goScreen('d-verify');
            showAlert('OTP envoyé! (Code: 123456 pour démo)', 'success');
        } else {
            showAlert(result.message || 'Erreur lors de l\'envoi OTP');
        }
    } catch (error) {
        showAlert('Erreur de connexion');
    } finally {
        if (sendBtn) {
            sendBtn.disabled = false;
            sendBtn.innerHTML = 'Envoyer le code <i data-lucide="send"></i>';
            if (window.lucide) lucide.createIcons();
        }
    }
}

async function handleVerifySubmit(e) {
    e.preventDefault();
    
    const phone = document.getElementById('otpPhone')?.value;
    const otpInputs = document.querySelectorAll('.otp-input');
    const otpCode = Array.from(otpInputs).map(input => input.value).join('');
    const verifyBtn = document.getElementById('verifyOtpBtn');
    
    if (otpCode.length !== 6) {
        showAlert('Veuillez entrer le code à 6 chiffres');
        return;
    }

    if (verifyBtn) {
        verifyBtn.disabled = true;
        verifyBtn.innerHTML = '<span class="spinner"></span> Vérification...';
    }

    try {
        const result = await apiCall('/api/auth/verify-otp', {
            method: 'POST',
            body: JSON.stringify({ phone, otpCode })
        });

        if (result.success) {
            localStorage.setItem('dc_token', result.token);
            goScreen('d-transfer');
        } else {
            showAlert(result.message || 'Code OTP incorrect');
        }
    } catch (error) {
        showAlert('Erreur de vérification');
    } finally {
        if (verifyBtn) {
            verifyBtn.disabled = false;
            verifyBtn.innerHTML = 'Vérifier <i data-lucide="check"></i>';
            if (window.lucide) lucide.createIcons();
        }
    }
}

async function handleSummarySubmit(e) {
    e.preventDefault();
    
    const amount = parseFloat(document.getElementById('tfAmount')?.value || 0);
    const recipient = document.getElementById('tfRecipient')?.value || 'Maman';
    const sendBtn = document.getElementById('confirmTransferBtn');
    
    if (amount <= 0) {
        showAlert('Veuillez entrer un montant valide');
        return;
    }

    if (sendBtn) {
        sendBtn.disabled = true;
        sendBtn.innerHTML = '<span class="spinner"></span> Traitement...';
    }

    try {
        const result = await apiCall('/api/transfer/send', {
            method: 'POST',
            body: JSON.stringify({
                amount: amount,
                currency: 'EUR',
                recipient: recipient,
                phone: '+33 6 12 34 56 78'
            })
        });

        if (result.success) {
            document.getElementById('confAmount')?.textContent = fmt(result.amountXof) + ' XOF';
            document.getElementById('confAmountUsd')?.textContent = '(' + result.amount + ' ' + result.currency + ')';
            document.getElementById('confSender')?.textContent = 'Kofi M.';
            document.getElementById('confRecipient')?.textContent = recipient;
            document.getElementById('confTxId')?.textContent = result.transferId;
            document.getElementById('confFee')?.textContent = fmt(result.fee * EXCHANGE_RATES[result.currency]) + ' XOF (0.8%)';
            document.getElementById('confNet')?.textContent = fmt(result.netXof) + ' XOF';
            
            goScreen('d-sent');
        } else {
            showAlert(result.message || 'Erreur lors du transfert');
        }
    } catch (error) {
        showAlert('Erreur de connexion');
    } finally {
        if (sendBtn) {
            sendBtn.disabled = false;
            sendBtn.innerHTML = '<div class="avatar avatar-orange-xs" style="margin-right:8px;">N</div> Confirmer et envoyer <i data-lucide="check"></i>';
            if (window.lucide) lucide.createIcons();
        }
    }
}

async function handleSearchSubmit(e) {
    e.preventDefault();
    
    const phone = document.getElementById('searchPhone')?.value;
    const searchBtn = document.getElementById('searchBtn');
    
    if (!phone || phone.length < 8) {
        showAlert('Veuillez entrer un numéro de téléphone');
        return;
    }

    if (searchBtn) {
        searchBtn.disabled = true;
        searchBtn.innerHTML = '<span class="spinner"></span> Recherche...';
    }

    try {
        const result = await apiCall('/api/transfer/' + phone, { method: 'GET' });
        const resultsContainer = document.getElementById('searchResults');
        
        if (result.success && result.transfers && result.transfers.length > 0) {
            const transfer = result.transfers[0];
            
            document.getElementById('resultSender')?.textContent = transfer.senderName;
            document.getElementById('resultAmount')?.textContent = fmt(transfer.amountXof) + ' XOF';
            document.getElementById('resultStatus')?.textContent = transfer.statusLabel;
            
            const statusBadge = document.getElementById('resultStatusBadge');
            if (statusBadge) {
                statusBadge.className = 'status-badge ' + 
                    (transfer.status === 'LOCKED' ? 'status-orange' : 
                     transfer.status === 'RELEASED' ? 'status-green' : 'status-gray');
            }
            
            document.getElementById('searchForm')?.classList.add('hidden');
            resultsContainer?.classList.remove('hidden');
        } else {
            showAlert('Aucun transfert trouvé pour ce numéro');
        }
    } catch (error) {
        showAlert('Erreur de recherche');
    } finally {
        if (searchBtn) {
            searchBtn.disabled = false;
            searchBtn.innerHTML = 'Rechercher <i data-lucide="search"></i>';
            if (window.lucide) lucide.createIcons();
        }
    }
}

function resetSearch() {
    document.getElementById('searchForm')?.classList.remove('hidden');
    document.getElementById('searchResults')?.classList.add('hidden');
    document.getElementById('searchPhone')?.value = '';
}

async function handleWithdrawSubmit(e) {
    e.preventDefault();
    
    const amount = parseFloat(document.getElementById('withdrawAmount')?.value || 0);
    const selectedMethod = document.querySelector('.wm-item.selected');
    const operator = selectedMethod?.querySelector('strong')?.textContent || 'MTN';
    const withdrawBtn = document.getElementById('withdrawBtn');
    
    if (!selectedMethod) {
        showAlert('Veuillez sélectionner un opérateur');
        return;
    }
    
    if (amount <= 0 || amount > 345500) {
        showAlert('Montant invalide');
        return;
    }

    if (withdrawBtn) {
        withdrawBtn.disabled = true;
        withdrawBtn.innerHTML = '<span class="spinner"></span> Traitement...';
    }

    try {
        const result = await apiCall('/api/retrait', {
            method: 'POST',
            body: JSON.stringify({
                amount: amount,
                operator: operator,
                phone: '+229 97 00 00 00'
            })
        });

        if (result.success) {
            document.getElementById('withdrawRef')?.textContent = result.reference;
            document.getElementById('withdrawAmountConf')?.textContent = fmt(amount) + ' XOF';
            document.getElementById('withdrawOperator')?.textContent = operator;
            
            goScreen('b-withdraw-success');
        } else {
            showAlert(result.message || 'Erreur lors du retrait');
        }
    } catch (error) {
        showAlert('Erreur de connexion');
    } finally {
        if (withdrawBtn) {
            withdrawBtn.disabled = false;
            withdrawBtn.innerHTML = 'Retirer maintenant';
            if (window.lucide) lucide.createIcons();
        }
    }
}

function showAlert(message, type = 'error') {
    const existing = document.querySelector('.alert-toast');
    if (existing) existing.remove();

    const alert = document.createElement('div');
    alert.className = 'alert-toast alert-' + type;
    alert.textContent = message;
    document.body.appendChild(alert);

    setTimeout(() => alert.classList.add('show'), 10);
    setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}
