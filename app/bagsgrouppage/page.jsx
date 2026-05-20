"use client";

import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Bagsgrouppage from "@/components/Bagsgrouppage";

// Next.js wuxuu rabaa Page inuu noqdo default export
export default function Page() {
  return (
    <main>
      <Navbar />
      {/* Maadaama Bagsgrouppage uu isticmaalo useSearchParams, 
          waa inaan ku dhex raddnaa Suspense halkaan haddii uusan 
          ka dhex jirin component-ka gudaha */}
      <Suspense fallback={<div>Loading...</div>}>
        <Bagsgrouppage />
      </Suspense>
    </main>
  );
}