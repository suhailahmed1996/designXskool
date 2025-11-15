import { useMemo, useState, type FormEvent } from "react"
import fintechImg from "./assets/fintech.jpg"
import healthcareImg from "./assets/healthcare.jpg"
import ecommerceImg from "./assets/ecommerce.jpg"
import { addUser } from "./api"
import { AxiosResponse } from "axios"

import logoImg from "./assets/designx-dark.svg"
import InstagramEmbed from "./shared-components/InstagramEmbered"
import ChatGptIcon from "./shared-components/ChatGpt"
import instagramImg from "./assets/instagram.png"
import TeamCard from "./shared-components/TeamCard"
import AluminiCompany from "./shared-components/AluminiCompany"
import introVideo from "./assets/video/introduction.mp4"

// const VITE_API_URL = import.meta.env.VITE_API_URL

// ===== Notes =====
// • Drop this file into any Vite/Next/CRA project with Tailwind.
// • Replace placeholders (LOGO, images, links) with your assets.
// • Uses only Tailwind + minimal React (no external deps) so it’s copy‑paste friendly.
// • Sections are conversion‑focused: Problem → Outcome → Proof → Offer → Risk Reversal → Urgency → CTA.
// • Form posts to a dummy endpoint; hook it to HubSpot/Forms/Razorpay/etc.

const applicationTools = [
  { label: "Figma", value: "figma" },
  { label: "Affinity", value: "affinity" },
  { label: "Notion", value: "notion" },
  { label: "Balsamiq", value: "balsamiq" },
  { label: "ChatGPT", value: "chatgpt" },
  { label: "Preplexity", value: "preplexity" },
  { label: "Lovable", value: "lovable" }
]

export default function DesignXStudentLanding() {
  const [pricePlan, setPricePlan] = useState<"full" | "emi">("full")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    { type: "success" | "error"; message: string } | null
  >(null)
  const eventDate = useMemo(() => {
    // Next cohort info (IST)
    return {
      start: "Nov 27, 2025",
      end: "Feb 19, 2026",
      duration: "12 weeks",
      weekdayBatch: "Mon–Fri, 7–9 PM IST",
      weekendBatch: "Sat–Sun, 10 AM–12 PM IST",
    }
  }, [])

  const price = useMemo(() => {
    return pricePlan === "full"
      ? { label: "Full Pay", amount: "₹24,999", sub: "Save ₹5,000 vs EMI" }
      : { label: "EMI (3 x)", amount: "₹9,999 / mo", sub: "Instant approval on UPI cards" }
  }, [pricePlan])

  const navigateTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -100 // Scroll to 100px from top
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      console.log(y)
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    const payload = {
      fullName: String(formData.get("fullName") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      whatsAppNumber: String(formData.get("whatsAppNumber") || "").trim(),
      dayType: String(formData.get("dayType") || "").trim(),
      summary: String(formData.get("summary") || "").trim(),
    }

    if (!payload.fullName || !payload.email || !payload.whatsAppNumber || !payload.dayType) {
      setSubmitStatus({ type: "error", message: "Please fill in all required fields." })
      return
    }

    try {
      setIsSubmitting(true)
      setSubmitStatus(null)

      // const response1 = await fetch(VITE_API_URL+"students", {
      //   method: "GET",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // })
      
      // const response = await fetch(VITE_API_URL+"students", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // })

      const response: AxiosResponse<any> = await addUser(payload)

      response.status === 201 ? setSubmitStatus({ type: "success", message: "Thanks! We'll reach out in 24 hours." }) : setSubmitStatus({ type: "error", message: "Something went wrong. Please try again." })

      form.reset()
      const dayTypeSelect = form.elements.namedItem("dayType") as HTMLSelectElement | null
      if (dayTypeSelect) {
        dayTypeSelect.value = "weekdays"
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong. Please try again."
      setSubmitStatus({ type: "error", message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70 bg-neutral-950/90 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImg} className="w-30" />
            {/* <span className="font-semibold tracking-tight">DesignX Skool</span> */}
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <a href="#outcomes" className="hover:text-white">Outcomes</a>
            <a href="#curriculum" className="hover:text-white">Curriculum</a>
            <a href="#projects" className="hover:text-white">Projects</a>
            <a href="#mentors" className="hover:text-white">Mentors</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
          </nav>
          <a href="#apply" className="inline-flex items-center gap-2 rounded-2xl bg-white text-neutral-900 px-4 py-2 text-sm font-semibold hover:bg-white/90 a-link">Apply now</a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(111,76,255,0.25),rgba(0,0,0,0))] h-[300px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 mb-4">
                <span>12‑Week Job‑Ready Program</span>
                <span className="text-white/40">•</span>
                <span>Live + Project‑based</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                Become a job‑ready <span className="bg-clip-text text-transparent bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-amber-400">UX/UI Designer</span> in 12 weeks.
              </h1>
              <p className="mt-5 text-lg text-white/80 max-w-xl">
                Learn by building real products with mentors from top studios. Graduate with a standout portfolio, interview prep, and referrals.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a onClick={() => navigateTo('apply')} className="inline-flex justify-center items-center rounded-2xl bg-white text-neutral-900 px-6 py-3 font-semibold shadow-lg shadow-white/10 hover:bg-white/90 a-link">Start application</a>
                <a onClick={() => navigateTo('apply')} className="inline-flex justify-center items-center rounded-2xl border border-white/20 px-6 py-3 font-semibold hover:bg-white/10 a-link">Download syllabus</a>
              </div>
              <p className="mt-4 text-xs text-white/60">Cohort starts {eventDate.start} • Limited seats • No design background required</p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/10 p-1">
                <div className="h-full w-full rounded-3xl bg-neutral-950/40 overflow-hidden relative">
                  <video
                    src={introVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-[85%] aspect-ratio[4/2]"
                    // className="w-full h-[85%] object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-neutral-950/80 to-transparent">
                    <div className="flex justify-center flex-wrap gap-2">
                      {
                        applicationTools.map(({ label, value }) => (
                          <span key={value} className="rounded-xl bg-white/5 px-3 py-1 text-xs border border-white/10">{label}</span>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 hidden sm:block">
                <div className="rounded-2xl bg-white text-neutral-900 px-4 py-2 text-sm font-semibold shadow">Placement support included</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <AluminiCompany />

      {/* OUTCOMES */}
      <section id="outcomes" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl md:text-4xl font-bold">What you’ll walk away with</h2>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: "Portfolio that gets interviews", d: "3 end‑to‑end case studies with research, flows, UI, testing, and impact metrics." },
              { t: "Real‑world experience", d: "Client‑style briefs, deadlines, stakeholder reviews, and iteration cycles." },
              { t: "Mentor feedback", d: "Weekly critique from senior designers and hiring managers." },
              { t: "Placement support", d: "Resume/LinkedIn overhaul, mock interviews, referrals to partner companies." },
              { t: "Figma mastery", d: "Design systems, components, auto‑layout, prototyping, variables." },
              { t: "Confidence", d: "A clear story of your skills and a plan to keep growing post‑program." },
            ].map(({ t, d }) => (
              <div key={t} className="rounded-2xl border border-white/10 bg-neutral-900 p-6">
                <h3 className="font-semibold text-lg">{t}</h3>
                <p className="mt-2 text-white/70 text-sm leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section id="curriculum" className="border-t border-white/10 bg-neutral-950/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-bold">Curriculum (12 weeks)</h2>
            <a href="#syllabus" className="text-sm text-white/80 hover:text-white">View detailed syllabus →</a>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              {
                w: "Weeks 1–4",
                t: "Foundations & Research",
                pts: ["UX process & strategy", "Problem framing", "User research basics", "Personas & JTBD", "User flows"],
              },
              {
                w: "Weeks 5–8",
                t: "UI Systems & Prototyping",
                pts: ["Wireframes", "Design systems", "Components & tokens", "Motion & micro‑interactions", "Interactive prototypes"],
              },
              {
                w: "Weeks 9–12",
                t: "Projects, Testing & Handoff",
                pts: ["Usability testing", "Iteration & metrics", "Dev handoff", "Portfolio writing", "Interview prep"],
              },
            ].map(({ w, t, pts }) => (
              <div key={t} className="rounded-2xl border border-white/10 bg-neutral-900 p-6">
                <p className="text-xs text-white/60">{w}</p>
                <h3 className="mt-1 font-semibold text-lg">{t}</h3>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  {pts.map((p) => (
                    <li key={p} className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/70"></span>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl md:text-4xl font-bold">Show‑stopping portfolio projects</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { t: "Fintech Mobile App", d: "Onboarding, money transfer, analytics, accessibility checks.",
                img: fintechImg  
               },
              { t: "Healthcare Web App", d: "Appointments, records, HIPAA‑aware flows, empty‑state strategy.",
                img: healthcareImg
               },
              { t: "E‑commerce Revamp", d: "Product discovery, filters, cart‑abandon strategies, conversions.",
                img: ecommerceImg
               },
            ].map(({ t, d, img }) => (
              <div key={t} className="rounded-2xl border border-white/10 bg-neutral-900 p-6">
                <div className="aspect-[16/10] rounded-xl bg-neutral-800 border border-white/5" >
                <img src={img} className="w-full h-full [object-fit:cover]" />
                </div>
                <h3 className="mt-4 font-semibold">{t}</h3>
                <p className="text-sm text-white/70 mt-1">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENTORS */}
      <TeamCard />

      {/* OFFER + PRICING */}
      <section id="pricing" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Simple, student‑friendly pricing</h2>
              <p className="mt-3 text-white/80 max-w-prose">Pay once and save, or split into easy EMIs. Scholarships available for women returning to work and need‑based applicants.</p>

              <div className="mt-6 inline-flex rounded-xl border border-white/15 p-1 gap-2">
                <button onClick={() => setPricePlan("full")} className={`px-4 py-2 rounded-lg text-sm bg-white ${pricePlan === "full" ? "[color:#747bff]" : "text-neutral-900"}`}>Full Pay</button>
                <button onClick={() => setPricePlan("emi")} className={`px-4 py-2 rounded-lg text-sm bg-white ${pricePlan === "emi" ? "[color:#747bff]" : "text-neutral-900"}`}>EMI</button>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-neutral-900 p-6">
                <p className="text-sm text-white/60">{price.label}</p>
                <p className="text-4xl font-extrabold mt-1">{price.amount}</p>
                <p className="text-xs text-white/60 mt-1">{price.sub}</p>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  {["Live classes", "Mentor feedback", "3 capstone projects", "Syllabus PDF", "Placement support", "Lifetime community"].map((b) => (
                    <li key={b} className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/70"></span>{b}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                  <p className="text-sm font-semibold text-emerald-300">Scholarships</p>
                  <p className="text-xs text-white/70 mt-1">Up to 30% off for eligible students. Limited.</p>
                </div>
                <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4">
                  <p className="text-sm font-semibold text-cyan-300">No‑Cost EMI</p>
                  <p className="text-xs text-white/70 mt-1">Split into 3 payments. Instant approval on most cards.</p>
                </div>
              </div>
            </div>

            {/* Application Card */}
            <div id="apply" className="rounded-3xl border border-white/10 bg-neutral-900 p-6 lg:p-8">
              <h3 className="text-2xl font-bold">Apply for the {eventDate.start} cohort</h3>
              <p className="text-white/70 mt-1 text-sm">{eventDate.duration} • {eventDate.weekdayBatch} • {eventDate.weekendBatch}</p>
              <form className="mt-6 grid grid-cols-1 gap-4" onSubmit={handleSubmit} noValidate>
                <input
                  required
                  name="fullName"
                  placeholder="Full name"
                  autoComplete="name"
                  className="w-full rounded-xl bg-neutral-800 border border-white/10 px-4 py-3 text-sm placeholder:text-white/40 outline-none focus:ring-2 focus:ring-white/20"
                />
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  className="w-full rounded-xl bg-neutral-800 border border-white/10 px-4 py-3 text-sm placeholder:text-white/40 outline-none focus:ring-2 focus:ring-white/20"
                />
                <input
                  required
                  name="whatsAppNumber"
                  placeholder="Phone (WhatsApp)"
                  autoComplete="tel"
                  className="w-full rounded-xl bg-neutral-800 border border-white/10 px-4 py-3 text-sm placeholder:text-white/40 outline-none focus:ring-2 focus:ring-white/20"
                />
                <select
                  required
                  name="dayType"
                  defaultValue="weekdays"
                  className="w-full rounded-xl bg-neutral-800 border border-white/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-white/20"
                >
                  <option value="weekdays">Weekday (7–9 PM IST)</option>
                  <option value="weekend">Weekend (10 AM–12 PM IST)</option>
                </select>
                <textarea
                  name="summary"
                  placeholder="Tell us why you’re joining (optional)"
                  className="w-full rounded-xl bg-neutral-800 border border-white/10 px-4 py-3 text-sm h-28 outline-none focus:ring-2 focus:ring-white/20"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-2xl bg-white px-6 py-3 font-semibold hover:bg-white/90 [color:#747bff] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Submitting..." : "Submit application"}
                </button>
                {submitStatus && (
                  <p
                    role="status"
                    aria-live="polite"
                    className={`text-xs ${
                      submitStatus.type === "success"
                        ? "text-emerald-300"
                        : "text-rose-300"
                    }`}
                  >
                    {submitStatus.message}
                  </p>
                )}
                <p className="text-xs text-white/60">By submitting, you agree to our terms and consent to be contacted via WhatsApp/Email.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* BONUSES & RISK REVERSAL */}
      <section className="border-t border-white/10 bg-neutral-950/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: "Bonus: AI Toolkit", d: "Prompts, templates, and workflows to speed up research, ideation, and UI delivery." },
              { t: "Bonus: Hiring Pack", d: "Resume, LinkedIn, and portfolio templates that recruiters love." },
              { t: "7‑Day Satisfaction Guarantee", d: "If it’s not a fit within the first week, get a full refund. No questions asked." },
            ].map(({ t, d }) => (
              <div key={t} className="rounded-2xl border border-white/10 bg-neutral-900 p-6">
                <h3 className="font-semibold">{t}</h3>
                <p className="text-sm text-white/70 mt-2">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl md:text-4xl font-bold">What our grads say</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {[
              { q: "I got 4 interviews in 2 weeks—my portfolio finally told a clear story.", n: "Aarthi R.", r: "UX Designer @ SaaS startup" },
              { q: "The mentor feedback was brutal in the best way. I learned how to think like a product designer.", n: "Pranav S.", r: "Product Designer @ Fintech" },
            ].map(({ q, n, r }) => (
              <div key={n} className="rounded-2xl border border-white/10 bg-neutral-900 p-6">
                <p className="text-white/90 leading-relaxed">“{q}”</p>
                <p className="text-sm text-white/80 mt-4 font-semibold">{n}</p>
                <p className="text-xs text-white/60">{r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-white/10 bg-neutral-950/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl md:text-4xl font-bold">Frequently asked questions</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {[
              { q: "Do I need prior design experience?", a: "No. We start from fundamentals and ramp fast with hands‑on projects." },
              { q: "Is it live or recorded?", a: "Live, with recordings available for revision." },
              { q: "Will you help with placements?", a: "Yes—resume/LinkedIn, mock interviews, and referrals to hiring partners." },
              { q: "What software do I need?", a: "Figma (free), Notion (free), optional Framer. We provide setup guides." },
              { q: "Refund policy?", a: "100% refund within 7 days if you’re not satisfied." },
              { q: "Can I get a certificate?", a: "Yes, on successful completion of capstones and reviews." },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-white/10 bg-neutral-900 p-6">
                <h3 className="font-semibold">{q}</h3>
                <p className="text-sm text-white/70 mt-2">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold">Your design career starts now</h2>
          <p className="mt-3 text-white/80">Join the {eventDate.start} cohort and build a portfolio that opens doors.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <a onClick={(e) => navigateTo('apply')} className="inline-flex justify-center items-center rounded-2xl bg-white text-neutral-900 px-6 py-3 font-semibold hover:bg-white/90 a-link">Apply now</a>
            <a onClick={(e) => navigateTo('apply')} className="inline-flex justify-center items-center rounded-2xl border border-white/20 px-6 py-3 font-semibold hover:bg-white/10 a-link">Get syllabus</a>
          </div>
        </div>
      </section>

      <div className="flex justify-center items-center my-10">
        <div className="relative">
        <InstagramEmbed />
        <div className="chatgpt-icon absolute bottom-[5px] right-[-50px]">
          <ChatGptIcon />
        </div>
        </div>
      </div>

      
      <footer className="border-t border-white/10 bg-neutral-950/80" id="footer">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-white/70">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-amber-400" />
                <span className="font-semibold tracking-tight text-white">DesignX Skool</span>
              </div>
              <p className="mt-3 text-white/60">Chennai • Bengaluru • Hyderabad (Online & Offline)</p>
            </div>
            <div>
              <p className="text-white font-semibold">Program</p>
              <ul className="mt-2 space-y-1">
                <li><a href="#outcomes" className="hover:text-white">Outcomes</a></li>
                <li><a href="#curriculum" className="hover:text-white">Curriculum</a></li>
                <li><a href="#projects" className="hover:text-white">Projects</a></li>
                <li><a href="#mentors" className="hover:text-white">Mentors</a></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold">Support</p>
              <ul className="mt-2 space-y-1">
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                <li><a href="#faq" className="hover:text-white">FAQ</a></li>
                <li><a href="#apply" className="hover:text-white">Apply</a></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold">Contact</p>
              <p className="mt-2 text-white/70">hi@designxskool.com</p>
              <p className="text-white/70 mb-[5px]">+91‑90030‑20030</p>
              <a href="https://www.instagram.com/designx_india/" className="flex items-center">
                <img src={instagramImg} alt="Instagram" className="w-[20px] h-[20px]" />
                <span className="ml-[5px]">Instagram</span>
              </a>
            </div>
          </div>
          <p className="mt-8 text-xs text-white/50">© {new Date().getFullYear()} DesignX Skool. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
