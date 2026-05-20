import React from "react";
// Soo dhoweynta qaybta AppShowcase
import Navbar from "@/components/Navbar";
import Bagsgrouppage from "@/components/Bagsgrouppage"; 

export default function Bagsgroup() {
  return (
    <main>
      {/* Halkan ayaad ku dhex wacaysaa qaybtii */}
       <Navbar />
      <Bagsgrouppage />
      
      {/* Waxaad ku dari kartaa waxyaabo kale haddii aad rabto */}
    </main>
  );
}