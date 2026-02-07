// ===================================
// GOOGLE APPS SCRIPT - MÉTODO 24D
// ===================================
// Este script deve ser publicado como Web App
// e a URL deve ser colada no arquivo script.js

function doPost(e) {
  try {
    // Pegar dados do POST
    const data = JSON.parse(e.postData.contents);
    
    // Abrir planilha (crie uma planilha no Google Sheets e cole o ID aqui)
    const PLANILHA_ID = 'COLE_AQUI_O_ID_DA_SUA_PLANILHA'; // Exemplo: 1ABC...xyz
    const ss = SpreadsheetApp.openById(PLANILHA_ID);
    const sheet = ss.getSheetByName('Candidatas') || ss.insertSheet('Candidatas');
    
    // Se a planilha estiver vazia, criar cabeçalho
    if (sheet.getLastRow() === 0) {
      const cabecalho = [
        'ID',
        'Data/Hora',
        'Nome',
        'Instagram',
        'WhatsApp',
        'Email',
        'Cidade',
        'Nº Seguidores',
        '% Público Feminino',
        '% Seguidores AL',
        'Nicho',
        'Views Stories',
        'Motivação',
        'Status'
      ];
      
      sheet.appendRow(cabecalho);
      
      // Formatar cabeçalho
      const headerRange = sheet.getRange(1, 1, 1, cabecalho.length);
      headerRange.setBackground('#7C9885');
      headerRange.setFontColor('#FFFFFF');
      headerRange.setFontWeight('bold');
      headerRange.setFontSize(11);
      headerRange.setHorizontalAlignment('center');
      
      // Congelar primeira linha
      sheet.setFrozenRows(1);
      
      // Definir larguras das colunas
      sheet.setColumnWidth(1, 60);   // ID
      sheet.setColumnWidth(2, 140);  // Data
      sheet.setColumnWidth(3, 200);  // Nome
      sheet.setColumnWidth(4, 250);  // Instagram
      sheet.setColumnWidth(5, 130);  // WhatsApp
      sheet.setColumnWidth(6, 200);  // Email
      sheet.setColumnWidth(7, 150);  // Cidade
      sheet.setColumnWidth(8, 150);  // Seguidores
      sheet.setColumnWidth(9, 150);  // % Feminino
      sheet.setColumnWidth(10, 150); // % AL
      sheet.setColumnWidth(11, 200); // Nicho
      sheet.setColumnWidth(12, 150); // Views
      sheet.setColumnWidth(13, 400); // Motivação
      sheet.setColumnWidth(14, 120); // Status
    }
    
    // Gerar ID
    const proximoId = sheet.getLastRow();
    
    // Preparar dados para inserir
    const linha = [
      proximoId,
      data.data_inscricao || new Date().toLocaleString('pt-BR'),
      data.nome || '',
      data.instagram || '',
      data.whatsapp || '',
      data.email || '',
      data.cidade || '',
      data.seguidores || '',
      data.publico_feminino || '',
      data.seguidores_alagoas || '',
      data.nicho || '',
      data.views_stories || '',
      data.motivo || '',
      data.status || 'Pendente'
    ];
    
    // Inserir dados
    sheet.appendRow(linha);
    
    // Pegar número da linha que foi inserida
    const linhaInserida = sheet.getLastRow();
    
    // Formatar linha de dados
    const dataRange = sheet.getRange(linhaInserida, 1, 1, linha.length);
    
    // Bordas
    dataRange.setBorder(
      true, true, true, true, true, true,
      '#E1E8ED',
      SpreadsheetApp.BorderStyle.SOLID
    );
    
    // Alinhamento vertical
    dataRange.setVerticalAlignment('top');
    dataRange.setWrap(true);
    
    // Cor de fundo alternada (zebrado)
    if (linhaInserida % 2 === 0) {
      dataRange.setBackground('#F8F9FA');
    }
    
    // Centralizar colunas específicas
    sheet.getRange(linhaInserida, 1).setHorizontalAlignment('center');  // ID
    sheet.getRange(linhaInserida, 2).setHorizontalAlignment('center');  // Data
    sheet.getRange(linhaInserida, 5).setHorizontalAlignment('center');  // WhatsApp
    sheet.getRange(linhaInserida, 8).setHorizontalAlignment('center');  // Seguidores
    sheet.getRange(linhaInserida, 9).setHorizontalAlignment('center');  // % Feminino
    sheet.getRange(linhaInserida, 10).setHorizontalAlignment('center'); // % AL
    sheet.getRange(linhaInserida, 12).setHorizontalAlignment('center'); // Views
    sheet.getRange(linhaInserida, 14).setHorizontalAlignment('center'); // Status
    
    // Link no Instagram
    const instagramCell = sheet.getRange(linhaInserida, 4);
    if (data.instagram) {
      instagramCell.setFormula(`=HYPERLINK("${data.instagram}"; "${data.instagram}")`);
      instagramCell.setFontColor('#7C9885');
      instagramCell.setFontLine('underline');
    }
    
    // Status com cor
    const statusCell = sheet.getRange(linhaInserida, 14);
    statusCell.setFontColor('#D4A574');
    statusCell.setFontWeight('bold');
    
    // Altura da linha
    sheet.setRowHeight(linhaInserida, 80);
    
    // ENVIAR EMAIL DE NOTIFICAÇÃO (opcional)
    // Descomente as linhas abaixo e configure seu email
    /*
    const emailDestino = 'seu@email.com';
    const assunto = `Nova Candidata - ${data.nome}`;
    const corpo = `
      Nova candidata se inscreveu!
      
      Nome: ${data.nome}
      Instagram: ${data.instagram}
      Seguidores: ${data.seguidores}
      Cidade: ${data.cidade}
      
      Acesse a planilha: https://docs.google.com/spreadsheets/d/${PLANILHA_ID}
    `;
    
    MailApp.sendEmail(emailDestino, assunto, corpo);
    */
    
    // Retornar sucesso
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Candidatura registrada!',
      id: proximoId
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log do erro
    Logger.log('Erro: ' + error.toString());
    
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Função GET para testar se está funcionando
function doGet() {
  return ContentService.createTextOutput('✅ Script funcionando! Use POST para enviar dados.');
}
