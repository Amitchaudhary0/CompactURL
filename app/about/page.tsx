import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Compact URL | About Us",
  description: "Learn more about CompactURL, a fast, simple, and reliable URL shortener that makes sharing long and complex links a breeze.",
};

const About = () => {
  return (
    <div className="sm:w-2/3 sm:m-auto p-2 w-full py-16">
      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-blue-600 mb-6">About CompactURL</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          <strong>CompactURL</strong> is a fast, simple, and reliable URL shortener that makes sharing long and complex links a breeze. Whether you&apos;re a business, developer, or individual, our platform enables you to shorten links, track their usage, and simplify sharing.
        </p>

        {/* Features Section */}
        <section className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Why Choose CompactURL?</h3>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
            <li>
              <strong>Fast & Easy:</strong> Shorten your URLs in just a click.
            </li>
            <li>
              <strong>Reliable:</strong> Industry-standard uptime and performance.
            </li>
            <li>
              <strong>Custom Links:</strong> Create branded, memorable short links.
            </li>
            <li>
              <strong>Analytics:</strong> Track clicks and engagement in real time.
            </li>
          </ul>
        </section>

        {/* Mission Statement */}
        <section className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            At <strong>CompactURL</strong>, our mission is to simplify the way people share and manage links. We strive to provide a tool that is both powerful and easy to use, ensuring that your links are short, trackable, and always accessible.
          </p>
        </section>
      </div>
    </div>
  )
}

export default About
