import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { getAllRegisteredStudents } from './authService';

export async function syncStudentsToFirestore(): Promise<{ success: boolean; message: string; count?: number }> {
  try {
    const students = getAllRegisteredStudents();
    
    // We'll write to a "registered_students" collection
    const batchPromises = students.map(student => {
      // Use PEN number as the document ID for uniqueness and easy lookup
      const docRef = doc(db, 'registered_students', student.penNo);
      return setDoc(docRef, {
        ...student,
        lastSyncedAt: new Date().toISOString()
      }, { merge: true }); // Merge true updates existing, creates if new
    });

    await Promise.all(batchPromises);
    
    return { success: true, message: 'Successfully backed up to Firestore database!', count: students.length };
  } catch (error: any) {
    console.error("Firestore sync failed:", error);
    return { success: false, message: error.message || "Failed to sync to database." };
  }
}
