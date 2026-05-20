import React from "react";
// Soo dhoweynta qaybta AppShowcase
import Navbar from "@/components/Navbar";
import Traditionalpage from "@/components/Traditionalpage"; 

export default function traditional() {
  return (
    <main>
      {/* Halkan ayaad ku dhex wacaysaa qaybtii */}
       <Navbar />
      <Traditionalpage />
      
      {/* Waxaad ku dari kartaa waxyaabo kale haddii aad rabto */}
    </main>
  );
}