import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AuthForm() {
  const { mode } = useParams();

  const [isLogin, setIsLogin] = useState<boolean>(mode == 'login');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  //const [particles, setParticles] = useState<Particle[]>([]);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<String>("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (password.length < 8) {
      setError("Password should have length of 8.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER}/api/auth/${isLogin ? 'login' : 'signup'}`,  { name ,email, password }, { withCredentials: true });
      
      if (res.status == 200) {
        if (isLogin) {
          // do something
        } else {
          localStorage.setItem("pendingEmail", email);
          navigate("/auth/emailVerification");
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-screen min-h-screen flex items-center justify-center relative">
      {/* Floating particles background
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white bg-opacity-10"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          animate={{
            x: [0, p.speedX * 100],
            y: [0, p.speedY * 100],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      ))}
      */}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-screen mx-4 flex items-center justify-center relative"
      >
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-black border-opacity-20 w-110">
          <div className="flex relative h-16">
            <div
              className={`absolute top-0 h-full w-1/2 bg-white bg-opacity-20 transition-all duration-500 ease-in-out ${isLogin ? 'left-0' : 'left-1/2'}`}
            />
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 flex items-center justify-center font-medium text-lg transition-colors duration-300 ${isLogin ? 'text-black' : 'text-black text-opacity-70'}`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 flex items-center justify-center font-medium text-lg transition-colors duration-300 ${!isLogin ? 'text-black' : 'text-black text-opacity-70'}`}
            >
              Login
            </button>
          </div>

          {/* Form content */}
          <div className="p-8 pt-2">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-black mb-2">
                {isLogin ? 'Welcome Back!' : 'Create Account'}
              </h2>
              <p className="text-black text-opacity-80">
                {isLogin ? 'Login to access your account' : 'Join us today!'}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-4"
                  >
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 pl-12 bg-white bg-opacity-10 border border-black border-opacity-20 rounded-lg text-black placeholder-black placeholder-opacity-50 focus:outline-none focus:ring-1 focus:ring-black focus:ring-opacity-30 transition-all"
                        placeholder="Full Name"
                        required={!isLogin}
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <UserIcon className="text-black text-opacity-70" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mb-4">
                <div className='relative'>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-3 pl-12 bg-white bg-opacity-10 border rounded-lg text-black placeholder-black placeholder-opacity-50 focus:outline-none focus:ring-1 transition-all ${
                      error === 'Email already registered' || error === "Email not registered."
                        ? 'border-red-500 focus:ring-red-500 animate-shake border-opacity-70 border-2' 
                        : 'border-black border-opacity-20 focus:ring-black focus:ring-opacity-30'
                    }`}
                    placeholder="Email Address"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MailIcon className={`${
                      error === 'Email already registered' ? 'text-red-500' : 'text-black text-opacity-70'
                    }`} />
                  </div>
                </div>

                {error === 'Email already registered' || error === "Email not registered." ? (
                  <div className="mb-2 ml-2 flex items-center text-red-500 animate-fadeIn">
                    <span className="text-sm">{error}</span>
                  </div> 
                ) : (<></>)}
 
              </div>

              <div className="mb-6">
                <div className='relative mb-1'>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`
                      w-full px-4 py-3 pl-12 pr-10 bg-white bg-opacity-10 border border-black border-opacity-20 rounded-lg text-black placeholder-black placeholder-opacity-50 focus:outline-none focus:ring-1 focus:ring-black focus:ring-opacity-30 transition-all
                      ${error === 'Wrong Password' || error == "Password should have length of 8."
                          ? 'border-red-500 focus:ring-red-500 animate-shake border-opacity-70 border-2' 
                          : 'border-black border-opacity-20 focus:ring-black focus:ring-opacity-30'}
                    `}
                    placeholder="Password"
                    required
                    autoComplete="off"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <LockIcon className="text-black text-opacity-70" />
                  </div>

                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeIcon className="h-5 w-5 text-black text-opacity-70 hover:text-opacity-100 transition-colors" />
                    ) : (
                      <EyeOffIcon className="h-5 w-5 text-black text-opacity-70 hover:text-opacity-100 transition-colors" />
                    )}
                  </button>
                </div>

                {error === 'Incorrect Password' || error === "Password should have length of 8." && (
                  <div className="mb-2 ml-2 flex items-center text-red-500 animate-fadeIn">
                    <span className="text-sm">{error}</span>
                  </div>
                )}

              </div>

              {isLogin && (
                <div className="flex items-center justify-between mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-indigo-600 bg-white bg-opacity-10 border border-black border-opacity-20 rounded focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-black text-opacity-80 text-sm">
                      Remember me
                    </span>
                  </label>

                  <a 
                    href="/auth/forgotPass"
                    className={`text-sm transition-colors ${
                      error === 'Incorrect Password' 
                        ? 'text-red-700 animate-pulse glow-red underline' 
                        : 'text-black text-opacity-80 hover:text-opacity-100'
                    }`}
                  >
                    Forgot password?
                  </a>

                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-linear-to-r from-pink-500 to-purple-600 rounded-lg text-black font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.01] transition-all duration-300 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <SpinnerIcon className="animate-spin mr-2" />
                    {isLogin ? 'Logging in...' : 'Creating account...'}
                  </>
                ) : (
                  isLogin ? 'Login' : 'Sign Up'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-black text-opacity-80">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setEmail('');
                    setPassword('');
                    setName('');
                  }}
                  className="text-black font-medium hover:underline focus:outline-none"
                >
                  {isLogin ? 'Sign up' : 'Login'}
                </button>
              </p>
            </div>

            {!isLogin && (
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-black border-opacity-20 mb-10"/>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-2 bg-transparent text-[16px] text-black text-opacity-80">
                      Or continue with
                    </span>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Component for social login buttons
/*
const SocialButton: React.FC<IconProps> = ({ icon }) => {
  return (
    <button 
      type="button"
      className="w-full flex items-center justify-center py-2 px-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-colors"
    >
      {icon}
    </button>
  )
}*/

// Icon components with TypeScript props
interface IconProps {
  className?: string
}

const MailIcon: React.FC<IconProps> = ({ className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-5 w-5 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  )
}

const LockIcon: React.FC<IconProps> = ({ className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-5 w-5 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  )
}

const UserIcon: React.FC<IconProps> = ({ className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-5 w-5 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  )
}

const SpinnerIcon: React.FC<IconProps> = ({ className = '' }) => {
  return (
    <svg
      className={`h-5 w-5 animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}


const EyeIcon: React.FC<IconProps> = ({ className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-5 w-5 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  )
}

const EyeOffIcon: React.FC<IconProps> = ({ className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-5 w-5 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
      />
    </svg>
  )
}
