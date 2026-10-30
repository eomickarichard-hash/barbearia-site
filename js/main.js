(() => {
  const S = window.SITE || {}, d = document, q = (s, r = d) => [...r.querySelectorAll(s)];
  const reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;
  d.documentElement.classList.add("js");

  // dados editáveis
  const dados = { nome: S.nome, endereco: S.endereco, horarios: S.horarios };
  q("[data-site]").forEach(el => { const v = dados[el.dataset.site]; if (v) el.textContent = v; });
  if (S.nome) d.title = S.nome + " | Corte, barba e acabamento";
  const ig = q("[data-ig]")[0];
  if (ig && S.instagram) ig.innerHTML = `<a href="https://instagram.com/${encodeURIComponent(S.instagram)}" target="_blank" rel="noopener">@${S.instagram}</a>`;
  if (S.endereco) {
    const m = d.getElementById("mapa");
    m.innerHTML = `<iframe title="Mapa com a localização da barbearia" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=${encodeURIComponent(S.endereco)}&output=embed"></iframe>`;
  }

  // WhatsApp com mensagem pronta
  const base = "https://wa.me/" + (S.whatsapp || "").replace(/\D/g, "");
  q("[data-wa]").forEach(a => { a.href = base + "?text=" + encodeURIComponent(a.dataset.wa); });

  // cabeçalho e menu
  const topo = d.querySelector(".top"), btn = d.querySelector(".menu-btn"), nav = d.getElementById("menu");
  let tick = false;
  const rolou = () => { tick = false; topo.classList.toggle("sol", scrollY > 40); };
  addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(rolou); } }, { passive: true }); rolou();
  const fecha = () => { nav.classList.remove("aberto"); btn.setAttribute("aria-expanded", "false"); btn.textContent = "Menu"; };
  btn.addEventListener("click", () => {
    const a = nav.classList.toggle("aberto");
    btn.setAttribute("aria-expanded", a); btn.textContent = a ? "Fechar" : "Menu";
  });
  nav.addEventListener("click", e => { if (e.target.closest("a")) fecha(); });
  addEventListener("keydown", e => { if (e.key === "Escape") fecha(); });

  // revelar ao rolar
  const rv = q(".rv");
  if (reduz || innerWidth <= 900 || !("IntersectionObserver" in window)) rv.forEach(e => e.classList.add("on"));
  else {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } }), { threshold: .12 });
    rv.forEach(e => io.observe(e));
  }

  // vídeos: respeitam redução de movimento e só tocam quando visíveis
  const vh = d.getElementById("vhero"), va = d.getElementById("vamb");
  if (reduz) { vh.removeAttribute("autoplay"); vh.pause(); }
  else if ("IntersectionObserver" in window) {
    const io2 = new IntersectionObserver(es => es.forEach(e => { const v = e.target; e.isIntersecting ? v.play().catch(() => {}) : v.pause(); }), { threshold: .2 });
    io2.observe(va); io2.observe(vh);
  }

  // galeria ampliada
  const lb = d.getElementById("lb"), im = q("img", lb)[0], fs = q(".g img");
  let i = 0;
  const mostra = n => { i = (n + fs.length) % fs.length; im.src = fs[i].src; im.alt = fs[i].alt; };
  q(".g").forEach((b, n) => b.addEventListener("click", () => { mostra(n); lb.showModal(); }));
  q(".lb-x", lb)[0].onclick = () => lb.close();
  q(".lb-p", lb)[0].onclick = () => mostra(i - 1);
  q(".lb-n", lb)[0].onclick = () => mostra(i + 1);
  lb.addEventListener("click", e => { if (e.target === lb) lb.close(); });
  lb.addEventListener("keydown", e => { if (e.key === "ArrowLeft") mostra(i - 1); if (e.key === "ArrowRight") mostra(i + 1); });

  d.getElementById("ano").textContent = new Date().getFullYear();
})();
