import { motion } from "framer-motion";
import { ShieldCheck, Clock, Users, Award } from "lucide-react";

export default function WhyChooseUs() {
  const reasons = [
    {
      title: "Expert Doctors",
      description: "Our team consists of highly qualified and experienced medical professionals.",
      icon: Users,
    },
    {
      title: "24/7 Availability",
      description: "We are always here for you, providing round-the-clock medical support.",
      icon: Clock,
    },
    {
      title: "Quality Care",
      description: "We are committed to delivering the highest standards of healthcare.",
      icon: Award,
    },
    {
      title: "Trusted & Secure",
      description: "Your health and privacy are our top priorities, ensuring a safe environment.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col items-center bg-teal-50/50 rounded-3xl my-12">
      <div className="mb-4 inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white text-teal-700 text-sm font-medium border border-teal-100 shadow-sm">
        Why Choose Us
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 md:mb-16 text-center">
        Your Health is in Good Hands
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
        {reasons.map((reason, index) => (
          <motion.div
            key={reason.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
          >
            <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 mb-6">
              <reason.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">{reason.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{reason.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
