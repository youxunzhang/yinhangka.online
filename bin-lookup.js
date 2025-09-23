(function () {
    'use strict';

    const HISTORY_KEY = 'binLookupHistory';
    const MAX_HISTORY = 8;

    const CARD_TYPE_MAP = {
        credit: '信用卡',
        debit: '借记卡',
        prepaid: '预付卡',
        charge: '签账卡'
    };

    const CARD_SCHEME_MAP = {
        visa: 'VISA',
        mastercard: 'Mastercard',
        unionpay: '银联 UnionPay',
        amex: 'American Express',
        diners: 'Diners Club',
        discover: 'Discover',
        jcb: 'JCB',
        maestro: 'Maestro',
        elo: 'Elo',
        mir: 'MIR',
        rupay: 'RuPay'
    };

    const SOURCE_LABEL_MAP = {
        api: '在线接口',
        fallback: '离线参考'
    };

    const FALLBACK_BIN_DATA = {
        '621483': {
            scheme: 'unionpay',
            brand: '长城借记卡',
            type: 'debit',
            bank: {
                name: '中国银行',
                phone: '95566',
                url: 'https://www.boc.cn/'
            },
            country: {
                alpha2: 'CN',
                name: '中国',
                emoji: '🇨🇳'
            },
            number: {
                length: 19,
                luhn: true
            },
            prepaid: false
        },
        '622202': {
            scheme: 'unionpay',
            brand: '牡丹信用卡',
            type: 'credit',
            bank: {
                name: '中国工商银行',
                phone: '95588',
                url: 'https://www.icbc.com.cn/'
            },
            country: {
                alpha2: 'CN',
                name: '中国',
                emoji: '🇨🇳'
            },
            number: {
                length: 16,
                luhn: true
            },
            prepaid: false
        },
        '622848': {
            scheme: 'unionpay',
            brand: '金穗借记卡',
            type: 'debit',
            bank: {
                name: '中国农业银行',
                phone: '95599',
                url: 'https://www.abchina.com/'
            },
            country: {
                alpha2: 'CN',
                name: '中国',
                emoji: '🇨🇳'
            },
            number: {
                length: 19,
                luhn: true
            },
            prepaid: false
        },
        '622588': {
            scheme: 'unionpay',
            brand: '招商银行信用卡',
            type: 'credit',
            bank: {
                name: '招商银行',
                phone: '95555',
                url: 'https://www.cmbchina.com/'
            },
            country: {
                alpha2: 'CN',
                name: '中国',
                emoji: '🇨🇳'
            },
            number: {
                length: 16,
                luhn: true
            },
            prepaid: false
        },
        '356833': {
            scheme: 'jcb',
            brand: 'JCB 白金卡',
            type: 'credit',
            bank: {
                name: '中国建设银行',
                phone: '95533',
                url: 'https://www.ccb.com/'
            },
            country: {
                alpha2: 'CN',
                name: '中国',
                emoji: '🇨🇳'
            },
            number: {
                length: 16,
                luhn: true
            },
            prepaid: false
        }
    };

    const sanitizeBin = (value) => (value || '').replace(/\D/g, '').slice(0, 8);

    const escapeHTML = (value) => String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    const formatScheme = (scheme) => {
        if (!scheme) {
            return '未知卡组织';
        }

        const normalized = String(scheme).toLowerCase();
        return CARD_SCHEME_MAP[normalized] || scheme.toString().toUpperCase();
    };

    const formatType = (type) => {
        if (!type) {
            return '未知卡种';
        }

        const normalized = String(type).toLowerCase();
        return CARD_TYPE_MAP[normalized] || type;
    };

    const formatBoolean = (value, positiveText, negativeText) => {
        if (value === true) {
            return positiveText;
        }

        if (value === false) {
            return negativeText;
        }

        return '未知';
    };

    const formatCountry = (country) => {
        if (!country) {
            return '暂无数据';
        }

        const parts = [];

        if (country.emoji) {
            parts.push(escapeHTML(country.emoji));
        }

        if (country.name) {
            parts.push(escapeHTML(country.name));
        }

        if (country.alpha2) {
            parts.push(`(${escapeHTML(String(country.alpha2).toUpperCase())})`);
        }

        return parts.join(' ');
    };

    const validateUrl = (value) => {
        if (typeof value !== 'string' || value.trim() === '') {
            return null;
        }

        try {
            return new URL(value).toString();
        } catch (error) {
            return null;
        }
    };

    const loadHistory = () => {
        try {
            const raw = window.localStorage.getItem(HISTORY_KEY);
            if (!raw) {
                return [];
            }

            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
                return parsed;
            }
        } catch (error) {
            console.warn('无法读取 BIN 查询历史记录：', error);
        }

        return [];
    };

    const saveHistory = (records) => {
        try {
            window.localStorage.setItem(HISTORY_KEY, JSON.stringify(records));
        } catch (error) {
            console.warn('无法保存 BIN 查询历史记录：', error);
        }
    };

    const clearHistory = () => {
        try {
            window.localStorage.removeItem(HISTORY_KEY);
        } catch (error) {
            console.warn('无法清除 BIN 查询历史记录：', error);
        }
    };

    const getFallbackData = (bin) => {
        const normalized = sanitizeBin(bin);
        for (let length = Math.min(normalized.length, 8); length >= 6; length -= 1) {
            const prefix = normalized.slice(0, length);
            if (Object.prototype.hasOwnProperty.call(FALLBACK_BIN_DATA, prefix)) {
                return {
                    data: FALLBACK_BIN_DATA[prefix],
                    matchedPrefix: prefix
                };
            }
        }

        return null;
    };

    const renderPlaceholderHistory = (historyContainer) => {
        historyContainer.innerHTML = '<li class="bin-history-empty">暂无查询记录，输入 BIN 号即可开始。</li>';
    };

    const renderHistory = (historyContainer, historyRecords) => {
        if (!historyRecords.length) {
            renderPlaceholderHistory(historyContainer);
            return;
        }

        const itemsHtml = historyRecords.map((record) => {
            const bankName = record.bank ? escapeHTML(record.bank) : '未知发卡行';
            const schemeLabel = record.scheme ? escapeHTML(record.scheme) : '未知卡组织';
            const typeLabel = record.type ? escapeHTML(record.type) : '未知卡种';
            const sourceLabel = SOURCE_LABEL_MAP[record.source] || '未知来源';

            return `
                <li>
                    <button type="button" class="bin-history-item" data-bin="${record.bin}">
                        <span class="bin-history-bin">${record.bin}</span>
                        <span class="bin-history-bank">${bankName}</span>
                        <span class="bin-history-meta">${schemeLabel} · ${typeLabel}</span>
                        <span class="bin-history-source">数据源：${sourceLabel}</span>
                    </button>
                </li>
            `;
        }).join('');

        historyContainer.innerHTML = itemsHtml;
    };

    const updateHistory = (bin, details, source, historyContainer) => {
        const currentHistory = loadHistory();
        const normalizedBin = sanitizeBin(bin);

        const filtered = currentHistory.filter((item) => item.bin !== normalizedBin);
        const newRecord = {
            bin: normalizedBin,
            bank: details.bankName,
            scheme: details.schemeLabel,
            type: details.cardType,
            source,
            timestamp: Date.now()
        };

        filtered.unshift(newRecord);

        const limited = filtered.slice(0, MAX_HISTORY);
        saveHistory(limited);
        renderHistory(historyContainer, limited);
    };

    const renderError = (resultsContainer, message) => {
        resultsContainer.innerHTML = `
            <div class="error-text">
                <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
                <span>${escapeHTML(message)}</span>
            </div>
        `;
    };

    const renderLoading = (resultsContainer, bin) => {
        const label = bin ? `正在查询 BIN ${bin} 的信息...` : '正在查询 BIN 信息...';
        resultsContainer.innerHTML = `
            <p class="placeholder-text">
                <i class="fas fa-spinner fa-spin" aria-hidden="true"></i>
                ${escapeHTML(label)}
            </p>
        `;
    };

    const renderResult = (resultsContainer, bin, payload, sourceMeta) => {
        const source = sourceMeta.source || 'api';
        const data = payload || {};
        const bank = data.bank || {};
        const country = data.country || {};
        const numberInfo = data.number || {};

        const schemeLabel = formatScheme(data.scheme);
        const cardType = formatType(data.type);
        const brand = data.brand ? escapeHTML(data.brand) : '暂无数据';
        const bankName = bank.name ? escapeHTML(bank.name) : '暂无数据';
        const bankPhone = bank.phone ? escapeHTML(bank.phone) : '暂无数据';
        const bankUrl = validateUrl(bank.url);
        const bankCity = bank.city ? escapeHTML(bank.city) : '';
        const countryLabel = formatCountry(country);
        const prepaidLabel = formatBoolean(data.prepaid, '是', '否');
        const lengthLabel = Number.isFinite(numberInfo.length) ? `${numberInfo.length} 位` : '未知';
        const luhnLabel = formatBoolean(numberInfo.luhn, '支持', '不支持');
        const sourceLabel = SOURCE_LABEL_MAP[source] || '未知来源';
        const matchedPrefix = sourceMeta.matchedPrefix && sourceMeta.matchedPrefix !== bin
            ? sourceMeta.matchedPrefix
            : null;

        const detailItems = [
            {
                label: '发卡行',
                value: bankUrl
                    ? `<a href="${escapeHTML(bankUrl)}" target="_blank" rel="noopener">${bankName}</a>${bankCity ? `（${bankCity}）` : ''}`
                    : `${bankName}${bankCity ? `（${bankCity}）` : ''}`
            },
            {
                label: '卡组织',
                value: schemeLabel
            },
            {
                label: '卡种类型',
                value: cardType
            },
            {
                label: '产品等级',
                value: brand
            },
            {
                label: '所属国家/地区',
                value: countryLabel
            },
            {
                label: '是否预付卡',
                value: prepaidLabel
            },
            {
                label: '卡号长度',
                value: lengthLabel
            },
            {
                label: 'Luhn 校验',
                value: luhnLabel
            },
            {
                label: '发卡行电话',
                value: bankPhone
            }
        ];

        const itemsHtml = detailItems.map((item) => `
            <div class="bin-detail-item">
                <span class="bin-detail-label">${escapeHTML(item.label)}</span>
                <span class="bin-detail-value">${item.value || '暂无数据'}</span>
            </div>
        `).join('');

        const noteText = source === 'fallback'
            ? '当前结果来源于本地参考库，仅供快速核对。建议联系发卡银行或官方渠道确认最终信息。'
            : '以上信息来源于公开 BIN 数据接口，仅供参考，实际信息请以发卡银行为准。';

        const prefixNote = matchedPrefix
            ? `<li>使用了本地 BIN 前缀 <span class="bin-highlight">${escapeHTML(matchedPrefix)}</span> 的参考数据。</li>`
            : '';

        resultsContainer.innerHTML = `
            <div class="bin-results-summary">
                <span class="bin-number">BIN ${escapeHTML(bin)}</span>
                <span class="bin-results-badge"><i class="fas fa-network-wired" aria-hidden="true"></i>${schemeLabel}</span>
                <span class="bin-results-badge"><i class="fas fa-id-card" aria-hidden="true"></i>${cardType}</span>
                <span class="bin-detail-source"><i class="fas fa-database" aria-hidden="true"></i>数据来源：${sourceLabel}</span>
            </div>
            <div class="bin-details-grid">
                ${itemsHtml}
            </div>
            <p class="bin-results-note">
                ${noteText}
                ${prefixNote ? `<ul class="bin-note-list">${prefixNote}</ul>` : ''}
            </p>
        `;

        return {
            bankName: bank.name || '未知发卡行',
            schemeLabel,
            cardType
        };
    };

    const fetchBinInformation = async (bin) => {
        const endpoint = `https://lookup.binlist.net/${bin}`;
        const response = await fetch(endpoint, {
            headers: {
                Accept: 'application/json'
            }
        });

        if (!response.ok) {
            const error = new Error('请求 BIN 信息失败');
            error.status = response.status;
            throw error;
        }

        return response.json();
    };

    document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('bin-lookup-form');
        const input = document.getElementById('card-bin');
        const resultsContainer = document.getElementById('bin-results');
        const historyContainer = document.getElementById('bin-history-list');
        const clearButton = document.getElementById('clear-bin-history');

        if (!form || !input || !resultsContainer || !historyContainer) {
            return;
        }

        const initialHistory = loadHistory();
        renderHistory(historyContainer, initialHistory);

        input.addEventListener('input', (event) => {
            const sanitized = sanitizeBin(event.target.value);
            if (sanitized !== event.target.value) {
                event.target.value = sanitized;
            }
        });

        const handleLookup = async (bin) => {
            const normalizedBin = sanitizeBin(bin);

            if (normalizedBin.length < 6) {
                input.setAttribute('aria-invalid', 'true');
                renderError(resultsContainer, '请输入至少 6 位数字的 BIN 号。');
                return;
            }

            input.setAttribute('aria-invalid', 'false');
            renderLoading(resultsContainer, normalizedBin);

            try {
                const apiData = await fetchBinInformation(normalizedBin);
                const details = renderResult(resultsContainer, normalizedBin, apiData, { source: 'api' });
                updateHistory(normalizedBin, details, 'api', historyContainer);
            } catch (error) {
                console.warn('在线查询 BIN 信息失败，尝试使用本地数据。', error);
                const fallback = getFallbackData(normalizedBin);

                if (fallback) {
                    const details = renderResult(resultsContainer, normalizedBin, fallback.data, {
                        source: 'fallback',
                        matchedPrefix: fallback.matchedPrefix
                    });
                    updateHistory(normalizedBin, details, 'fallback', historyContainer);
                } else if (error.status === 404) {
                    renderError(resultsContainer, '未查询到该 BIN 对应的信息，请核实输入是否正确。');
                } else {
                    renderError(resultsContainer, '查询失败，请检查网络连接或稍后再试。');
                }
            }
        };

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const normalized = sanitizeBin(input.value);
            input.value = normalized;
            handleLookup(normalized);
        });

        historyContainer.addEventListener('click', (event) => {
            const trigger = event.target.closest('.bin-history-item');
            if (!trigger) {
                return;
            }

            const { bin } = trigger.dataset;
            if (!bin) {
                return;
            }

            input.value = bin;
            input.focus();
            handleLookup(bin);
        });

        if (clearButton) {
            clearButton.addEventListener('click', () => {
                clearHistory();
                renderPlaceholderHistory(historyContainer);
            });
        }
    });
})();
