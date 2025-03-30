"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [profileImage, setProfileImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef(null)
  const router = useRouter()

  const validateForm = () => {
    const newErrors = {}

    // Username validation
    if (!formData.username) {
      newErrors.username = "Username is required"
    } else if (formData.username.length < 3 || formData.username.length > 50) {
      newErrors.username = "Username must be between 3 and 50 characters"
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long"
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }))
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.match("image.*")) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          profileImage: "Please select an image file",
        }))
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          profileImage: "Image size should be less than 5MB",
        }))
        return
      }

      setProfileImage(file)

      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)

      // Clear any previous errors
      if (errors.profileImage) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          profileImage: "",
        }))
      }
    }
  }

  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Create FormData object to handle file upload
      const formDataToSend = new FormData()
      formDataToSend.append("username", formData.username)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("password", formData.password)

      // Only append profile image if one was selected
      if (profileImage) {
        formDataToSend.append("profileImage", profileImage)
      }

      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
      })

      const data = await response.json()

      if (response.ok) {
        // Redirect to sign-in page
        router.push("/sign-in")
      } else {
        // Handle registration errors
        setErrors({
          submit: data.message || "Registration failed",
        })
      }
    } catch (error) {
      console.error("Registration error:", error)
      setErrors({
        submit: "An unexpected error occurred",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/sign-in" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center mb-6">
            <div
              onClick={handleImageClick}
              className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer hover:opacity-90 transition-opacity"
            >
              {previewUrl ? (
                <Image
                  src={previewUrl || "/placeholder.svg"}
                  alt="Profile preview"
                  fill
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}
            </div>
            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
            <p className="mt-2 text-sm text-gray-600">Click to upload profile picture</p>
            {errors.profileImage && <p className="mt-1 text-sm text-red-500">{errors.profileImage}</p>}
          </div>

          <div className="rounded-md shadow-sm -space-y-px">
            {/* Username Input */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  errors.username ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Choose a username"
              />
              {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Choose a strong password"
              />
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            {/* Confirm Password Input */}
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Repeat your password"
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div
              className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              {errors.submit}
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

