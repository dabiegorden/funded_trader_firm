"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ChallengePage({ params }) {
  const [challenge, setChallenge] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()
  const { id } = params

  useEffect(() => {
    const loadChallenge = async () => {
      try {
        setIsLoading(true)
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

        // Check authentication
        const authResponse = await fetch(`${apiUrl}/api/auth/getCurrentUser`, {
          credentials: "include",
        })

        if (!authResponse.ok) {
          router.push("/sign-in?redirect=/dashboard/challenges/" + id)
          return
        }

        // Load challenge details
        const challengeResponse = await fetch(`${apiUrl}/api/challenges/${id}`, {
          credentials: "include",
        })

        if (challengeResponse.ok) {
          const challengeData = await challengeResponse.json()
          setChallenge(challengeData.data)
        } else {
          const errorData = await challengeResponse.json()
          setError(errorData.message || "Failed to load challenge details")
        }
      } catch (error) {
        console.error("Challenge loading error:", error)
        setError("An unexpected error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      loadChallenge()
    }
  }, [id, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-2">Loading challenge details...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  if (!challenge) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Challenge Not Found</h2>
          <p className="text-gray-600 mb-4">
            The challenge you're looking for doesn't exist or you don't have access to it.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-500">
            &larr; Back to Dashboard
          </Link>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Challenge Details</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {challenge.type === "1step" ? "1 Step Fortune" : "Instant Funding"} - {challenge.accountSize}{" "}
              {challenge.category === "forex" ? "Forex" : "Synthetic"}
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span
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
                  </span>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Account Size</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{challenge.accountSize}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Category</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {challenge.category === "forex" ? "Forex" : "Synthetic Indices"}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Platform</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{challenge.platform.toUpperCase()}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Created Date</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {new Date(challenge.createdAt).toLocaleString()}
                </dd>
              </div>

              {challenge.tradingCredentials && challenge.tradingCredentials.login && (
                <>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Trading Credentials</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <div className="bg-gray-100 p-4 rounded-md">
                        <p>
                          <strong>Login:</strong> {challenge.tradingCredentials.login}
                        </p>
                        <p>
                          <strong>Password:</strong> {challenge.tradingCredentials.password}
                        </p>
                        <p>
                          <strong>Server:</strong> {challenge.tradingCredentials.server}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          Credentials sent on: {new Date(challenge.tradingCredentials.sentAt).toLocaleString()}
                        </p>
                      </div>
                    </dd>
                  </div>
                </>
              )}

              {challenge.status === "active" && challenge.metrics && (
                <div className="bg-gray-50 px-4 py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 mb-4">Trading Metrics</dt>
                  <dd className="mt-1 sm:mt-0">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      <div className="bg-white p-4 rounded-md shadow-sm">
                        <p className="text-xs text-gray-500">Balance</p>
                        <p className="text-lg font-medium">${challenge.metrics.balance.toFixed(2)}</p>
                      </div>
                      <div className="bg-white p-4 rounded-md shadow-sm">
                        <p className="text-xs text-gray-500">Equity</p>
                        <p className="text-lg font-medium">${challenge.metrics.equity.toFixed(2)}</p>
                      </div>
                      <div className="bg-white p-4 rounded-md shadow-sm">
                        <p className="text-xs text-gray-500">Drawdown</p>
                        <p className="text-lg font-medium">{challenge.metrics.drawdown.toFixed(2)}%</p>
                      </div>
                      <div className="bg-white p-4 rounded-md shadow-sm">
                        <p className="text-xs text-gray-500">Profit</p>
                        <p
                          className={`text-lg font-medium ${challenge.metrics.profit >= 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {challenge.metrics.profit >= 0 ? "+" : ""}
                          {challenge.metrics.profit.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Last updated: {new Date(challenge.metrics.lastUpdated).toLocaleString()}
                    </p>
                  </dd>
                </div>
              )}

              {challenge.status === "pending" && (
                <div className="bg-yellow-50 px-4 py-5 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Payment Status</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                    <p>
                      Your challenge is pending payment. Once payment is confirmed, your trading credentials will be
                      generated.
                    </p>
                    <button
                      onClick={() =>
                        (window.location.href = `https://nowpayments.io/payment/?iid=${challenge.paymentId}`)
                      }
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Complete Payment
                    </button>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

