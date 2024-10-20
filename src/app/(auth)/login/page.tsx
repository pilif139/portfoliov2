"use client";

import {auth} from "@/firebase/clientApp";
import {signInWithEmailAndPassword} from "@firebase/auth";

export default function Login(){

  return (
      <main>
        <h1>Login</h1>
        <form>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
            <button type="submit">Login</button>
        </form>
      </main>
  )
}