"use client"
import React, { useState } from 'react'

const Contact = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic for form submission (e.g., API call or console log)
        console.log("Form Submitted:", formData);
        alert("Thank you for contacting us!");
        setFormData({ name: "", email: "", message: "" }); // Clear form
      };
    
  return (
    <div className='py-16 w-1/2 m-auto'>
                <h2 className="text-3xl font-semibold text-blue-600 pb-6">Contact Us</h2>
        <p className="text-lg text-gray-700 pb-8">
          Have any questions, feedback, or need support? Fill out the form below, and we’ll get back to you as soon as possible.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 pb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 pb-2">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-lg font-medium text-gray-700 pb-2">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your message"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
    </div>
  )
}

export default Contact
