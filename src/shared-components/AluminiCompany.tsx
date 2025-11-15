const alumniCompanies = [
    { label: "Google", value: "google" },
    { label: "Zoho", value: "zoho" },
    { label: "Freshworks", value: "freshworks" },
    { label: "Swiggy", value: "swiggy" },
    { label: "Byju's", value: "byjus" },
    { label: "Flipkart", value: "flipkart" }
]

export default function AluminiCompany() {
  return (
    <section className="border-t border-white/10 bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-center text-white/60 text-sm">Alumni work at</p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 opacity-80">
            {
            alumniCompanies.map((alumniCompany) => (
              <div key={alumniCompany.value} className="h-12 rounded-xl border border-white/10 bg-neutral-900 grid place-items-center text-white/70 text-sm">
                {alumniCompany.label}
              </div>
            ))
            }
          </div>
        </div>
      </section>
  )
}