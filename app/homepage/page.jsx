import React from "react";
import Navbar from "@/components/Navbar";
import Homepage from "@/components/Homepage"; // Waxaan u beddelnay magaca halkan si uusan isku khaldin

export default function PAGE() { // Magaca bogga halkan ayaan ku beddelnay
  return (
    <main>
      <Navbar />
      {/* Halkan ayaad ku dhex wacaysaa qaybtii component-ka ahaa */}
      <Homepage />
    </main>
  );
}