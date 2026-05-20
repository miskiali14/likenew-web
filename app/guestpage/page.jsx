import React from "react";
import Navbar from "@/components/Navbar";
import Guestpage from "@/components/Guestpage"; // Waxaan u beddelnay magaca halkan si uusan isku khaldin

export default function BedServicesPage() { // Magaca bogga halkan ayaan ku beddelnay
  return (
    <main>
      <Navbar />
      {/* Halkan ayaad ku dhex wacaysaa qaybtii component-ka ahaa */}
      <Guestpage />
    </main>
  );
}