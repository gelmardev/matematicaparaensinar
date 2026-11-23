/* Template de página de produto: tudo vem de js/produtos-data.js (gerado do produtos.md).
   A boneca e a posição vêm dos atributos data-boneca / data-posicao do <body>. */
(function () {
  var corpo = document.body;
  var slug = corpo.dataset.slug;
  var p = (window.PRODUTOS || []).filter(function (x) { return x.slug === slug; })[0];
  var alvo = document.getElementById('produto');
  if (!p) { alvo.innerHTML = '<p class="container" style="padding:120px 0">Produto não encontrado. <a href="../index.html#produtos">Voltar aos produtos</a>.</p>'; return; }

  var raiz = '../';
  var pos = corpo.dataset.posicao;
  var bonecaSrc = raiz + 'imagens/boneca/' + corpo.dataset.boneca + '.png';
  function boneca(onde) {
    return pos === onde ? '<img class="boneca-deco decor boneca--' + onde + '" src="' + bonecaSrc + '" alt="" width="800" height="1100" loading="lazy">' : '';
  }

  // Botão de compra (ativo ou "Em breve")
  function botao(classe) {
    if (p.link) return '<a class="botao botao--grande ' + classe + '" href="' + escapar(p.link) + '" target="_blank" rel="noopener">Garantir meu material</a>';
    return '<span class="botao botao--grande ' + classe + '" role="link" aria-disabled="true">Em breve</span>';
  }

  // Separa o texto de apresentação da lista de conteúdo
  var blocos = p.descricao.slice(), intro = [];
  while (blocos.length && blocos[0].tipo === 'p') intro.push(blocos.shift());
  if (intro.length && blocos.length && blocos[0].tipo === 'ul' && /:\s*$/.test(intro[intro.length - 1].texto)) blocos.unshift(intro.pop());

  var corpoConteudo = blocos.map(function (b) {
    if (b.tipo === 'rotulo') return '<h3 class="p-rotulo">' + b.texto + '</h3>';
    if (b.tipo === 'ul') return '<ul class="lista-check">' + b.itens.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>';
    return '<p>' + b.texto + '</p>';
  }).join('');

  // Galeria (capa + demais imagens, quando existirem)
  var imgs = p.imagens || [];
  var principal = imgs.length
    ? '<img id="imgPrincipal" src="' + raiz + imgs[0] + '" alt="Capa do material ' + escapar(p.nome) + '" width="1000" height="1000" fetchpriority="high">'
    : '<span class="sem-imagem">Imagem em breve</span>';
  var miniaturas = imgs.length > 1
    ? '<div class="galeria__mini">' + imgs.map(function (s, i) {
        return '<button type="button" class="' + (i === 0 ? 'ativa' : '') + '" data-src="' + raiz + s + '" aria-label="Ver imagem ' + (i + 1) + '"><img src="' + raiz + s + '" alt="" width="120" height="120" loading="lazy"></button>';
      }).join('') + '</div>'
    : '';

  alvo.innerHTML =
    '<section class="p-hero"><div class="container p-grade">' +
      '<div class="galeria">' +
        '<div class="galeria__quadro">' + principal + '</div>' + miniaturas + boneca('capa') +
      '</div>' +
      '<div class="p-info">' +
        '<p class="etiqueta etiqueta--verde">Material Matemática para Ensinar</p>' +
        '<h1 class="p-titulo">' + escapar(p.nome) + '</h1>' + boneca('titulo') +
        '<div class="p-intro">' + intro.map(function (b) { return '<p>' + b.texto + '</p>'; }).join('') + '</div>' +
        '<div class="p-cta-corpo">' + botao('') + '</div>' +
        (corpoConteudo ? '<div class="p-conteudo">' + boneca('conteudo') + corpoConteudo + '</div>' : '') +
      '</div>' +
    '</div></section>' +
    '<section class="p-final"><div class="container p-final__interno">' +
      boneca('cta') +
      '<div><h2>Gostou deste material?</h2><p>Leve para a sua aula ou para os seus estudos.</p></div>' + botao('') +
    '</div></section>' +
    '<div class="p-fixo">' + botao('botao--fixo') + '</div>';

  // Miniaturas trocam a imagem principal
  var mini = alvo.querySelector('.galeria__mini');
  if (mini) mini.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    document.getElementById('imgPrincipal').src = b.dataset.src;
    mini.querySelectorAll('button').forEach(function (x) { x.classList.toggle('ativa', x === b); });
  });

  document.getElementById('ano').textContent = new Date().getFullYear();
  vigiarImagens();
})();
