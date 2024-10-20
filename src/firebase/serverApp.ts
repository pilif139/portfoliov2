import "server-only";

import * as admin from "firebase-admin";
import {getAuth} from "firebase/auth";

const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
if(!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: privateKey,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
    })
}

export const adminAuth = admin.auth();
export const adminApp = admin.app();