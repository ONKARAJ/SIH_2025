"use client"

import { useState } from "react"
import { signIn, signOut, useSession } from "next-auth/react"

export default function DebugAuthPage() {
  const { data: session, status } = useSession()
  const [email, setEmail] = useState("test@example.com")
  const [password, setPassword] = useState("testpass123")
  const [name, setName] = useState("Test User")
  const [phone, setPhone] = useState("1234567890")
  const [result, setResult] = useState("")

  const handleSignUp = async () => {
    setResult("Old NextAuth signup API has been removed. Use Clerk signup at /sign-up instead.")
  }

  const handleSignIn = async () => {
    try {
      setResult("Signing in...")
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false
      })
      setResult(`Sign in result: ${JSON.stringify(result, null, 2)}`)
    } catch (error) {
      setResult(`Sign in error: ${error}`)
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Authentication Debug Page</h1>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Session Status</h2>
        <pre className="bg-gray-100 p-4 rounded">
          Status: {status}
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>

      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="space-x-4 mb-6">
        <button
          onClick={handleSignUp}
          className="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed"
          title="Old NextAuth signup removed - Use Clerk at /sign-up"
        >
          Test Sign Up (Disabled)
        </button>
        <button
          onClick={handleSignIn}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Test Sign In
        </button>
        {session && (
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Result</h2>
        <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
          {result}
        </pre>
      </div>
    </div>
  )
}