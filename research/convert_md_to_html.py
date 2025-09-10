import re
from pathlib import Path

def inline(text: str) -> str:
    """Apply basic Markdown inline formatting."""
    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', text)
    text = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', text)
    text = re.sub(r'\*([^*]+)\*', r'<em>\1</em>', text)
    return text

def convert(md: str) -> str:
    lines = md.splitlines()
    html = []
    stack = []  # (list_type, indent)
    def close_to(indent: int) -> None:
        while stack and indent < stack[-1][1]:
            html.append(f'</{stack.pop()[0]}>')
    def close_all() -> None:
        while stack:
            html.append(f'</{stack.pop()[0]}>')
    for line in lines:
        if not line.strip():
            continue
        stripped = line.strip()
        if re.match(r'^---+$', stripped):
            close_all()
            html.append('<hr/>')
            continue
        m = re.match(r'^(#{1,6})\s+(.*)', stripped)
        if m:
            close_all()
            level = len(m.group(1))
            html.append(f'<h{level}>{inline(m.group(2))}</h{level}>')
            continue
        m = re.match(r'^(\s*)([*\-]|\d+\.)\s+(.*)', line)
        if m:
            indent = len(m.group(1))
            marker = m.group(2)
            content = inline(m.group(3))
            list_type = 'ul' if marker in ('*', '-') else 'ol'
            close_to(indent)
            if not stack or indent > stack[-1][1]:
                stack.append((list_type, indent))
                html.append(f'<{list_type}>')
            elif stack[-1][0] != list_type:
                html.append(f'</{stack.pop()[0]}>')
                stack.append((list_type, indent))
                html.append(f'<{list_type}>')
            html.append(f'<li>{content}</li>')
            continue
        close_all()
        html.append(f'<p>{inline(stripped)}</p>')
    close_all()
    return '\n'.join(html)

def process_episode(ep: int) -> None:
    md_path = Path('research/All Research PDFs') / f'Ep{ep}_Research_Brief.md'
    text = md_path.read_text(encoding='utf-8')
    # Remove "Takeaways" section and anything after it
    text = re.sub(r'\n##\s*\d+\.\s*Takeaways for Episode / Podcast Integration[\s\S]*', '', text)
    html_body = convert(text)
    template = f"""<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Ep{ep} Research Brief</title>
    <link rel='preconnect' href='https://fonts.googleapis.com'>
    <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>
    <link href='https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600&display=swap' rel='stylesheet'>
    <link rel='stylesheet' href='ResearchGuideStyles.css'>
</head>
<body>
<section class='section-container'>
{html_body}
</section>
</body>
</html>
"""
    out_path = Path('research/research_htmls') / f'Ep{ep}.html'
    out_path.write_text(template, encoding='utf-8')

if __name__ == '__main__':
    for ep in range(1, 5):
        process_episode(ep)
