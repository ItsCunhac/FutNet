    function mostrar(id, element) {
        document.querySelectorAll('section').forEach(sec => {
            sec.classList.remove('active');
        });

        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active-link');
        });

        document.getElementById(id).classList.add('active');
        
        // Ativar o link correto
        if(element) {
            element.classList.add('active-link');
        }
    }
    const jogos = [
        {
            data: "28 FEV 2026",
            hora: "20:30",
            casa: "Fidec",
            fora: "Valdomingos",
            resultado: "vs",
            estadio: "Estádio São Braz",
            tipo: "proximos"
        },
        {
            data: "21 FEV 2026",
            hora: "18:00",
            casa: "Nacional AC",
            fora: "Fidec",
            resultado: "1 - 2",
            estadio: "Estádio da Luz",
            tipo: "passados"
        },
        {
            data: "14 FEV 2026",
            hora: "16:00",
            casa: "Fidec",
            fora: "Sporting B",
            resultado: "3 - 0",
            estadio: "Estádio São Braz",
            tipo: "passados"
        }
    ];

    function renderizarCalendario(filtro = 'todos') {
        const grid = document.getElementById('calendar-grid');
        const jogosFiltrados = filtro === 'todos' ? jogos : jogos.filter(j => j.tipo === filtro);

        grid.innerHTML = jogosFiltrados.map(j => `
            <div class="match-card">
                <div class="match-info">
                    <strong>${j.data}</strong><br>
                    <span>${j.hora}</span>
                </div>
                <div class="match-teams">
                    <div class="team home">${j.casa}</div>
                    <div class="score">${j.resultado}</div>
                    <div class="team away">${j.fora}</div>
                </div>
                <div class="match-venue">
                    ${j.estadio}
                </div>
            </div>
        `).join('');
    }

    function filtrarJogos(tipo) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        renderizarCalendario(tipo);
    }

    renderizarCalendario();