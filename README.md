# Site da barbearia (HTML, CSS e JS estáticos)

## Estrutura
- `index.html`: página única, com todas as seções.
- `css/style.css`, `js/main.js`: estilo e comportamento.
- `js/config.js`: **edite aqui** nome, WhatsApp, Instagram, endereço (liga o mapa) e horários.
- `assets/img`, `assets/video`: fotos e vídeos já comprimidos.
- `vercel.json`: URLs limpas e cache dos arquivos.

## Publicar na Vercel
1. Envie esta pasta para um repositório no GitHub, ou use `vercel` no terminal dentro dela.
2. Na Vercel: Add New > Project > escolha o repositório. Framework: **Other**. Build command e Output directory: deixe vazios.
3. Deploy. Não há dependências nem build.

## Editar preços e textos
Preços (`R$ 00,00`), durações e textos estão direto no `index.html`, na seção `servicos`. Para a equipe, duplique o bloco `<article class="perfil">` e troque foto e dados.

## Observações
- As fotos foram recortadas de uma imagem de baixa resolução; para máxima nitidez, troque por fotos reais em `assets/img` com os mesmos nomes.
- As fontes (Fraunces e DM Sans) carregam do Google Fonts; sem internet o site usa fontes do sistema.
