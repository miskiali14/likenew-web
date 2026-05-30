import React from "react";
import Navbar from "@/components/Navbar";
import Bathpage from "@/components/Bathpage"; // Waxaan u beddelnay magaca halkan si uusan isku khaldin

export default function BedServicesPage() { // Magaca bogga halkan ayaan ku beddelnay
  return (
    <main>
      <Navbar />
      {/* Halkan ayaad ku dhex wacaysaa qaybtii component-ka ahaa */}
      <Bathpage/>
    </main>
  );
}