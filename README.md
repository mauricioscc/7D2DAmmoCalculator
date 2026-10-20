# 🧟‍♂️ 7 Days to Die - Ammo Calculator MVP (7.62mm)

Uma calculadora web interativa projetada para planejar e otimizar a produção de munição 7.62mm no jogo **7 Days to Die** (3.3.0 Stable). Esta ferramenta ajuda os jogadores a calcular o tempo exato e a quantidade de recursos (matéria-prima e submateriais) necessários, considerando os redutores de custo e tempo proporcionados pelas skills, estações de trabalho e coleções de livros.

## 🚀 Funcionalidades

* **Cálculo de Tempo Segmentado:** Exibe separadamente o tempo de preparo na *Forge* e a montagem final na *Workbench*, junto com o tempo total da operação.
* **Sistema de Skills Integrado:** Simula os níveis da habilidade *Advanced Engineering* (Lv 1 a 5), aplicando em tempo real as reduções de tempo (-20%) e custo de material na forja (-10% a -20%).
* **Mecânica de Bulk Crafting:** Calcula o desconto passivo de 20% nos recursos ao selecionar o bônus de caixas completas de munição (desbloqueado ao ler todos os 7 volumes da *Sniper Magazine*).
* **Chemistry Station:** Alternância dinâmica de receita para calcular a fabricação de Pólvora (*Gunpowder*) pela metade do custo usando a Estação Química.
* **Conversão Prática:** Exibe a quantidade estimada de Radiadores de Carro necessários para derreter e atingir a meta de Latão (*Brass*).
* **Tooltips de Sobrevivência:** Ícones interativos informam rapidamente aos jogadores onde focar o loot ou mineração para cada recurso específico.

## 🔮 Atualizações Futuras (Roadmap)

O projeto continua em expansão! As próximas implementações planejadas para a calculadora incluem:
* **Todas Variações de 7.62mm:** Inclusão de suporte para as munições especiais AP (*Armor Piercing*) e HP (*HiPower*).
* **Novos Calibres de Munição:** Ampliação do sistema para calcular recursos de:
  * *Shotgun Shells* (Cartuchos de Escopeta)
  * Munição *.44 Magnum* + Variações 
  * Munição *9mm* + Variações
* Caso tenha alguma sugestão, sinta-se livre para comentar!

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura semântica do projeto.
* **Tailwind CSS:** Estilização via classes utilitárias para construir uma interface inspirada nos menus vermelhos da versão atual do jogo.
* **JavaScript Vanilla:** Motor de cálculo e manipulação do DOM instantânea, sem necessidade de recarregar a página ou frameworks externos.


## 🎮 Como Acessar e Usar

**Acesso Rápido (Online):**  
Acesse a calculadora diretamente pelo navegador:  

[Calculadora](https://mauricioscc.github.io/7D2DAmmoCalculator/)

## 📂 Estrutura do Projeto

```text
7d2d-ammo-calc/
├── css/
│   └── style.css       # Estilos complementares (Tooltips e Fontes)
├── js/
│   └── calculator.js   # Lógica matemática e atualização da interface
├── index.html          # Estrutura visual da aplicação
└── README.md           # Documentação do repositório
```

## 👤 Autor

Desenvolvido por **Maurício Santos** ([@mauricioscc](https://github.com/mauricioscc)).

