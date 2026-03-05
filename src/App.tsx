import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SalonProvider } from "./components/providers/SalonProvider";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Packages from "./pages/Packages";
import Gallery from "./pages/Gallery";
import Team from "./pages/Team";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client= { queryClient } >
  <TooltipProvider>
  <Toaster />
  < Sonner />
  <BrowserRouter>
  <SalonProvider>
  <Routes>
  <Route element={<Layout />}>
    <Route path="/" element = {< Index />} />
      < Route path = "/services" element = {< Services />} />
        < Route path = "/packages" element = {< Packages />} />
          < Route path = "/gallery" element = {< Gallery />} />
            < Route path = "/team" element = {< Team />} />
              < Route path = "/booking" element = {< Booking />} />
                < Route path = "/contact" element = {< Contact />} />
                  </Route>
                  < Route path = "*" element = {< NotFound />} />
                    </Routes>
                    </SalonProvider>
                    </BrowserRouter>
                    </TooltipProvider>
                    </QueryClientProvider>
);

export default App;
