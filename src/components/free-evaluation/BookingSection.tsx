import { booking, site } from "@/lib/content";
import { BookingEmbed } from "./BookingEmbed";
import { SectionReveal } from "./SectionReveal";

export function BookingSection() {
  return (
    <section
      id={booking.id}
      className="section-pad scroll-mt-24 bg-near-black text-white"
      aria-labelledby="booking-heading"
    >
      <div className="container-page">
        <SectionReveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-parisi">BOOK YOUR EVALUATION</p>
          <h2
            id="booking-heading"
            className="mt-3 text-3xl font-bold md:text-4xl lg:text-[2.75rem]"
          >
            {booking.headline}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/70 md:text-lg">
            {booking.copy}
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium text-white/75">
            {booking.proofs.map((proof) => (
              <li key={proof} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-parisi" aria-hidden />
                {proof}
              </li>
            ))}
          </ul>
        </SectionReveal>

        <SectionReveal delayMs={80} className="mx-auto mt-10 max-w-[34rem] md:mt-12">
          <div className="booking-card relative overflow-hidden border border-white/10 bg-[#111111]">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-parisi" aria-hidden />
            <div className="border-b border-white/8 px-5 py-5 md:px-7 md:py-6">
              <p className="font-heading text-lg font-bold tracking-tight text-white md:text-xl">
                {booking.offerTitle}
              </p>
              <p className="mt-1 text-sm text-white/55">{site.name}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/45">
                {site.addressLine1}, {site.addressLine2}
              </p>
            </div>
            <div className="booking-form-shell px-4 py-5 md:px-6 md:py-6">
              <BookingEmbed />
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
