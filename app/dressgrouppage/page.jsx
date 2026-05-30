import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";
import Dressgrouppage from "@/components/Dressgrouppage";

export default function Dressgroup() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <Loader2
            className="animate-spin text-[#7047A8]"
            size={48}
          />
        </div>
      }
    >
      <Dressgrouppage />
    </Suspense>
  );
}