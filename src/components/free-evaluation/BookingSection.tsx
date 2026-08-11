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

        <SectionReveal delayMs={80} className="mx-auto mt-10 max-w-2xl md:mt-12">
          <div className="overflow-hidden border border-white/10 bg-white text-ink shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <div className="border-b border-line bg-surface px-5 py-5 md:px-7">
              <p className="font-heading text-lg font-bold text-near-black md:text-xl">
                {booking.offerTitle}
              </p>
              <p className="mt-1 text-sm font-medium text-muted">{site.name}</p>
              <p className="mt-2 text-sm text-muted">
                {site.addressLine1}
                <br />
                {site.addressLine2}
              </p>
            </div>
            <div className="px-3 py-4 md:px-5 md:py-5">
              <BookingEmbed />
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
