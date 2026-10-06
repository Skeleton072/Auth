import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const navigate = useNavigate();

  const features = [
    {
      title: "Smart Matching",
      description: "Find the perfect study partner based on your subjects, schedule, and learning style",
      icon: "🔍"
    },
    {
      title: "Virtual Study Rooms",
      description: "Collaborate in real-time with shared whiteboards and video chat",
      icon: "💻"
    },
    {
      title: "Progress Tracking",
      description: "Monitor your study habits and achievements with our analytics dashboard",
      icon: "📊"
    }
  ]

  const testimonials = [
    {
      quote: "Study Buddy helped me find an amazing partner for my CS course. We aced the final together!",
      author: "Alex, Computer Science Major"
    },
    {
      quote: "I doubled my productivity using the Pomodoro timer and focus rooms.",
      author: "Jamie, Medical Student"
    }
  ]

  return (
    <div className='overflow-x-hidden'>
      <header>
        <title>Study Buddy | Find Your Perfect Study Partner</title>
        <meta name="description" content="Connect with ideal study partners and boost your learning" />
      </header>

      <div className="min-h-screen bg-linear-to-br from-indigo-50 to-blue-100">
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-20 left-20 w-40 h-40 rounded-full bg-blue-200 opacity-30"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 10, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-indigo-200 opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Navigation */}
        <nav className="px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-blue-500">
              Study Buddy
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex space-x-4"
          >
            <button 
              className="px-4 py-2 text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
              onClick={() => navigate('/auth/login')}
            >
              Login
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition-colors"
              onClick={() => navigate('/auth/signup')}
            >
              Sign Up Free
            </motion.button>
          </motion.div>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 md:py-32">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Find Your Perfect <span className="text-indigo-600">Study Partner</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Connect with students who share your academic goals and learning style.
                Study smarter, not harder.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors text-lg font-medium"
                >
                  Get Started
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors text-lg font-medium"
                >
                  How It Works
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-indigo-100 rounded-3xl"></div>
                <motion.div 
                  className="relative z-10 bg-white p-2 rounded-2xl shadow-xl"
                  whileHover={{ 
                    rotate: isHovered ? [0, -5, 5, -5, 0] : 0,
                  }}
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                >
                  <div
                    className="rounded-xl border border-gray-200"
                  />
                </motion.div>
                <motion.div 
                  className="absolute -bottom-8 -right-8 bg-white p-4 rounded-xl shadow-lg"
                  animate={{
                    y: [0, -10, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity
                  }}
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <span className="text-2xl">👋</span>
                    </div>
                    <div>
                      <p className="font-medium">New match!</p>
                      <p className="text-sm text-gray-500">Sarah, Biology</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Supercharge Your Study Sessions
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to make studying more effective and enjoyable
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`p-8 rounded-xl cursor-pointer transition-all ${activeFeature === index ? 'bg-indigo-50 border-2 border-indigo-200' : 'bg-gray-50 hover:bg-gray-100'}`}
                  onClick={() => setActiveFeature(index)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-indigo-50">
          <div className="container mx-auto px-6">
            <motion.h2 
              className="text-3xl font-bold text-center mb-12 text-gray-900"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              What Students Are Saying
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-sm"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="text-5xl text-indigo-100 mb-4">"</div>
                  <p className="text-lg text-gray-700 mb-6">{testimonial.quote}</p>
                  <p className="font-medium text-indigo-600">{testimonial.author}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <motion.div 
              className="bg-indigo-600 rounded-2xl p-12 shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Study Habits?
              </h2>
              <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                Join thousands of students who are studying smarter with Study Buddy
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-indigo-600 rounded-full shadow-lg hover:bg-gray-100 transition-colors text-lg font-bold"
              >
                Sign Up Free - It's Easy!
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-6 md:mb-0"
              >
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-indigo-400 to-blue-300">
                  Study Buddy
                </span>
                <p className="text-gray-400 mt-2">Making studying social since 2023</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="flex space-x-6"
              >
                <a href="#" className="hover:text-indigo-300 transition-colors">About</a>
                <a href="#" className="hover:text-indigo-300 transition-colors">Features</a>
                <a href="#" className="hover:text-indigo-300 transition-colors">Pricing</a>
                <a href="#" className="hover:text-indigo-300 transition-colors">Contact</a>
              </motion.div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>© 2023 Study Buddy. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
