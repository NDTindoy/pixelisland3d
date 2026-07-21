import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect,
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import emailjs from '@emailjs/browser';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if Firebase keys are configured
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId && 
  firebaseConfig.apiKey !== 'your_api_key_here'
);

let app = null;
let auth = null;
let db = null;
let googleProvider = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });
  } catch (error) {
    console.warn('Firebase initialization error, using local fallback mode:', error);
  }
} else {
  console.info('Firebase environment variables not set. Running in Local Storage Fallback Mode.');
}

// ----------------------------------------------------
// AUTHENTICATION HELPERS
// ----------------------------------------------------

// Get Whitelisted Admin Emails from env
export const getWhitelistedEmails = () => {
  const envEmails = import.meta.env.VITE_ALLOWED_ADMIN_EMAILS || '';
  const list = envEmails.split(',').map(e => e.trim().toLowerCase()).filter(Boolean);
  // Default fallback for demo / admin initial access if env not set
  return list.length > 0 ? list : ['nilolocco@gmail.com', 'tindoynilo@gmail.com', 'nilotindoy@gmail.com'];
};

export const isEmailAuthorized = (email) => {
  if (!email) return false;
  const whitelist = getWhitelistedEmails();
  return whitelist.includes(email.toLowerCase());
};

// Sign in with Google (Popup with Redirect fallback)
export const signInWithGoogle = async () => {
  if (isFirebaseConfigured && auth) {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      console.warn('Popup login failed or closed, switching to Google redirect login:', error);
      await signInWithRedirect(auth, googleProvider);
      return null;
    }
  } else {
    // If env keys are missing locally, provide seamless login for whitelisted admin email
    const mockUser = {
      uid: `admin_${Date.now()}`,
      displayName: 'Admin User',
      email: getWhitelistedEmails()[0] || 'tindoynilo@gmail.com',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };
    localStorage.setItem('pixel_admin_demo_user', JSON.stringify(mockUser));
    window.dispatchEvent(new Event('storage'));
    return mockUser;
  }
};

// Logout
export const logOutAdmin = async () => {
  if (!isFirebaseConfigured || !auth) {
    localStorage.removeItem('pixel_admin_demo_user');
    return true;
  }
  await signOut(auth);
  return true;
};

// Listen to Auth State
export const subscribeToAuthState = (callback) => {
  if (!isFirebaseConfigured || !auth) {
    const stored = localStorage.getItem('pixel_admin_demo_user');
    const user = stored ? JSON.parse(stored) : null;
    callback(user);
    // Listen for storage events (e.g. login across tabs)
    const handler = () => {
      const u = localStorage.getItem('pixel_admin_demo_user');
      callback(u ? JSON.parse(u) : null);
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

// ----------------------------------------------------
// FIRESTORE & INQUIRY HELPERS
// ----------------------------------------------------

const LOCAL_STORAGE_KEY = 'pixel_island_inquiries_db';

const getLocalInquiries = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : getSampleInquiries();
  } catch (e) {
    return getSampleInquiries();
  }
};

const saveLocalInquiries = (items) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
};

// Submit inquiry
export const submitInquiry = async (formData) => {
  const newInquiry = {
    ...formData,
    status: 'new',
    createdAt: new Date().toISOString(),
    id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
  };

  let firestoreId = null;

  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'inquiries'), {
        ...formData,
        status: 'new',
        createdAt: serverTimestamp()
      });
      firestoreId = docRef.id;
    } catch (err) {
      console.error('Error writing to Firestore, saving locally:', err);
    }
  }

  // Always keep local copy as fallback
  const localList = getLocalInquiries();
  localList.unshift({ ...newInquiry, id: firestoreId || newInquiry.id });
  saveLocalInquiries(localList);

  // Trigger EmailJS dispatch
  await sendInquiryEmailNotification(formData);

  return firestoreId || newInquiry.id;
};

// Subscribe to Inquiries real-time feed
export const subscribeToInquiries = (callback) => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
      return onSnapshot(q, (snapshot) => {
        const items = snapshot.docs.map(docSnap => {
          const data = docSnap.data();
          let createdAtFormatted = new Date().toISOString();
          if (data.createdAt && data.createdAt.toDate) {
            createdAtFormatted = data.createdAt.toDate().toISOString();
          } else if (data.createdAt) {
            createdAtFormatted = data.createdAt;
          }
          return {
            id: docSnap.id,
            ...data,
            createdAt: createdAtFormatted
          };
        });
        callback(items);
      }, (error) => {
        console.warn('Firestore snapshot error, falling back to local storage:', error);
        callback(getLocalInquiries());
      });
    } catch (err) {
      console.warn('Firestore subscription failed, falling back:', err);
    }
  }

  // Fallback mode: emit local inquiries & listen to window events
  callback(getLocalInquiries());
  const handler = () => callback(getLocalInquiries());
  window.addEventListener('pixel_inquiry_updated', handler);
  return () => window.removeEventListener('pixel_inquiry_updated', handler);
};

// Update status
export const updateInquiryStatus = async (id, newStatus) => {
  if (isFirebaseConfigured && db && !id.startsWith('inq_')) {
    try {
      const docRef = doc(db, 'inquiries', id);
      await updateDoc(docRef, { status: newStatus, updatedAt: serverTimestamp() });
    } catch (e) {
      console.error('Failed to update Firestore doc:', e);
    }
  }

  // Update local
  const items = getLocalInquiries().map(item => item.id === id ? { ...item, status: newStatus } : item);
  saveLocalInquiries(items);
  window.dispatchEvent(new Event('pixel_inquiry_updated'));
};

// Delete inquiry
export const deleteInquiry = async (id) => {
  if (isFirebaseConfigured && db && !id.startsWith('inq_')) {
    try {
      await deleteDoc(doc(db, 'inquiries', id));
    } catch (e) {
      console.error('Failed to delete Firestore doc:', e);
    }
  }
  const items = getLocalInquiries().filter(item => item.id !== id);
  saveLocalInquiries(items);
  window.dispatchEvent(new Event('pixel_inquiry_updated'));
};

// ----------------------------------------------------
// EMAILJS DISPATCH HELPER
// ----------------------------------------------------

export const sendInquiryEmailNotification = async (inquiryData) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey || serviceId.includes('your_')) {
    console.info('EmailJS credentials not configured yet. Skipping live email trigger.');
    return { success: false, reason: 'unconfigured' };
  }

  try {
    const templateParams = {
      from_name: inquiryData.fullName,
      from_email: inquiryData.email,
      phone: inquiryData.phone || 'N/A',
      company: inquiryData.company || 'N/A',
      location: inquiryData.location || 'N/A',
      project_type: inquiryData.projectType || 'N/A',
      visualization_area: inquiryData.areaVisualized || 'N/A',
      services: Array.isArray(inquiryData.services) ? inquiryData.services.join(', ') : (inquiryData.services || 'N/A'),
      deliverable_timeline: inquiryData.deadline || 'N/A',
      message: inquiryData.description || 'No message provided.',
      referral_source: inquiryData.referral || 'N/A'
    };

    const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send EmailJS alert:', error);
    return { success: false, error };
  }
};

// Default sample data for zero-state / fallback
function getSampleInquiries() {
  return [
    {
      id: 'inq_sample_1',
      fullName: 'Marcus Vance',
      company: 'Apex Luxury Developments',
      email: 'm.vance@apexluxury.com',
      phone: '+1 (305) 892-4110',
      location: 'Miami, FL, USA',
      projectType: 'Residential',
      areaVisualized: 'Exterior & Interior',
      services: ['Still Renders (Exterior & Interior images)', '3D Animation / Walkthrough Video', 'Virtual Tour (360° interactive)'],
      deadline: '2-4 Weeks',
      description: 'Developing a 14-unit beachfront luxury condominium deck in South Beach. Need 8 high-res stills and a 60-second cinematic teaser video for pre-sales launch.',
      referral: 'Referral',
      status: 'new',
      createdAt: new Date(Date.now() - 3600000 * 3).toISOString()
    },
    {
      id: 'inq_sample_2',
      fullName: 'Elena Rostova',
      company: 'Rostova Architects',
      email: 'elena@rostovadesign.co.uk',
      phone: '+44 20 7946 0912',
      location: 'London, UK',
      projectType: 'Commercial',
      areaVisualized: 'Exterior only',
      services: ["Bird's Eye / Aerial View", 'Still Renders (Exterior & Interior images)'],
      deadline: '1-2 Months',
      description: 'High-rise glass office tower visualization for city planning application and investor presentation deck.',
      referral: 'Google Search',
      status: 'contacted',
      createdAt: new Date(Date.now() - 3600000 * 28).toISOString()
    }
  ];
}
