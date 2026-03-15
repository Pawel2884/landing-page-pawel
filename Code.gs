// ============================================================
//  META LEADS CRM — Google Apps Script
//  Autor: Paweł | Meta Ads Expert
//  Wersja: 2.0
// ============================================================

// ─────────────────────────────────────────────────────────────
//  KONFIGURACJA
// ─────────────────────────────────────────────────────────────
const CFG = {
  // Arkusze
  SHEET_LEADS:    'Leady',
  SHEET_DASH:     'Dashboard',
  SHEET_SETTINGS: 'Ustawienia',
  SHEET_LOG:      'Historia',

  // Kolumny arkusza Leady (1-based)
  COL: {
    ID:             1,   // A – unikalny ID leada
    DATA_DODANIA:   2,   // B – data dodania
    IMIE:           3,   // C
    NAZWISKO:       4,   // D
    EMAIL:          5,   // E
    TELEFON:        6,   // F
    KAMPANIA:       7,   // G
    ZESTAW:         8,   // H – ad set
    REKLAMA:        9,   // I – ad name
    ZRODLO:         10,  // J – utm_source / platform
    STATUS:         11,  // K
    PRIORYTET:      12,  // L
    OCENA:          13,  // M – lead score 1-10
    WARTOSC:        14,  // N – szacowana wartość (PLN)
    PRZYPISANY:     15,  // O – handlowiec
    NAST_KONTAKT:   16,  // P – następny kontakt (data)
    DATA_ZAMKNIECIA:17,  // Q
    POWOD_UTRATY:   18,  // R
    NOTATKI:        19,  // S
    OSTATNIA_ZMIANA:20,  // T
    DNI_W_PIPELINE: 21,  // U – formuła
    LINK_FB:        22,  // V – link do leada w Meta
  },

  // Statusy lejka
  STATUSY: ['Nowy', 'Kontaktowany', 'Zainteresowany', 'Negocjacje', 'Zamknięty – wygrany', 'Zamknięty – utracony'],

  // Priorytety
  PRIORYTETY: ['Wysoki', 'Średni', 'Niski'],

  // Kolory statusów
  KOLORY_STATUSOW: {
    'Nowy':                   '#E8F5E9',
    'Kontaktowany':           '#E3F2FD',
    'Zainteresowany':         '#FFF9C4',
    'Negocjacje':             '#FFE0B2',
    'Zamknięty – wygrany':    '#C8E6C9',
    'Zamknięty – utracony':   '#FFCDD2',
  },

  // Powiadomienia e-mail
  EMAIL_NOWY_LEAD:     true,   // wyślij mail przy nowym leadzie
  EMAIL_PRZYPOMNIENIE: true,   // wyślij mail o zbliżającym się kontakcie
  GODZINA_RAPORTU:     8,      // godzina wysyłki dziennego raportu (0-23)
};

// ─────────────────────────────────────────────────────────────
//  MENU NIESTANDARDOWE
// ─────────────────────────────────────────────────────────────
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🎯 CRM Meta Leads')
    .addItem('⚙️ Skonfiguruj CRM (pierwsze uruchomienie)', 'setupCRM')
    .addSeparator()
    .addItem('➕ Dodaj lead ręcznie', 'showAddLeadDialog')
    .addItem('📥 Importuj leady z CSV/Meta export', 'showImportDialog')
    .addSeparator()
    .addItem('🔄 Odśwież Dashboard', 'buildDashboard')
    .addItem('📊 Generuj raport tygodniowy', 'sendWeeklyReport')
    .addSeparator()
    .addItem('🔔 Ustaw triggery automatyczne', 'setupTriggers')
    .addItem('🗑️ Usuń triggery', 'removeTriggers')
    .addSeparator()
    .addItem('🌐 Pokaż URL Webhooka (Meta API)', 'showWebhookUrl')
    .addItem('🧪 Testuj webhook (dummy lead)', 'testWebhook')
    .addToUi();
}

// ─────────────────────────────────────────────────────────────
//  SETUP – pierwsze uruchomienie
// ─────────────────────────────────────────────────────────────
function setupCRM() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  _ensureSheet(ss, CFG.SHEET_LEADS);
  _ensureSheet(ss, CFG.SHEET_DASH);
  _ensureSheet(ss, CFG.SHEET_SETTINGS);
  _ensureSheet(ss, CFG.SHEET_LOG);

  _setupLeadsSheet(ss);
  _setupSettingsSheet(ss);
  _setupLogSheet(ss);
  buildDashboard();
  setupTriggers();

  ui.alert('✅ CRM skonfigurowany!\n\nArkusze zostały przygotowane, triggery ustawione.\nMożesz teraz dodawać leady lub podpiąć webhook Meta.');
}

function _ensureSheet(ss, name) {
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
  }
  return sh;
}

function _setupLeadsSheet(ss) {
  const sh = ss.getSheetByName(CFG.SHEET_LEADS);

  // Nagłówki
  const headers = [
    'ID', 'Data dodania', 'Imię', 'Nazwisko', 'Email', 'Telefon',
    'Kampania', 'Zestaw reklam', 'Reklama', 'Źródło',
    'Status', 'Priorytet', 'Ocena (1-10)', 'Wartość (PLN)',
    'Przypisany do', 'Następny kontakt', 'Data zamknięcia',
    'Powód utraty', 'Notatki', 'Ostatnia zmiana', 'Dni w pipeline', 'Link FB'
  ];

  const hRow = sh.getRange(1, 1, 1, headers.length);
  hRow.setValues([headers]);
  hRow.setBackground('#1565C0');
  hRow.setFontColor('#FFFFFF');
  hRow.setFontWeight('bold');
  hRow.setFontSize(11);

  sh.setFrozenRows(1);
  sh.setFrozenColumns(2);

  // Szerokości kolumn
  const widths = [60, 130, 100, 100, 200, 130, 200, 160, 160, 100,
                  160, 90, 100, 110, 130, 130, 130, 150, 250, 130, 100, 200];
  widths.forEach((w, i) => sh.setColumnWidth(i + 1, w));

  // Walidacja – Status
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(CFG.STATUSY)
    .setAllowInvalid(false)
    .build();
  sh.getRange(2, CFG.COL.STATUS, 1000).setDataValidation(statusRule);

  // Walidacja – Priorytet
  const priorytetRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(CFG.PRIORYTETY)
    .setAllowInvalid(false)
    .build();
  sh.getRange(2, CFG.COL.PRIORYTET, 1000).setDataValidation(priorytetRule);

  // Walidacja – Ocena
  const ocenaRule = SpreadsheetApp.newDataValidation()
    .requireNumberBetween(1, 10)
    .setAllowInvalid(false)
    .build();
  sh.getRange(2, CFG.COL.OCENA, 1000).setDataValidation(ocenaRule);

  // Formuła – Dni w pipeline (kolumna U)
  sh.getRange(2, CFG.COL.DNI_W_PIPELINE, 1000).setFormula(
    `=IF(B2="","",IF(OR(K2="Zamknięty – wygrany",K2="Zamknięty – utracony"),Q2-B2,TODAY()-B2))`
  );

  // Format dat
  sh.getRange(2, CFG.COL.DATA_DODANIA, 1000).setNumberFormat('dd.MM.yyyy HH:mm');
  sh.getRange(2, CFG.COL.NAST_KONTAKT, 1000).setNumberFormat('dd.MM.yyyy');
  sh.getRange(2, CFG.COL.DATA_ZAMKNIECIA, 1000).setNumberFormat('dd.MM.yyyy');
  sh.getRange(2, CFG.COL.OSTATNIA_ZMIANA, 1000).setNumberFormat('dd.MM.yyyy HH:mm');
  sh.getRange(2, CFG.COL.WARTOSC, 1000).setNumberFormat('#,##0.00 "zł"');

  // Conditional formatting – kolory statusów
  _applyStatusConditionalFormatting(sh);

  SpreadsheetApp.flush();
}

function _applyStatusConditionalFormatting(sh) {
  const rules = sh.getConditionalFormatRules();
  // Wyczyść stare reguły powiązane ze statusem
  const freshRules = rules.filter(r => {
    const ranges = r.getRanges();
    return !ranges.some(rng => rng.getColumn() === CFG.COL.STATUS);
  });

  const statusRange = sh.getRange(2, 1, 1000, sh.getLastColumn());

  Object.entries(CFG.KOLORY_STATUSOW).forEach(([status, color]) => {
    const rule = SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied(`=$K2="${status}"`)
      .setBackground(color)
      .setRanges([statusRange])
      .build();
    freshRules.push(rule);
  });

  sh.setConditionalFormatRules(freshRules);
}

function _setupSettingsSheet(ss) {
  const sh = ss.getSheetByName(CFG.SHEET_SETTINGS);
  sh.clearContents();

  const data = [
    ['⚙️ USTAWIENIA CRM', ''],
    ['', ''],
    ['Twój email (powiadomienia)', Session.getActiveUser().getEmail()],
    ['Dodatkowy email CC', ''],
    ['Nazwa firmy', 'Moja Firma'],
    ['Waluta', 'PLN'],
    ['', ''],
    ['📊 CELE MIESIĘCZNE', ''],
    ['Cel – nowe leady / miesiąc', 100],
    ['Cel – zamknięte leady / miesiąc', 20],
    ['Cel – przychód (PLN)', 50000],
    ['', ''],
    ['⏰ PRZYPOMNIENIA', ''],
    ['Wyślij przypomnienie N dni przed kontaktem', 1],
    ['Wyślij alert o leadzie bez kontaktu po N dniach', 3],
    ['', ''],
    ['🔗 META ADS', ''],
    ['Meta Pixel ID', ''],
    ['Meta Ad Account ID', ''],
    ['Webhook Verify Token', _getOrCreateToken()],
  ];

  sh.getRange(1, 1, data.length, 2).setValues(data);
  sh.getRange(1, 1).setFontSize(14).setFontWeight('bold').setFontColor('#1565C0');
  sh.getRange(8, 1).setFontSize(12).setFontWeight('bold').setFontColor('#1565C0');
  sh.getRange(13, 1).setFontSize(12).setFontWeight('bold').setFontColor('#1565C0');
  sh.getRange(17, 1).setFontSize(12).setFontWeight('bold').setFontColor('#1565C0');
  sh.setColumnWidth(1, 320);
  sh.setColumnWidth(2, 260);
}

function _setupLogSheet(ss) {
  const sh = ss.getSheetByName(CFG.SHEET_LOG);
  const headers = ['Timestamp', 'Akcja', 'Lead ID', 'Szczegóły', 'Użytkownik'];
  const hRow = sh.getRange(1, 1, 1, headers.length);
  hRow.setValues([headers]);
  hRow.setBackground('#37474F');
  hRow.setFontColor('#FFFFFF');
  hRow.setFontWeight('bold');
  sh.setFrozenRows(1);
  sh.setColumnWidth(1, 140);
  sh.setColumnWidth(2, 140);
  sh.setColumnWidth(3, 80);
  sh.setColumnWidth(4, 400);
  sh.setColumnWidth(5, 200);
}

// ─────────────────────────────────────────────────────────────
//  DODAWANIE LEADA
// ─────────────────────────────────────────────────────────────
function addLead(leadData) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(CFG.SHEET_LEADS);

  const lastRow = Math.max(sh.getLastRow(), 1);
  const newRow = lastRow + 1;
  const id = _generateLeadId();
  const now = new Date();

  const row = new Array(Object.keys(CFG.COL).length).fill('');
  row[CFG.COL.ID - 1]             = id;
  row[CFG.COL.DATA_DODANIA - 1]   = now;
  row[CFG.COL.IMIE - 1]           = leadData.imie || '';
  row[CFG.COL.NAZWISKO - 1]       = leadData.nazwisko || '';
  row[CFG.COL.EMAIL - 1]          = leadData.email || '';
  row[CFG.COL.TELEFON - 1]        = leadData.telefon || '';
  row[CFG.COL.KAMPANIA - 1]       = leadData.kampania || '';
  row[CFG.COL.ZESTAW - 1]         = leadData.zestaw || '';
  row[CFG.COL.REKLAMA - 1]        = leadData.reklama || '';
  row[CFG.COL.ZRODLO - 1]         = leadData.zrodlo || 'Meta Ads';
  row[CFG.COL.STATUS - 1]         = leadData.status || 'Nowy';
  row[CFG.COL.PRIORYTET - 1]      = leadData.priorytet || _autoScorePriorytet(leadData);
  row[CFG.COL.OCENA - 1]          = leadData.ocena || _autoScoreLead(leadData);
  row[CFG.COL.WARTOSC - 1]        = leadData.wartosc || '';
  row[CFG.COL.PRZYPISANY - 1]     = leadData.przypisany || _getSettingValue('Twój email (powiadomienia)');
  row[CFG.COL.NAST_KONTAKT - 1]   = leadData.nastKontakt || _addBusinessDays(now, 1);
  row[CFG.COL.DATA_ZAMKNIECIA - 1]= '';
  row[CFG.COL.POWOD_UTRATY - 1]   = '';
  row[CFG.COL.NOTATKI - 1]        = leadData.notatki || '';
  row[CFG.COL.OSTATNIA_ZMIANA - 1]= now;
  row[CFG.COL.DNI_W_PIPELINE - 1] = '';
  row[CFG.COL.LINK_FB - 1]        = leadData.linkFb || '';

  sh.getRange(newRow, 1, 1, row.length).setValues([row]);

  // Formuła dni w pipeline
  sh.getRange(newRow, CFG.COL.DNI_W_PIPELINE).setFormula(
    `=IF(B${newRow}="","",IF(OR(K${newRow}="Zamknięty – wygrany",K${newRow}="Zamknięty – utracony"),Q${newRow}-B${newRow},TODAY()-B${newRow}))`
  );

  // Formatowanie daty
  sh.getRange(newRow, CFG.COL.DATA_DODANIA).setNumberFormat('dd.MM.yyyy HH:mm');
  sh.getRange(newRow, CFG.COL.NAST_KONTAKT).setNumberFormat('dd.MM.yyyy');
  sh.getRange(newRow, CFG.COL.OSTATNIA_ZMIANA).setNumberFormat('dd.MM.yyyy HH:mm');
  sh.getRange(newRow, CFG.COL.WARTOSC).setNumberFormat('#,##0.00 "zł"');

  _logAction('NOWY LEAD', id, `${leadData.imie} ${leadData.nazwisko} | ${leadData.email} | Kampania: ${leadData.kampania}`);

  if (CFG.EMAIL_NOWY_LEAD) {
    _sendNewLeadNotification(leadData, id);
  }

  buildDashboard();
  return id;
}

// ─────────────────────────────────────────────────────────────
//  DIALOG – RĘCZNE DODAWANIE LEADA
// ─────────────────────────────────────────────────────────────
function showAddLeadDialog() {
  const html = HtmlService.createHtmlOutput(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; padding: 16px; font-size: 13px; }
        label { display: block; margin-top: 10px; font-weight: bold; color: #333; }
        input, select, textarea {
          width: 100%; padding: 6px 8px; margin-top: 3px;
          border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;
          font-size: 13px;
        }
        .row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        button {
          margin-top: 16px; padding: 10px 20px; background: #1565C0;
          color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px;
          width: 100%;
        }
        button:hover { background: #0D47A1; }
        h3 { color: #1565C0; margin: 0 0 12px 0; }
      </style>
    </head>
    <body>
      <h3>➕ Nowy Lead</h3>
      <div class="row2">
        <div><label>Imię *</label><input id="imie" required></div>
        <div><label>Nazwisko *</label><input id="nazwisko" required></div>
      </div>
      <div class="row2">
        <div><label>Email *</label><input id="email" type="email" required></div>
        <div><label>Telefon</label><input id="telefon" type="tel"></div>
      </div>
      <label>Kampania</label><input id="kampania">
      <div class="row2">
        <div>
          <label>Priorytet</label>
          <select id="priorytet">
            <option>Wysoki</option><option selected>Średni</option><option>Niski</option>
          </select>
        </div>
        <div>
          <label>Ocena (1-10)</label>
          <input id="ocena" type="number" min="1" max="10" value="5">
        </div>
      </div>
      <label>Wartość szacowana (PLN)</label>
      <input id="wartosc" type="number" placeholder="np. 2500">
      <label>Notatki</label>
      <textarea id="notatki" rows="3"></textarea>
      <button onclick="submitLead()">Dodaj Lead</button>
      <script>
        function submitLead() {
          const data = {
            imie:      document.getElementById('imie').value,
            nazwisko:  document.getElementById('nazwisko').value,
            email:     document.getElementById('email').value,
            telefon:   document.getElementById('telefon').value,
            kampania:  document.getElementById('kampania').value,
            priorytet: document.getElementById('priorytet').value,
            ocena:     parseInt(document.getElementById('ocena').value) || 5,
            wartosc:   parseFloat(document.getElementById('wartosc').value) || '',
            notatki:   document.getElementById('notatki').value,
          };
          if (!data.imie || !data.email) { alert('Imię i email są wymagane!'); return; }
          google.script.run
            .withSuccessHandler(id => {
              alert('✅ Lead dodany! ID: ' + id);
              google.script.host.close();
            })
            .withFailureHandler(e => alert('Błąd: ' + e.message))
            .addLead(data);
        }
      </script>
    </body>
    </html>
  `)
  .setTitle('Dodaj nowy lead')
  .setWidth(480)
  .setHeight(560);

  SpreadsheetApp.getUi().showModalDialog(html, 'Dodaj nowy lead');
}

// ─────────────────────────────────────────────────────────────
//  IMPORT CSV / META EXPORT
// ─────────────────────────────────────────────────────────────
function showImportDialog() {
  const html = HtmlService.createHtmlOutput(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; padding: 16px; font-size: 13px; }
        h3 { color: #1565C0; }
        textarea { width: 100%; height: 200px; font-size: 11px; font-family: monospace;
          border: 1px solid #ccc; border-radius: 4px; padding: 8px; box-sizing: border-box; }
        p { color: #666; font-size: 12px; }
        button { margin-top: 12px; padding: 10px 20px; background: #1565C0;
          color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; width: 100%; }
        button:hover { background: #0D47A1; }
        select { padding: 6px; border: 1px solid #ccc; border-radius: 4px; width: 100%; margin-bottom: 8px; }
        label { font-weight: bold; display: block; margin-top: 10px; }
      </style>
    </head>
    <body>
      <h3>📥 Import leadów z CSV</h3>
      <p>Wklej zawartość pliku CSV eksportowanego z Meta Ads / Facebook Lead Ads.<br>
         Pierwsza linia powinna zawierać nagłówki.<br>
         Obsługiwane kolumny: <code>first_name, last_name, email, phone_number, campaign_name, ad_name, ad_set_name, created_time</code></p>
      <label>Separator</label>
      <select id="sep"><option value=",">Przecinek (,)</option><option value=";">Średnik (;)</option><option value="\\t">Tabulator</option></select>
      <label>Wklej CSV:</label>
      <textarea id="csv" placeholder="first_name,last_name,email,phone_number,campaign_name&#10;Jan,Kowalski,jan@example.com,600100200,Kampania Lato 2025"></textarea>
      <button onclick="importCSV()">Importuj</button>
      <script>
        function importCSV() {
          const csv = document.getElementById('csv').value.trim();
          const sep = document.getElementById('sep').value === '\\t' ? '\\t' : document.getElementById('sep').value;
          if (!csv) { alert('Wklej dane CSV!'); return; }
          google.script.run
            .withSuccessHandler(n => { alert('✅ Zaimportowano ' + n + ' leadów!'); google.script.host.close(); })
            .withFailureHandler(e => alert('Błąd: ' + e.message))
            .importFromCSV(csv, sep);
        }
      </script>
    </body>
    </html>
  `)
  .setTitle('Import CSV')
  .setWidth(500)
  .setHeight(480);

  SpreadsheetApp.getUi().showModalDialog(html, 'Import CSV');
}

function importFromCSV(csvText, separator) {
  const sep = separator || ',';
  const lines = csvText.split('\n').filter(l => l.trim());
  if (lines.length < 2) throw new Error('Brak danych w CSV');

  const rawHeaders = lines[0].split(sep).map(h => h.trim().toLowerCase().replace(/['"]/g, ''));
  const fieldMap = {
    'first_name':    'imie',
    'last_name':     'nazwisko',
    'email':         'email',
    'phone_number':  'telefon',
    'phone':         'telefon',
    'campaign_name': 'kampania',
    'ad_set_name':   'zestaw',
    'ad_name':       'reklama',
    'created_time':  'dataDodania',
    'platform':      'zrodlo',
  };

  let imported = 0;
  for (let i = 1; i < lines.length; i++) {
    const vals = _parseCSVLine(lines[i], sep);
    const lead = { zrodlo: 'Meta Ads' };
    rawHeaders.forEach((h, idx) => {
      const key = fieldMap[h];
      if (key) lead[key] = vals[idx] ? vals[idx].replace(/['"]/g, '').trim() : '';
    });
    if (lead.email || lead.imie) {
      addLead(lead);
      imported++;
    }
  }
  return imported;
}

function _parseCSVLine(line, sep) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === sep && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

// ─────────────────────────────────────────────────────────────
//  TRIGGER: onEdit – auto-update "Ostatnia zmiana" & status log
// ─────────────────────────────────────────────────────────────
function onEdit(e) {
  try {
    const sh = e.range.getSheet();
    if (sh.getName() !== CFG.SHEET_LEADS) return;
    const row = e.range.getRow();
    if (row < 2) return;
    const col = e.range.getColumn();

    // Aktualizuj Ostatnia zmiana
    sh.getRange(row, CFG.COL.OSTATNIA_ZMIANA).setValue(new Date());

    // Jeśli zmiana statusu na zamknięty – ustaw datę zamknięcia
    if (col === CFG.COL.STATUS) {
      const newStatus = e.range.getValue();
      const id = sh.getRange(row, CFG.COL.ID).getValue();
      _logAction('ZMIANA STATUSU', id, `Nowy status: ${newStatus} | Poprzedni: ${e.oldValue}`);

      if (newStatus === 'Zamknięty – wygrany' || newStatus === 'Zamknięty – utracony') {
        if (!sh.getRange(row, CFG.COL.DATA_ZAMKNIECIA).getValue()) {
          sh.getRange(row, CFG.COL.DATA_ZAMKNIECIA).setValue(new Date());
        }
      }
    }

    // Jeśli zmiana notatki – log
    if (col === CFG.COL.NOTATKI) {
      const id = sh.getRange(row, CFG.COL.ID).getValue();
      _logAction('NOTATKA', id, e.range.getValue().toString().substring(0, 120));
    }
  } catch (err) {
    // Ciche ignorowanie błędów edycji
  }
}

// ─────────────────────────────────────────────────────────────
//  DASHBOARD
// ─────────────────────────────────────────────────────────────
function buildDashboard() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const shDash = _ensureSheet(ss, CFG.SHEET_DASH);
  const shLeads = ss.getSheetByName(CFG.SHEET_LEADS);

  shDash.clearContents();
  shDash.clearFormats();

  // Pobierz dane
  const lastRow = shLeads.getLastRow();
  let leads = [];
  if (lastRow > 1) {
    leads = shLeads.getRange(2, 1, lastRow - 1, Object.keys(CFG.COL).length).getValues()
      .filter(r => r[CFG.COL.ID - 1]);
  }

  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  const total        = leads.length;
  const nowe         = leads.filter(r => r[CFG.COL.STATUS - 1] === 'Nowy').length;
  const wToku        = leads.filter(r => ['Kontaktowany', 'Zainteresowany', 'Negocjacje'].includes(r[CFG.COL.STATUS - 1])).length;
  const wygrane      = leads.filter(r => r[CFG.COL.STATUS - 1] === 'Zamknięty – wygrany').length;
  const utracone     = leads.filter(r => r[CFG.COL.STATUS - 1] === 'Zamknięty – utracony').length;
  const konwersja    = total > 0 ? (wygrane / total * 100).toFixed(1) : 0;
  const wartoscTotal = leads.filter(r => r[CFG.COL.STATUS - 1] === 'Zamknięty – wygrany')
                            .reduce((s, r) => s + (parseFloat(r[CFG.COL.WARTOSC - 1]) || 0), 0);
  const wartoscPipeline = leads.filter(r => ['Zainteresowany','Negocjacje'].includes(r[CFG.COL.STATUS - 1]))
                               .reduce((s, r) => s + (parseFloat(r[CFG.COL.WARTOSC - 1]) || 0), 0);

  const tenMiesiac = leads.filter(r => {
    const d = new Date(r[CFG.COL.DATA_DODANIA - 1]);
    return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
  }).length;

  const dzisiajKontakt = leads.filter(r => {
    const d = r[CFG.COL.NAST_KONTAKT - 1];
    if (!d) return false;
    const date = new Date(d);
    return date.toDateString() === now.toDateString();
  }).length;

  const zaleglosci = leads.filter(r => {
    const d = r[CFG.COL.NAST_KONTAKT - 1];
    if (!d || ['Zamknięty – wygrany','Zamknięty – utracony'].includes(r[CFG.COL.STATUS - 1])) return false;
    return new Date(d) < now;
  }).length;

  // Tytuł
  shDash.getRange('A1').setValue('🎯 META LEADS CRM — DASHBOARD')
    .setFontSize(18).setFontWeight('bold').setFontColor('#1565C0');
  shDash.getRange('A2').setValue(`Ostatnia aktualizacja: ${Utilities.formatDate(now, Session.getScriptTimeZone(), 'dd.MM.yyyy HH:mm')}`)
    .setFontSize(10).setFontColor('#666');

  // KPI Grid
  const kpiData = [
    ['📋 Wszystkie leady', total,    '#E3F2FD', '#1565C0'],
    ['🆕 Nowe',            nowe,     '#E8F5E9', '#2E7D32'],
    ['⚡ W toku',          wToku,    '#FFF9C4', '#F57F17'],
    ['✅ Wygrane',          wygrane,  '#C8E6C9', '#1B5E20'],
    ['❌ Utracone',         utracone, '#FFCDD2', '#B71C1C'],
    ['📈 Konwersja',        konwersja + '%', '#F3E5F5', '#6A1B9A'],
  ];

  shDash.getRange('A4').setValue('📊 KLUCZOWE WSKAŹNIKI (KPI)')
    .setFontSize(13).setFontWeight('bold').setFontColor('#333');

  kpiData.forEach(([label, val, bg, fg], i) => {
    const col = (i % 3) * 3 + 1;
    const row = Math.floor(i / 3) * 4 + 5;
    const cell = shDash.getRange(row, col, 3, 2);
    cell.merge();
    cell.setBackground(bg).setBorder(true, true, true, true, false, false, '#ccc', SpreadsheetApp.BorderStyle.SOLID);
    shDash.getRange(row, col).setValue(label).setFontSize(10).setFontColor('#666');
    shDash.getRange(row + 1, col).setValue(val).setFontSize(22).setFontWeight('bold').setFontColor(fg);
  });

  // Finansowe
  const finRow = 14;
  shDash.getRange(finRow, 1).setValue('💰 FINANSE').setFontSize(13).setFontWeight('bold').setFontColor('#333');
  const finData = [
    ['Przychód zamknięty', wartoscTotal],
    ['Pipeline (szacowany)', wartoscPipeline],
    ['Leady w tym miesiącu', tenMiesiac],
    ['Do kontaktu dzisiaj', dzisiajKontakt],
    ['Zaległości', zaleglosci],
  ];
  finData.forEach(([label, val], i) => {
    shDash.getRange(finRow + 1 + i, 1).setValue(label).setFontWeight('bold');
    const cell = shDash.getRange(finRow + 1 + i, 2);
    cell.setValue(val);
    if (i < 2) cell.setNumberFormat('#,##0.00 "zł"');
    if (label === 'Zaległości' && val > 0) cell.setFontColor('#B71C1C').setFontWeight('bold');
  });

  // Podział wg statusów
  const statusRow = 21;
  shDash.getRange(statusRow, 1).setValue('📊 LEJEK SPRZEDAŻOWY').setFontSize(13).setFontWeight('bold').setFontColor('#333');
  shDash.getRange(statusRow + 1, 1, 1, 3).setValues([['Status', 'Liczba', '% całości']]).setFontWeight('bold').setBackground('#E0E0E0');
  CFG.STATUSY.forEach((status, i) => {
    const count = leads.filter(r => r[CFG.COL.STATUS - 1] === status).length;
    const pct   = total > 0 ? (count / total * 100).toFixed(1) + '%' : '0%';
    shDash.getRange(statusRow + 2 + i, 1).setValue(status);
    shDash.getRange(statusRow + 2 + i, 2).setValue(count);
    shDash.getRange(statusRow + 2 + i, 3).setValue(pct);
    const bg = CFG.KOLORY_STATUSOW[status] || '#FFF';
    shDash.getRange(statusRow + 2 + i, 1, 1, 3).setBackground(bg);
  });

  // Top kampanie
  const kampRow = statusRow + 2 + CFG.STATUSY.length + 2;
  shDash.getRange(kampRow, 1).setValue('🚀 TOP KAMPANIE').setFontSize(13).setFontWeight('bold').setFontColor('#333');
  shDash.getRange(kampRow + 1, 1, 1, 3).setValues([['Kampania', 'Leady', 'Wygrane']]).setFontWeight('bold').setBackground('#E0E0E0');

  const kampStats = {};
  leads.forEach(r => {
    const k = r[CFG.COL.KAMPANIA - 1] || 'Brak danych';
    if (!kampStats[k]) kampStats[k] = { total: 0, won: 0 };
    kampStats[k].total++;
    if (r[CFG.COL.STATUS - 1] === 'Zamknięty – wygrany') kampStats[k].won++;
  });
  const sortedKamp = Object.entries(kampStats).sort((a, b) => b[1].total - a[1].total).slice(0, 8);
  sortedKamp.forEach(([kamp, stats], i) => {
    shDash.getRange(kampRow + 2 + i, 1).setValue(kamp);
    shDash.getRange(kampRow + 2 + i, 2).setValue(stats.total);
    shDash.getRange(kampRow + 2 + i, 3).setValue(stats.won);
  });

  // Kolumny dashboard
  shDash.setColumnWidth(1, 220);
  shDash.setColumnWidth(2, 150);
  shDash.setColumnWidth(3, 100);

  SpreadsheetApp.flush();
}

// ─────────────────────────────────────────────────────────────
//  TRIGGERY
// ─────────────────────────────────────────────────────────────
function setupTriggers() {
  removeTriggers(); // wyczyść stare

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Codzienny raport i przypomnienia – rano
  ScriptApp.newTrigger('dailyMorningTasks')
    .timeBased()
    .everyDays(1)
    .atHour(CFG.GODZINA_RAPORTU)
    .create();

  // Odśwież dashboard co godzinę
  ScriptApp.newTrigger('buildDashboard')
    .timeBased()
    .everyHours(1)
    .create();

  // onEdit
  ScriptApp.newTrigger('onEdit')
    .forSpreadsheet(ss)
    .onEdit()
    .create();

  _logAction('TRIGGERY', '-', 'Triggery automatyczne zostały ustawione');
  SpreadsheetApp.getUi().alert('✅ Triggery ustawione!\n\n• Codzienny raport: ' + CFG.GODZINA_RAPORTU + ':00\n• Dashboard odświeżany co godzinę\n• onEdit aktywny');
}

function removeTriggers() {
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));
}

function dailyMorningTasks() {
  buildDashboard();
  _sendFollowUpReminders();
  _sendDailyDigest();
}

// ─────────────────────────────────────────────────────────────
//  EMAIL: NOWY LEAD
// ─────────────────────────────────────────────────────────────
function _sendNewLeadNotification(leadData, id) {
  try {
    const email = _getSettingValue('Twój email (powiadomienia)');
    const cc    = _getSettingValue('Dodatkowy email CC');
    if (!email) return;

    const subject = `🎯 Nowy lead [${id}] – ${leadData.imie} ${leadData.nazwisko}`;
    const body = `
<html><body style="font-family:Arial,sans-serif;max-width:600px">
  <div style="background:#1565C0;padding:16px;border-radius:8px 8px 0 0">
    <h2 style="color:white;margin:0">🎯 Nowy Lead Meta Ads</h2>
  </div>
  <div style="border:1px solid #ddd;border-top:none;padding:20px;border-radius:0 0 8px 8px">
    <table style="width:100%;border-collapse:collapse">
      <tr><td style="padding:6px;font-weight:bold;width:140px">ID Leada</td><td style="padding:6px">${id}</td></tr>
      <tr style="background:#f5f5f5"><td style="padding:6px;font-weight:bold">Imię i nazwisko</td><td style="padding:6px">${leadData.imie} ${leadData.nazwisko}</td></tr>
      <tr><td style="padding:6px;font-weight:bold">Email</td><td style="padding:6px"><a href="mailto:${leadData.email}">${leadData.email}</a></td></tr>
      <tr style="background:#f5f5f5"><td style="padding:6px;font-weight:bold">Telefon</td><td style="padding:6px">${leadData.telefon || '-'}</td></tr>
      <tr><td style="padding:6px;font-weight:bold">Kampania</td><td style="padding:6px">${leadData.kampania || '-'}</td></tr>
      <tr style="background:#f5f5f5"><td style="padding:6px;font-weight:bold">Priorytet</td><td style="padding:6px">${leadData.priorytet || 'Średni'}</td></tr>
      <tr><td style="padding:6px;font-weight:bold">Ocena</td><td style="padding:6px">${leadData.ocena || '-'}/10</td></tr>
    </table>
    <div style="margin-top:16px;padding:12px;background:#E3F2FD;border-radius:6px">
      <strong>⏰ Zalecany następny kontakt:</strong> ${_formatDate(_addBusinessDays(new Date(), 1))}
    </div>
    <p style="color:#666;font-size:12px;margin-top:16px">
      Otwórz arkusz CRM, aby zobaczyć szczegóły i zaktualizować status leada.
    </p>
  </div>
</body></html>`;

    const options = { htmlBody: body };
    if (cc) options.cc = cc;
    MailApp.sendEmail(email, subject, '', options);
  } catch (err) {
    _logAction('EMAIL BŁĄD', '-', err.message);
  }
}

// ─────────────────────────────────────────────────────────────
//  EMAIL: PRZYPOMNIENIA O KONTAKTACH
// ─────────────────────────────────────────────────────────────
function _sendFollowUpReminders() {
  const email = _getSettingValue('Twój email (powiadomienia)');
  if (!email || !CFG.EMAIL_PRZYPOMNIENIE) return;

  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sh    = ss.getSheetByName(CFG.SHEET_LEADS);
  const last  = sh.getLastRow();
  if (last < 2) return;

  const data  = sh.getRange(2, 1, last - 1, Object.keys(CFG.COL).length).getValues();
  const now   = new Date();
  const dni   = parseInt(_getSettingValue('Wyślij przypomnienie N dni przed kontaktem')) || 1;

  const dzis = data.filter(r => {
    if (!r[CFG.COL.NAST_KONTAKT - 1]) return false;
    if (['Zamknięty – wygrany','Zamknięty – utracony'].includes(r[CFG.COL.STATUS - 1])) return false;
    const d = new Date(r[CFG.COL.NAST_KONTAKT - 1]);
    const diff = Math.floor((d - now) / 86400000);
    return diff >= 0 && diff <= dni;
  });

  const zaleglosci = data.filter(r => {
    if (!r[CFG.COL.NAST_KONTAKT - 1]) return false;
    if (['Zamknięty – wygrany','Zamknięty – utracony'].includes(r[CFG.COL.STATUS - 1])) return false;
    return new Date(r[CFG.COL.NAST_KONTAKT - 1]) < now;
  });

  if (dzis.length === 0 && zaleglosci.length === 0) return;

  let rows = '';
  const makeRow = (r, bg) => `<tr style="background:${bg}">
    <td style="padding:6px;border-bottom:1px solid #eee">${r[CFG.COL.ID - 1]}</td>
    <td style="padding:6px;border-bottom:1px solid #eee">${r[CFG.COL.IMIE - 1]} ${r[CFG.COL.NAZWISKO - 1]}</td>
    <td style="padding:6px;border-bottom:1px solid #eee">${r[CFG.COL.EMAIL - 1]}</td>
    <td style="padding:6px;border-bottom:1px solid #eee">${r[CFG.COL.TELEFON - 1] || '-'}</td>
    <td style="padding:6px;border-bottom:1px solid #eee">${r[CFG.COL.STATUS - 1]}</td>
    <td style="padding:6px;border-bottom:1px solid #eee">${_formatDate(r[CFG.COL.NAST_KONTAKT - 1])}</td>
  </tr>`;

  if (zaleglosci.length > 0) {
    rows += `<tr><td colspan="6" style="padding:8px;background:#FFCDD2;font-weight:bold">⚠️ ZALEGŁOŚCI (${zaleglosci.length})</td></tr>`;
    zaleglosci.forEach(r => rows += makeRow(r, '#FFF8F8'));
  }
  if (dzis.length > 0) {
    rows += `<tr><td colspan="6" style="padding:8px;background:#FFF9C4;font-weight:bold">📅 DO KONTAKTU DZISIAJ (${dzis.length})</td></tr>`;
    dzis.forEach(r => rows += makeRow(r, '#FFFDE7'));
  }

  const html = `<html><body style="font-family:Arial,sans-serif;max-width:700px">
    <div style="background:#E65100;padding:16px;border-radius:8px 8px 0 0">
      <h2 style="color:white;margin:0">🔔 Przypomnienia CRM – ${_formatDate(now)}</h2>
    </div>
    <div style="border:1px solid #ddd;border-top:none;padding:20px;border-radius:0 0 8px 8px">
      <table style="width:100%;border-collapse:collapse">
        <tr style="background:#eee;font-weight:bold">
          <th style="padding:6px;text-align:left">ID</th>
          <th style="padding:6px;text-align:left">Kontakt</th>
          <th style="padding:6px;text-align:left">Email</th>
          <th style="padding:6px;text-align:left">Telefon</th>
          <th style="padding:6px;text-align:left">Status</th>
          <th style="padding:6px;text-align:left">Nast. kontakt</th>
        </tr>
        ${rows}
      </table>
    </div>
  </body></html>`;

  MailApp.sendEmail(email, `🔔 CRM Przypomnienia – ${dzis.length + zaleglosci.length} kontaktów`, '', { htmlBody: html });
}

// ─────────────────────────────────────────────────────────────
//  EMAIL: DZIENNY DIGEST
// ─────────────────────────────────────────────────────────────
function _sendDailyDigest() {
  const email = _getSettingValue('Twój email (powiadomienia)');
  if (!email) return;

  const ss   = SpreadsheetApp.getActiveSpreadsheet();
  const sh   = ss.getSheetByName(CFG.SHEET_LEADS);
  const last = sh.getLastRow();
  if (last < 2) return;

  const data  = sh.getRange(2, 1, last - 1, Object.keys(CFG.COL).length).getValues().filter(r => r[CFG.COL.ID - 1]);
  const now   = new Date();
  const wczoraj = new Date(now); wczoraj.setDate(wczoraj.getDate() - 1); wczoraj.setHours(0,0,0,0);
  const dzisiaj = new Date(now); dzisiaj.setHours(0,0,0,0);

  const nowe24h  = data.filter(r => new Date(r[CFG.COL.DATA_DODANIA - 1]) >= wczoraj).length;
  const wygrane  = data.filter(r => r[CFG.COL.STATUS - 1] === 'Zamknięty – wygrany').length;
  const total    = data.length;
  const konw     = total > 0 ? (wygrane / total * 100).toFixed(1) : 0;

  const html = `<html><body style="font-family:Arial,sans-serif;max-width:500px">
    <div style="background:#1565C0;padding:16px;border-radius:8px 8px 0 0">
      <h2 style="color:white;margin:0">📊 Dzienny Raport CRM</h2>
      <p style="color:#90CAF9;margin:4px 0 0">${_formatDate(now)}</p>
    </div>
    <div style="border:1px solid #ddd;border-top:none;padding:20px;border-radius:0 0 8px 8px">
      <table style="width:100%">
        <tr><td style="padding:8px"><strong>Nowe leady (24h)</strong></td><td style="padding:8px;font-size:20px;font-weight:bold;color:#1565C0">${nowe24h}</td></tr>
        <tr style="background:#f5f5f5"><td style="padding:8px"><strong>Wszystkie leady</strong></td><td style="padding:8px;font-size:20px;font-weight:bold">${total}</td></tr>
        <tr><td style="padding:8px"><strong>Zamknięte – wygrane</strong></td><td style="padding:8px;font-size:20px;font-weight:bold;color:#2E7D32">${wygrane}</td></tr>
        <tr style="background:#f5f5f5"><td style="padding:8px"><strong>Konwersja</strong></td><td style="padding:8px;font-size:20px;font-weight:bold;color:#6A1B9A">${konw}%</td></tr>
      </table>
    </div>
  </body></html>`;

  MailApp.sendEmail(email, `📊 Raport CRM – ${_formatDate(now)}`, '', { htmlBody: html });
}

// ─────────────────────────────────────────────────────────────
//  RAPORT TYGODNIOWY
// ─────────────────────────────────────────────────────────────
function sendWeeklyReport() {
  const email = _getSettingValue('Twój email (powiadomienia)');
  if (!email) {
    SpreadsheetApp.getUi().alert('Uzupełnij email w Ustawieniach!');
    return;
  }

  const ss   = SpreadsheetApp.getActiveSpreadsheet();
  const sh   = ss.getSheetByName(CFG.SHEET_LEADS);
  const last = sh.getLastRow();
  if (last < 2) { SpreadsheetApp.getUi().alert('Brak leadów.'); return; }

  const data    = sh.getRange(2, 1, last - 1, Object.keys(CFG.COL).length).getValues().filter(r => r[CFG.COL.ID - 1]);
  const now     = new Date();
  const tydzien = new Date(now); tydzien.setDate(tydzien.getDate() - 7);

  const tygLeady  = data.filter(r => new Date(r[CFG.COL.DATA_DODANIA - 1]) >= tydzien).length;
  const tygWygr   = data.filter(r => r[CFG.COL.STATUS - 1] === 'Zamknięty – wygrany' && new Date(r[CFG.COL.OSTATNIA_ZMIANA - 1]) >= tydzien).length;
  const przychod  = data.filter(r => r[CFG.COL.STATUS - 1] === 'Zamknięty – wygrany')
                        .reduce((s, r) => s + (parseFloat(r[CFG.COL.WARTOSC - 1]) || 0), 0);

  // Podział wg kampanii (ostatnie 7 dni)
  const kStats = {};
  data.filter(r => new Date(r[CFG.COL.DATA_DODANIA - 1]) >= tydzien).forEach(r => {
    const k = r[CFG.COL.KAMPANIA - 1] || 'Brak';
    kStats[k] = (kStats[k] || 0) + 1;
  });
  const kampRows = Object.entries(kStats).sort((a,b) => b[1]-a[1]).map(([k,v]) =>
    `<tr><td style="padding:6px">${k}</td><td style="padding:6px;font-weight:bold">${v}</td></tr>`
  ).join('');

  const html = `<html><body style="font-family:Arial,sans-serif;max-width:600px">
    <div style="background:#1565C0;padding:20px;border-radius:8px 8px 0 0">
      <h2 style="color:white;margin:0">📊 Tygodniowy Raport Meta Leads CRM</h2>
      <p style="color:#90CAF9;margin:4px 0 0">${_formatDate(tydzien)} – ${_formatDate(now)}</p>
    </div>
    <div style="border:1px solid #ddd;border-top:none;padding:24px;border-radius:0 0 8px 8px">
      <h3 style="color:#333;margin:0 0 16px">Podsumowanie tygodnia</h3>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:10px;border-bottom:1px solid #eee;font-size:15px">Nowe leady (7 dni)</td>
            <td style="padding:10px;border-bottom:1px solid #eee;font-size:24px;font-weight:bold;color:#1565C0">${tygLeady}</td></tr>
        <tr><td style="padding:10px;border-bottom:1px solid #eee;font-size:15px">Zamknięte – wygrane</td>
            <td style="padding:10px;border-bottom:1px solid #eee;font-size:24px;font-weight:bold;color:#2E7D32">${tygWygr}</td></tr>
        <tr><td style="padding:10px;font-size:15px">Przychód ogółem</td>
            <td style="padding:10px;font-size:24px;font-weight:bold;color:#6A1B9A">${przychod.toLocaleString('pl-PL')} zł</td></tr>
      </table>
      ${kampRows ? `<h3 style="color:#333;margin:20px 0 12px">Leady wg kampanii (7 dni)</h3>
      <table style="width:100%;border-collapse:collapse">
        <tr style="background:#eee;font-weight:bold"><td style="padding:6px">Kampania</td><td style="padding:6px">Leady</td></tr>
        ${kampRows}
      </table>` : ''}
    </div>
  </body></html>`;

  MailApp.sendEmail(email, `📊 Raport tygodniowy CRM – ${_formatDate(now)}`, '', { htmlBody: html });
  SpreadsheetApp.getUi().alert('✅ Raport tygodniowy wysłany na: ' + email);
}

// ─────────────────────────────────────────────────────────────
//  META LEADS API — WEBHOOK
// ─────────────────────────────────────────────────────────────

/**
 * Obsługa GET – weryfikacja webhooka przez Meta
 * Meta wysyła: hub.mode=subscribe, hub.challenge=xxx, hub.verify_token=yyy
 */
function doGet(e) {
  const token     = _getOrCreateToken();
  const mode      = e.parameter['hub.mode'];
  const challenge = e.parameter['hub.challenge'];
  const verify    = e.parameter['hub.verify_token'];

  if (mode === 'subscribe' && verify === token) {
    return ContentService.createTextOutput(challenge);
  }
  return ContentService.createTextOutput('Verification failed').setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Obsługa POST – nowe leady z Meta
 * Meta wysyła JSON z tablicą entry[].changes[].value.leads[]
 */
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    _logAction('WEBHOOK', '-', 'Otrzymano payload: ' + e.postData.contents.substring(0, 300));

    if (payload.object === 'page' || payload.object === 'leadgen') {
      (payload.entry || []).forEach(entry => {
        (entry.changes || []).forEach(change => {
          if (change.field === 'leadgen') {
            const leadgenId = change.value.leadgen_id;
            const formId    = change.value.form_id;
            const pageId    = change.value.page_id;
            const adId      = change.value.ad_id;
            const campId    = change.value.campaign_id;

            // Opcjonalnie: pobierz dane leada przez Graph API jeśli masz access token
            const accessToken = _getSettingValue('Meta Access Token');
            if (accessToken && leadgenId) {
              _fetchAndSaveMetaLead(leadgenId, accessToken, { formId, adId, campId });
            } else {
              // Zapisz sam ID – ręczne uzupełnienie
              addLead({
                imie:     'Meta Lead',
                nazwisko: '',
                email:    '',
                telefon:  '',
                kampania: campId || '',
                reklama:  adId || '',
                notatki:  `Leadgen ID: ${leadgenId} | Form ID: ${formId}`,
                linkFb:   `https://www.facebook.com/ads/lead_gen/export_csv?form_id=${formId}`,
              });
            }
          }
        });
      });
    }
    return ContentService.createTextOutput('EVENT_RECEIVED');
  } catch (err) {
    _logAction('WEBHOOK BŁĄD', '-', err.message);
    return ContentService.createTextOutput('ERROR: ' + err.message);
  }
}

function _fetchAndSaveMetaLead(leadgenId, accessToken, meta) {
  try {
    const url = `https://graph.facebook.com/v19.0/${leadgenId}?access_token=${accessToken}`;
    const resp = UrlFetchApp.fetch(url);
    const data = JSON.parse(resp.getContentText());

    const fields = {};
    (data.field_data || []).forEach(f => {
      fields[f.name.toLowerCase()] = (f.values || [''])[0];
    });

    addLead({
      imie:     fields['first_name'] || fields['full_name'] || '',
      nazwisko: fields['last_name'] || '',
      email:    fields['email'] || '',
      telefon:  fields['phone_number'] || fields['phone'] || '',
      kampania: meta.campId || '',
      reklama:  meta.adId || '',
      notatki:  `Leadgen ID: ${leadgenId}`,
      linkFb:   `https://www.facebook.com/ads/lead_gen/export_csv?form_id=${meta.formId}`,
    });
  } catch (err) {
    _logAction('GRAPH API BŁĄD', leadgenId, err.message);
  }
}

function showWebhookUrl() {
  const url   = ScriptApp.getService().getUrl();
  const token = _getOrCreateToken();
  const ui    = SpreadsheetApp.getUi();

  if (!url) {
    ui.alert('⚠️ Najpierw opublikuj skrypt jako Web App!\n\nWejdź w: Wdróż → Nowe wdrożenie → Aplikacja internetowa\nUstaw dostęp: Wszyscy\nSkopiuj URL i wklej w Meta Business Manager jako webhook.');
    return;
  }

  ui.alert(`🌐 URL WEBHOOKA:\n\n${url}\n\n🔑 VERIFY TOKEN:\n${token}\n\nWklej oba w:\nMeta Business Manager → Aplikacje → Webhooki → Dodaj subskrypcję\n\nPole: leadgen\nCallback URL: powyższy URL\nToken weryfikacyjny: powyższy token`);
}

function testWebhook() {
  addLead({
    imie:     'Test',
    nazwisko: 'Webhook',
    email:    'test@example.com',
    telefon:  '+48 600 000 000',
    kampania: 'TEST – Kampania Demo',
    zestaw:   'Zestaw A',
    reklama:  'Reklama #1',
    zrodlo:   'Meta Ads',
    priorytet:'Wysoki',
    ocena:    8,
    wartosc:  2500,
    notatki:  'Lead testowy – dodany ręcznie',
  });
  SpreadsheetApp.getUi().alert('✅ Lead testowy dodany do arkusza!');
}

// ─────────────────────────────────────────────────────────────
//  NARZĘDZIA POMOCNICZE
// ─────────────────────────────────────────────────────────────
function _generateLeadId() {
  const now = new Date();
  return 'LD-' + Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyyMMdd') +
         '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
}

function _autoScoreLead(lead) {
  let score = 5;
  if (lead.email)    score += 1;
  if (lead.telefon)  score += 2;
  if (lead.kampania) score += 1;
  if (lead.wartosc && parseFloat(lead.wartosc) > 5000) score += 1;
  return Math.min(score, 10);
}

function _autoScorePriorytet(lead) {
  const score = _autoScoreLead(lead);
  if (score >= 8) return 'Wysoki';
  if (score >= 5) return 'Średni';
  return 'Niski';
}

function _addBusinessDays(date, days) {
  const d = new Date(date);
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) added++;
  }
  return d;
}

function _formatDate(d) {
  if (!d) return '';
  try {
    return Utilities.formatDate(new Date(d), Session.getScriptTimeZone(), 'dd.MM.yyyy');
  } catch (e) { return ''; }
}

function _getSettingValue(label) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(CFG.SHEET_SETTINGS);
    if (!sh) return '';
    const data = sh.getDataRange().getValues();
    for (const row of data) {
      if (row[0] === label) return row[1] ? row[1].toString() : '';
    }
    return '';
  } catch (e) { return ''; }
}

function _getOrCreateToken() {
  const props = PropertiesService.getScriptProperties();
  let token   = props.getProperty('WEBHOOK_VERIFY_TOKEN');
  if (!token) {
    token = 'meta_crm_' + Math.random().toString(36).substr(2, 16);
    props.setProperty('WEBHOOK_VERIFY_TOKEN', token);
  }
  return token;
}

function _logAction(action, leadId, details) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(CFG.SHEET_LOG);
    if (!sh) return;
    sh.appendRow([
      new Date(),
      action,
      leadId,
      details,
      Session.getActiveUser().getEmail() || 'system'
    ]);
  } catch (e) { /* logowanie nigdy nie powinno crashować */ }
}
