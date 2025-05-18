document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const modal = new bootstrap.Modal(document.getElementById('successModal'));
    const modalMessage = document.getElementById('modalMessage');
    const telefoneInput = document.getElementById('telefone');

    // aplicando máscara de telefone (XX) XXXXX-XXXX
    telefoneInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for dígito
        let formattedValue = '';

        if (value.length > 0) {
            // Adiciona (XX)
            formattedValue = '(' + value.substring(0, 2);
            if (value.length > 2) {
                formattedValue += ') ' + value.substring(2, 7); // Adiciona XXXXX
            }
            if (value.length > 7) {
                formattedValue += '-' + value.substring(7, 11); // Adiciona XXXX
            }
            e.target.value = formattedValue;
        }

        // Limita a entrada a 15 dígitos contando com os caracteres
        if (value.length > 11) {
            e.target.value = formattedValue.slice(0, 15); // Limita ao formato completo
        }
    });

    // Limita o comprimento máximo a 14 caracteres (formato completo) e impede entrada extra
    telefoneInput.addEventListener('keydown', function (e) {
        if (telefoneInput.value.length >= 15 && e.key !== 'Backspace' && e.key !== 'Delete') {
            e.preventDefault();
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o envio padrão do formulário

        // Obtém os valores dos campos
        const nome = document.getElementById('nome').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        // Validação
        let isValid = true;
        if (!nome) {
            alert('Por favor, preencha o campo Nome.');
            isValid = false;
        } else if (!telefone || !isValidPhone(telefone)) {
            alert('Por favor, insira um telefone válido no formato (XX) XXXXX-XXXX.');
            isValid = false;
        } else if (!email || !isValidEmail(email)) {
            alert('Por favor, insira um e-mail válido.');
            isValid = false;
        } else if (!mensagem) {
            alert('Por favor, preencha o campo Mensagem.');
            isValid = false;
        }

        // Se todos os campos estiverem válidos, exibe o modal
        if (isValid) {
            modalMessage.innerHTML = `
                <h3 class="text-danger">Recebemos seu contato!</h3>
                <p class="text-danger my-4">
                    Contato enviado com sucesso, aguarde um de nossos colaboradores entrar em contato com você.<br>
                    ${nome}, os contatos e documentos de proposta foram enviados para o e-mail: ${email}
                    <br>
                    <p class="mt-3">Siga-nos nas nossas redes sociais:</p>
                </p>
                <div>
                <a href="#" class="me-3 text-danger fs-4"><i class="bi bi-facebook"></i></a>
                <a href="#" class="me-3 text-danger fs-4"><i class="bi bi-twitter"></i></a>
                <a href="#" class="me-3 text-danger fs-4"><i class="bi bi-instagram"></i></a>
                </div>
                <h4 class="text-danger mt-4">Obrigado</h4>
            `;
            modal.show();
            form.reset(); // Limpa o formulário
        }
    });

    // Função para validar e-mail
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Função para validar telefone
    function isValidPhone(telefone) {
        const phoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/; // Valida (XX) XXXXX-XXXX
        return phoneRegex.test(telefone);
    }
});