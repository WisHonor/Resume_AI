"use client";
import { Brain, CheckCircle, Upload, Zap, Target, Award, TrendingUp, FileCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MainButton from "./components/main-button";
import { Navbar } from "./components/navbar";



 const Page =  () => {

  const steps = [
    { icon: Upload, title: "Upload Resume", description: "Drop your PDF or Word file" },
    { icon: Brain, title: "AI Analysis", description: "Our AI reviews your content" },
    { icon: CheckCircle, title: "Get Results", description: "Receive detailed feedback" },
  ];

  const features = [
    {
      icon: Brain,
      title: "Smart AI Analysis",
      description: "Advanced algorithms analyze your resume for content quality, structure, and keyword optimization",
      badge: "AI Powered",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      title: "ATS Optimization",
      description: "Ensure your resume passes Applicant Tracking Systems with our specialized formatting checks",
      badge: "ATS Ready",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: TrendingUp,
      title: "Performance Insights",
      description: "Get detailed analytics on your resume's strengths and areas for improvement",
      badge: "Analytics",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Zap,
      title: "Instant Feedback",
      description: "Receive real-time suggestions and improvements as you upload your resume",
      badge: "Real-time",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Award,
      title: "Industry Standards",
      description: "Compare your resume against industry benchmarks and best practices",
      badge: "Certified",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: FileCheck,
      title: "Format Optimization",
      description: "Perfect formatting, layout, and design recommendations for maximum impact",
      badge: "Premium",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <div className="font-sans text-center px-6 min-h-screen flex flex-col items-center">
      <Navbar/>
      {/* Hero Section */}
      <motion.section
        className="mt-40 mb-16 max-w-3xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Gradient Headline */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
          ResuMate
        </h1>
        {/* Dynamic Paragraph */}
        <motion.p
          className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
            Transform your career
          </span>{" "}
          with intelligent resume optimization powered by{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-400">
            advanced AI
          </span>
        </motion.p>
        
      </motion.section>

      {/* Steps Section */}
      <motion.section
        className="flex flex-col md:flex-row justify-center items-center gap-10 mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3 } },
        }}
      >
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={index}
              className="flex flex-col items-center max-w-xs"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              {/* Circle Icon with hover pop-out */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center justify-center w-20 h-20 rounded-full bg-pink-100 text-pink-500 mb-4 shadow-lg"
              >
                <Icon size={32} />
              </motion.div>
              {/* Step Title with gradient */}
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                {step.title}
              </h3>
              {/* Step Description */}
              <p>{step.description}</p>
            </motion.div>
          );
        })}
      </motion.section>

      <MainButton />

      {/* Features Section */}
      <motion.section
        className="mt-32 mb-20 max-w-7xl w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Features Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <Sparkles className="w-6 h-6 text-pink-500" />
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
              Powerful Features
            </h2>
            <Sparkles className="w-6 h-6 text-purple-500" />
          </motion.div>
          <motion.p
            className="text-lg  max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Everything you need to create a standout resume that gets you noticed
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { 
                staggerChildren: 0.2,
                delayChildren: 0.1
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.9 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { 
                      type: "spring", 
                      stiffness: 100,
                      damping: 15
                    }
                  }
                }}
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="group"
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                  {/* Animated background gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    initial={false}
                  />
                  
                  <CardHeader className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <motion.div
                        whileHover={{ 
                          scale: 1.2,
                          rotate: 5
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                      
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 200,
                          delay: index * 0.1 + 0.3
                        }}
                      >
                        <Badge 
                          variant="secondary" 
                          className={`bg-gradient-to-r ${feature.color} text-white border-0 shadow-md`}
                        >
                          {feature.badge}
                        </Badge>
                      </motion.div>
                    </div>
                    
                    <CardTitle className="text-xl font-semibold text-left group-hover:text-gray-800 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="relative">
                    <CardDescription className="text-left text-gray-600 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                    
                    {/* Hover effect indicator */}
                    <motion.div
                      className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.color}`} />
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          
          
          
                  {/* Continuous Testimonials Section */}
      <motion.section
        className="mt-32 mb-20 w-full overflow-hidden relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
            What People Are Saying
          </h2>
          <p className="text-lg  mt-2">
            Continuous feedback from professionals using{" "}
            <span className="text-pink-500 font-semibold">ResuMate</span>.
          </p>
        </div>

        {/* Continuous Scrolling Row */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              repeat: Infinity,
              duration: 25, // speed of scrolling
              ease: "linear"
            }}
          >
            {[
              {
                name: "Sarah L.",
                role: "Marketing Manager",
                text: "ResuMate gave my resume the polish it needed. Within 2 weeks I landed 3 interviews!"
              },
              {
                name: "David R.",
                role: "Software Engineer",
                text: "The ATS optimization tips were a game changer. My application finally got noticed."
              },
              {
                name: "Emily W.",
                role: "UX Designer",
                text: "I loved the instant feedback. It felt like having a career coach guiding me step by step."
              },
              {
                name: "James K.",
                role: "Data Analyst",
                text: "The performance insights were incredibly accurate. Helped me target my strengths!"
              },
              {
                name: "Olivia M.",
                role: "HR Specialist",
                text: "Finally, a tool that understands ATS. Saved me hours of frustration!"
              }
            ]
              // duplicate array so it loops seamlessly
              .concat([
                {
                  name: "Sarah L.",
                  role: "Marketing Manager",
                  text: "ResuMate gave my resume the polish it needed. Within 2 weeks I landed 3 interviews!"
                },
                {
                  name: "David R.",
                  role: "Software Engineer",
                  text: "The ATS optimization tips were a game changer. My application finally got noticed."
                },
                {
                  name: "Emily W.",
                  role: "UX Designer",
                  text: "I loved the instant feedback. It felt like having a career coach guiding me step by step."
                },
                {
                  name: "James K.",
                  role: "Data Analyst",
                  text: "The performance insights were incredibly accurate. Helped me target my strengths!"
                },
                {
                  name: "Olivia M.",
                  role: "HR Specialist",
                  text: "Finally, a tool that understands ATS. Saved me hours of frustration!"
                }
              ])
              .map((testimonial, index) => (
                <Card
                  key={index}
                  className="min-w-[320px] max-w-sm bg-white/80 backdrop-blur-sm border-0 shadow-lg p-6 flex-shrink-0"
                >
                  <CardContent>
                    <p className="text-gray-700 italic mb-4">
                      “{testimonial.text}”
                    </p>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </motion.div>
        </div>
      </motion.section>
      

          </motion.div>
          <MainButton/>
        
      </motion.section>
    </div>
  );
}

export default Page;