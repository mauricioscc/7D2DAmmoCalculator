
        const DOM = {
            qty: document.getElementById('ammo-qty'),
            skill: document.getElementById('skill-level'),
            bulk: document.getElementById('bulk-crafting'),
            chem: document.getElementById('chem-station'),
            forgeTime: document.getElementById('forge-time'),
            workbenchTime: document.getElementById('workbench-time'),
            totalTime: document.getElementById('total-time'), // Nova ref
            subMatList: document.getElementById('submaterials-list'),
            basicMatList: document.getElementById('basic-materials-list'),
            bonuses: document.getElementById('active-bonuses'),
            tip: document.getElementById('survival-tip')
        };

        const infoData = {
            bullet_tip: "Produzido na Forge. Pode ser barateado upando Adv. Engineering (Lv3+).",
            bullet_casing: "Produzido na Forge. Pode ser barateado upando Adv. Engineering (Lv3+).",
            gunpowder: "Feito com Nitrate e Coal. Fazer na Chemistry Station economiza 50% dos recursos básicos.",
            lead: "Chumbo: Minerado no subsolo ou desmanchando baterias de carros. (Procure por pontos azuis no mapa.)",
            clay: "Argila: Cavando qualquer terra ou solo normal da superfície.",
            brass: "Latão: Derretendo radiadores, maçanetas, troféus ou 'Duke's Casino Tokens'.",
            nitrate: "Nitrato: Minerado de veios brancos (Procure por pontos brancos no mapa).",
            coal: "Carvão: Minerado de veios pretos (procure por pontos pretos no mapa), árvores queimadas ou lareiras."
        };

        const getInfoIcon = (key) => `
            <div class="tooltip inline-block ml-1 relative cursor-help">
                <span class="bg-zinc-700 text-gray-300 rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold font-sans">i</span>
                <span class="tooltip-text">${infoData[key]}</span>
            </div>
        `;

        function formatTime(secondsTotal) {
            let minutes = Math.floor(secondsTotal / 60);
            let seconds = Math.floor(secondsTotal % 60);
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        function calculate() {
            const qty = parseInt(DOM.qty.value) || 0;
            const skillLevel = parseInt(DOM.skill.value);
            const isBulk = DOM.bulk.checked;
            const hasChemStation = DOM.chem.checked;

            // --- Lógica de Submateriais (Quantidades) ---
            let boxes = 0;
            let remainder = qty;

            if (isBulk) {
                boxes = Math.floor(qty / 100);
                remainder = qty % 100;
            }

            const reqTips = (boxes * 80) + (remainder * 1);
            const reqGunpowder = (boxes * 240) + (remainder * 3);
            const reqCasings = (boxes * 80) + (remainder * 1);

            // --- Lógica de Tempo da Forja ---
            let baseForgeTimeSeconds = (reqTips * 1.5) + (reqCasings * 3.0);
            let forgeTimeReduction = (skillLevel >= 1) ? 0.2 : 0;
            let finalForgeTimeSeconds = baseForgeTimeSeconds * (1 - forgeTimeReduction);
            DOM.forgeTime.innerText = formatTime(finalForgeTimeSeconds);

            // --- Lógica de Tempo da Workbench ---
            let baseWbTimeSeconds = qty * 2.4; 
            let wbTimeReduction = (skillLevel >= 2) ? 0.2 : 0;
            let finalWbTimeSeconds = baseWbTimeSeconds * (1 - wbTimeReduction);
            DOM.workbenchTime.innerText = formatTime(finalWbTimeSeconds);

            // --- Lógica de Tempo TOTAL ---
            let finalTotalTimeSeconds = finalForgeTimeSeconds + finalWbTimeSeconds;
            DOM.totalTime.innerText = formatTime(finalTotalTimeSeconds);

            // --- Lógica de Materiais Básicos (Forge) ---
            let forgeDiscount = 0;
            if (skillLevel === 3) forgeDiscount = 0.10;
            if (skillLevel === 4) forgeDiscount = 0.15;
            if (skillLevel >= 5) forgeDiscount = 0.20;

            const costFactorForge = 1 - forgeDiscount;
            let totalLead = Math.ceil((reqTips * 2) * costFactorForge);
            let totalBrass = Math.ceil((reqCasings * 6) * costFactorForge);
            let totalClay = Math.ceil((reqTips * 5 + reqCasings * 5) * costFactorForge);
            
            // Calculo de Radiadores (1 Radiador = 250 Brass na Forja)
            let totalRadiators = Math.ceil(totalBrass / 250);

            // --- Lógica da Pólvora ---
            let powderCost = hasChemStation ? 1 : 2;
            let totalNitrate = reqGunpowder * powderCost;
            let totalCoal = reqGunpowder * powderCost;

            // Renderizar Submateriais
            DOM.subMatList.innerHTML = `
                <div class="bg-zinc-950 p-3 rounded border border-zinc-800 text-center">
                    <span class="block text-sm text-gray-400 flex justify-center items-center">Bullet Tip ${getInfoIcon('bullet_tip')}</span>
                    <span class="text-xl text-white teko">${reqTips}</span>
                </div>
                <div class="bg-zinc-950 p-3 rounded border border-zinc-800 text-center">
                    <span class="block text-sm text-gray-400 flex justify-center items-center">Gunpowder ${getInfoIcon('gunpowder')}</span>
                    <span class="text-xl text-white teko">${reqGunpowder}</span>
                </div>
                <div class="bg-zinc-950 p-3 rounded border border-zinc-800 text-center">
                    <span class="block text-sm text-gray-400 flex justify-center items-center">Bullet Casing ${getInfoIcon('bullet_casing')}</span>
                    <span class="text-xl text-white teko">${reqCasings}</span>
                </div>
            `;

            // Renderizar Materiais Básicos
            DOM.basicMatList.innerHTML = `
                <div class="bg-zinc-950 p-3 rounded border border-zinc-800 flex justify-between items-center">
                    <span class="text-gray-400 flex items-center">Lead ${getInfoIcon('lead')}</span>
                    <span class="text-white font-mono">${totalLead}</span>
                </div>
                
                <!-- BLOCO DO BRASS MODIFICADO COM OS RADIADORES -->
                <div class="bg-zinc-950 p-3 rounded border border-zinc-800 flex justify-between items-center">
                    <div class="flex flex-col">
                        <span class="text-gray-400 flex items-center">Brass ${getInfoIcon('brass')}</span>
                        <span class="text-[10px] text-yellow-600 mt-1 uppercase font-bold tracking-wide">≈ ${totalRadiators} Radiadores (250 un.)</span>
                    </div>
                    <span class="text-white font-mono">${totalBrass}</span>
                </div>

                <div class="bg-zinc-950 p-3 rounded border border-zinc-800 flex justify-between items-center">
                    <span class="text-gray-400 flex items-center">Clay Soil ${getInfoIcon('clay')}</span>
                    <span class="text-white font-mono">${totalClay}</span>
                </div>
                <div class="bg-zinc-950 p-3 rounded border border-zinc-800 flex justify-between items-center">
                    <span class="text-gray-400 flex items-center">Nitrate ${getInfoIcon('nitrate')}</span>
                    <span class="text-white font-mono">${totalNitrate}</span>
                </div>
                <div class="bg-zinc-950 p-3 rounded border border-zinc-800 flex justify-between items-center">
                    <span class="text-gray-400 flex items-center">Coal ${getInfoIcon('coal')}</span>
                    <span class="text-white font-mono">${totalCoal}</span>
                </div>
            `;

            // Atualizar UI de Bônus Ativos
            let bonusesHTML = "";
            if (skillLevel >= 1) bonusesHTML += `<li><span class="text-red-500 font-bold">-20%</span> Tempo de Forja.</li>`;
            if (skillLevel >= 2) bonusesHTML += `<li><span class="text-red-500 font-bold">-20%</span> Tempo na Workbench.</li>`;
            if (skillLevel >= 3) bonusesHTML += `<li><span class="text-red-500 font-bold">-${forgeDiscount*100}%</span> Custo na Forja (Chumbo, Latão, Argila).</li>`;
            if (isBulk) bonusesHTML += `<li><span class="text-red-500 font-bold">-20%</span> Materiais gastos nas caixas (Bulk).</li>`;
            if (hasChemStation) bonusesHTML += `<li><span class="text-red-500 font-bold">-50%</span> Custo para criar Gunpowder.</li>`;
            if (bonusesHTML === "") bonusesHTML = "<li>Nenhum bônus ativo no momento.</li>";
            
            DOM.bonuses.innerHTML = bonusesHTML;

            // Atualizar Dica de Sobrevivência
            if (skillLevel < 1) {
                DOM.tip.innerHTML = "Coloque pelo menos <b>1 ponto em Advanced Engineering</b> para acelerar a produção de Bullet Tips e Casings na Forja em 20%.";
            } else if (skillLevel < 3) {
                DOM.tip.innerHTML = "Suba sua skill <b>Advanced Engineering para o Nível 3</b>! Isso fará todos os custos de Forja caírem em 10%.";
            } else if (!hasChemStation) {
                DOM.tip.innerHTML = "Uma <b>Chemistry Station</b> reduz o custo do Nitrato e Carvão pela metade! Essencial para fabricação em larga escala.";
            } else if (!isBulk) {
                DOM.tip.innerHTML = "Leia todos os 7 volumes do <b>Sniper Magazine</b> para desbloquear caixas de munição, que economizam 20% do material passivamente.";
            } else {
                DOM.tip.innerHTML = "Sua produção está perfeitamente otimizada para o máximo de eficiência na base!";
            }
        }

        // Listeners
        [DOM.qty, DOM.skill, DOM.bulk, DOM.chem].forEach(el => {
            el.addEventListener('input', calculate);
        });

        calculate();
