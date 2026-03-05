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

        if (salonSlug && salons[salonSlug]) {
            setConfig(salons[salonSlug]);

            // Update primary color if specified in config
            if (salons[salonSlug].primaryColor) {
                document.documentElement.style.setProperty('--primary', salons[salonSlug].primaryColor);
                // Also update the gradient/other color variables if necessary
                // For simplicity, we just update --primary for now
            }
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
