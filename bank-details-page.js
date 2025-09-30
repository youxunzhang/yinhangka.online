import bankDetailsData from './bank-details.js';

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('bank');
    const detail = slug ? bankDetailsData[slug] : null;

    const detailSection = document.getElementById('bank-detail-container');
    const notFoundSection = document.getElementById('bank-not-found');

    if (!detail) {
        detailSection.setAttribute('hidden', '');
        notFoundSection.removeAttribute('hidden');
        document.title = '银行详情 - 银行卡推荐网站';
        return;
    }

    notFoundSection.setAttribute('hidden', '');
    detailSection.removeAttribute('hidden');

    const { name, fullName, summary, founded, headquarters, phone, website, history, currentStatus, services } = detail;

    document.title = `${name} - 银行详情`;
    const metaDescription = document.getElementById('meta-description');
    if (metaDescription) {
        metaDescription.setAttribute('content', `${name}的发展历程与最新业务概览。`);
    }

    const breadcrumbName = document.getElementById('breadcrumb-bank-name');
    if (breadcrumbName) {
        breadcrumbName.textContent = name;
    }

    const heroInitial = document.getElementById('bank-hero-initial');
    if (heroInitial) {
        heroInitial.textContent = name?.[0] || '银';
    }

    document.getElementById('bank-name').textContent = name;
    document.getElementById('bank-summary').textContent = summary;
    document.getElementById('bank-full-name').textContent = fullName;
    document.getElementById('bank-founded').textContent = founded;
    document.getElementById('bank-headquarters').textContent = headquarters;

    const phoneLink = document.getElementById('bank-phone');
    if (phoneLink) {
        phoneLink.textContent = phone;
        phoneLink.href = `tel:${phone}`;
    }

    const websiteLink = document.getElementById('bank-website');
    if (websiteLink) {
        websiteLink.href = website;
    }

    renderParagraphs(document.getElementById('bank-history'), history);
    renderParagraphs(document.getElementById('bank-status'), currentStatus);
    renderList(document.getElementById('bank-services'), services);
});

function renderParagraphs(container, items) {
    if (!container) return;
    container.innerHTML = '';
    (items || []).forEach(text => {
        const p = document.createElement('p');
        p.textContent = text;
        container.appendChild(p);
    });
}

function renderList(container, items) {
    if (!container) return;
    container.innerHTML = '';
    (items || []).forEach(text => {
        const li = document.createElement('li');
        li.textContent = text;
        container.appendChild(li);
    });
}
