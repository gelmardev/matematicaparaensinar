#!/usr/bin/env python3
"""Lê produtos.md (única fonte dos dados) e gera js/produtos-data.js.
Uso (na raiz do projeto):  python tools/gerar_produtos.py
Também confere imagens e links de compra e imprime avisos."""
import re, json, os, html, sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(RAIZ)
EXTS = ('.png', '.jpg', '.jpeg', '.webp')

def inline(t):
    t = html.escape(t.strip(), quote=False)
    return re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', t)

def achar_imagens(pasta):
    """Aceita pasta (capa.*, imagem-2.*...) ou arquivo único imagens/produtos/<slug>.<ext>."""
    slug = pasta.rstrip('/').split('/')[-1]
    base = pasta.rstrip('/')
    imgs = []
    if os.path.isdir(base):
        arqs = sorted(os.listdir(base), key=lambda n: (not n.startswith('capa'), n))
        imgs = [f'{base}/{a}' for a in arqs if a.lower().endswith(EXTS)]
    else:
        for e in EXTS:
            if os.path.isfile(base + e):
                imgs = [base + e]; break
    return slug, imgs

def resumo(blocos):
    ps = [html.unescape(re.sub(r'<[^>]+>', '', b['texto'])) for b in blocos if b['tipo'] == 'p']
    if not ps: return ''
    sent = re.split(r'(?<=[.!?])\s+', ps[0])
    t = sent[0]
    for prox in sent[1:] + ps[1:2]:
        if len(t) >= 70 or len(t) + 1 + len(prox) > 180: break
        t += ' ' + prox
    if len(t) > 180:
        t = t[:180].rsplit(' ', 1)[0].rstrip(' ,;:.–-') + '…'
    return t

# Escolha de design: expressão da boneca e posição na página de cada produto
# posições: capa (sobre a capa) | titulo (ao lado do nome) | conteudo (junto à lista) | cta (faixa final)
BONECAS = {
    'maquina-da-funcao': ('boneca-teve-uma-ideia', 'titulo'),
    'plano-aula-quadrados-perfeitos-tampinhas': ('boneca-animada', 'conteudo'),
    'moldes-solidos-geometricos': ('boneca-apontando', 'capa'),
    'resumo-divisores': ('boneca-pensando', 'cta'),
    'resumo-introducao-estudo-funcoes': ('boneca-confusa', 'titulo'),
    'resumo-funcao-afim': ('boneca-confiante', 'capa'),
    'funcao-quadratica': ('boneca-surpresa', 'conteudo'),
    'resumo-funcao-exponencial': ('boneca-olhando-lado', 'cta'),
    'resumo-funcao-modular': ('boneca-desconfiada', 'titulo'),
    'resumo-teoria-conjuntos': ('boneca-rindo', 'capa'),
}

def gerar_paginas(produtos):
    modelo = open('produtos/_template.html', encoding='utf-8').read()
    for p in produtos:
        boneca, pos = BONECAS.get(p['slug'], ('boneca-neutra-sorrindo', 'cta'))
        if not os.path.isfile(f'imagens/boneca/{boneca}.png'):
            print('AVISO: boneca ausente:', boneca)
        desc = html.escape(p['resumo'], quote=True)
        pagina = (modelo.replace('{{NOME}}', html.escape(p['nome'], quote=True))
                  .replace('{{DESCRICAO}}', desc).replace('{{SLUG}}', p['slug'])
                  .replace('{{CAPA}}', p['capa']).replace('{{BONECA}}', boneca).replace('{{POSICAO}}', pos))
        open(f"produtos/{p['slug']}.html", 'w', encoding='utf-8', newline='\n').write(pagina)

def main():
    md = open('produtos.md', encoding='utf-8').read()
    partes = re.split(r'^## \d+\.\s*', md, flags=re.M)[1:]
    produtos, avisos = [], []
    for parte in partes:
        linhas = parte.split('\n')
        nome = linhas[0].strip()
        pasta = link = ''
        blocos, para, lista = [], [], []
        em_desc = False
        def flush():
            nonlocal para, lista
            if para: blocos.append({'tipo': 'p', 'texto': inline(' '.join(para))}); para = []
            if lista: blocos.append({'tipo': 'ul', 'itens': [inline(i) for i in lista]}); lista = []
        for ln in linhas[1:]:
            s = ln.strip()
            if s == '---': break
            if not em_desc:
                m = re.match(r'- Pasta de imagens:\s*(.+)', s)
                if m: pasta = m.group(1).strip()
                m = re.match(r'- Link de compra:\s*(.+)', s)
                if m: link = m.group(1).strip()
                if s.startswith('**Descrição:**'): em_desc = True
                continue
            if not s: flush(); continue
            if s.startswith('- '):
                if para: flush()
                lista.append(s[2:]); continue
            m = re.match(r'^\*\*([^*]+)\*\*\s*(.*)$', s)
            if m:
                flush()
                blocos.append({'tipo': 'rotulo', 'texto': inline(m.group(1))})
                if m.group(2): blocos.append({'tipo': 'p', 'texto': inline(m.group(2))})
                continue
            if lista: flush()
            para.append(s)
        flush()
        slug, imgs = achar_imagens(pasta)
        if not imgs: avisos.append(f'SEM IMAGEM: {nome} ({pasta})')
        pendente = (not link) or link.upper().startswith('PENDENTE') or not link.startswith('http')
        if pendente: avisos.append(f'LINK PENDENTE: {nome}')
        produtos.append({'slug': slug, 'nome': nome, 'capa': imgs[0] if imgs else '',
                         'imagens': imgs, 'link': '' if pendente else link,
                         'resumo': resumo(blocos), 'descricao': blocos})
    with open('js/produtos-data.js', 'w', encoding='utf-8') as f:
        f.write('/* GERADO por tools/gerar_produtos.py a partir de produtos.md. Não edite à mão. */\n')
        f.write('window.PRODUTOS = ' + json.dumps(produtos, ensure_ascii=False, indent=1) + ';\n')
    gerar_paginas(produtos)
    print(f'{len(produtos)} produtos e páginas gerados.')
    for a in avisos: print('AVISO:', a)
    return produtos

if __name__ == '__main__':
    main()
