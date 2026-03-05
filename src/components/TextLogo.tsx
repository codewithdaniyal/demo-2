import { useSalon } from "@/hooks/useSalon";

const TextLogo = ({ className = "" }: { className?: string }) => {
  const salonConfig = useSalon();

  return (
    <div className= {`flex flex-col items-center ${className}`
}>
  <span className="font-display text-2xl md:text-3xl font-bold tracking-wide text-gradient-gold" >
    { salonConfig.name }
    </span>
    < span className = "font-tagline text-xs md:text-sm tracking-[0.3em] uppercase text-muted-foreground" >
      { salonConfig.tagline }
      </span>
      </div>
  );
};

export default TextLogo;
