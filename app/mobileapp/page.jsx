import React from "react";
// Soo dhoweynta qaybta AppShowcase
import Navbar from "@/components/Navbar";
import AppShowcase from "@/components/AppShowcase"; 

export default function MobileAppPage() {
  return (
    <main>
      {/* Halkan ayaad ku dhex wacaysaa qaybtii */}
       <Navbar />
      <AppShowcase />
      
      {/* Waxaad ku dari kartaa waxyaabo kale haddii aad rabto */}
    </main>
  );
}