import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="py-20 bg-[#111118]" aria-labelledby="contact-cta-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 flex items-center justify-center mx-auto mb-6">
          <Mail size={28} className="text-[#8B5CF6]" />
        </div>

        <p className="font-mono text-[#8B5CF6] text-xs uppercase tracking-widest mb-3">
          <span aria-hidden="true">{"// "}</span>get in touch
        </p>
        <h2
          id="contact-cta-heading"
          className="text-3xl sm:text-4xl font-bold text-[#F5F3FF] mb-4"
        >
          Let&apos;s Connect
        </h2>
        <p className="text-[#A1A1AA] text-lg leading-relaxed mb-8 max-w-xl mx-auto">
          Have a question, an opportunity, or just want to say hello?
          I&apos;m open to conversations about projects, collaborations, or development topics.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-3 bg-[#8B5CF6] text-white rounded-lg hover:bg-[#7C3AED] transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111118]"
        >
          Contact Me
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

