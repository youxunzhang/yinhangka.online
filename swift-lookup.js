(function () {
    'use strict';

    const swiftData = [
        { bank: '中国银行', city: '北京', country: '中国', swift: 'BKCHCNBJ', address: '北京市西城区复兴门内大街1号', phone: '95566', website: 'https://www.boc.cn/', notes: '中国银行总部，一般用于北京账户或默认收款。', priority: 10 },
        { bank: '中国银行上海分行', city: '上海', country: '中国', swift: 'BKCHCNBJ300', address: '上海市中山东一路23号', phone: '95566', website: 'https://www.boc.cn/', notes: '上海地区常用分行，若开户在上海可优先使用。', priority: 9 },
        { bank: '工商银行', city: '北京', country: '中国', swift: 'ICBKCNBJ', address: '北京市西城区复兴门内大街55号', phone: '95588', website: 'https://www.icbc.com.cn/', notes: '总部代码，部分跨境汇款可直接使用。', priority: 9 },
        { bank: '农业银行', city: '北京', country: '中国', swift: 'ABOCCNBJ', address: '北京市东城区建国门内大街69号', phone: '95599', website: 'https://www.abchina.com/', notes: '如需分行代码请向开户行确认 11 位扩展。', priority: 8 },
        { bank: '建设银行', city: '北京', country: '中国', swift: 'PCBCCNBJ', address: '北京市西城区金融大街25号', phone: '95533', website: 'https://www.ccb.com/', notes: '常用于个人跨境收款，附加 3 位分行代码更精准。', priority: 8 },
        { bank: '交通银行', city: '上海', country: '中国', swift: 'COMMCNSH', address: '上海市银城中路188号', phone: '95559', website: 'https://www.bankcomm.com/', notes: '上海总部代码，外高桥和自贸区账户常见。', priority: 7 },
        { bank: '招商银行', city: '深圳', country: '中国', swift: 'CMBCCNBS', address: '广东省深圳市深南大道7088号', phone: '95555', website: 'https://www.cmbchina.com/', notes: '招商银行深圳总部，常用在跨境电商与个人收款。', priority: 7 },
        { bank: '邮储银行', city: '北京', country: '中国', swift: 'PSBCCNBJ', address: '北京市西城区金融大街3号', phone: '95580', website: 'https://www.psbc.com/', notes: '如收款账户为县域网点，请确认是否有 11 位分支行代码。', priority: 6 },

        { bank: '香港上海汇丰银行', city: '香港', country: '香港', swift: 'HSBCHKHH', address: '香港中环皇后大道中1号', phone: '+852 2233 3000', website: 'https://www.hsbc.com.hk/', notes: '若有分行可补充三位分行号，如 HSBCHKHHHKH。', priority: 10 },
        { bank: '渣打银行香港', city: '香港', country: '香港', swift: 'SCBLHKHH', address: '香港中环德辅道中4-4A号', phone: '+852 2886 8888', website: 'https://www.sc.com/hk/', notes: '跨境公司账户常见，确认币种与账号后再提交。', priority: 8 },
        { bank: '中银香港', city: '香港', country: '香港', swift: 'BKCHHKHH', address: '香港花园道1号中银大厦', phone: '+852 3988 2388', website: 'https://www.bochk.com/', notes: '香港个人及企业账户常用 SWIFT。', priority: 9 },

        { bank: '星展银行', city: '新加坡', country: '新加坡', swift: 'DBSSSGSG', address: '12 Marina Boulevard, Marina Bay Financial Centre Tower 3', phone: '+65 6327 2265', website: 'https://www.dbs.com.sg/', notes: '新加坡常用银行，支持多币种账户。', priority: 9 },
        { bank: '华侨银行', city: '新加坡', country: '新加坡', swift: 'OCBCSGSG', address: '65 Chulia Street, OCBC Centre', phone: '+65 6363 3333', website: 'https://www.ocbc.com/', notes: '建议核对账户类型（个人/企业）及币种。', priority: 8 },
        { bank: '大华银行', city: '新加坡', country: '新加坡', swift: 'UOVBSGSG', address: '80 Raffles Place, UOB Plaza', phone: '+65 6222 2121', website: 'https://www.uobgroup.com/', notes: '跨境贸易与薪资发放常用，确认分行号可更精确。', priority: 7 },

        { bank: '花旗银行纽约', city: '纽约', country: '美国', swift: 'CITIUS33', address: '388 Greenwich Street, New York, NY', phone: '+1 800-285-3000', website: 'https://www.citi.com/', notes: '美元跨境汇款常用，部分账户需提供 Fedwire/ABA。', priority: 9 },
        { bank: '摩根大通银行', city: '纽约', country: '美国', swift: 'CHASUS33', address: '383 Madison Avenue, New York, NY', phone: '+1 212-270-6000', website: 'https://www.jpmorganchase.com/', notes: '收款行若要求中转，请提前确认 Routing Number。', priority: 8 },
        { bank: '美国银行', city: '纽约', country: '美国', swift: 'BOFAUS3N', address: '222 Broadway, New York, NY', phone: '+1 800-432-1000', website: 'https://www.bankofamerica.com/', notes: '美区账户有时需区分美元/外币：USD 用 BOFAUS3N，外币 BOFAUS6S。', priority: 8 },
        { bank: '富国银行', city: '旧金山', country: '美国', swift: 'WFBIUS6S', address: '420 Montgomery Street, San Francisco, CA', phone: '+1 800-869-3557', website: 'https://www.wellsfargo.com/', notes: 'ACH 与电汇的 Routing Number 可能不同，汇款前先确认。', priority: 7 },

        { bank: '汇丰英国', city: '伦敦', country: '英国', swift: 'MIDLGB22', address: '8 Canada Square, London', phone: '+44 345 740 4404', website: 'https://www.hsbc.co.uk/', notes: '英国账户常与 Sort Code 搭配使用，留意 IBAN。', priority: 8 },
        { bank: '巴克莱银行', city: '伦敦', country: '英国', swift: 'BARCGB22', address: '1 Churchill Place, London', phone: '+44 345 734 5345', website: 'https://www.barclays.co.uk/', notes: '英国地区汇款请同时填写 Sort Code 与账号。', priority: 8 },
        { bank: '劳埃德银行', city: '伦敦', country: '英国', swift: 'LOYDGB2L', address: '25 Gresham Street, London', phone: '+44 3453 000 000', website: 'https://www.lloydsbank.com/', notes: '个人与企业账户常见，IBAN 以 GB 开头。', priority: 6 },

        { bank: '德意志银行', city: '法兰克福', country: '德国', swift: 'DEUTDEFF', address: 'Taunusanlage 12, Frankfurt', phone: '+49 69 910-00', website: 'https://www.deutsche-bank.de/', notes: '德国账户常要求 IBAN 与 SWIFT 一并提供。', priority: 8 },
        { bank: '荷兰国际集团', city: '阿姆斯特丹', country: '荷兰', swift: 'INGBNL2A', address: 'Bijlmerdreef 106, Amsterdam', phone: '+31 20 2288888', website: 'https://www.ing.com/', notes: '跨境欧元账户常见，可与 IBAN 搭配。', priority: 6 },
        { bank: '法国巴黎银行', city: '巴黎', country: '法国', swift: 'BNPAFRPP', address: '16 Boulevard des Italiens, Paris', phone: '+33 1 40 14 45 46', website: 'https://group.bnpparibas/', notes: '欧元区 IBAN 必填，SWIFT 作为辅助。', priority: 6 },

        { bank: '瑞银集团', city: '苏黎世', country: '瑞士', swift: 'UBSWCHZH80A', address: 'Bahnhofstrasse 45, Zurich', phone: '+41 44 234 1111', website: 'https://www.ubs.com/', notes: '瑞士账户常需 IBAN 与 SWIFT 搭配。', priority: 7 },
        { bank: '瑞信银行', city: '苏黎世', country: '瑞士', swift: 'CRESCHZZ80A', address: 'Paradeplatz 8, Zurich', phone: '+41 44 333 1111', website: 'https://www.credit-suisse.com/', notes: '建议提前确认收款币种与费用承担方式。', priority: 5 },

        { bank: '澳新银行', city: '墨尔本', country: '澳大利亚', swift: 'ANZBAU3M', address: '833 Collins Street, Docklands', phone: '+61 3 9683 9999', website: 'https://www.anz.com/', notes: '澳洲账户 IBAN 不适用，使用 BSB + Account Number。', priority: 5 },
        { bank: '加拿大皇家银行', city: '多伦多', country: '加拿大', swift: 'ROYCCAT2', address: '200 Bay Street, Toronto', phone: '+1 800-769-2511', website: 'https://www.rbcroyalbank.com/', notes: '加拿大账户常需 Transit Number 与 Institution Number。', priority: 5 },
        { bank: '桑坦德银行', city: '马德里', country: '西班牙', swift: 'BSCHESMM', address: 'Av. de Cantabria s/n, Madrid', phone: '+34 91 289 00 00', website: 'https://www.santander.com/', notes: '西班牙 IBAN 以 ES 开头，跨境欧元常用。', priority: 5 },
        { bank: '意大利联合信贷银行', city: '米兰', country: '意大利', swift: 'UNCRITMM', address: 'Piazza Gae Aulenti 3, Milan', phone: '+39 02 33408973', website: 'https://www.unicreditgroup.eu/', notes: '意大利收款请核对 IBAN，避免位数错误。', priority: 4 }
    ];

    const keywordInput = document.getElementById('swift-keyword');
    const countryFilter = document.getElementById('country-filter');
    const searchForm = document.getElementById('swift-search-form');
    const resultsContainer = document.getElementById('swift-results');
    const cardGrid = document.getElementById('swift-card-grid');
    const summary = document.getElementById('result-summary');

    const uniqueCountries = Array.from(new Set(swiftData.map(item => item.country))).sort();
    uniqueCountries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countryFilter?.appendChild(option);
    });

    const sanitize = (value) => (value || '').toString().trim();

    const buildSwiftCard = (item) => {
        const cityCountry = [item.city, item.country].filter(Boolean).join(' · ');
        const websiteLink = item.website ? `<a href="${item.website}" target="_blank" rel="noopener" class="text-link">访问官网</a>` : '';
        const phoneText = item.phone ? `<span class="badge badge--ghost"><i class="fas fa-phone"></i> ${item.phone}</span>` : '';

        return `
            <article class="info-card info-card--outline swift-card">
                <div class="swift-card__header">
                    <div>
                        <h3 class="swift-card__title">${item.bank}</h3>
                        <p class="swift-card__meta">${cityCountry}</p>
                    </div>
                    <div class="swift-card__code" aria-label="SWIFT/BIC">${item.swift}</div>
                </div>
                <div class="swift-card__body">
                    <p><i class="fas fa-location-dot"></i> ${item.address || '暂无地址信息'}</p>
                    <p><i class="fas fa-phone"></i> ${item.phone || '暂无客服电话'}</p>
                    <p><i class="fas fa-file-alt"></i> ${item.notes || '请向开户行确认最新信息。'}</p>
                </div>
                <div class="swift-card__footer">
                    ${phoneText}
                    ${websiteLink}
                </div>
            </article>
        `;
    };

    const renderResults = (list) => {
        if (!resultsContainer) return;

        if (!list.length) {
            resultsContainer.innerHTML = '<p class="placeholder-text">未找到匹配项，请尝试输入银行全称或切换国家筛选。</p>';
            summary.textContent = '';
            return;
        }

        const sorted = [...list].sort((a, b) => (b.priority || 0) - (a.priority || 0) || a.bank.localeCompare(b.bank));
        resultsContainer.innerHTML = sorted.map(buildSwiftCard).join('');
        summary.textContent = `共找到 ${sorted.length} 条 SWIFT/BIC 参考信息。`;
    };

    const filterData = (keywordValue, countryValue) => {
        const keyword = sanitize(keywordValue).toLowerCase();
        const targetCountry = sanitize(countryValue);

        return swiftData.filter(item => {
            if (targetCountry && targetCountry !== 'all' && item.country !== targetCountry) {
                return false;
            }

            if (!keyword) return true;

            const merged = [item.bank, item.city, item.country, item.swift, item.notes]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();

            return merged.includes(keyword);
        });
    };

    const handleSearch = (event) => {
        event?.preventDefault();
        const keyword = keywordInput?.value || '';
        const country = countryFilter?.value || 'all';
        const list = filterData(keyword, country);
        renderResults(list);
    };

    const renderHighlightCards = () => {
        if (!cardGrid) return;
        const featured = swiftData
            .filter(item => item.priority >= 7)
            .sort((a, b) => (b.priority || 0) - (a.priority || 0));

        cardGrid.innerHTML = featured.map(buildSwiftCard).join('');
        summary.textContent = `展示 ${featured.length} 条热门 SWIFT/BIC 记录，可通过上方查询进一步筛选。`;
    };

    const setupQuickTags = () => {
        document.querySelectorAll('.quick-actions .tag').forEach(button => {
            button.addEventListener('click', () => {
                const kw = button.getAttribute('data-keyword') || '';
                const country = button.getAttribute('data-country');
                if (keywordInput) {
                    keywordInput.value = kw;
                }
                if (countryFilter && country) {
                    countryFilter.value = country;
                }
                handleSearch();
                keywordInput?.focus();
            });
        });
    };

    searchForm?.addEventListener('submit', handleSearch);
    keywordInput?.addEventListener('input', () => {
        if (!keywordInput.value) {
            renderHighlightCards();
        }
    });

    renderHighlightCards();
    setupQuickTags();
})();
