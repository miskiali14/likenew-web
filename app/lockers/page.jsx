import React from "react";
// Soo dhoweynta qaybta AppShowcase
import Navbar from "@/components/Navbar";
import Lockers from "@/components/Lockers"; 

export default function MobileAppPage() {
  return (
    <main>
      {/* Halkan ayaad ku dhex wacaysaa qaybtii */}
       <Navbar />
      <Lockers />
      
      {/* Waxaad ku dari kartaa waxyaabo kale haddii aad rabto */}
    </main>
  );
}