export function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b783e]">{eyebrow}</p>
      <h2 className="mt-3 max-w-full text-[1.85rem] font-semibold leading-tight text-[#191816] sm:text-4xl md:text-5xl">{title}</h2>
      {text ? <p className="mt-5 text-base leading-8 text-[#6b6760] md:text-lg">{text}</p> : null}
    </div>
  );
}
