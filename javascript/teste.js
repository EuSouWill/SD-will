document.addEventListener('DOMContentLoaded', () => {
    const { jsPDF } = window.jspdf;

    function gerarCertificado() {
        const nomeUsuario = prompt("Digite o nome do usuário:");
        const cpfUsuario = prompt("Digite o CPF do usuário:");
        const dataHoraAtual = new Date().toLocaleString();
        const codigoAutenticacao = `ID-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        document.getElementById('nome-usuario').textContent = nomeUsuario;
        document.getElementById('cpf-usuario').textContent = cpfUsuario;
        document.getElementById('data-hora').textContent = `Emitido em: ${dataHoraAtual}`;
        document.getElementById('codigo-autenticacao').textContent = codigoAutenticacao;

        const qrCodeUrl = `https://example.com/validate?code=${codigoAutenticacao}`;

        // Gerar QR Code
        QRCode.toCanvas(document.getElementById('qrcode'), qrCodeUrl, { width: 100 });

        // Gerar PDF
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text('Certificado de Conclusão', 105, 30, null, null, 'center');
        doc.addImage(document.getElementById('logo'), 'PNG', 20, 20, 50, 50);
        doc.text(`Certificamos que`, 105, 60, null, null, 'center');
        doc.text(nomeUsuario, 105, 80, null, null, 'center');
        doc.text(`CPF: ${cpfUsuario}`, 105, 100, null, null, 'center');
        doc.text(`Concluiu o curso com sucesso`, 105, 120, null, null, 'center');
        doc.text(`Emitido em: ${dataHoraAtual}`, 105, 140, null, null, 'center');
        doc.text(`Código de Autenticação: ${codigoAutenticacao}`, 105, 160, null, null, 'center');

        // Adicionar QR Code ao PDF
        QRCode.toDataURL(qrCodeUrl, { width: 100 }, (err, url) => {
            if (err) console.error(err);
            doc.addImage(url, 'PNG', 150, 170, 50, 50);
            doc.save('certificado.pdf');
        });
    }

    window.gerarCertificado = gerarCertificado;
});
