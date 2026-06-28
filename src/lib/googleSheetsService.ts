/**
 * Google Sheets & Google Drive Integration Service
 * Uses fetch to interact directly with Google REST APIs using the user's OAuth access token.
 */

export interface StudentReferralData {
  studentFirstName: string;
  studentLastName: string;
  studentReferenceNumber: string;
  examType: string;
  bookingDate: string;
  examDate: string;
  agencyName: string;
  agentsName: string;
  agentsPhone: string;
  agentsEmail: string;
}

const SPREADSHEET_NAME = 'iLearn Global - Student Referrals';

/**
 * Searches the user's Google Drive for a spreadsheet with the designated name.
 */
async function findSpreadsheet(accessToken: string): Promise<string | null> {
  const query = encodeURIComponent(`name = '${SPREADSHEET_NAME}' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false`);
  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name)`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to query Google Drive for existing spreadsheet');
  }

  const data = await response.json();
  if (data.files && data.files.length > 0) {
    return data.files[0].id;
  }
  return null;
}

/**
 * Creates a brand new Google Sheet and populates it with headers as the first row.
 */
async function createSpreadsheet(accessToken: string): Promise<string> {
  // 1. Create spreadsheet file
  const url = 'https://sheets.googleapis.com/v4/spreadsheets';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: SPREADSHEET_NAME,
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create new Google Sheet');
  }

  const data = await response.json();
  const spreadsheetId = data.spreadsheetId;

  // 2. Initialize Headers
  const headers = [
    'Timestamp',
    'Student First Name',
    'Student Last Name',
    'Student Reference Number',
    'Exam Type',
    'Booking Date',
    'Exam Date',
    'Agency Name',
    'Agent\'s Name',
    'Agent\'s Phone Number',
    'Agent\'s Email'
  ];

  await appendRow(accessToken, spreadsheetId, headers);

  return spreadsheetId;
}

/**
 * Appends a row of values to a Google Sheet.
 */
async function appendRow(accessToken: string, spreadsheetId: string, rowValues: any[]): Promise<void> {
  const range = 'Sheet1!A1';
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [rowValues],
    }),
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error('Error details appending row:', errorDetails);
    throw new Error('Failed to append referral entry to Google Sheet');
  }
}

/**
 * Main function to save a student referral entry to Google Sheets.
 * Handles auto-detection, auto-creation, and appending.
 */
export async function saveReferralToGoogleSheets(
  accessToken: string,
  referral: StudentReferralData
): Promise<{ spreadsheetId: string; isNew: boolean }> {
  let isNew = false;
  let spreadsheetId = await findSpreadsheet(accessToken);

  if (!spreadsheetId) {
    spreadsheetId = await createSpreadsheet(accessToken);
    isNew = true;
  }

  const timestamp = new Date().toLocaleString();
  const rowValues = [
    timestamp,
    referral.studentFirstName,
    referral.studentLastName,
    referral.studentReferenceNumber,
    referral.examType,
    referral.bookingDate,
    referral.examDate,
    referral.agencyName,
    referral.agentsName,
    referral.agentsPhone,
    referral.agentsEmail,
  ];

  await appendRow(accessToken, spreadsheetId, rowValues);

  return { spreadsheetId, isNew };
}
