# Google Forms Apps Script Starter

This is a safe starter for a temporary Google Forms + Sheets workflow. It does not create app users and does not connect to Supabase.

## Setup
1. Create one Google Form per profile: student, teacher, guide and tourist.
2. Link each form to a Google Sheet.
3. In the response spreadsheet, open Extensions > Apps Script.
4. Paste the starter below.
5. Set an installable trigger for `onFormSubmit`.
6. Replace placeholder e-mails and sheet names.

## Starter Script

```js
const PROFILE_CONFIG = {
  student: {
    sheetName: "Student Responses",
    profileType: "student",
    notifyTo: "coordenacao@example.com"
  },
  teacher: {
    sheetName: "Teacher Responses",
    profileType: "teacher",
    notifyTo: "coordenacao@example.com"
  },
  guide: {
    sheetName: "Guide Responses",
    profileType: "guide",
    notifyTo: "coordenacao@example.com"
  },
  tourist: {
    sheetName: "Tourist Responses",
    profileType: "tourist",
    notifyTo: "roteiros@example.com"
  }
};

function onFormSubmit(event) {
  const sheet = event.range.getSheet();
  const config = findConfigBySheetName(sheet.getName());
  if (!config) return;

  const row = event.range.getRow();
  ensureOperationalColumns(sheet);
  writeOperationalDefaults(sheet, row, config.profileType);
  sendNotification(sheet, row, config);
}

function findConfigBySheetName(sheetName) {
  return Object.values(PROFILE_CONFIG).find((config) => config.sheetName === sheetName);
}

function ensureOperationalColumns(sheet) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const required = [
    "profile_type",
    "review_status",
    "assigned_to",
    "review_notes",
    "consent_version",
    "source"
  ];

  required.forEach((header) => {
    if (!headers.includes(header)) {
      sheet.getRange(1, sheet.getLastColumn() + 1).setValue(header);
    }
  });
}

function writeOperationalDefaults(sheet, row, profileType) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const values = {
    profile_type: profileType,
    review_status: "new",
    assigned_to: "",
    review_notes: "",
    consent_version: "draft-2026-06-08",
    source: "google_forms"
  };

  Object.keys(values).forEach((key) => {
    const index = headers.indexOf(key);
    if (index >= 0) {
      sheet.getRange(row, index + 1).setValue(values[key]);
    }
  });
}

function sendNotification(sheet, row, config) {
  const rowValues = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const summary = headers
    .map((header, index) => `${header}: ${rowValues[index]}`)
    .join("\n");

  MailApp.sendEmail({
    to: config.notifyTo,
    subject: `Novo cadastro ECOTUCA - ${config.profileType}`,
    body: `Novo envio recebido.\n\n${summary}\n\nRevise no Google Sheets antes de qualquer contato ou criacao de usuario.`
  });
}
```

## Production Notes
- Replace placeholder e-mails before use.
- Use a dedicated coordinator mailbox, not a personal secret account.
- Do not paste Supabase keys in Apps Script.
- Do not create real app users from this script.
- If later migrating responses to Supabase, use a reviewed server-side importer with LGPD and RLS checks.
