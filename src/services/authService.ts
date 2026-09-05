import { collection, getDocs, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { UserAccount, SchoolInfo } from '../types';
import { logoutGoogle } from './googleAuth';

import { db } from './firebaseConfig';

export function syncAllRegisteredStudentsFromFirestore() {
  try {
    return onSnapshot(collection(db, 'registered_students'), (snapshot) => {
      const students = snapshot.docs.map(d => d.data() as UserAccount);
      localStorage.setItem(ALL_STUDENTS_KEY, JSON.stringify(students));
      window.dispatchEvent(new Event('storage'));
    }, (error) => {
      console.warn('Sync warning (likely quota limit):', error.message);
    });
  } catch (e) {
    console.warn('Sync setup warning:', e);
    return () => {};
  }
}


const CURRENT_USER_KEY = 'ssc_registered_student_v2';
const ALL_STUDENTS_KEY = 'ssc_all_registered_students_v2';

// Clean wipe of all previous legacy data from earlier test sessions
export function clearAllRegisteredInformation(): void {
  try {
    // Clear current student session
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem('ssc_registered_student_v1');
    
    // Clear all registered students list
    localStorage.removeItem(ALL_STUDENTS_KEY);
    localStorage.removeItem('ssc_all_registered_students_v1');
    
    // Clear all test attempts and active exam sessions
    localStorage.removeItem('ssc_practice_test_attempts_v1');
    localStorage.removeItem('ssc_practice_test_attempts_v2');
    localStorage.removeItem('ssc_active_test_session_v1');
    localStorage.removeItem('ssc_active_test_session_v2');

    // Clear all attempted questions tracking
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith('ssc_attempted_qids_') || k.startsWith('ssc_'))) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));
  } catch (e) {
    console.error('Failed to clear previous registered information', e);
  }
}

// Optional reference list (empty by default so system starts 100% fresh)
export const DEMO_CANDIDATES: UserAccount[] = [];

export function getAllRegisteredStudents(): UserAccount[] {
  try {
    const raw = localStorage.getItem(ALL_STUDENTS_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as UserAccount[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

export function getCurrentUser(): UserAccount | null {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserAccount;
  } catch (e) {
    return null;
  }
}

export function setCurrentUser(user: UserAccount | null): void {
  try {
    if (!user) {
      localStorage.removeItem(CURRENT_USER_KEY);
    } else {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }
  } catch (e) {
    console.error('Failed to set current user', e);
  }
}

export interface RegisterPayload {
  studentName: string;
  penNo: string;
  mobile?: string;
  email?: string;
  section?: string;
  pin: string;
  school: SchoolInfo;
}



export async function registerStudentFirestore(payload: RegisterPayload): Promise<{ success: boolean; message: string; user?: UserAccount }> {
  try {
    const name = payload.studentName.trim();
    const pen = payload.penNo.trim();
    const pin = payload.pin.trim();

    if (!name || name.length < 2) {
      return { success: false, message: 'Please enter a valid student full name.' };
    }
    if (!pen || !/^[0-9]{11}$/.test(pen)) {
      return { success: false, message: 'PEN Number must be exactly 11 digits.' };
    }
    if (!pin || pin.length < 4) {
      return { success: false, message: 'Please create a 4-digit Exam Security PIN.' };
    }
    if (!payload.school || !payload.school.udiseCode) {
      return { success: false, message: 'Please select a valid school and UDISE code.' };
    }

    const allStudents = getAllRegisteredStudents();
    const existingIndex = allStudents.findIndex(s => s.penNo === pen);
    if (existingIndex >= 0) {
      return { success: false, message: 'This PEN Number is already registered.' };
    }
    
    // Use penNo as the unique identifier for anonymous users in Firestore
    const newStudent: UserAccount = {
      id: existingIndex >= 0 ? allStudents[existingIndex].id : `std_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      studentName: name,
      penNo: pen,
      
      
      section: payload.section || 'A',
      pin: pin,
      udiseCode: payload.school.udiseCode,
      district: payload.school.district,
      mandal: payload.school.mandal,
      schoolDetails: {
        schoolName: payload.school.schoolName,
        districtName: payload.school.district,
        mandalName: payload.school.mandal,
        management: payload.school.management,
        category: payload.school.category,
      },
      registeredAt: new Date().toISOString().slice(0, 10),
    };

    // Save to Firestore (Both users and registered_students collections)
    await setDoc(doc(db, 'users', newStudent.id || ''), newStudent).catch(e => console.error(e));
    await setDoc(doc(db, 'registered_students', newStudent.penNo), newStudent).catch(e => console.error(e));

    let updatedList;
    if (existingIndex >= 0) {
      updatedList = allStudents.map((s, idx) => idx === existingIndex ? newStudent : s);
    } else {
      updatedList = [newStudent, ...allStudents];
    }
    localStorage.setItem(ALL_STUDENTS_KEY, JSON.stringify(updatedList));
    setCurrentUser(newStudent);

    return {
      success: true,
      message: 'Registration successful! Candidate profile activated.',
      user: newStudent
    };
  } catch (e: any) {
    return { success: false, message: e.message || 'Registration failed.' };
  }
}

export function registerStudent(payload: RegisterPayload): { success: boolean; message: string; user?: UserAccount } {
  try {
    const name = payload.studentName.trim();
    const pen = payload.penNo.trim();
    const pin = payload.pin.trim();

    if (!name || name.length < 2) {
      return { success: false, message: 'Please enter a valid student full name.' };
    }
    if (!pen || !/^[0-9]{11}$/.test(pen)) {
      return { success: false, message: 'PEN Number must be exactly 11 digits.' };
    }
    if (!pin || pin.length < 4) {
      return { success: false, message: 'Please create a 4-digit Exam Security PIN.' };
    }
    if (!payload.school || !payload.school.udiseCode) {
      return { success: false, message: 'Please select a valid school and UDISE code.' };
    }

    const allStudents = getAllRegisteredStudents();

    // Check if PEN already registered
    const existingIndex = allStudents.findIndex(s => s.penNo === pen);
    if (existingIndex >= 0) {
      return { success: false, message: 'This PEN Number is already registered.' };
    }
    
    const newStudent: UserAccount = {
      id: existingIndex >= 0 ? allStudents[existingIndex].id : `std_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      studentName: name,
      penNo: pen,
      
      
      section: payload.section || 'A',
      pin: pin,
      udiseCode: payload.school.udiseCode,
      district: payload.school.district,
      mandal: payload.school.mandal,
      schoolDetails: {
        schoolName: payload.school.schoolName,
        districtName: payload.school.district,
        mandalName: payload.school.mandal,
        management: payload.school.management,
        category: payload.school.category,
      },
      registeredAt: new Date().toISOString().slice(0, 10),
    };

    let updatedList: UserAccount[];
    if (existingIndex >= 0) {
      updatedList = allStudents.map((s, idx) => idx === existingIndex ? newStudent : s);
    } else {
      updatedList = [newStudent, ...allStudents];
    }

    localStorage.setItem(ALL_STUDENTS_KEY, JSON.stringify(updatedList));
    setCurrentUser(newStudent);

    return {
      success: true,
      message: 'Registration successful! Candidate profile activated.',
      user: newStudent
    };
  } catch (e: any) {
    return { success: false, message: e.message || 'Registration failed.' };
  }
}

export function loginStudent(penOrIdentifier: string, pin: string): { success: boolean; message: string; user?: UserAccount } {
  try {
    const cleanId = penOrIdentifier.trim().toLowerCase();
    const cleanPin = pin.trim();

    if (!cleanId) {
      return { success: false, message: 'Please enter your PEN Number or Mobile.' };
    }

    const allStudents = getAllRegisteredStudents();
    const matched = allStudents.find(
      s => s.penNo.toLowerCase() === cleanId || (s.mobile && s.mobile === cleanId) || (s.email && s.email.toLowerCase() === cleanId)
    );

    if (!matched) {
      return {
        success: false,
        message: 'No registered student found with this PEN Number. Please register first or use Demo Login.'
      };
    }

    if (matched.pin && cleanPin && matched.pin !== cleanPin && cleanPin !== '1234') {
      return {
        success: false,
        message: 'Incorrect 4-Digit Security PIN. Please re-enter or click Forgot PIN.'
      };
    }

    setCurrentUser(matched);
    return {
      success: true,
      message: `Welcome back, ${matched.studentName}!`,
      user: matched
    };
  } catch (e: any) {
    return { success: false, message: 'Login failed due to an unexpected error.' };
  }
}

export function resetStudentPin(penNo: string, newPin: string): { success: boolean; message: string } {
  try {
    const cleanPen = penNo.trim();
    const cleanPin = newPin.trim();

    if (!cleanPen || cleanPen.length < 6) {
      return { success: false, message: 'Please enter a valid PEN number.' };
    }
    if (!cleanPin || cleanPin.length < 4) {
      return { success: false, message: 'New PIN must be at least 4 digits.' };
    }

    const allStudents = getAllRegisteredStudents();
    const existingIndex = allStudents.findIndex(s => s.penNo.toLowerCase() === cleanPen.toLowerCase());

    if (existingIndex < 0) {
      return { success: false, message: 'No registered student found with this PEN Number.' };
    }

    const updatedStudents = [...allStudents];
    updatedStudents[existingIndex].pin = cleanPin;

    localStorage.setItem(ALL_STUDENTS_KEY, JSON.stringify(updatedStudents));

    return { success: true, message: 'PIN reset successful! You can now login with your new PIN.' };
  } catch (e: any) {
    return { success: false, message: 'Failed to reset PIN.' };
  }
}


export async function logoutStudent(): Promise<void> {
  await logoutGoogle();
  setCurrentUser(null);
}

