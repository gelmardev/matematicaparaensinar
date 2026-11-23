/* Página inicial: cards de produtos, menu e destaque da seção ativa */
(function () {
  var grade = document.getElementById('gradeProdutos');
  var lista = window.PRODUTOS || [];

  grade.innerHTML = lista.map(function (p) {
    var url = 'produtos/' + p.slug + '.html';
    var nome = escapar(p.nome);
    var img = p.capa
      ? '<img src="' + p.capa + '" alt="Capa do material ' + nome + '" width="600" height="600" loading="lazy">'
      : '<span class="sem-imagem">Imagem em breve</span>';
    return '<article class="card reveal">' +
      '<a class="card__imagem" href="' + url + '" aria-label="Ver ' + nome + '">' + img + '</a>' +
      '<div class="card__corpo">' +
      '<h3 class="card__nome"><a href="' + url + '">' + nome + '</a></h3>' +
      '<p class="card__desc">' + escapar(p.resumo) + '</p>' +
      '<a class="card__mais" href="' + url + '">Saiba mais →</a>' +
      '</div></article>';
  }).join('');

  vigiarImagens();
  ativarReveal();

  // Menu hambúrguer
  var botao = document.getElementById('menuBotao');
  var menu = document.getElementById('menu');
  function fechar() { menu.classList.remove('aberto'); botao.setAttribute('aria-expanded', 'false'); botao.setAttribute('aria-label', 'Abrir menu'); }
  botao.addEventListener('click', function () {
    var abrir = !menu.classList.contains('aberto');
    menu.classList.toggle('aberto', abrir);
    botao.setAttribute('aria-expanded', String(abrir));
    botao.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
  });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) fechar(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fechar(); });

  // Sombra do menu ao rolar + destaque da seção atual
  var topo = document.getElementById('topo');
  var links = [].slice.call(menu.querySelectorAll('a'));
  var secoes = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  function aoRolar() {
    topo.classList.toggle('rolou', window.scrollY > 10);
    var marca = window.scrollY + 140, atual = -1;
    secoes.forEach(function (s, i) { if (s && s.offsetTop <= marca) atual = i; });
    links.forEach(function (a, i) { a.classList.toggle('ativo', i === atual); });
  }
  window.addEventListener('scroll', aoRolar, { passive: true });
  aoRolar();

  document.getElementById('ano').textContent = new Date().getFullYear();
})();
