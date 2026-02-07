// ===================================
// CONFIGURAÇÃO IMPORTANTE
// ===================================
const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycby_JsbMYo-L3KFb3P35kM6Jx649cMnR9epIkS6rPpbkmm_N42w2K2zLwM_ypBHdsY5D/exec';

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
        alert(
          '❌ Infelizmente, você não atende aos requisitos mínimos:\n\n' +
          '• Mínimo de 10.000 seguidores\n' +
          '• Público feminino 50%+\n' +
          '• Seguidores em AL 30%+\n\n' +
          'Obrigada pelo interesse 💛'
        );
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
    document.getElementById('stepIndicator').textContent =
        currentQuestion > 0
          ? `Passo ${currentQuestion} de ${totalQuestions}`
          : `Passo 1 de ${totalQuestions}`;
}

function validateCurrentQuestion() {
    switch(currentQuestion) {
        case 1: return document.getElementById('nome').value.trim() !== '';
        case 2: return document.getElementById('instagram').value.includes('instagram.com');
        case 3: return answers.seguidores !== undefined;
        case 4: return document.getElementById('cidade').value !== '';
        case 5: return document.getElementById('whatsapp').value.trim() !== '';
        case 6: return document.getElementById('email').value.trim() !== '';
        case 7: return answers.publico_feminino !== undefined;
        case 8: return answers.seguidores_alagoas !== undefined;
        case 9: return document.querySelectorAll('input[name="nicho"]:checked').length > 0;
        case 10: return answers.views_stories !== undefined;
        case 11: return document.getElementById('motivo').value.length >= 100;
        default: return true;
    }
}

function saveCurrentAnswer() {
    switch(currentQuestion) {
        case 1: answers.nome = document.getElementById('nome').value; break;
        case 2: answers.instagram = document.getElementById('instagram').value; break;
        case 4: answers.cidade = document.getElementById('cidade').value; break;
        case 5: answers.whatsapp = document.getElementById('whatsapp').value; break;
        case 6: answers.email = document.getElementById('email').value; break;
        case 9:
            answers.nicho = Array.from(
              document.querySelectorAll('input[name="nicho"]:checked')
            ).map(cb => cb.value).join(', ');
            break;
        case 11: answers.motivo = document.getElementById('motivo').value; break;
    }
}

function selectOption(element, fieldName, value, shouldDisqualify = false) {
    element.parentElement.querySelectorAll('.option-card')
      .forEach(card => card.classList.remove('selected'));

    element.classList.add('selected');
    answers[fieldName] = value;
    isDisqualified = shouldDisqualify;

    const btn = document.getElementById(`btnNext${currentQuestion}`);
    if (btn) btn.disabled = false;
}

async function submitQuiz() {
    if (!validateCurrentQuestion()) {
        alert('Por favor, complete o campo antes de enviar.');
        return;
    }

    saveCurrentAnswer();
    document.getElementById('loadingOverlay').classList.remove('hidden');

    try {
        answers.data_inscricao = new Date().toLocaleString('pt-BR', {
            timeZone: 'America/Maceio'
        });
        answers.status = 'Pendente';

        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(answers)
        });

        const result = await response.json();
        if (!result.success) throw new Error(result.error);

        finalizarQuiz();

    } catch (error) {
        console.error(error);
        alert('❌ Erro ao enviar. Tente novamente.');
        document.getElementById('loadingOverlay').classList.add('hidden');
    }
}

function finalizarQuiz() {
    document.getElementById('loadingOverlay').classList.add('hidden');
    document.querySelectorAll('.question-card').forEach(s => s.classList.add('hidden'));
    document.getElementById('candidateName').textContent = answers.nome;
    document.getElementById('screen-thankyou').classList.remove('hidden');
    document.getElementById('progressBar').style.width = '100%';
    document.getElementById('stepIndicator').textContent = 'Concluído! ✓';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
