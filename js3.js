 const noticias = [
            {
                id: 1,
                titulo: "Treino de Preparação para o Derby",
                resumo: "A equipa focou-se hoje na tática e finalização.",
                conteudo: "O treino desta manhã no centro de estágios foi focado na posse de bola e transições rápidas. O treinador contou com todos os jogadores disponíveis, incluindo os jovens da formação que têm subido ao plantel principal.",
                imagem: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800",
                categoria: "Treinos"
            },
            {
                id: 2,
                titulo: "ItsCunhac No Campo Da Fidec",
                resumo: "ItsCunhac Visita O Campo Da Fidec.",
                conteudo: "Lançámos hoje a nova campanha 'Sócio de Coração'. Os novos sócios terão 20% de desconto na loja oficial e prioridade na compra de bilhetes para as competições europeias. Faz parte da nossa família!",
                imagem: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800",
                categoria: "Clube"
            }
        ];

        const container = document.getElementById('news-container');
        const detailView = document.getElementById('news-detail');
        const header = document.getElementById('main-header');

        function carregarNoticias() {
            container.innerHTML = noticias.map(n => `
                <article class="news-card" onclick="abrirNoticia(${n.id})">
                    <img src="${n.imagem}" class="news-image">
                    <div class="news-body">
                        <span class="news-tag">${n.categoria}</span>
                        <h3>${n.titulo}</h3>
                        <p>${n.resumo}</p>
                    </div>
                </article>
            `).join('');
        }

        function abrirNoticia(id) {
            const n = noticias.find(item => item.id === id);
            document.getElementById('detail-content').innerHTML = `
                <img src="${n.imagem}" class="detail-image">
                <span class="news-tag">${n.categoria}</span>
                <h1 style="margin: 15px 0;">${n.titulo}</h1>
                <p style="font-size: 1.1rem; line-height: 1.6; color: #444;">${n.conteudo}</p>
            `;

            container.classList.add('hidden');
            header.classList.add('hidden');
            detailView.style.display = 'block';
            window.scrollTo(0, 0);
        }

        function fecharNoticia() {
            detailView.style.display = 'none';
            container.classList.remove('hidden');
            header.classList.remove('hidden');
            window.scrollTo(0, 0);
        }

        document.addEventListener('DOMContentLoaded', carregarNoticias);