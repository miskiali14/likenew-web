import React from "react";
// Soo dhoweynta qaybta AppShowcase
import Navbar from "@/components/Navbar";
import Underwearpage from "@/components/Underwearpage"; 

export default function traditional() {
  return (
    <main>
      {/* Halkan ayaad ku dhex wacaysaa qaybtii */}
       <Navbar />
      <Underwearpage />
      
      {/* Waxaad ku dari kartaa waxyaabo kale haddii aad rabto */}
    </main>
  );
}