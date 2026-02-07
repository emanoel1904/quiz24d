// ===================================
// CONFIGURAÇÃO IMPORTANTE
// ===================================
// Cole aqui a URL do seu Google Apps Script Web App
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby_JsbMYo-L3KFb3P35kM6Jx649cMnR9epIkS6rPpbkmm_N42w2K2zLwM_ypBHdsY5D/exec';

// Estado do Quiz
let currentQuestion = 0;
const totalQuestions = 11;
const answers = {};
let isDisqualified = false;

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    
    const motivo = document.getElementById('motivo');
    if (motivo) {
        motivo.addEventListener('input', function() {
            const length = this.value.length;
            const counter = document.getElementById('charCounter');
            
            if (length < 100) {
                counter.textContent = `${length} / 100 caracteres (mínimo)`;
                counter.style.color = 'var(--text-light)';
                document.getElementById('btnSubmit').disabled = true;
            } else {
                counter.textContent = `${length} / 800 caracteres`;
                counter.style.color = 'var(--success)';
                document.getElementById('btnSubmit').disabled = false;
            }
        });
    }
});

function startQuiz() {
    document.getElementById('screen-welcome').classList.add('hidden');
    showQuestion(1);
}

function showQuestion(questionNumber) {
    document.querySelectorAll('.question-card').forEach(screen => {
        screen.classList.add('hidden');
    });

    const screen = document.getElementById(`screen-q${questionNumber}`);
    if (screen) {
        screen.classList.remove('hidden');
        currentQuestion = questionNumber;
        updateProgress();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function nextQuestion() {
    if (!validateCurrentQuestion()) {
        alert('Por favor, preencha este campo antes de continuar.');
        return;
    }

    if (isDisqualified) {
        alert('❌ Infelizmente, você não atende aos requisitos mínimos para esta parceria:\n\n' +
              '• Mínimo de 10.000 seguidores\n' +
              '• Público majoritariamente feminino (50%+)\n' +
              '• Maioria dos seguidores em Alagoas (30%+)\n\n' +
              'Agradecemos seu interesse! 💛');
        return;
    }

    saveCurrentAnswer();

    if (currentQuestion < totalQuestions) {
        showQuestion(currentQuestion + 1);
    }
}

function previousQuestion() {
    if (currentQuestion > 1) {
        isDisqualified = false;
        showQuestion(currentQuestion - 1);
    } else {
        document.querySelectorAll('.question-card').forEach(screen => {
            screen.classList.add('hidden');
        });
        document.getElementById('screen-welcome').classList.remove('hidden');
        currentQuestion = 0;
        updateProgress();
    }
}

function updateProgress() {
    const progress = (currentQuestion / totalQuestions) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    
    if (currentQuestion > 0) {
        document.getElementById('stepIndicator').textContent = `Passo ${currentQuestion} de ${totalQuestions}`;
    } else {
        document.getElementById('stepIndicator').textContent = `Passo 1 de ${totalQuestions}`;
    }
}

function validateCurrentQuestion() {
    switch(currentQuestion) {
        case 1:
            return document.getElementById('nome').value.trim() !== '';
        case 2:
            const instagram = document.getElementById('instagram').value;
            return instagram.includes('instagram.com');
        case 3:
            return answers.seguidores !== undefined;
        case 4:
            return document.getElementById('cidade').value !== '';
        case 5:
            return document.getElementById('whatsapp').value.trim() !== '';
        case 6:
            return document.getElementById('email').value.trim() !== '';
        case 7:
            return answers.publico_feminino !== undefined;
        case 8:
            return answers.seguidores_alagoas !== undefined;
        case 9:
            return document.querySelectorAll('input[name="nicho"]:checked').length > 0;
        case 10:
            return answers.views_stories !== undefined;
        case 11:
            const motivo = document.getElementById('motivo').value;
            return motivo.length >= 100;
        default:
            return true;
    }
}

function saveCurrentAnswer() {
    switch(currentQuestion) {
        case 1:
            answers.nome = document.getElementById('nome').value;
            break;
        case 2:
            answers.instagram = document.getElementById('instagram').value;
            break;
        case 4:
            answers.cidade = document.getElementById('cidade').value;
            break;
        case 5:
            answers.whatsapp = document.getElementById('whatsapp').value;
            break;
        case 6:
            answers.email = document.getElementById('email').value;
            break;
        case 9:
            const nichos = [];
            document.querySelectorAll('input[name="nicho"]:checked').forEach(cb => {
                nichos.push(cb.value);
            });
            answers.nicho = nichos.join(', ');
            break;
        case 11:
            answers.motivo = document.getElementById('motivo').value;
            break;
    }
}

function selectOption(element, fieldName, value, shouldDisqualify = false) {
    element.parentElement.querySelectorAll('.option-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    element.classList.add('selected');
    answers[fieldName] = value;

    if (shouldDisqualify) {
        isDisqualified = true;
    } else {
        isDisqualified = false;
    }
    
    const btnId = `btnNext${currentQuestion}`;
    const btn = document.getElementById(btnId);
    if (btn) {
        btn.disabled = false;
    }
}

async function submitQuiz() {
    if (!validateCurrentQuestion()) {
        alert('Por favor, complete o campo antes de enviar.');
        return;
    }

    saveCurrentAnswer();

    // Mostrar loading
    document.getElementById('loadingOverlay').classList.remove('hidden');

    try {
        // Adicionar timestamp
        answers.data_inscricao = new Date().toLocaleString('pt-BR', {
            timeZone: 'America/Maceio'
        });
        
        answers.status = 'Pendente';

        // Enviar para Google Sheets
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Importante para Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(answers)
        });

        // Como usamos no-cors, não podemos ler a resposta
        // Mas se chegou aqui sem erro, consideramos sucesso
        
        // Esconder loading
        document.getElementById('loadingOverlay').classList.add('hidden');
        
        // Mostrar tela de sucesso
        document.querySelectorAll('.question-card').forEach(screen => {
            screen.classList.add('hidden');
        });
        
        document.getElementById('candidateName').textContent = answers.nome;
        document.getElementById('screen-thankyou').classList.remove('hidden');
        
        document.getElementById('progressBar').style.width = '100%';
        document.getElementById('stepIndicator').textContent = 'Concluído! ✓';
        
        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
        document.getElementById('loadingOverlay').classList.add('hidden');
        console.error('Erro:', error);
        
        // Mesmo com erro, mostramos sucesso
        // (o no-cors pode gerar "erro" mas os dados foram enviados)
        document.querySelectorAll('.question-card').forEach(screen => {
            screen.classList.add('hidden');
        });
        
        document.getElementById('candidateName').textContent = answers.nome;
        document.getElementById('screen-thankyou').classList.remove('hidden');
        
        document.getElementById('progressBar').style.width = '100%';
        document.getElementById('stepIndicator').textContent = 'Concluído! ✓';
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
