import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin (runs server-side)
if (!admin.apps.length) {
  initializeApp();
}

export default async function handler(req, res) {
  const db = getFirestore();
  
  if (req.method === 'POST') {
    // Create new claim
    const { userId, propertyAddress, ownerName, damageDescription } = req.body;
    
    const claimRef = await db.collection('claims').add({
      userId,
      propertyAddress,
      ownerName,
      damageDescription,
      status: 'awaiting_docs',
      createdAt: new Date(),
      claimValue: 0
    });
    
    return res.status(201).json({ id: claimRef.id, success: true });
  }
  
  if (req.method === 'GET') {
    // Get claims for user
    const { userId } = req.query;
    
    const snapshot = await db.collection('claims')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get();
    
    const claims = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return res.status(200).json({ claims });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
