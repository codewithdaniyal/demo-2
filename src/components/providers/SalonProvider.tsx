import React, { createContext, useContext, useEffect, useState } from "react";
import { SalonConfig, salons } from "@/lib/salon-data";

interface SalonContextType {
    config: SalonConfig;
}

const SalonContext = createContext<SalonContextType | undefined>(undefined);

export const SalonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [config, setConfig] = useState<SalonConfig>(salons["glamour-studio"]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const salonSlug = params.get("salon");

        // 1. Start with base config from slug or default
        let baseConfig = salons["glamour-studio"];
        if (salonSlug && salons[salonSlug]) {
            baseConfig = salons[salonSlug];
        }

        // 2. Allow specific overrides via URL parameters
        const nameOverride = params.get("name");
        const taglineOverride = params.get("tagline");
        const colorOverride = params.get("color");

        const finalConfig = {
            ...baseConfig,
            name: nameOverride || baseConfig.name,
            tagline: taglineOverride || baseConfig.tagline,
            primaryColor: colorOverride ? `#${colorOverride.replace('#', '')}` : baseConfig.primaryColor,
        };

        setConfig(finalConfig);

        // 3. Update document title dynamically
        document.title = `${finalConfig.name} — ${finalConfig.tagline}`;

        // 4. Update primary color CSS variable
        if (finalConfig.primaryColor) {
            document.documentElement.style.setProperty('--primary', finalConfig.primaryColor);
        }
    }, []);

    return (
        <SalonContext.Provider value= {{ config }
}>
    { children }
    </SalonContext.Provider>
  );
};

export const useSalon = () => {
    const context = useContext(SalonContext);
    if (context === undefined) {
        throw new Error("useSalon must be used within a SalonProvider");
    }
    return context.config;
};
