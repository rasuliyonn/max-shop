from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import cm, mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.platypus import PageBreak
from reportlab.pdfgen import canvas
from reportlab.platypus import BaseDocTemplate, PageTemplate, Frame

# ─── Colors ───────────────────────────────────────────────────────────────────
INDIGO      = colors.HexColor("#4F46E5")
INDIGO_DARK = colors.HexColor("#3730A3")
INDIGO_LIGHT= colors.HexColor("#818CF8")
BG_DARK     = colors.HexColor("#0F172A")
BG_CARD     = colors.HexColor("#1E293B")
TEXT_WHITE  = colors.HexColor("#F8FAFC")
TEXT_GRAY   = colors.HexColor("#94A3B8")
TEXT_LIGHT  = colors.HexColor("#CBD5E1")
ACCENT      = colors.HexColor("#06B6D4")
GREEN       = colors.HexColor("#10B981")
ORANGE      = colors.HexColor("#F59E0B")
PINK        = colors.HexColor("#EC4899")
SLIDE_BG    = colors.HexColor("#0F172A")

PAGE_W, PAGE_H = A4

# ─── Styles ───────────────────────────────────────────────────────────────────
styles = getSampleStyleSheet()

def s(name, **kw):
    return ParagraphStyle(name, **kw)

TITLE_MAIN = s("TitleMain",
    fontName="Helvetica-Bold", fontSize=42, textColor=TEXT_WHITE,
    alignment=TA_CENTER, leading=52, spaceAfter=8)

TITLE_SUB = s("TitleSub",
    fontName="Helvetica", fontSize=16, textColor=INDIGO_LIGHT,
    alignment=TA_CENTER, leading=24, spaceAfter=4)

SLIDE_TITLE = s("SlideTitle",
    fontName="Helvetica-Bold", fontSize=28, textColor=TEXT_WHITE,
    alignment=TA_LEFT, leading=36, spaceAfter=2)

SECTION_LABEL = s("SectionLabel",
    fontName="Helvetica-Bold", fontSize=11, textColor=INDIGO_LIGHT,
    alignment=TA_LEFT, leading=16, spaceAfter=14,
    letterSpacing=2)

BODY = s("Body",
    fontName="Helvetica", fontSize=13, textColor=TEXT_LIGHT,
    alignment=TA_LEFT, leading=22, spaceAfter=6)

BODY_SM = s("BodySm",
    fontName="Helvetica", fontSize=11, textColor=TEXT_LIGHT,
    alignment=TA_LEFT, leading=18, spaceAfter=4)

BULLET = s("Bullet",
    fontName="Helvetica", fontSize=13, textColor=TEXT_LIGHT,
    alignment=TA_LEFT, leading=22, spaceAfter=5,
    leftIndent=20, bulletIndent=0)

CAPTION = s("Caption",
    fontName="Helvetica", fontSize=10, textColor=TEXT_GRAY,
    alignment=TA_CENTER, leading=16)

HIGHLIGHT = s("Highlight",
    fontName="Helvetica-Bold", fontSize=32, textColor=INDIGO_LIGHT,
    alignment=TA_CENTER, leading=40)

TAG_STYLE = s("Tag",
    fontName="Helvetica-Bold", fontSize=10, textColor=TEXT_WHITE,
    alignment=TA_CENTER, leading=14)

# ─── Helpers ──────────────────────────────────────────────────────────────────
def hr(color=INDIGO, width=1.5):
    return HRFlowable(width="100%", thickness=width, color=color, spaceAfter=18, spaceBefore=4)

def sp(h=0.3):
    return Spacer(1, h*cm)

def tag_table(tags, bg=INDIGO):
    """Render a row of pill-style tags."""
    cells = [[Paragraph(t, TAG_STYLE) for t in tags]]
    col_w = PAGE_W / len(tags) - 20
    tbl = Table(cells, colWidths=[col_w]*len(tags))
    tbl.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), bg),
        ("ROUNDEDCORNERS", [6]),
        ("ALIGN", (0,0), (-1,-1), "CENTER"),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ("TOPPADDING", (0,0), (-1,-1), 8),
        ("BOTTOMPADDING", (0,0), (-1,-1), 8),
        ("LEFTPADDING", (0,0), (-1,-1), 10),
        ("RIGHTPADDING", (0,0), (-1,-1), 10),
        ("GRID", (0,0), (-1,-1), 0, bg),
    ]))
    return tbl

def card_row(items, bg=BG_CARD):
    """Render a row of info cards [{title, value, color}]"""
    cells = []
    for item in items:
        title_p = Paragraph(item["title"], s("ct", fontName="Helvetica", fontSize=10,
            textColor=TEXT_GRAY, alignment=TA_CENTER, leading=14))
        value_p = Paragraph(item["value"], s("cv", fontName="Helvetica-Bold", fontSize=18,
            textColor=item.get("color", INDIGO_LIGHT), alignment=TA_CENTER, leading=24))
        cells.append([title_p, value_p])

    col_w = (PAGE_W - 80) / len(items)
    rows = [[c[0] for c in cells], [c[1] for c in cells]]
    tbl = Table(rows, colWidths=[col_w]*len(items))
    tbl.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), bg),
        ("ALIGN", (0,0), (-1,-1), "CENTER"),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ("TOPPADDING", (0,0), (-1,-1), 14),
        ("BOTTOMPADDING", (0,0), (-1,-1), 14),
        ("LEFTPADDING", (0,0), (-1,-1), 8),
        ("RIGHTPADDING", (0,0), (-1,-1), 8),
        ("LINEAFTER", (0,0), (-2,-1), 0.5, colors.HexColor("#334155")),
        ("ROUNDEDCORNERS", [8]),
    ]))
    return tbl

def two_col(left_items, right_items, icon_l="▶", icon_r="▶"):
    """Two-column bullet list."""
    def make_bullets(items, icon):
        rows = []
        for item in items:
            rows.append([
                Paragraph(f'<font color="#4F46E5">{icon}</font>', s("ic", fontName="Helvetica-Bold",
                    fontSize=12, textColor=INDIGO, leading=20)),
                Paragraph(item, BODY_SM)
            ])
        tbl = Table(rows, colWidths=[20, (PAGE_W/2 - 60)])
        tbl.setStyle(TableStyle([
            ("VALIGN", (0,0), (-1,-1), "TOP"),
            ("TOPPADDING", (0,0), (-1,-1), 4),
            ("BOTTOMPADDING", (0,0), (-1,-1), 4),
        ]))
        return tbl

    combined = Table(
        [[make_bullets(left_items, icon_l), make_bullets(right_items, icon_r)]],
        colWidths=[PAGE_W/2 - 50, PAGE_W/2 - 50]
    )
    combined.setStyle(TableStyle([
        ("VALIGN", (0,0), (-1,-1), "TOP"),
        ("LINEAFTER", (0,0), (0,-1), 0.5, colors.HexColor("#334155")),
        ("RIGHTPADDING", (0,0), (0,-1), 20),
        ("LEFTPADDING", (1,0), (1,-1), 20),
    ]))
    return combined

def route_table(routes):
    header = [
        Paragraph("Маршрут", s("th", fontName="Helvetica-Bold", fontSize=11,
            textColor=TEXT_WHITE, leading=16)),
        Paragraph("Компонент", s("th", fontName="Helvetica-Bold", fontSize=11,
            textColor=TEXT_WHITE, leading=16)),
        Paragraph("Описание", s("th", fontName="Helvetica-Bold", fontSize=11,
            textColor=TEXT_WHITE, leading=16)),
    ]
    rows = [header]
    for r in routes:
        rows.append([
            Paragraph(f'<font color="#818CF8">{r[0]}</font>',
                s("td0", fontName="Helvetica-Bold", fontSize=10, textColor=INDIGO_LIGHT, leading=16)),
            Paragraph(r[1], s("td1", fontName="Helvetica", fontSize=10, textColor=ACCENT, leading=16)),
            Paragraph(r[2], s("td2", fontName="Helvetica", fontSize=10, textColor=TEXT_LIGHT, leading=16)),
        ])

    col_w = [120, 140, PAGE_W - 80 - 120 - 140]
    tbl = Table(rows, colWidths=col_w)
    tbl.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), INDIGO_DARK),
        ("BACKGROUND", (0,1), (-1,-1), BG_CARD),
        ("ROWBACKGROUNDS", (0,1), (-1,-1), [BG_CARD, colors.HexColor("#1A2540")]),
        ("ALIGN", (0,0), (-1,-1), "LEFT"),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ("TOPPADDING", (0,0), (-1,-1), 8),
        ("BOTTOMPADDING", (0,0), (-1,-1), 8),
        ("LEFTPADDING", (0,0), (-1,-1), 10),
        ("LINEBELOW", (0,0), (-1,-1), 0.3, colors.HexColor("#334155")),
    ]))
    return tbl

# ─── Background canvas ────────────────────────────────────────────────────────
def draw_slide_bg(canvas_obj, doc):
    canvas_obj.saveState()
    canvas_obj.setFillColor(BG_DARK)
    canvas_obj.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

    # Subtle top accent bar
    canvas_obj.setFillColor(INDIGO)
    canvas_obj.rect(0, PAGE_H - 4, PAGE_W, 4, fill=1, stroke=0)

    # Bottom bar
    canvas_obj.setFillColor(colors.HexColor("#1E293B"))
    canvas_obj.rect(0, 0, PAGE_W, 28, fill=1, stroke=0)

    # Page number
    canvas_obj.setFont("Helvetica", 9)
    canvas_obj.setFillColor(TEXT_GRAY)
    canvas_obj.drawRightString(PAGE_W - 30, 10, f"Max.Shop — стр. {doc.page}")

    # Logo watermark bottom left
    canvas_obj.setFont("Helvetica-Bold", 9)
    canvas_obj.setFillColor(colors.HexColor("#334155"))
    canvas_obj.drawString(30, 10, "MAX.SHOP")

    canvas_obj.restoreState()

def draw_title_bg(canvas_obj, doc):
    canvas_obj.saveState()
    # Full dark bg
    canvas_obj.setFillColor(BG_DARK)
    canvas_obj.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)

    # Big indigo gradient block top
    canvas_obj.setFillColor(INDIGO_DARK)
    canvas_obj.rect(0, PAGE_H * 0.45, PAGE_W, PAGE_H * 0.55, fill=1, stroke=0)

    # Accent diagonal strip
    canvas_obj.setFillColor(INDIGO)
    p = canvas_obj.beginPath()
    p.moveTo(0, PAGE_H * 0.45)
    p.lineTo(PAGE_W, PAGE_H * 0.52)
    p.lineTo(PAGE_W, PAGE_H * 0.45)
    p.close()
    canvas_obj.drawPath(p, fill=1, stroke=0)

    # Dots pattern (decorative)
    canvas_obj.setFillColor(colors.HexColor("#312e81"))
    for x in range(40, int(PAGE_W), 24):
        for y in range(int(PAGE_H * 0.48), int(PAGE_H), 24):
            canvas_obj.circle(x, y, 1.5, fill=1, stroke=0)

    # Bottom bar
    canvas_obj.setFillColor(INDIGO_DARK)
    canvas_obj.rect(0, 0, PAGE_W, 28, fill=1, stroke=0)
    canvas_obj.setFont("Helvetica", 9)
    canvas_obj.setFillColor(INDIGO_LIGHT)
    canvas_obj.drawCentredString(PAGE_W/2, 10, "Презентация учебного проекта • 2026")

    canvas_obj.restoreState()

# ─── Build story ──────────────────────────────────────────────────────────────
story = []

# ══════════════════════════════════════════════
# SLIDE 1 — TITLE
# ══════════════════════════════════════════════
story.append(Spacer(1, 5.5*cm))
story.append(Paragraph("MAX.SHOP", TITLE_MAIN))
story.append(sp(0.4))
story.append(Paragraph("Интернет-магазин одежды и аксессуаров", TITLE_SUB))
story.append(sp(0.3))
story.append(Paragraph("Учебный Frontend-проект", s("ts3",
    fontName="Helvetica", fontSize=13, textColor=TEXT_GRAY,
    alignment=TA_CENTER, leading=20)))
story.append(sp(2.5))
story.append(tag_table(["React 19", "Vite", "Tailwind CSS 4", "Zustand", "React Router 7"]))
story.append(sp(2))
story.append(Paragraph("2026", s("year",
    fontName="Helvetica", fontSize=11, textColor=TEXT_GRAY,
    alignment=TA_CENTER, leading=16)))
story.append(PageBreak())

# ══════════════════════════════════════════════
# SLIDE 2 — О ПРОЕКТЕ
# ══════════════════════════════════════════════
story.append(sp(0.5))
story.append(Paragraph("О ПРОЕКТЕ", SECTION_LABEL))
story.append(Paragraph("Что такое Max.Shop?", SLIDE_TITLE))
story.append(hr())
story.append(sp(0.3))
story.append(Paragraph(
    "Max.Shop — это полноценный интернет-магазин брендовой одежды и обуви. "
    "Проект реализован как Single Page Application (SPA) с современным стеком технологий.",
    BODY))
story.append(sp(0.8))
story.append(card_row([
    {"title": "Товаров в каталоге", "value": "18+", "color": INDIGO_LIGHT},
    {"title": "Брендов", "value": "13", "color": ACCENT},
    {"title": "Категорий", "value": "3", "color": GREEN},
    {"title": "Страниц/маршрутов", "value": "10", "color": ORANGE},
]))
story.append(sp(0.8))
story.append(Paragraph(
    "Проект охватывает все ключевые функции e-commerce платформы — "
    "от просмотра каталога до оформления заказа. Интерфейс полностью адаптивен "
    "для мобильных устройств и десктопа.",
    BODY))
story.append(PageBreak())

# ══════════════════════════════════════════════
# SLIDE 3 — ТЕХНОЛОГИИ
# ══════════════════════════════════════════════
story.append(sp(0.5))
story.append(Paragraph("ТЕХНОЛОГИИ", SECTION_LABEL))
story.append(Paragraph("Технологический стек", SLIDE_TITLE))
story.append(hr())
story.append(sp(0.3))

tech_data = [
    [
        Paragraph("Технология", s("th", fontName="Helvetica-Bold", fontSize=11,
            textColor=TEXT_WHITE, leading=16)),
        Paragraph("Версия", s("th", fontName="Helvetica-Bold", fontSize=11,
            textColor=TEXT_WHITE, leading=16)),
        Paragraph("Назначение", s("th", fontName="Helvetica-Bold", fontSize=11,
            textColor=TEXT_WHITE, leading=16)),
    ],
    [Paragraph("React", s("td", fontName="Helvetica-Bold", fontSize=11, textColor=ACCENT, leading=16)),
     Paragraph("19.x", BODY_SM), Paragraph("UI-библиотека, компонентный подход", BODY_SM)],
    [Paragraph("Vite", s("td", fontName="Helvetica-Bold", fontSize=11, textColor=GREEN, leading=16)),
     Paragraph("7.x", BODY_SM), Paragraph("Сборщик и dev-сервер с HMR", BODY_SM)],
    [Paragraph("Tailwind CSS", s("td", fontName="Helvetica-Bold", fontSize=11, textColor=INDIGO_LIGHT, leading=16)),
     Paragraph("4.x", BODY_SM), Paragraph("Utility-first стилизация, адаптивность", BODY_SM)],
    [Paragraph("Zustand", s("td", fontName="Helvetica-Bold", fontSize=11, textColor=ORANGE, leading=16)),
     Paragraph("5.x", BODY_SM), Paragraph("Глобальное управление состоянием", BODY_SM)],
    [Paragraph("React Router", s("td", fontName="Helvetica-Bold", fontSize=11, textColor=PINK, leading=16)),
     Paragraph("7.x", BODY_SM), Paragraph("Клиентская маршрутизация SPA", BODY_SM)],
    [Paragraph("React Icons", s("td", fontName="Helvetica-Bold", fontSize=11, textColor=ACCENT, leading=16)),
     Paragraph("5.x", BODY_SM), Paragraph("Библиотека SVG-иконок", BODY_SM)],
]

tech_tbl = Table(tech_data, colWidths=[130, 70, PAGE_W - 80 - 200])
tech_tbl.setStyle(TableStyle([
    ("BACKGROUND", (0,0), (-1,0), INDIGO_DARK),
    ("ROWBACKGROUNDS", (0,1), (-1,-1), [BG_CARD, colors.HexColor("#1A2540")]),
    ("ALIGN", (0,0), (-1,-1), "LEFT"),
    ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ("TOPPADDING", (0,0), (-1,-1), 9),
    ("BOTTOMPADDING", (0,0), (-1,-1), 9),
    ("LEFTPADDING", (0,0), (-1,-1), 12),
    ("LINEBELOW", (0,0), (-1,-1), 0.3, colors.HexColor("#334155")),
]))
story.append(tech_tbl)
story.append(PageBreak())

# ══════════════════════════════════════════════
# SLIDE 4 — АРХИТЕКТУРА
# ══════════════════════════════════════════════
story.append(sp(0.5))
story.append(Paragraph("АРХИТЕКТУРА", SECTION_LABEL))
story.append(Paragraph("Структура проекта", SLIDE_TITLE))
story.append(hr())
story.append(sp(0.2))

arch_data = [
    [Paragraph("📁 src/components/", s("f", fontName="Helvetica-Bold", fontSize=12,
        textColor=INDIGO_LIGHT, leading=18)),
     Paragraph("18 компонентов — вся логика отображения разбита на переиспользуемые блоки", BODY_SM)],
    [Paragraph("📁 src/managment/", s("f", fontName="Helvetica-Bold", fontSize=12,
        textColor=GREEN, leading=18)),
     Paragraph("Zustand-store (useBasket.js) — централизованное хранилище корзины с persist", BODY_SM)],
    [Paragraph("📁 src/conts/", s("f", fontName="Helvetica-Bold", fontSize=12,
        textColor=ORANGE, leading=18)),
     Paragraph("Константы: products.js (каталог), brandLogo.js (логотипы брендов)", BODY_SM)],
    [Paragraph("📄 src/App.jsx", s("f", fontName="Helvetica-Bold", fontSize=12,
        textColor=ACCENT, leading=18)),
     Paragraph("Корневой компонент: роутинг, страница Home, сборка секций", BODY_SM)],
    [Paragraph("📄 src/index.css", s("f", fontName="Helvetica-Bold", fontSize=12,
        textColor=PINK, leading=18)),
     Paragraph("Глобальные стили, кастомные CSS-классы btn-primary, btn-outline", BODY_SM)],
    [Paragraph("📄 vite.config.js", s("f", fontName="Helvetica-Bold", fontSize=12,
        textColor=TEXT_GRAY, leading=18)),
     Paragraph("Конфигурация Vite с плагинами React и Tailwind", BODY_SM)],
]

arch_tbl = Table(arch_data, colWidths=[160, PAGE_W - 80 - 160])
arch_tbl.setStyle(TableStyle([
    ("ROWBACKGROUNDS", (0,0), (-1,-1), [BG_CARD, colors.HexColor("#1A2540")]),
    ("ALIGN", (0,0), (-1,-1), "LEFT"),
    ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ("TOPPADDING", (0,0), (-1,-1), 10),
    ("BOTTOMPADDING", (0,0), (-1,-1), 10),
    ("LEFTPADDING", (0,0), (-1,-1), 12),
    ("RIGHTPADDING", (0,0), (-1,-1), 12),
    ("LINEBELOW", (0,0), (-1,-1), 0.3, colors.HexColor("#334155")),
]))
story.append(arch_tbl)
story.append(PageBreak())

# ══════════════════════════════════════════════
# SLIDE 5 — МАРШРУТИЗАЦИЯ
# ══════════════════════════════════════════════
story.append(sp(0.5))
story.append(Paragraph("НАВИГАЦИЯ", SECTION_LABEL))
story.append(Paragraph("Маршруты приложения", SLIDE_TITLE))
story.append(hr())
story.append(sp(0.3))
story.append(route_table([
    ["/",             "Home",        "Главная: слайдер, бренды, новинки, распродажа, популярное"],
    ["/all",          "All",         "Полный каталог всех товаров"],
    ["/news",         "News",        "Раздел новых товаров (категория new)"],
    ["/on_sale",      "OnSale",      "Товары со скидкой (категория on_sale)"],
    ["/popular",      "Popular",     "Популярные товары (категория popular)"],
    ["/product/:id",  "ProductPage", "Детальная страница товара"],
    ["/brand/:name",  "BrandPage",   "Страница конкретного бренда"],
    ["/basket",       "Basket",      "Корзина покупателя"],
    ["/login",        "LoginForm",   "Форма входа"],
    ["/reg",          "RegForm",     "Форма регистрации"],
    ["*",             "NotFound",    "404 — страница не найдена"],
]))
story.append(PageBreak())

# ══════════════════════════════════════════════
# SLIDE 6 — ГЛАВНАЯ СТРАНИЦА
# ══════════════════════════════════════════════
story.append(sp(0.5))
story.append(Paragraph("ГЛАВНАЯ СТРАНИЦА", SECTION_LABEL))
story.append(Paragraph("Структура Home-страницы", SLIDE_TITLE))
story.append(hr())
story.append(sp(0.3))
story.append(two_col(
    [
        "Слайдер (Slider) — промо-баннеры с анимацией",
        "Секция брендов (Brands) — горизонтальный список",
        "Новые товары — 4 карточки + кнопка «Смотреть все»",
        "Распродажа — 4 карточки со скидками",
        "Популярные товары — 4 популярных позиции",
        "Footer — подвал сайта",
    ],
    [
        "Адаптивная сетка: 1 / 2 / 3 / 4 колонки",
        "Каждая секция фильтрует товары по category",
        "Кнопки навигации к полным разделам",
        "Компонент Card переиспользуется везде",
        "Sticky Header с поиском и корзиной",
        "Responsive Mobile-меню (бургер)",
    ]
))
story.append(sp(0.6))
story.append(hr(color=colors.HexColor("#334155"), width=0.5))
story.append(sp(0.3))
story.append(Paragraph(
    "Главная страница динамически фильтрует массив товаров по полю "
    "<font color='#818CF8'>category</font> и отображает по 4 товара в каждой секции. "
    "Данные хранятся в Zustand-store и доступны во всём приложении без prop-drilling.",
    BODY_SM))
story.append(PageBreak())

# ══════════════════════════════════════════════
# SLIDE 7 — КОМПОНЕНТ HEADER
# ══════════════════════════════════════════════
story.append(sp(0.5))
story.append(Paragraph("HEADER", SECTION_LABEL))
story.append(Paragraph("Шапка сайта и поиск", SLIDE_TITLE))
story.append(hr())
story.append(sp(0.3))

story.append(Paragraph("Функциональность Header:", s("h3", fontName="Helvetica-Bold",
    fontSize=14, textColor=TEXT_WHITE, leading=20, spaceAfter=10)))

feat_data = [
    ["Логотип", "Max.Shop — ссылка на главную страницу"],
    ["Навигация", "Все товары / Распродажа / Новые / Популярные"],
    ["Live-поиск", "Поиск по названию товара в реальном времени (>1 символа)"],
    ["Дропдаун", "До 5 результатов с фото и ценой, клик переходит на товар"],
    ["Корзина", "Иконка со счётчиком количества товаров в корзине"],
    ["Профиль", "Иконка пользователя → переход на /login"],
    ["Мобильное меню", "Бургер-кнопка, раскрывающееся меню на мобильных"],
    ["Sticky", "Header прилипает к верху при скролле (z-index 40)"],
]

feat_tbl = Table(feat_data, colWidths=[120, PAGE_W - 80 - 120])
feat_tbl.setStyle(TableStyle([
    ("ROWBACKGROUNDS", (0,0), (-1,-1), [BG_CARD, colors.HexColor("#1A2540")]),
    ("FONTNAME", (0,0), (0,-1), "Helvetica-Bold"),
    ("TEXTCOLOR", (0,0), (0,-1), INDIGO_LIGHT),
    ("TEXTCOLOR", (1,0), (1,-1), TEXT_LIGHT),
    ("FONTSIZE", (0,0), (-1,-1), 11),
    ("LEADING", (0,0), (-1,-1), 16),
    ("TOPPADDING", (0,0), (-1,-1), 8),
    ("BOTTOMPADDING", (0,0), (-1,-1), 8),
    ("LEFTPADDING", (0,0), (-1,-1), 12),
    ("LINEBELOW", (0,0), (-1,-1), 0.3, colors.HexColor("#334155")),
]))
story.append(feat_tbl)
story.append(PageBreak())

# ══════════════════════════════════════════════
# SLIDE 8 — КАТАЛОГ И КАРТОЧКИ
# ══════════════════════════════════════════════
story.append(sp(0.5))
story.append(Paragraph("КАТАЛОГ ТОВАРОВ", SECTION_LABEL))
story.append(Paragraph("Карточки и страница товара", SLIDE_TITLE))
story.append(hr())
story.append(sp(0.3))

story.append(two_col(
    [
        "Карточка (Card) — переиспользуемый компонент",
        "Фото товара с hover-эффектом",
        "Название, бренд, цена",
        "Выбор цвета (цветовые кружки)",
        "Выбор размера (S/M/L/XL или числа)",
        "Кнопка добавления в корзину",
        "Навигация на детальную страницу",
    ],
    [
        "ProductPage — полная информация",
        "Галерея / основное фото",
        "Описание товара",
        "Характеристики (список)",
        "Бренд-ссылка на BrandPage",
        "Выбор цвета и размера",
        "Добавление в корзину из детальной",
    ]
))
story.append(sp(0.5))
story.append(Paragraph(
    "Данные передаются через React Router state при переходе на /product/:id. "
    "Компонент Card принимает: id, img_src, name, price, colors, sizes, "
    "description, brand, characteristics.",
    BODY_SM))
story.append(sp(0.5))
story.append(card_row([
    {"title": "Категория NEW", "value": "7 товаров", "color": GREEN},
    {"title": "Категория ON_SALE", "value": "7 товаров", "color": ORANGE},
    {"title": "Категория POPULAR", "value": "4 товара", "color": PINK},
]))
story.append(PageBreak())

# ══════════════════════════════════════════════
# SLIDE 9 — КОРЗИНА
# ══════════════════════════════════════════════
story.append(sp(0.5))
story.append(Paragraph("КОРЗИНА", SECTION_LABEL))
story.append(Paragraph("Управление корзиной покупок", SLIDE_TITLE))
story.append(hr())
story.append(sp(0.3))

basket_data = [
    [Paragraph("Функция", s("th", fontName="Helvetica-Bold", fontSize=11,
        textColor=TEXT_WHITE, leading=16)),
     Paragraph("Реализация", s("th", fontName="Helvetica-Bold", fontSize=11,
        textColor=TEXT_WHITE, leading=16))],
    [Paragraph("Добавление товара", s("f", fontName="Helvetica-Bold", fontSize=11,
        textColor=INDIGO_LIGHT, leading=16)),
     Paragraph("addCart(product) через Zustand action", BODY_SM)],
    [Paragraph("Удаление товара", s("f", fontName="Helvetica-Bold", fontSize=11,
        textColor=INDIGO_LIGHT, leading=16)),
     Paragraph("deleteCart(id) — фильтрация массива корзины", BODY_SM)],
    [Paragraph("Итоговая сумма", s("f", fontName="Helvetica-Bold", fontSize=11,
        textColor=INDIGO_LIGHT, leading=16)),
     Paragraph("reduce() по ценам всех товаров в carts[]", BODY_SM)],
    [Paragraph("Счётчик в шапке", s("f", fontName="Helvetica-Bold", fontSize=11,
        textColor=INDIGO_LIGHT, leading=16)),
     Paragraph("carts.length — отображается бейджем на иконке", BODY_SM)],
    [Paragraph("Сохранение данных", s("f", fontName="Helvetica-Bold", fontSize=11,
        textColor=INDIGO_LIGHT, leading=16)),
     Paragraph("Zustand persist → localStorage (ключ 'cart-storage')", BODY_SM)],
    [Paragraph("Пустая корзина", s("f", fontName="Helvetica-Bold", fontSize=11,
        textColor=INDIGO_LIGHT, leading=16)),
     Paragraph("Заглушка с иконкой и кнопкой перехода в каталог", BODY_SM)],
    [Paragraph("Итого с доставкой", s("f", fontName="Helvetica-Bold", fontSize=11,
        textColor=INDIGO_LIGHT, leading=16)),
     Paragraph("Sticky блок справа — сумма, кнопка «Оформить заказ»", BODY_SM)],
]

basket_tbl = Table(basket_data, colWidths=[150, PAGE_W - 80 - 150])
basket_tbl.setStyle(TableStyle([
    ("BACKGROUND", (0,0), (-1,0), INDIGO_DARK),
    ("ROWBACKGROUNDS", (0,1), (-1,-1), [BG_CARD, colors.HexColor("#1A2540")]),
    ("ALIGN", (0,0), (-1,-1), "LEFT"),
    ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ("TOPPADDING", (0,0), (-1,-1), 9),
    ("BOTTOMPADDING", (0,0), (-1,-1), 9),
    ("LEFTPADDING", (0,0), (-1,-1), 12),
    ("LINEBELOW", (0,0), (-1,-1), 0.3, colors.HexColor("#334155")),
]))
story.append(basket_tbl)
story.append(PageBreak())

# ══════════════════════════════════════════════
# SLIDE 10 — БРЕНДЫ
# ══════════════════════════════════════════════
story.append(sp(0.5))
story.append(Paragraph("БРЕНДЫ", SECTION_LABEL))
story.append(Paragraph("Система брендов и фильтрация", SLIDE_TITLE))
story.append(hr())
story.append(sp(0.3))

brands = ["Levi's", "Adidas", "Puma", "Zara", "H&M", "Uniqlo",
          "Tommy Hilfiger", "The North Face", "Calvin Klein",
          "Nike", "New Balance", "Reebok", "Pull&Bear"]

story.append(Paragraph("13 представленных брендов:", s("h3", fontName="Helvetica-Bold",
    fontSize=13, textColor=TEXT_WHITE, leading=20, spaceAfter=12)))

brand_cells = [[Paragraph(b, s("br", fontName="Helvetica-Bold", fontSize=10,
    textColor=TEXT_WHITE, alignment=TA_CENTER, leading=14)) for b in brands[:7]]]
brand_tbl = Table(brand_cells, colWidths=[(PAGE_W - 60) / 7] * 7)
brand_tbl.setStyle(TableStyle([
    ("BACKGROUND", (0,0), (-1,-1), INDIGO_DARK),
    ("ALIGN", (0,0), (-1,-1), "CENTER"),
    ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ("TOPPADDING", (0,0), (-1,-1), 10),
    ("BOTTOMPADDING", (0,0), (-1,-1), 10),
    ("LINEAFTER", (0,0), (-2,-1), 0.5, colors.HexColor("#4338CA")),
]))
story.append(brand_tbl)
story.append(sp(0.2))

brand_cells2 = [[Paragraph(b, s("br2", fontName="Helvetica-Bold", fontSize=10,
    textColor=TEXT_WHITE, alignment=TA_CENTER, leading=14)) for b in brands[7:]]]
brand_tbl2 = Table(brand_cells2, colWidths=[(PAGE_W - 60) / 6] * 6)
brand_tbl2.setStyle(TableStyle([
    ("BACKGROUND", (0,0), (-1,-1), BG_CARD),
    ("ALIGN", (0,0), (-1,-1), "CENTER"),
    ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ("TOPPADDING", (0,0), (-1,-1), 10),
    ("BOTTOMPADDING", (0,0), (-1,-1), 10),
    ("LINEAFTER", (0,0), (-2,-1), 0.5, colors.HexColor("#334155")),
]))
story.append(brand_tbl2)
story.append(sp(0.6))
story.append(hr(color=colors.HexColor("#334155"), width=0.5))
story.append(sp(0.3))
story.append(two_col(
    [
        "Компонент Brands — горизонтальная лента",
        "Логотипы подгружаются из brandLogo.js",
        "Клик по бренду → /brand/:name",
        "BrandPage фильтрует товары по brand",
    ],
    [
        "brandLogos — объект {brand: svgUrl}",
        "Object.entries() → массив [{brand, logo}]",
        "Каждый бренд кликабелен",
        "Фильтрация: product.brand === brandName",
    ]
))
story.append(PageBreak())

# ══════════════════════════════════════════════
# SLIDE 11 — STATE MANAGEMENT
# ══════════════════════════════════════════════
story.append(sp(0.5))
story.append(Paragraph("УПРАВЛЕНИЕ СОСТОЯНИЕМ", SECTION_LABEL))
story.append(Paragraph("Zustand Store", SLIDE_TITLE))
story.append(hr())
story.append(sp(0.3))

story.append(Paragraph("Структура useCartStore:", s("h3", fontName="Helvetica-Bold",
    fontSize=13, textColor=TEXT_WHITE, leading=20, spaceAfter=12)))

state_data = [
    [Paragraph("Поле/Метод", s("th", fontName="Helvetica-Bold", fontSize=11,
        textColor=TEXT_WHITE, leading=16)),
     Paragraph("Тип", s("th", fontName="Helvetica-Bold", fontSize=11,
        textColor=TEXT_WHITE, leading=16)),
     Paragraph("Описание", s("th", fontName="Helvetica-Bold", fontSize=11,
        textColor=TEXT_WHITE, leading=16))],
    [Paragraph("carts", s("f", fontName="Helvetica-Bold", fontSize=11,
        textColor=ACCENT, leading=16)),
     Paragraph("Array", BODY_SM),
     Paragraph("Массив товаров добавленных в корзину", BODY_SM)],
    [Paragraph("product", s("f", fontName="Helvetica-Bold", fontSize=11,
        textColor=ACCENT, leading=16)),
     Paragraph("Array", BODY_SM),
     Paragraph("Полный каталог товаров (из products.js)", BODY_SM)],
    [Paragraph("addCart()", s("f", fontName="Helvetica-Bold", fontSize=11,
        textColor=GREEN, leading=16)),
     Paragraph("Action", BODY_SM),
     Paragraph("Добавляет товар в массив carts", BODY_SM)],
    [Paragraph("deleteCart(id)", s("f", fontName="Helvetica-Bold", fontSize=11,
        textColor=ORANGE, leading=16)),
     Paragraph("Action", BODY_SM),
     Paragraph("Удаляет товар по id из carts", BODY_SM)],
    [Paragraph("persist()", s("f", fontName="Helvetica-Bold", fontSize=11,
        textColor=PINK, leading=16)),
     Paragraph("Middleware", BODY_SM),
     Paragraph("Сохраняет carts в localStorage, product всегда свежий", BODY_SM)],
]

state_tbl = Table(state_data, colWidths=[120, 80, PAGE_W - 80 - 200])
state_tbl.setStyle(TableStyle([
    ("BACKGROUND", (0,0), (-1,0), INDIGO_DARK),
    ("ROWBACKGROUNDS", (0,1), (-1,-1), [BG_CARD, colors.HexColor("#1A2540")]),
    ("ALIGN", (0,0), (-1,-1), "LEFT"),
    ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ("TOPPADDING", (0,0), (-1,-1), 9),
    ("BOTTOMPADDING", (0,0), (-1,-1), 9),
    ("LEFTPADDING", (0,0), (-1,-1), 12),
    ("LINEBELOW", (0,0), (-1,-1), 0.3, colors.HexColor("#334155")),
]))
story.append(state_tbl)
story.append(sp(0.5))
story.append(Paragraph(
    "Использование: <font color='#818CF8'>useCartStore(state => state.carts)</font> — "
    "любой компонент подписывается на нужную часть стора без лишних ре-рендеров.",
    BODY_SM))
story.append(PageBreak())

# ══════════════════════════════════════════════
# SLIDE 12 — АДАПТИВНОСТЬ
# ══════════════════════════════════════════════
story.append(sp(0.5))
story.append(Paragraph("АДАПТИВНЫЙ ДИЗАЙН", SECTION_LABEL))
story.append(Paragraph("Responsive UI на Tailwind CSS", SLIDE_TITLE))
story.append(hr())
story.append(sp(0.3))

resp_data = [
    [Paragraph("Breakpoint", s("th", fontName="Helvetica-Bold", fontSize=11,
        textColor=TEXT_WHITE, leading=16)),
     Paragraph("Ширина", s("th", fontName="Helvetica-Bold", fontSize=11,
        textColor=TEXT_WHITE, leading=16)),
     Paragraph("Поведение", s("th", fontName="Helvetica-Bold", fontSize=11,
        textColor=TEXT_WHITE, leading=16))],
    [Paragraph("Mobile (default)", s("f", fontName="Helvetica-Bold", fontSize=11,
        textColor=ORANGE, leading=16)),
     Paragraph("< 640px", BODY_SM),
     Paragraph("1 колонка, бургер-меню, скрытый поиск", BODY_SM)],
    [Paragraph("sm:", s("f", fontName="Helvetica-Bold", fontSize=11,
        textColor=GREEN, leading=16)),
     Paragraph("≥ 640px", BODY_SM),
     Paragraph("2 колонки в сетке товаров", BODY_SM)],
    [Paragraph("md:", s("f", fontName="Helvetica-Bold", fontSize=11,
        textColor=ACCENT, leading=16)),
     Paragraph("≥ 768px", BODY_SM),
     Paragraph("Полная навигация, поле поиска в хедере", BODY_SM)],
    [Paragraph("lg:", s("f", fontName="Helvetica-Bold", fontSize=11,
        textColor=INDIGO_LIGHT, leading=16)),
     Paragraph("≥ 1024px", BODY_SM),
     Paragraph("3 колонки в сетке товаров", BODY_SM)],
    [Paragraph("xl:", s("f", fontName="Helvetica-Bold", fontSize=11,
        textColor=PINK, leading=16)),
     Paragraph("≥ 1280px", BODY_SM),
     Paragraph("4 колонки — полноценный десктоп-вид", BODY_SM)],
]

resp_tbl = Table(resp_data, colWidths=[140, 80, PAGE_W - 80 - 220])
resp_tbl.setStyle(TableStyle([
    ("BACKGROUND", (0,0), (-1,0), INDIGO_DARK),
    ("ROWBACKGROUNDS", (0,1), (-1,-1), [BG_CARD, colors.HexColor("#1A2540")]),
    ("ALIGN", (0,0), (-1,-1), "LEFT"),
    ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ("TOPPADDING", (0,0), (-1,-1), 9),
    ("BOTTOMPADDING", (0,0), (-1,-1), 9),
    ("LEFTPADDING", (0,0), (-1,-1), 12),
    ("LINEBELOW", (0,0), (-1,-1), 0.3, colors.HexColor("#334155")),
]))
story.append(resp_tbl)
story.append(sp(0.5))
story.append(Paragraph(
    "Пример: <font color='#818CF8'>grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4</font> — "
    "адаптивная сетка карточек с mobile-first подходом.",
    BODY_SM))
story.append(PageBreak())

# ══════════════════════════════════════════════
# SLIDE 13 — КОМПОНЕНТЫ
# ══════════════════════════════════════════════
story.append(sp(0.5))
story.append(Paragraph("КОМПОНЕНТЫ", SECTION_LABEL))
story.append(Paragraph("Все компоненты приложения", SLIDE_TITLE))
story.append(hr())
story.append(sp(0.2))

comp_data = [
    ["Header",       "Шапка сайта, поиск, навигация, корзина-счётчик"],
    ["Slider",       "Промо-слайдер на главной странице"],
    ["Brands",       "Горизонтальный список брендов с логотипами"],
    ["Card",         "Карточка товара — сетка, выбор цвета/размера, корзина"],
    ["ProductPage",  "Детальная страница товара"],
    ["BrandPage",    "Страница бренда с фильтрованным каталогом"],
    ["Basket",       "Корзина, итоговая сумма, оформление заказа"],
    ["BasketDes",    "Строка товара в корзине с удалением"],
    ["All",          "Каталог всех товаров с ProductGrid"],
    ["News",         "Новые товары (category: new)"],
    ["OnSale",       "Распродажа (category: on_sale)"],
    ["Popular",      "Популярные (category: popular)"],
    ["ProductGrid",  "Переиспользуемая сетка карточек"],
    ["LoginForm",    "Форма входа в аккаунт"],
    ["RegForm",      "Форма регистрации"],
    ["Footer",       "Подвал сайта"],
    ["NotFound",     "404-страница"],
    ["Toast",        "Уведомления о добавлении в корзину"],
]

comp_rows = [
    [Paragraph("Компонент", s("th", fontName="Helvetica-Bold", fontSize=11,
        textColor=TEXT_WHITE, leading=16)),
     Paragraph("Назначение", s("th", fontName="Helvetica-Bold", fontSize=11,
        textColor=TEXT_WHITE, leading=16))]
]
for name, desc in comp_data:
    comp_rows.append([
        Paragraph(name, s("cn", fontName="Helvetica-Bold", fontSize=10,
            textColor=ACCENT, leading=15)),
        Paragraph(desc, s("cd", fontName="Helvetica", fontSize=10,
            textColor=TEXT_LIGHT, leading=15)),
    ])

comp_tbl = Table(comp_rows, colWidths=[120, PAGE_W - 80 - 120])
comp_tbl.setStyle(TableStyle([
    ("BACKGROUND", (0,0), (-1,0), INDIGO_DARK),
    ("ROWBACKGROUNDS", (0,1), (-1,-1), [BG_CARD, colors.HexColor("#1A2540")]),
    ("ALIGN", (0,0), (-1,-1), "LEFT"),
    ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ("TOPPADDING", (0,0), (-1,-1), 6),
    ("BOTTOMPADDING", (0,0), (-1,-1), 6),
    ("LEFTPADDING", (0,0), (-1,-1), 12),
    ("LINEBELOW", (0,0), (-1,-1), 0.3, colors.HexColor("#334155")),
]))
story.append(comp_tbl)
story.append(PageBreak())

# ══════════════════════════════════════════════
# SLIDE 14 — ЗАКЛЮЧЕНИЕ
# ══════════════════════════════════════════════
story.append(sp(1.5))
story.append(Paragraph("ИТОГИ", SECTION_LABEL))
story.append(Paragraph("Max.Shop — итоги проекта", SLIDE_TITLE))
story.append(hr())
story.append(sp(0.5))

story.append(card_row([
    {"title": "Компонентов", "value": "18", "color": INDIGO_LIGHT},
    {"title": "Маршрутов", "value": "10", "color": ACCENT},
    {"title": "Товаров", "value": "18+", "color": GREEN},
    {"title": "Брендов", "value": "13", "color": ORANGE},
]))
story.append(sp(0.8))

story.append(two_col(
    [
        "SPA на React 19 с хуками",
        "Клиентская маршрутизация (React Router 7)",
        "Глобальный стор Zustand + localStorage",
        "Utility-first стили Tailwind CSS 4",
        "Адаптивный mobile-first дизайн",
        "Live-поиск с дропдауном",
    ],
    [
        "Корзина с сохранением данных",
        "Фильтрация по категориям и брендам",
        "Компонент Toast для уведомлений",
        "Страница 404 с редиректом",
        "Формы логина и регистрации",
        "Быстрая сборка через Vite",
    ]
))

story.append(sp(1.2))
story.append(hr(color=INDIGO))
story.append(sp(0.4))
story.append(Paragraph("Max.Shop", s("fin", fontName="Helvetica-Bold", fontSize=22,
    textColor=TEXT_WHITE, alignment=TA_CENTER, leading=28)))
story.append(Paragraph("React • Vite • Tailwind CSS • Zustand • React Router",
    s("finsub", fontName="Helvetica", fontSize=12, textColor=TEXT_GRAY,
      alignment=TA_CENTER, leading=18)))

# ─── Build PDF ────────────────────────────────────────────────────────────────
OUTPUT = "/Users/mobi/Desktop/ibt/shop/MaxShop_Presentation.pdf"

is_title = [True]

def on_page(canvas_obj, doc):
    if is_title[0]:
        draw_title_bg(canvas_obj, doc)
        is_title[0] = False
    else:
        draw_slide_bg(canvas_obj, doc)

doc = SimpleDocTemplate(
    OUTPUT,
    pagesize=A4,
    leftMargin=40, rightMargin=40,
    topMargin=50, bottomMargin=40,
    title="Max.Shop — Презентация проекта",
    author="Max.Shop Team",
    subject="Учебный Frontend-проект",
)

doc.build(story, onFirstPage=on_page, onLaterPages=lambda c, d: draw_slide_bg(c, d))
print(f"PDF создан: {OUTPUT}")
