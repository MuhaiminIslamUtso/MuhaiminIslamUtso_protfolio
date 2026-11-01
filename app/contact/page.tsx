"use client";

import { useState } from "react";
import MainLayout from "@/app/components/layout/MainLayout";
import { profile } from "@/app/data/profile";
import { Mail, Send, CheckCircle2, Info, ExternalLink } from "lucide-react";
import { Github, Linkedin, Facebook } from "@/app/components/common/Icons";

interface FormState {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState<"idle" | "ready-to-send" | "error">("idle");
  const [mailtoUrl, setMailtoUrl] = useState<string>("");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    } else if (formData.fullName.trim().length > 70) {
      newErrors.fullName = "Name cannot exceed 70 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g. name@domain.com)";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    } else if (formData.subject.trim().length > 100) {
      newErrors.subject = "Subject cannot exceed 100 characters";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    } else if (formData.message.trim().length > 2000) {
      newErrors.message = "Message cannot exceed 2000 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) {
      setSubmittedStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmittedStatus("idle");

    // Construct mailto link cleanly
    const recipient = profile.email || "muhaiminislamutso@gmail.com";
    const subjectEncoded = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject.trim()}`);
    const bodyContent = `Hello Utso,\n\n${formData.message.trim()}\n\n---\nSender: ${formData.fullName.trim()}\nEmail: ${formData.email.trim()}`;
    const bodyEncoded = encodeURIComponent(bodyContent);
    const generatedMailto = `mailto:${recipient}?subject=${subjectEncoded}&body=${bodyEncoded}`;

    setMailtoUrl(generatedMailto);

    // Simulate brief validation/processing then prepare mail client dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedStatus("ready-to-send");
      window.location.href = generatedMailto;
    }, 600);
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="font-mono text-[#8B5CF6] text-xs uppercase tracking-widest mb-3">
            <span aria-hidden="true">{"// "}</span>contact
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#F5F3FF] mb-4">
            Get in Touch
          </h1>
          <p className="text-[#A1A1AA] text-lg leading-relaxed max-w-2xl">
            Whether you want to discuss academic software projects, explore opportunities,
            or talk code, feel free to send a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Information & Channels */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#171720] border border-[#292536] rounded-xl p-6">
              <h2 className="text-base font-semibold text-[#F5F3FF] mb-4">
                Connect Directly
              </h2>
              <ul className="space-y-4">
                <li>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-[#A1A1AA] hover:text-[#F5F3FF] transition-colors p-2 rounded-lg hover:bg-[#111118]"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6]">
                      <Github size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-[#A1A1AA]">GitHub Profile</p>
                      <p className="font-mono text-xs text-[#F5F3FF]">@MuhaiminIslamUtso</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-[#A1A1AA] hover:text-[#F5F3FF] transition-colors p-2 rounded-lg hover:bg-[#111118]"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6]">
                      <Linkedin size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-[#A1A1AA]">LinkedIn</p>
                      <p className="font-mono text-xs text-[#F5F3FF]">in/muhaiminislamutso</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href={profile.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-[#A1A1AA] hover:text-[#F5F3FF] transition-colors p-2 rounded-lg hover:bg-[#111118]"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6]">
                      <Facebook size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-[#A1A1AA]">Facebook</p>
                      <p className="font-mono text-xs text-[#F5F3FF]">muhaimin.islam.raian</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-3 text-sm text-[#A1A1AA] hover:text-[#F5F3FF] transition-colors p-2 rounded-lg hover:bg-[#111118]"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6]">
                      <Mail size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-[#A1A1AA]">Direct Email</p>
                      <p className="font-mono text-xs text-[#F5F3FF] break-all">{profile.email}</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-[#8B5CF6]/5 border border-[#8B5CF6]/20 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <Info size={18} className="text-[#8B5CF6] mt-0.5 flex-shrink-0" />
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  Submitting this form prepares a formatted email that launches in your device&apos;s
                  default mail application, ensuring direct, secure delivery.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-[#171720] border border-[#292536] rounded-xl p-6 sm:p-8 space-y-6"
            >
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-2"
                >
                  Full Name <span className="text-[#8B5CF6]">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="e.g. Jane Doe"
                  className={`w-full bg-[#111118] border rounded-lg px-4 py-2.5 text-sm text-[#F5F3FF] placeholder-[#A1A1AA]/50 focus:outline-none transition-colors ${
                    errors.fullName
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#292536] focus:border-[#8B5CF6]"
                  }`}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                />
                {errors.fullName && (
                  <p id="fullName-error" className="mt-1.5 text-xs text-red-400">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-2"
                >
                  Email Address <span className="text-[#8B5CF6]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="e.g. jane@example.com"
                  className={`w-full bg-[#111118] border rounded-lg px-4 py-2.5 text-sm text-[#F5F3FF] placeholder-[#A1A1AA]/50 focus:outline-none transition-colors ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#292536] focus:border-[#8B5CF6]"
                  }`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-xs text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-2"
                >
                  Subject <span className="text-[#8B5CF6]">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="e.g. Project inquiry / Hello"
                  className={`w-full bg-[#111118] border rounded-lg px-4 py-2.5 text-sm text-[#F5F3FF] placeholder-[#A1A1AA]/50 focus:outline-none transition-colors ${
                    errors.subject
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#292536] focus:border-[#8B5CF6]"
                  }`}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                />
                {errors.subject && (
                  <p id="subject-error" className="mt-1.5 text-xs text-red-400">
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-2"
                >
                  Message <span className="text-[#8B5CF6]">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Write your message here..."
                  className={`w-full bg-[#111118] border rounded-lg px-4 py-2.5 text-sm text-[#F5F3FF] placeholder-[#A1A1AA]/50 focus:outline-none transition-colors resize-y ${
                    errors.message
                      ? "border-red-500 focus:border-red-500"
                      : "border-[#292536] focus:border-[#8B5CF6]"
                  }`}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 text-xs text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Status Notice */}
              {submittedStatus === "ready-to-send" && (
                <div className="p-4 bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#22C55E]">
                    <CheckCircle2 size={16} />
                    Ready to send via email client
                  </div>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">
                    Your email client should have opened with the pre-filled message.
                    If it didn&apos;t open automatically, click the direct link below:
                  </p>
                  {mailtoUrl && (
                    <a
                      href={mailtoUrl}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A78BFA] hover:text-[#C4B5FD] underline"
                    >
                      <ExternalLink size={12} />
                      Click here to open email client directly
                    </a>
                  )}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] active:bg-[#6D28D9] transition-all font-medium text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Preparing Email...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
