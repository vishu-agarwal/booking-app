import Carousel from "@/components/Carousel";
import ChatWithUs from "@/components/ChatWithUs";
import Link from "next/link";
import React from "react";
import { FaCheckCircle, FaRegClock, FaBuilding } from "react-icons/fa";

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-cyan-600 transition-all duration-500 ease-in-out hover:text-cyan-800">
          Welcome to the Meeting Room Booking Platform
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-700 transition-all duration-500 ease-in-out hover:text-gray-800">
          Book meeting or conference rooms for team meetings and enhance your team&apos;s collaboration!
        </p>
        <Link href={`/rooms`} passHref>
          <button className="mt-6 bg-cyan-600 text-white py-3 px-8 rounded-full text-lg sm:text-xl transition-all duration-500 ease-in-out hover:bg-cyan-700">
            Get Started
          </button>
        </Link>
      </header>

      {/* Carousel Section */}
      <section className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-cyan-600 mb-6 text-center">
          Explore Our Meeting Rooms
        </h2>
        <Carousel />
      </section>

      {/* Customer Attraction Section */}
      <section className="bg-cyan-600 p-8 rounded-lg shadow-lg mb-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6 text-center">
          Why Choose Our Platform?
        </h2>
        <div className="flex flex-col sm:flex-row justify-center space-y-8 sm:space-y-0 sm:space-x-8">
          <div className="text-center text-white">
            <FaCheckCircle className="text-5xl mb-4" />
            <h3 className="text-xl font-semibold">Easy and Fast Booking</h3>
            <p>Book your rooms in just a few clicks, no hassle, and no long forms.</p>
          </div>
          <div className="text-center text-white">
            <FaRegClock className="text-5xl mb-4" />
            <h3 className="text-xl font-semibold">Instant Confirmation</h3>
            <p>Get immediate confirmation of your booking to avoid double bookings.</p>
          </div>
          <div className="text-center text-white">
            <FaBuilding className="text-5xl mb-4" />
            <h3 className="text-xl font-semibold">Professional Settings</h3>
            <p>Impress clients with state-of-the-art meeting rooms that cater to your needs.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white p-8 rounded-lg shadow-lg mb-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-cyan-600 mb-6 text-center">
          Key Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:bg-cyan-50 transition-all duration-500 ease-in-out">
            <h3 className="text-xl font-semibold text-cyan-600">Easy Booking</h3>
            <p className="text-gray-700 mt-2">
              Quickly reserve meeting rooms with our user-friendly platform. No more hassle, just a few clicks!
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:bg-cyan-50 transition-all duration-500 ease-in-out">
            <h3 className="text-xl font-semibold text-cyan-600">Real-time Availability</h3>
            <p className="text-gray-700 mt-2">
              See available rooms in real-time, ensuring you book a space that&apos;s free when you need it.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:bg-cyan-50 transition-all duration-500 ease-in-out">
            <h3 className="text-xl font-semibold text-cyan-600">Multiple Room Options</h3>
            <p className="text-gray-700 mt-2">
              Choose from various room sizes and setups to meet your specific needs.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-cyan-600 p-8 text-center text-white rounded-lg shadow-lg mb-12">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          Ready to Book Your Room?
        </h2>
        <p className="text-lg mb-6">
          Get started today and take your team meetings to the next level. Book your room now!
        </p>
        <Link href={`/rooms`} passHref>
          <button className="bg-white text-cyan-600 py-3 px-6 rounded-full text-lg sm:text-xl transition-all duration-500 ease-in-out hover:bg-gray-100">
            Book a Room Now
          </button>
        </Link>
      </section>

      {/* Chat Widget */}
      <ChatWithUs />
    </div>
  );
};

export default DashboardPage;
