'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Truck, Wrench, FileSearch, Map, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Navbar } from '@/components/navbar';
import { QuoteModal } from '@/components/quote-modal';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100
    }
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100
    }
  },
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Clear form
      setFormData({
        name: '',
        email: '',
        message: '',
      });

      alert('Message sent successfully!');
    } catch (error) {
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const truckImages = [
    {
      image: "https://peaotjteojnkrzkmtote.supabase.co/storage/v1/object/public/full-blast//2.png",
      title: "ISUZU TRAVIZ",
      dimensions: "15 L x 5.5 W x 6.4 H ft",
    },
    {
      image: "https://peaotjteojnkrzkmtote.supabase.co/storage/v1/object/public/full-blast//3.png",
      title: "MITSUBISHI L200",
      dimensions: "16.4 L x 5.8 W x 6.6 H ft",
    },
    {
      image: "https://peaotjteojnkrzkmtote.supabase.co/storage/v1/object/public/full-blast//4.png",
      title: "NISSAN AD MAX",
      dimensions: "14 L x 5.5 W x 5.9 H ft",
    },
    {
      image: "https://peaotjteojnkrzkmtote.supabase.co/storage/v1/object/public/full-blast//5.png",
      title: "ISUZU 10-WHEELER DROPSIDE",
      dimensions: "30 L x 8 W x Open H ft",
    },
    {
      image: "https://peaotjteojnkrzkmtote.supabase.co/storage/v1/object/public/full-blast//6.png",
      title: "ISUZU FORWARD BOOM TRUCK",
      dimensions: "16.6 L x 6.8 W x Open H ft",
    },
    {
      image: "https://peaotjteojnkrzkmtote.supabase.co/storage/v1/object/public/full-blast//7.png",
      title: "UNIC CRANE BOOM TRUCK",
      dimensions: "12 L x Open H ft",
    },
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="relative h-screen">
        <div className="absolute inset-0">
          {/* Fallback background image */}
          <img
            src="https://peaotjteojnkrzkmtote.supabase.co/storage/v1/object/public/full-blast//9.jpg"
            alt="Hero background"
            className="absolute w-full h-full object-cover"
          />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover"
          >
            <source
              src="https://player.vimeo.com/progressive_redirect/playback/492834625/rendition/1080p/file.mp4?loc=external&signature=2b958800f5b38f6b7e5f2c4fb6d3b3c8c4f39f2c5e0c3c4f4b4b4f4b4b4f4b"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mt-12 sm:mt-6 md:mt-8"
          >
            <h1 className="text-5xl sm:text-3xl md:text-7xl font-bold text-white mb-6">
              Full Blast Transport Services
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 mb-8">
              Your Reliable Partner in Transportation and Logistics
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50"
              onClick={() => setQuoteModalOpen(true)}
            >
              Get a Quote
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Our Company Section */}
      <AnimatedSection>
        <section id="company" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Company</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Full Blast Transport Services is a provider of specialized transportation and
                handling solutions for heavy equipment and materials. With a commitment to
                operational efficiency and safety, we offer a comprehensive suite of services
                designed to meet the diverse needs of our clients in various industries.
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection>
        <section id="services" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
              <p className="text-lg text-gray-600">
                Comprehensive transportation solutions tailored to your needs
              </p>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: <Truck className="h-10 w-10" />,
                  title: 'Heavy Equipment Transport',
                  description: 'Our reliable transport solutions ensure the safe and timely delivery of heavy machinery to any job site. We excel in point-to-point transport, minimizing downtime and enhancing project productivity.',
                },
                {
                  icon: <Wrench className="h-10 w-10" />,
                  title: 'Professional Overhauling Services',
                  description: 'Our skilled technicians are dedicated to maintaining the performance and longevity of your equipment. We provide expert overhauling services to keep your machinery operating at peak efficiency.',
                },
                {
                  icon: <FileSearch className="h-10 w-10" />,
                  title: 'Consultation and Risk Management',
                  description: 'We offer expert advice on logistics planning and risk assessment for transportation projects as well as tailored solutions to mitigate risks associated with transportation and handling.',
                },
                {
                  icon: <Map className="h-10 w-10" />,
                  title: 'Project Cargo Handling',
                  description: 'Expertise in managing complex logistics for project-based transport needs, we give customized solutions for large-scale projects, including planning and execution.',
                },
                {
                  icon: <Activity className="h-10 w-10" />,
                  title: 'Real-Time Tracking',
                  description: 'We implement tracking systems to monitor shipments in real time. Transparent reporting to keep clients informed throughout the transportation process.',
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  variants={fadeInScale}
                  className="h-full"
                >
                  <Card className="text-center h-full">
                    <CardContent className="pt-6">
                      <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-lg text-blue-600 mb-4">
                        {service.icon}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Vehicles Section */}
      <AnimatedSection>
        <section id="vehicles" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Fleet</h2>
              <p className="text-lg text-gray-600">
                Modern and well-maintained vehicles for all your transportation needs
              </p>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {truckImages.map((vehicle, index) => (
                <motion.div
                  key={index}
                  variants={fadeInScale}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="overflow-hidden">
                    <div className="h-64 relative">
                      <img
                        src={vehicle.image}
                        alt={vehicle.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{vehicle.title}</h3>
                      <p className="text-blue-600 font-medium">Dimensions: {vehicle.dimensions}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* About Section */}
      <AnimatedSection>
        <section id="about" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideInLeft}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  About Full Blast Transport
                </h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-lg text-gray-600 mb-6"
                >
                  At Full Blast Transport, we are committed to delivering reliable, safe, and efficient transportation solutions tailored to the unique needs of our clients. With a strong focus on innovation, sustainability, and operational excellence, we go beyond just moving goods—we drive progress in the transportation industry. By integrating cutting-edge logistics, expert handling, and exceptional customer service, we aim to set new standards and shape the future of transportation
                </motion.p>
                <motion.ul
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  {[
                    'Reliability & Safety',
                    'Innovative Logistics',
                    'Sustainability Focus',
                    'Customer-Centric Approach',
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      variants={fadeInScale}
                      className="flex items-center text-gray-600"
                    >
                      <span className="h-2 w-2 bg-blue-600 rounded-full mr-3" />
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideInRight}
                className="relative h-[400px]"
              >
                <motion.img
                  src="https://peaotjteojnkrzkmtote.supabase.co/storage/v1/object/public/full-blast//9.jpg"
                  alt="Transport fleet"
                  className="rounded-lg object-cover w-full h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection>
        <section id="contact" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-lg text-gray-600">
                Get in touch with our team for inquiries and quotes
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-xl font-semibold mb-4">Our Location</h3>
                <p className="text-gray-600 mb-6">
                  Block 51 Lot 8 Phase 2, Pinagsama Village<br />
                  C.P. Garcia Highway<br />
                  Taguig City, Philippines 1630
                </p>
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-2 text-gray-600">
                  <p>Phone: (02) 8514-7240</p>
                  <p>Email: keishaorpilla@pristine-energy.com.ph </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Truck className="h-8 w-8 text-blue-400 mr-2" />
                <span className="text-xl font-bold">Full Blast Transport</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner in transportation and logistics services.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['Home', 'Services', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Full Blast Transport Services. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <QuoteModal open={quoteModalOpen} onOpenChange={setQuoteModalOpen} />
    </main>
  );
}