# Site Matemática para Ensinar

## Objetivo
Site de apresentação e vitrine da empresa Matemática para Ensinar (domínio: matematicaparaensinar.com.br). O site NÃO vende: apresenta os materiais e leva o visitante ao Hotmart (futuramente Kiwify e outros) pelo botão "Garantir meu material". Sem login, cadastro, área de alunos ou preços.

## Público e tom
Alunos e professores, foco em Ensino Médio. Tom prático, bonito, simples e profissional. O visitante deve encontrar o que procura sem esforço.

## Tecnologia
- HTML, CSS e JavaScript puro (sem frameworks, sem build), hospedado no GitHub Pages.
- Responsivo, mobile em primeiro lugar. Carregamento rápido (imagens com loading="lazy", exceto as do topo).
- Arquivo CNAME na raiz com: matematicaparaensinar.com.br
- SEO básico (title, description, Open Graph), alt em todas as imagens, favicon.
- Estrutura: index.html, css/, js/, produtos/ (uma página por produto), imagens/.

## Paleta
#02a25e (verde principal), #042772 (azul escuro), #36695e (verde escuro), #3a6f8c (azul acinzentado), #000000, #d1eeb8 (verde claro). Você decide o uso de cada cor, garantindo contraste legível. O nome "Matemática para Ensinar" no menu usa as cores da marca (combine verde e azul).

## Contatos
- E-mail: contatomatematicaparaensinar@gmail.com
- Instagram: @matematicaparaensinar, https://www.instagram.com/matematicaparaensinar/

## Imagens (usar exatamente estes caminhos)
```
imagens/
├── favicon.png
├── logo/logo.png
├── professora/professora-hero.jpg      (topo do site)
├── professora/professora-sobre.jpg     (seção Sobre)
├── boneca/boneca-feliz.png
├── boneca/boneca-explicando.png
├── boneca/boneca-apontando.png
├── boneca/boneca-pensando.png
├── boneca/boneca-surpresa.png
├── boneca/boneca-triste.png            (seção Cursos)
├── cursos/obra-em-construcao.png       (seção Cursos)
└── produtos/<pasta-do-produto>/capa.png, imagem-2.png, imagem-3.png, ...
```
As pastas de produtos estão listadas no produtos.md. Extensões podem variar (png, jpg, webp): verifique o que existe de fato. Se alguma imagem faltar, deixe um espaço reservado discreto e me avise no final. Nunca invente imagens.

## Estrutura

### Página inicial (index.html): uma só página com rolagem suave
1. **Menu fixo no topo:** logo no canto esquerdo, nome "Matemática para Ensinar" nas cores da marca, e botões: Sobre a professora, Produtos, Cursos, Contato. Os botões mudam de cor ao passar o cursor e rolam suavemente até a seção. No celular, vira menu hambúrguer.
2. **Hero:** marca e a professora (professora-hero) em destaque, com chamada curta e botão que rola até Produtos.
3. **Sobre a professora:** foto (professora-sobre) e o texto abaixo, com a empresa contada dentro da história dela.
4. **Produtos:** título "Produtos do Matemática para Ensinar". Grade responsiva de cards (vários por linha, quebrando para a linha de baixo). Cada card: imagem (capa), nome e mini descrição. Imagem e nome são clicáveis e levam à página do produto. A descrição NÃO é clicável; use um resumo curto (a primeira frase ou parágrafo do produtos.md, cortado se longo) seguido de link verde "Saiba mais" que leva à mesma página do produto.
5. **Cursos:** título "Cursos em andamento", boneca-triste e obra-em-construcao, com texto curto e simpático dizendo que estão em produção.
6. **Contato:** e-mail e Instagram (links clicáveis), rodapé com nome da empresa.

### Página de cada produto (produtos/nome-do-produto.html)
- Link "Voltar" no canto superior esquerdo para a página inicial.
- Apresentação bonita: capa e demais imagens do produto (galeria), nome, descrição completa e lista do conteúdo (formate listas com bom visual). Use a boneca como decoração, escolhendo a expressão mais adequada a cada produto e o melhor lugar na página (varie entre os produtos).
- Botão destacado "Garantir meu material" no corpo da página e também fixo no canto da tela, levando direto ao link de compra. Abre em nova aba (target="_blank" rel="noopener").
- Crie um template reutilizável para que novos produtos sejam fáceis de adicionar (idealmente os dados vêm de um único lugar, sem repetir muito código).
- Se o link de compra estiver como PENDENTE, mostre o botão desativado com o texto "Em breve" e me avise.

## Texto da professora (seção Sobre)
**Sobre mim**

Olá, sou a professora Brasilina Oliveira. Estou na Educação há mais de 25 anos. Comecei minha trajetória na Educação Infantil e, há mais de 18 anos, trabalho com Matemática na rede pública estadual, atuando no Ensino Fundamental e no Ensino Médio.

Ao longo desses anos, a educação e o ensino da Matemática se tornaram parte importante da minha história. Foi dessa experiência e da vontade de compartilhar conhecimentos que nasceu o **Matemática para Ensinar**.

Criei este espaço com o propósito de aproximar a **Matemática de professores e estudantes**, compartilhando ideias e conteúdos que possam contribuir para o ensino e a aprendizagem.

Acredito que a Matemática pode ser compreendida de diferentes maneiras e que, com diferentes estratégias e dedicação, ela pode se tornar mais acessível e fazer mais sentido no dia a dia de quem ensina e de quem aprende.

## Regras de trabalho
- Você é o designer: decida layout, espaçamentos, tipografia, animações sutis e hierarquia com base em boas práticas de sites de materiais educacionais e infoprodutos. Não me pergunte posição de botões ou textos; explique suas escolhas em poucas linhas.
- Visual bonito e agradável, com identidade própria da marca (não um template genérico).
- Dados dos produtos ficam SOMENTE no produtos.md. Não invente preços, links, depoimentos nem textos de produto. Não mostre preços.
- Use textos exatamente como estão no produtos.md (pode apenas organizar a formatação).
- Trabalhe por etapas: primeiro a página inicial; só avance quando eu aprovar.
