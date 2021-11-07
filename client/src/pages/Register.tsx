import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <form className="h-screen bg-login-image bg-cover flex justify-center items-start">
      <div className="flex flex-col gap-4 items-center bg-white w-2/5 p-4 rounded-lg my-6">
        <span className="font-bold text-2xl">BECOME A MEMBER</span>
        <input type="email" placeholder="Email address" className="border border-gray-300 rounded-lg p-2 px-4 w-full focus:outline-none"></input>
        <input type="password" placeholder="Password" className="border border-gray-300 rounded-lg p-2 px-4 w-full focus:outline-none"></input>
        <input type="text" placeholder="First Name" className="border border-gray-300 rounded-lg p-2 px-4 w-full focus:outline-none"></input>
        <input type="text" placeholder="Last Name" className="border border-gray-300 rounded-lg p-2 px-4 w-full focus:outline-none"></input>

        <button className="bg-black text-white w-full py-2 rounded-lg hover:bg-gray-600">SIGN UP</button>
        <span className="text-gray-500">Already a member? <Link to="/login" className="text-black underline">Log in.</Link></span>
      </div>
    </form>
  )
}

export default Register