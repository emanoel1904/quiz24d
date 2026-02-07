# 🚀 GUIA PASSO A PASSO - GITHUB PAGES

## ⚡ Instalação Rápida (10 minutos)

---

## 📍 PASSO 1: CRIAR REPOSITÓRIO NO GITHUB

1. Acesse [github.com](https://github.com)
2. Clique no botão verde **"New"** (novo repositório)
3. Nome do repositório: `metodo24d-quiz`
4. Deixe como **Public**
5. ✅ Marque: "Add a README file"
6. Clique em **Create repository**

---

## 📤 PASSO 2: FAZER UPLOAD DOS ARQUIVOS

### **Opção A: Via Interface Web (Mais Fácil)**

1. No repositório, clique em **Add file** > **Upload files**
2. Arraste os 3 arquivos:
   - `index.html`
   - `style.css`
   - `script.js`
3. Adicione mensagem: "Add quiz files"
4. Clique em **Commit changes**

### **Opção B: Via Git (Linha de Comando)**

```bash
# Clone o repositório
git clone https://github.com/SEU-USUARIO/metodo24d-quiz.git
cd metodo24d-quiz

# Adicione os arquivos
# (coloque index.html, style.css e script.js na pasta)

# Commit e push
git add .
git commit -m "Add quiz files"
git push
```

---

## 🌐 PASSO 3: ATIVAR GITHUB PAGES

1. No repositório, clique em **Settings** (Configurações)
2. No menu lateral esquerdo, clique em **Pages**
3. Em **Source (Origem)**, selecione: **main** branch
4. Clique em **Save** (Salvar)
5. ⏰ Aguarde 2-3 minutos

✅ **Pronto!** Seu quiz estará em:
```
https://SEU-USUARIO.github.io/metodo24d-quiz/
```

---

## 📊 PASSO 4: CRIAR GOOGLE SHEETS

1. Acesse [sheets.google.com](https://sheets.google.com)
2. Clique em **Blank** (Em branco) para criar nova planilha
3. Nomeie como: **"MÉTODO 24D - Candidatas"**
4. **COPIE O ID da planilha** (está na URL):

```
https://docs.google.com/spreadsheets/d/1A2B3C4D5E6F7G8H9/edit
                                        ↑
                                   ESTE É O ID
```

📋 **Cole o ID em algum lugar**, você vai precisar!

---

## ⚙️ PASSO 5: CRIAR GOOGLE APPS SCRIPT

1. **Na planilha**, vá no menu: **Extensões** > **Apps Script**
2. Vai abrir uma nova aba com editor de código
3. **Delete todo o código** que aparece
4. **Cole o código** do arquivo `google-apps-script.gs`
5. **IMPORTANTE:** Na linha 12, cole o ID da planilha:

```javascript
const PLANILHA_ID = 'COLE_AQUI_O_ID_QUE_VOCÊ_COPIOU';
```

6. Clique em **💾 Salvar** (ou Ctrl+S)
7. Nomeie o projeto como: **"API MÉTODO 24D"**

---

## 🚀 PASSO 6: PUBLICAR O APPS SCRIPT

1. No Apps Script, clique em **Implantar** > **Nova implantação**

2. Clique no ícone de **engrenagem ⚙️** (Selecionar tipo)

3. Escolha: **Aplicativo da Web**

4. Configure:
   ```
   Descrição: API MÉTODO 24D
   Executar como: Eu (seu-email@gmail.com)
   Quem tem acesso: Qualquer pessoa
   ```

5. Clique em **Implantar**

6. **AUTORIZE** o acesso (vai pedir permissão Google)
   - Clique em "Ir para [nome do projeto] (unsafe)"
   - Clique em "Permitir"

7. **COPIE A URL** que aparece:
   ```
   URL do aplicativo da Web
   https://script.google.com/macros/s/ABC123xyz/exec
   ```

📋 **Guarde esta URL!**

---

## 🔗 PASSO 7: CONECTAR QUIZ AO GOOGLE SHEETS

1. Volte ao GitHub
2. Abra o arquivo **`script.js`**
3. Clique no ícone de **✏️ lápis** (editar)
4. **Na linha 5**, cole a URL do Apps Script:

```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/ABC123xyz/exec';
```

5. Role até o final da página
6. Clique em **Commit changes**
7. Confirme clicando novamente em **Commit changes**

---

## ✅ PASSO 8: TESTAR O SISTEMA

1. Acesse seu quiz: `https://SEU-USUARIO.github.io/metodo24d-quiz/`

2. **Preencha o quiz completo** com dados de teste:
   - Nome: Teste Maria
   - Instagram: https://instagram.com/teste
   - Seguidores: 10.000 a 30.000
   - Cidade: Maceió
   - WhatsApp: (82) 99999-9999
   - Email: teste@email.com
   - Público feminino: 60% a 70%
   - Seguidores AL: 50% a 70%
   - Nicho: Fitness
   - Views: 1.000 a 3.000
   - Motivação: (escreva qualquer texto com mais de 100 caracteres)

3. Clique em **Enviar Inscrição**

4. **Aguarde a mensagem de confirmação**

5. **Abra sua planilha no Google Sheets**

6. ✅ **Verifique se os dados apareceram!**

---

## 🎉 PRONTO! SISTEMA FUNCIONANDO!

Se os dados apareceram na planilha:

✅ GitHub Pages está funcionando  
✅ Google Sheets está conectado  
✅ Apps Script está rodando  
✅ Quiz está 100% operacional  

**Agora é só compartilhar o link do quiz e começar a recrutar!**

---

## 🔧 SOLUÇÃO DE PROBLEMAS

### ❌ **Problema: Dados não aparecem na planilha**

**Solução:**
1. Verifique se colou a URL correta no `script.js` (linha 5)
2. Confirme que o Apps Script está publicado como "Qualquer pessoa"
3. Tente republicar o Apps Script (Nova implantação)
4. Limpe o cache do navegador (Ctrl+Shift+Delete)

### ❌ **Problema: Erro ao autorizar Apps Script**

**Solução:**
1. Clique em "Avançado"
2. Clique em "Ir para [projeto] (não seguro)"
3. Clique em "Permitir"

### ❌ **Problema: Quiz não abre**

**Solução:**
1. Verifique se ativou o GitHub Pages em Settings > Pages
2. Aguarde 5 minutos (primeira vez pode demorar)
3. Tente acessar em janela anônima

### ❌ **Problema: "GOOGLE_SCRIPT_URL não definido"**

**Solução:**
Você esqueceu de colar a URL no `script.js`!
1. Edite `script.js` no GitHub
2. Linha 5, cole a URL do Apps Script
3. Commit changes

---

## 📱 COMPARTILHAR O QUIZ

### **Link Direto:**
```
https://SEU-USUARIO.github.io/metodo24d-quiz/
```

### **Link Encurtado:**
Use [bit.ly](https://bit.ly) ou [tinyurl.com](https://tinyurl.com):
```
https://bit.ly/metodo24d
```

### **QR Code:**
Gere em [qr-code-generator.com](https://www.qr-code-generator.com/)

---

## 🎨 PERSONALIZAR DEPOIS

### **Trocar cores:**
Edite `style.css` (linha 4-15)

### **Mudar textos:**
Edite `index.html`

### **Adicionar logo:**
Adicione uma imagem `.png` ao repositório e referencie no HTML

---

## 📊 ACESSAR PLANILHA

**Seu link da planilha:**
```
https://docs.google.com/spreadsheets/d/SEU_ID_AQUI/edit
```

**Compartilhar com equipe:**
1. Clique em "Compartilhar"
2. Adicione emails
3. Defina permissões

---

## ✅ CHECKLIST FINAL

- [ ] Repositório criado no GitHub
- [ ] Arquivos enviados (index.html, style.css, script.js)
- [ ] GitHub Pages ativado
- [ ] Google Sheets criada
- [ ] Apps Script criado e publicado
- [ ] URL do Apps Script colada no script.js
- [ ] Quiz testado e funcionando
- [ ] Dados aparecendo na planilha
- [ ] Link compartilhado

---

**🎉 PARABÉNS! SEU SISTEMA ESTÁ NO AR!**

Agora é só divulgar e começar a recrutar embaixadoras! 💪

---

**MÉTODO 24D** - Emagreça em 24 Dias
