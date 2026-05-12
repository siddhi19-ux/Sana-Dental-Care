import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Shield, Clock, HeartHandshake, Phone, Mail, MapPin, ChevronRight, Menu, X, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Invalid email address"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time preference is required"),
  service: z.string().min(1, "Service selection is required"),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function Home() {
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      date: "",
      time: "",
      service: "",
      notes: "",
    },
  });

  const onSubmit = (data: BookingFormValues) => {
    const WHATSAPP_NUMBER = "1234567890";
    const message = `New Appointment Request:
Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Date: ${data.date}
Time: ${data.time}
Service: ${data.service}
Notes: ${data.notes || "None"}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");

    toast({
      title: "Redirecting to WhatsApp to confirm your appointment!",
      description: "We look forward to seeing you.",
    });

    form.reset();
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2" onClick={() => scrollTo("hero")} role="button" data-testid="link-home">
            <Shield className="w-8 h-8 text-primary" />
            <span className="font-serif font-semibold text-2xl text-foreground">
              Sana Dental
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo("services")} className="text-sm font-medium hover:text-primary transition-colors" data-testid="link-services">Services</button>
            <button onClick={() => scrollTo("about")} className="text-sm font-medium hover:text-primary transition-colors" data-testid="link-about">About</button>
            <button onClick={() => scrollTo("testimonials")} className="text-sm font-medium hover:text-primary transition-colors" data-testid="link-testimonials">Testimonials</button>
            <Button onClick={() => scrollTo("book")} className="rounded-full px-6" data-testid="button-nav-book">
              Book Appointment
            </Button>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-border p-4 flex flex-col gap-4 shadow-lg">
            <button onClick={() => scrollTo("services")} className="text-left font-medium py-2">Services</button>
            <button onClick={() => scrollTo("about")} className="text-left font-medium py-2">About</button>
            <button onClick={() => scrollTo("testimonials")} className="text-left font-medium py-2">Testimonials</button>
            <Button onClick={() => scrollTo("book")} className="w-full mt-2" data-testid="button-mobile-book">
              Book Appointment
            </Button>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section
          id="hero"
          className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden"
        >
          <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="space-y-6"
              >
                <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Accepting New Patients
                </motion.div>
                <motion.h1
                  variants={fadeIn}
                  className="font-serif text-5xl md:text-7xl font-semibold leading-tight text-foreground"
                >
                  Pristine Care.<br />
                  <span className="text-primary italic">Perfect Smiles.</span>
                </motion.h1>
                <motion.p
                  variants={fadeIn}
                  className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
                >
                  Experience modern dentistry in a serene, meticulously designed environment. We blend advanced technology with compassionate care.
                </motion.p>
                <motion.div variants={fadeIn} className="flex flex-wrap gap-4 pt-4">
                  <Button
                    size="lg"
                    className="rounded-full text-base px-8 h-14"
                    onClick={() => scrollTo("book")}
                    data-testid="button-hero-book"
                  >
                    Book Your Visit
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full text-base px-8 h-14 bg-white/50 backdrop-blur-sm"
                    onClick={() => scrollTo("services")}
                    data-testid="button-hero-services"
                  >
                    Explore Services
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">Comprehensive Care</h2>
              <p className="text-muted-foreground">Tailored treatments designed to maintain, restore, and enhance your smile with precision.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "General Dentistry", desc: "Routine checkups, cleanings, and preventive care to keep your smile healthy." },
                { title: "Cosmetic Dentistry", desc: "Veneers, bonding, and smile makeovers for a flawless appearance." },
                { title: "Teeth Whitening", desc: "Professional brightening treatments for a radiant, confident smile." },
                { title: "Dental Implants", desc: "Permanent, natural-looking replacements for missing teeth." },
                { title: "Orthodontics", desc: "Clear aligners and modern braces for perfect alignment." },
                { title: "Emergency Care", desc: "Prompt, compassionate treatment for urgent dental needs." },
              ].map((service, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }
                  }}
                  className="p-8 rounded-2xl bg-secondary/30 hover:bg-secondary/60 transition-colors border border-border group"
                >
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="relative"
              >
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative z-10">
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1000&auto=format&fit=crop"
                    alt="Dr. Sana"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent rounded-full -z-0" />
                <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-primary/20 rounded-full -z-0" />
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="space-y-6"
              >
                <motion.h2 variants={fadeIn} className="font-serif text-3xl md:text-5xl font-semibold">
                  Meet Dr. Sana
                </motion.h2>
                <motion.div variants={fadeIn} className="text-xl text-primary font-medium">
                  DDS, Lead Practitioner
                </motion.div>
                <motion.div variants={fadeIn} className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                  <p>
                    With over a decade of experience in advanced dentistry, Dr. Sana founded this clinic with a singular vision: to elevate the standard of dental care in a setting that feels restful and refined.
                  </p>
                  <p>
                    Her philosophy centers on minimally invasive techniques, precision artistry, and deep empathy for every patient. 
                  </p>
                </motion.div>
                
                <motion.div variants={fadeIn} className="pt-6 grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-serif font-bold text-foreground mb-1">10+</div>
                    <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-3xl font-serif font-bold text-foreground mb-1">5k+</div>
                    <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Happy Patients</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 bg-card border-y border-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: Shield, title: "Expert Team", desc: "Highly trained professionals dedicated to excellence." },
                { icon: Star, title: "Modern Tech", desc: "State-of-the-art equipment for precise diagnostics." },
                { icon: HeartHandshake, title: "Calm Space", desc: "A pristine environment designed to reduce anxiety." },
                { icon: Clock, title: "Flexible Hours", desc: "Convenient scheduling to fit your busy lifestyle." }
              ].map((item, i) => (
                <div key={i} className="text-center p-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-secondary flex items-center justify-center mb-6">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">Patient Stories</h2>
              <p className="text-muted-foreground">Hear from those who have trusted us with their smiles.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Sarah M.", quote: "The most calming dental experience I've ever had. Dr. Sana is incredibly gentle and the clinic feels like a spa." },
                { name: "James L.", quote: "Professional, pristine, and precise. I had complex implant work done and the results are flawless." },
                { name: "Elena R.", quote: "I used to dread the dentist, but this clinic completely changed my perspective. Exceptional care from start to finish." }
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.2 } }
                  }}
                  className="bg-card p-8 rounded-2xl border border-border relative"
                >
                  <Star className="w-8 h-8 text-accent-foreground mb-6 opacity-50" />
                  <p className="text-lg mb-6 leading-relaxed">"{testimonial.quote}"</p>
                  <div className="font-semibold">{testimonial.name}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Form */}
        <section id="book" className="py-24 bg-secondary/30 relative">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-border">
              
              <div className="md:w-1/3 bg-primary text-primary-foreground p-10 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-semibold mb-4">Request Appointment</h3>
                  <p className="opacity-90 mb-8 leading-relaxed">
                    Fill out the form and our team will contact you via WhatsApp to confirm your ideal time.
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 shrink-0 opacity-80" />
                    <div>
                      <div className="font-semibold mb-1">Location</div>
                      <div className="opacity-80 text-sm">123 Wellness Ave, Suite 200<br/>San Francisco, CA</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 shrink-0 opacity-80" />
                    <div>
                      <div className="font-semibold mb-1">Phone</div>
                      <div className="opacity-80 text-sm">(555) 123-4567</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3 p-10">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Jane Doe" {...field} data-testid="input-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="(555) 000-0000" {...field} data-testid="input-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="jane@example.com" {...field} data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} data-testid="input-date" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Time</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-time">
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Morning 9am–12pm">Morning 9am–12pm</SelectItem>
                                <SelectItem value="Afternoon 12pm–4pm">Afternoon 12pm–4pm</SelectItem>
                                <SelectItem value="Evening 4pm–7pm">Evening 4pm–7pm</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Needed</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-service">
                                <SelectValue placeholder="Select service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="General Checkup">General Checkup</SelectItem>
                              <SelectItem value="Teeth Cleaning">Teeth Cleaning</SelectItem>
                              <SelectItem value="Teeth Whitening">Teeth Whitening</SelectItem>
                              <SelectItem value="Orthodontics">Orthodontics</SelectItem>
                              <SelectItem value="Dental Implants">Dental Implants</SelectItem>
                              <SelectItem value="Cosmetic Dentistry">Cosmetic Dentistry</SelectItem>
                              <SelectItem value="Emergency">Emergency</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Notes (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any specific concerns or questions?" 
                              className="resize-none" 
                              {...field} 
                              data-testid="input-notes"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" size="lg" className="w-full rounded-xl h-12 text-base" data-testid="button-submit-booking">
                      Request Appointment <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Shield className="w-8 h-8 text-primary" />
                <span className="font-serif font-semibold text-2xl">
                  Sana Dental
                </span>
              </div>
              <p className="text-white/60 max-w-sm mb-6 leading-relaxed">
                Elevating the standard of dental care in a pristine, calming environment. Your smile is our signature.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-4 text-white/60">
                <li><button onClick={() => scrollTo("services")} className="hover:text-white transition-colors">Services</button></li>
                <li><button onClick={() => scrollTo("about")} className="hover:text-white transition-colors">About Dr. Sana</button></li>
                <li><button onClick={() => scrollTo("testimonials")} className="hover:text-white transition-colors">Patient Stories</button></li>
                <li><button onClick={() => scrollTo("book")} className="hover:text-white transition-colors">Book Appointment</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-6">Contact</h4>
              <ul className="space-y-4 text-white/60">
                <li>123 Wellness Ave, Suite 200</li>
                <li>San Francisco, CA 94103</li>
                <li>(555) 123-4567</li>
                <li>hello@sanadental.com</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
            <div>© {new Date().getFullYear()} Sana Dental Clinic. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
