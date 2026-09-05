import { getAllSchoolStudentRecords } from './studentDatabaseService';
import { getAccessToken } from './googleAuth';

export async function exportTestResultsToGoogleSheets(existingSpreadsheetId?: string): Promise<{ success: boolean; message: string; sheetUrl?: string; spreadsheetId?: string }> {
  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, message: 'Please sign in with Google first.' };
    }

    const students = getAllSchoolStudentRecords();
    let spreadsheetId = existingSpreadsheetId;
    let sheetUrl;

    if (!spreadsheetId) {
      // Create spreadsheet
      const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          properties: {
            title: `Student Test Results Auto-Sync - ${new Date().toLocaleDateString()}`
          }
        })
      });

      if (!createRes.ok) {
        throw new Error(`Failed to create spreadsheet: ${await createRes.text()}`);
      }

      const sheetData = await createRes.json();
      spreadsheetId = sheetData.spreadsheetId;
      sheetUrl = sheetData.spreadsheetUrl;
    } else {
      sheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
    }

    // Prepare data
    const headers = [
      'Student Name', 'PEN Number', 'District', 'Mandal', 'School Name', 'UDISE Code',
      'Total Attempts', 'Best Score', 'Average Score', 'Latest GPA Grade'
    ];
    
    const rows = students.map(s => [
      s.studentName, s.penNo, s.district, s.mandal, s.schoolName, s.udiseCode,
      s.totalAttempts, s.bestScore, Math.round(s.totalScoreSum / Math.max(1, s.totalAttempts)), s.latestGpaGrade
    ]);

    const values = [headers, ...rows];

    // Clear existing content (optional but good for updates)
    if (existingSpreadsheetId) {
      await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:Z1000:clear`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }

    // Update sheet with data
    const updateRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1?valueInputOption=USER_ENTERED`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: values
      })
    });

    if (!updateRes.ok) {
      throw new Error(`Failed to write data: ${await updateRes.text()}`);
    }

    return { success: true, message: 'Test results exported successfully!', sheetUrl, spreadsheetId };
  } catch (error: any) {
    console.error('Export error:', error);
    return { success: false, message: error.message || 'Export failed.' };
  }
}
