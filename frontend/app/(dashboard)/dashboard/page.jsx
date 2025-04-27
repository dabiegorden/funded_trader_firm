"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [challenges, setChallenges] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      try {
        setIsLoading(true)
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

        // Check authentication
        const authResponse = await fetch(`${apiUrl}/api/auth/getCurrentUser`, {
          credentials: "include",
        })

        if (!authResponse.ok) {
          router.push("/sign-in?redirect=/dashboard")
          return
        }

        const authData = await authResponse.json()
        setUser(authData.user)

        // Load user challenges
        const challengesResponse = await fetch(`${apiUrl}/api/challenges`, {
          credentials: "include",
        })

        if (challengesResponse.ok) {
          const challengesData = await challengesResponse.json()
          setChallenges(challengesData.data)
        } else {
          console.error("Failed to load challenges")
        }
      } catch (error) {
        console.error("Dashboard data loading error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthAndLoadData()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-2">Loading your dashboard...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.username}!</h1>
          <p className="mt-2 text-gray-600">Manage your trading challenges and track your progress.</p>
        </div>

        {/* Dashboard Summary */}
        <div className="grid grid-cols-1 gap-6 mb-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Challenges</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{challenges.length}</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Active Challenges</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {challenges.filter((c) => c.status === "active").length}
              </dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Pending Challenges</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {challenges.filter((c) => c.status === "pending" || c.status === "paid").length}
              </dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Completed Challenges</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {challenges.filter((c) => c.status === "completed").length}
              </dd>
            </div>
          </div>
        </div>

        {/* Challenges List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Your Trading Challenges</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {challenges.length > 0 ? (
              challenges.map((challenge) => (
                <li key={challenge._id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-blue-600 truncate">
                          {challenge.type === "1step" ? "1 Step Fortune" : "Instant Funding"} - {challenge.accountSize}{" "}
                          {challenge.category === "forex" ? "Forex" : "Synthetic"}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${
                              challenge.status === "active"
                                ? "bg-green-100 text-green-800"
                                : challenge.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : challenge.status === "paid"
                                    ? "bg-blue-100 text-blue-800"
                                    : challenge.status === "completed"
                                      ? "bg-purple-100 text-purple-800"
                                      : "bg-red-100 text-red-800"
                            }`}
                          >
                            {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
                          </p>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <Link
                          href={`/dashboard/challenges/${challenge._id}`}
                          className="font-medium text-blue-600 hover:text-blue-500"
                        >
                          View details
                        </Link>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          Platform: {challenge.platform.toUpperCase()}
                        </p>
                        {challenge.tradingCredentials && challenge.tradingCredentials.login && (
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            Login: {challenge.tradingCredentials.login}
                          </p>
                        )}
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>Created: {new Date(challenge.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    {challenge.status === "active" && challenge.metrics && (
                      <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div className="col-span-1">
                          <p className="text-xs text-gray-500">Balance</p>
                          <p className="text-sm font-medium">${challenge.metrics.balance.toFixed(2)}</p>
                        </div>
                        <div className="col-span-1">
                          <p className="text-xs text-gray-500">Equity</p>
                          <p className="text-sm font-medium">${challenge.metrics.equity.toFixed(2)}</p>
                        </div>
                        <div className="col-span-1">
                          <p className="text-xs text-gray-500">Drawdown</p>
                          <p className="text-sm font-medium">{challenge.metrics.drawdown.toFixed(2)}%</p>
                        </div>
                        <div className="col-span-1">
                          <p className="text-xs text-gray-500">Profit</p>
                          <p
                            className={`text-sm font-medium ${challenge.metrics.profit >= 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {challenge.metrics.profit >= 0 ? "+" : ""}
                            {challenge.metrics.profit.toFixed(2)}%
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <li className="px-4 py-12 text-center">
                <p className="text-gray-500 mb-4">You don't have any trading challenges yet.</p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Browse Available Challenges
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

