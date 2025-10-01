import html
from pathlib import Path

ROOT = Path(__file__).parent
DATA_FILE = ROOT / 'bank-details.js'
OUTPUT_DIR = ROOT / 'bank-pages'


def load_bank_data():
    text = DATA_FILE.read_text(encoding='utf-8')
    text = text.replace('const bankDetailsData =', 'bankDetailsData =')
    text = text.rsplit('export', 1)[0].strip()
    if text.endswith(';'):
        text = text[:-1]
    namespace = {}
    exec(text, namespace)
    return namespace['bankDetailsData']


def build_paragraphs(items, indent=' ' * 20):
    return '\n'.join(f"{indent}<p>{html.escape(item)}</p>" for item in items)


def build_list(items, indent=' ' * 20):
    return '\n'.join(f"{indent}<li>{html.escape(item)}</li>" for item in items)


def render_page(slug, data):
    name = data['name']
    summary = data['summary']
    full_name = data['fullName']
    founded = data['founded']
    hq = data['headquarters']
    phone = data['phone']
    website = data['website']
    history_html = build_paragraphs(data.get('history', [])) or ' ' * 20 + '<p>暂无相关历史记录。</p>'
    status_html = build_paragraphs(data.get('currentStatus', [])) or ' ' * 20 + '<p>暂无当前状况信息。</p>'
    services_html = build_list(data.get('services', [])) or ' ' * 20 + '<li>暂无服务信息。</li>'
    hero_initial = html.escape(name[0]) if name else '银'
    description = html.escape(f"{name}银行详情：了解发展历程、当前状况与特色服务。{summary}")

    return f"""<!DOCTYPE html>
<html lang=\"zh-CN\">
<head>
    <meta charset=\"UTF-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <meta name=\"description\" content=\"{description}\">
    <title>{html.escape(name)} - 银行详情</title>
    <link rel=\"preload\" href=\"../style.css\" as=\"style\">
    <link rel=\"stylesheet\" href=\"../style.css\">
    <link href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css\" rel=\"stylesheet\">
</head>
<body>
    <header class=\"header\">
        <div class=\"container\">
            <nav class=\"nav-menu\">
                <a href=\"../index.html\" class=\"nav-link active\">
                    <i class=\"fas fa-home\"></i>
                    <span>国内银行</span>
                </a>
                <a href=\"../global-banks.html\" class=\"nav-link\">
                    <i class=\"fas fa-globe\"></i>
                    <span>全球银行</span>
                </a>
                <a href=\"../credit-cards.html\" class=\"nav-link\">
                    <i class=\"fas fa-credit-card\"></i>
                    <span>信用卡</span>
                </a>
                <a href=\"../exchange-rates.html\" class=\"nav-link\">
                    <i class=\"fas fa-exchange-alt\"></i>
                    <span>实时汇率</span>
                </a>
                <a href=\"../loan-interest-calculator.html\" class=\"nav-link\">
                    <i class=\"fas fa-coins\"></i>
                    <span>贷款利率</span>
                </a>
                <a href=\"../credit-card-installment-calculator.html\" class=\"nav-link\">
                    <i class=\"fas fa-calculator\"></i>
                    <span>信用卡分期</span>
                </a>
                <a href=\"../card-bin-lookup.html\" class=\"nav-link\">
                    <i class=\"fas fa-magnifying-glass\"></i>
                    <span>BIN 查询</span>
                </a>
            </nav>
        </div>
    </header>

    <main class=\"main\">
        <div class=\"container\">
            <nav class=\"breadcrumb\" aria-label=\"面包屑导航\">
                <ol itemscope itemtype=\"https://schema.org/BreadcrumbList\">
                    <li itemprop=\"itemListElement\" itemscope itemtype=\"https://schema.org/ListItem\">
                        <a href=\"/\" itemprop=\"item\">
                            <span itemprop=\"name\">首页</span>
                        </a>
                        <meta itemprop=\"position\" content=\"1\" />
                    </li>
                    <li itemprop=\"itemListElement\" itemscope itemtype=\"https://schema.org/ListItem\">
                        <a href=\"../index.html\" itemprop=\"item\">
                            <span itemprop=\"name\">国内银行</span>
                        </a>
                        <meta itemprop=\"position\" content=\"2\" />
                    </li>
                    <li itemprop=\"itemListElement\" itemscope itemtype=\"https://schema.org/ListItem\">
                        <span itemprop=\"name\">{html.escape(name)}</span>
                        <meta itemprop=\"position\" content=\"3\" />
                    </li>
                </ol>
            </nav>

            <section class=\"bank-detail-wrapper\">
                <div class=\"bank-detail-hero\">
                    <div class=\"bank-detail-icon\">{hero_initial}</div>
                    <div class=\"bank-detail-headings\">
                        <h1 class=\"bank-detail-title\">{html.escape(name)}</h1>
                        <p class=\"bank-detail-summary\">{html.escape(summary)}</p>
                    </div>
                </div>

                <div class=\"bank-meta-grid\">
                    <div class=\"bank-meta-card\">
                        <span class=\"bank-meta-label\">银行全称</span>
                        <p class=\"bank-meta-value\">{html.escape(full_name)}</p>
                    </div>
                    <div class=\"bank-meta-card\">
                        <span class=\"bank-meta-label\">成立时间</span>
                        <p class=\"bank-meta-value\">{html.escape(founded)}</p>
                    </div>
                    <div class=\"bank-meta-card\">
                        <span class=\"bank-meta-label\">总部所在地</span>
                        <p class=\"bank-meta-value\">{html.escape(hq)}</p>
                    </div>
                    <div class=\"bank-meta-card\">
                        <span class=\"bank-meta-label\">客服电话</span>
                        <p class=\"bank-meta-value\"><a href=\"tel:{html.escape(phone)}\">{html.escape(phone)}</a></p>
                    </div>
                </div>

                <div class=\"bank-detail-actions\">
                    <a class=\"bank-action-button\" href=\"{html.escape(website)}\" target=\"_blank\" rel=\"noopener noreferrer\">
                        <i class=\"fas fa-external-link-alt\"></i> 访问{html.escape(name)}官网
                    </a>
                    <a href=\"../index.html\" class=\"bank-action-secondary\">
                        <i class=\"fas fa-arrow-left\"></i> 返回银行列表
                    </a>
                </div>

                <section class=\"bank-section\">
                    <h2 class=\"bank-section-title\">
                        <i class=\"fas fa-history\"></i>
                        发展历程
                    </h2>
                    <div class=\"bank-text-block\">
{history_html}
                    </div>
                </section>

                <section class=\"bank-section\">
                    <h2 class=\"bank-section-title\">
                        <i class=\"fas fa-chart-line\"></i>
                        当前状况
                    </h2>
                    <div class=\"bank-text-block\">
{status_html}
                    </div>
                </section>

                <section class=\"bank-section\">
                    <h2 class=\"bank-section-title\">
                        <i class=\"fas fa-hand-holding-usd\"></i>
                        核心服务
                    </h2>
                    <ul class=\"bank-service-list\">
{services_html}
                    </ul>
                </section>
            </section>
        </div>
    </main>
</body>
</html>
"""


def main():
    data = load_bank_data()
    OUTPUT_DIR.mkdir(exist_ok=True)
    for slug, detail in sorted(data.items()):
        page = render_page(slug, detail)
        output_path = OUTPUT_DIR / f"{slug}.html"
        output_path.write_text(page, encoding='utf-8')
        print(f"Wrote {output_path.relative_to(ROOT)}")


if __name__ == '__main__':
    main()
