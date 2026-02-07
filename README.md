# 🌟 MÉTODO 24D - Quiz de Seleção de Embaixadoras

Quiz profissional para seleção de influenciadoras em Alagoas com salvamento automático em **Google Sheets**.

🔗 **Demo:** [Seu link do GitHub Pages aqui]

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Instalação GitHub Pages](#instalação-github-pages)
- [Configurar Google Sheets](#configurar-google-sheets)
- [Estrutura do Quiz](#estrutura-do-quiz)
- [Personalização](#personalização)
- [Visualizar Dados](#visualizar-dados)
- [FAQ](#faq)

---

## 📖 Sobre o Projeto

Sistema completo de quiz para recrutamento de embaixadoras do **MÉTODO 24D**:

✅ Quiz interativo com 11 perguntas  
✅ Design profissional e responsivo  
✅ Filtros automáticos de qualificação  
✅ Salvamento em Google Sheets  
✅ Planilha formatada automaticamente  
✅ 100% gratuito (GitHub Pages + Google Sheets)  

---

## 🚀 Instalação GitHub Pages

### **Passo 1: Fork ou Clone**

```bash
git clone https://github.com/seu-usuario/metodo24d-quiz.git
cd metodo24d-quiz
```

### **Passo 2: Fazer Upload**

1. Crie um repositório no GitHub
2. Faça upload dos arquivos:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`

### **Passo 3: Ativar GitHub Pages**

1. Vá em **Settings** do repositório
2. Clique em **Pages** (menu lateral)
3. Em **Source**, selecione `main` branch
4. Clique em **Save**
5. Aguarde alguns minutos

Seu quiz estará em: `https://seu-usuario.github.io/nome-do-repo/`

---

## 📊 Configurar Google Sheets

### **Passo 1: Criar Planilha**

1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha
3. Nomeie como "MÉTODO 24D - Candidatas"
4. **Copie o ID da planilha** (está na URL):
   ```
   https://docs.google.com/spreadsheets/d/[ESTE_É_O_ID]/edit
   ```

### **Passo 2: Criar Google Apps Script**

1. Na planilha, vá em **Extensões** > **Apps Script**
2. Delete o código padrão
3. Cole o código do arquivo `google-apps-script.gs`
4. **IMPORTANTE:** Na linha 12, cole o ID da sua planilha:
   ```javascript
   const PLANILHA_ID = 'COLE_AQUI_O_ID';
   ```

### **Passo 3: Publicar como Web App**

1. Clique em **Implantar** > **Nova implantação**
2. Clique no ícone de engrenagem ⚙️ > **Aplicativo da Web**
3. Configure:
   - **Descrição:** "API MÉTODO 24D"
   - **Executar como:** Eu (seu email)
   - **Quem tem acesso:** Qualquer pessoa
4. Clique em **Implantar**
5. **Copie a URL do Web App** (algo como):
   ```
   https://script.google.com/macros/s/ABC...xyz/exec
   ```

### **Passo 4: Conectar ao Quiz**

1. Abra o arquivo `script.js`
2. Na **linha 5**, cole a URL do Google Apps Script:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/ABC...xyz/exec';
   ```
3. Salve e faça commit no GitHub

---

## ✅ Testar o Sistema

1. Acesse seu GitHub Pages: `https://seu-usuario.github.io/repo/`
2. Preencha o quiz completo
3. Verifique se os dados apareceram na planilha do Google Sheets

**Se não funcionou:**
- Verifique se colou a URL correta no `script.js`
- Confirme que o Apps Script está publicado como "Qualquer pessoa"
- Veja o console do navegador (F12) para erros

---

## 🎨 Estrutura do Quiz

### **Perguntas:**

1. Nome completo
2. Instagram (link)
3. **Número de seguidores** (filtro: mín. 10k)
4. Cidade em Alagoas
5. WhatsApp
6. Email
7. **% Público feminino** (filtro: mín. 50%)
8. **% Seguidores em AL** (filtro: mín. 30%)
9. Nicho de conteúdo (múltipla escolha)
10. Média de views nos Stories
11. Motivação (texto, mín. 100 caracteres)

### **Filtros Automáticos:**

O quiz **não permite** continuar se:
- Menos de 10.000 seguidores
- Menos de 50% de público feminino
- Menos de 30% de seguidores em Alagoas

Candidatas desqualificadas recebem mensagem explicativa.

---

## 📊 Planilha Google Sheets

### **Colunas Criadas Automaticamente:**

| Coluna | Conteúdo |
|--------|----------|
| ID | Número sequencial |
| Data/Hora | Timestamp da inscrição |
| Nome | Nome completo |
| Instagram | Link clicável |
| WhatsApp | Número de contato |
| Email | Email da candidata |
| Cidade | Cidade em AL |
| Nº Seguidores | Faixa de seguidores |
| % Público Feminino | Porcentagem |
| % Seguidores AL | Porcentagem em AL |
| Nicho | Nicho(s) selecionado(s) |
| Views Stories | Média de visualizações |
| Motivação | Resposta em texto |
| Status | Pendente/Aprovada/Reprovada |

### **Formatação Automática:**

✅ Cabeçalho verde (#7C9885) com texto branco  
✅ Linhas alternadas (zebrado) para fácil leitura  
✅ Bordas em todas as células  
✅ Link do Instagram clicável  
✅ Status em destaque  
✅ Colunas com largura otimizada  

---

## 🎨 Personalização

### **Cores:**

Edite `style.css` e altere as variáveis CSS:

```css
:root {
    --primary: #7C9885;        /* Verde principal */
    --secondary: #D4A574;      /* Dourado */
    --success: #52C785;        /* Verde sucesso */
}
```

### **Textos:**

Edite `index.html` e modifique:
- Títulos
- Descrições
- Perguntas
- Benefícios do produto

### **Número de Perguntas:**

Para adicionar/remover perguntas:

1. Edite `index.html` (adicione/remova seções)
2. Edite `script.js` (atualize `totalQuestions` e validações)
3. Edite `google-apps-script.gs` (adicione/remova colunas)

---

## 👁️ Visualizar Dados

### **Opção 1: Google Sheets Direto**

Acesse sua planilha: `https://docs.google.com/spreadsheets/d/SEU_ID/`

### **Opção 2: Compartilhar com Equipe**

1. Clique em **Compartilhar** no Google Sheets
2. Adicione emails da equipe
3. Defina permissões (Visualizador/Editor)

### **Opção 3: Exportar Excel**

1. Abra a planilha
2. **Arquivo** > **Fazer download** > **Microsoft Excel**

### **Opção 4: Automatizar Relatórios**

Configure email automático no Apps Script (já incluído, basta descomentar):

```javascript
// Linha 118 do google-apps-script.gs
const emailDestino = 'seu@email.com';
```

---

## 📱 Domínio Personalizado (Opcional)

Para usar seu próprio domínio (ex: `quiz.metodo24d.com`):

1. Vá em **Settings** > **Pages**
2. Em **Custom domain**, adicione seu domínio
3. Configure DNS:
   ```
   Tipo: CNAME
   Nome: quiz (ou @)
   Valor: seu-usuario.github.io
   ```

---

## 🔐 Segurança e Privacidade

### **Dados Seguros:**

✅ HTTPS automático (GitHub Pages)  
✅ Dados salvos no seu Google Sheets privado  
✅ Apps Script protegido por autenticação Google  

### **LGPD:**

Adicione aviso de privacidade no quiz. Edite `index.html` antes da pergunta final:

```html
<div class="alert">
    <strong>📋 Política de Privacidade</strong>
    <p>Ao enviar este formulário, você autoriza o MÉTODO 24D a utilizar 
    suas informações para análise de candidatura. Seus dados não serão 
    compartilhados com terceiros.</p>
</div>
```

---

## ❓ FAQ

### **O quiz funciona no celular?**
Sim! O design é 100% responsivo e otimizado para mobile.

### **Posso editar a planilha?**
Sim! Você tem controle total da planilha no Google Sheets.

### **Quantas candidatas posso receber?**
Ilimitado! Google Sheets suporta até 10 milhões de células.

### **Preciso pagar algo?**
Não! GitHub Pages e Google Sheets são gratuitos.

### **Posso usar outro backend além do Google Sheets?**
Sim! Você pode adaptar o `script.js` para enviar para:
- Airtable
- Notion
- Seu próprio servidor
- Qualquer API

### **E se eu quiser upload de imagens?**
Para GitHub Pages, você precisaria usar um serviço externo como:
- Cloudinary (gratuito até 25GB)
- ImgBB (gratuito)
- Firebase Storage

---

## 🛠️ Estrutura de Arquivos

```
metodo24d-quiz/
├── index.html              # Página do quiz
├── style.css               # Estilos CSS
├── script.js               # Lógica JavaScript
├── google-apps-script.gs   # Script do Google Sheets
└── README.md              # Este arquivo
```

---

## 📞 Suporte

**Problemas comuns:**

1. **"Dados não aparecem na planilha"**
   - Verifique se colou a URL correta no `script.js`
   - Confirme que o Apps Script está publicado

2. **"Quiz não carrega"**
   - Verifique se ativou o GitHub Pages
   - Aguarde alguns minutos após ativar

3. **"Erro ao enviar"**
   - Abra o console (F12) e veja o erro
   - Verifique permissões do Apps Script

---

## 📜 Licença

Este projeto é de uso livre para o **MÉTODO 24D**.

---

## 🎉 Pronto para Usar!

Seu quiz está pronto! Agora é só:

1. ✅ Configurar o Google Sheets
2. ✅ Publicar no GitHub Pages
3. ✅ Compartilhar o link
4. ✅ Recrutar embaixadoras incríveis!

**Link do Quiz:** `https://seu-usuario.github.io/repo/`

---

**MÉTODO 24D** - Emagreça em 24 Dias 💪
