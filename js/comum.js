/* Funções compartilhadas pela página inicial e pelas páginas de produto */
(function () {
  document.documentElement.classList.add('js');

  // Imagem ausente → espaço reservado discreto (nunca quebra o layout)
  function reservar(img) {
    if (img.dataset.reservado) return;
    img.dataset.reservado = '1';
    var caixa = document.createElement('span');
    caixa.className = 'sem-imagem';
    caixa.setAttribute('role', 'img');
    caixa.setAttribute('aria-label', img.alt || 'Imagem em breve');
    caixa.textContent = 'Imagem em breve';
    if (img.classList.contains('decor')) caixa.style.display = 'none';
    img.replaceWith(caixa);
  }
  window.vigiarImagens = function (raiz) {
    (raiz || document).querySelectorAll('img').forEach(function (img) {
      img.addEventListener('error', function () { reservar(img); }, { once: true });
      if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) reservar(img);
    });
  };

  // Aparecer suavemente ao rolar
  window.ativarReveal = function () {
    var itens = document.querySelectorAll('.reveal:not(.visivel)');
    if (!('IntersectionObserver' in window)) { itens.forEach(function (e) { e.classList.add('visivel'); }); return; }
    var obs = new IntersectionObserver(function (lista) {
      lista.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('visivel'); obs.unobserve(x.target); } });
    }, { threshold: .12 });
    itens.forEach(function (e) { obs.observe(e); });
  };

  window.escapar = function (t) {
    return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  };
})();
