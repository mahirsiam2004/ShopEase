// app/contact/page.js
'use client';

import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Clock, 
  Sparkles,
  CheckCircle
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    toast.custom((t) => (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: t.visible ? 1 : 0, y: t.visible ? 0 : 50, scale: t.visible ? 1 : 0.9 }}
        className="bg-white rounded-2xl shadow-2xl p-6 border border-green-100 flex items-center gap-4 max-w-sm"
      >
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <p className="font-bold text-gray-800">Message Sent Successfully!</p>
          <p className="text-sm text-gray-600">We'll reply to you soon at {formData.email}</p>
        </div>
      </motion.div>
    ), {
      duration: 5000,
      position: 'top-center',
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <Toaster />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl"></div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-white rounded-full opacity-20"
              animate={{
                y: [0, -150, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0.1, 0.6, 0.1]
              }}
              transition={{
                duration: 12 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                left: `${10 + i * 10}%`,
                top: "50%"
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto"
          >
            Have a question? We’re here 24/7 to help you. Your satisfaction is our priority.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/30"
            >
              <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div whileHover={{ y: -2 }}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                      placeholder="Mahir Siam"
                    />
                  </motion.div>

                  <motion.div whileHover={{ y: -2 }}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
                      placeholder="mahirsiam2004@gmail.com"
                    />
                  </motion.div>
                </div>

                <motion.div whileHover={{ y: -2 }}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                    placeholder="How can we help you today?"
                  />
                </motion.div>

                <motion.div whileHover={{ y: -2 }}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none resize-none"
                    placeholder="Tell us everything..."
                  />
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3"
                >
                  <Send className="w-6 h-6" />
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info Cards */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-3xl p-10 shadow-2xl"
              >
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <Mail className="w-8 h-8" />
                  Email Us
                </h3>
                <p className="text-lg opacity-90 mb-2">We usually reply within 2 hours</p>
                <a href="mailto:mahirsiam2004@gmail.com" className="text-2xl font-bold hover:underline">
                  mahirsiam2004@gmail.com
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-100 hover:shadow-3xl transition-shadow"
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800">
                  <Phone className="w-8 h-8 text-blue-600" />
                  Call or WhatsApp
                </h3>
                <p className="text-3xl font-bold text-gray-800">+880 1234 567890</p>
                <p className="text-gray-600 mt-2">Available 9 AM – 10 PM (GMT+6)</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-3xl p-10 shadow-2xl"
              >
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Clock className="w-8 h-8" />
                  Business Hours
                </h3>
                <div className="space-y-2 text-lg">
                  <p>Monday – Friday: <strong>9:00 AM – 10:00 PM</strong></p>
                  <p>Saturday: <strong>10:00 AM – 8:00 PM</strong></p>
                  <p>Sunday: <strong>11:00 AM – 6:00 PM</strong></p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-900 text-white rounded-3xl p-10 text-center"
              >
                <Sparkles className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
                <p className="text-xl font-bold">Average Response Time</p>
                <p className="text-5xl font-extrabold mt-4 text-yellow-400">Under 2 Hours</p>
                <p className="mt-2 opacity-80">98% of messages answered in &lt; 2h</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/*  {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white text-center">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            We Can't Wait to Hear From You!
          </motion.h2>
          <p className="text-xl opacity-90 mb-8">Your questions matter. Drop us a line anytime.</p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="mailto:mahirsiam2004@gmail.com"
            className="inline-flex items-center gap-3 bg-white text-blue-600 px-12 py-5 rounded-full text-xl font-bold shadow-2xl"
          >
            Email Now <Mail className="w-7 h-7" />
          </motion.a>
        </div>
      </section>
    </>
  );
}