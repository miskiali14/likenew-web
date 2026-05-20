import { NextResponse } from "next/server";

export async function POST() {
  try {
    // 1. Marka aad joogto Backend (Route Handler), marnaba ha isticmaalin NEXT_PUBLIC_
    // Isticmaal process.env.CLEANCLOUD_TOKEN (kaas oo ku kaydsan .env.local si ammaan ah)
    const apiToken = process.env.CLEANCLOUD_TOKEN || process.env.NEXT_PUBLIC_CLEANCLOUD_TOKEN;

    if (!apiToken) {
      console.error("Cilad: CLEANCLOUD_TOKEN ma jiro dhexda .env");
      return NextResponse.json({ error: "API Token is missing" }, { status: 500 });
    }

    const response = await fetch("https://cleancloudapp.com/api/getProducts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_token: apiToken,
      }),
    });

    // Hubi haddii CleanCloud uu cilad soo celiyay ka hor intaanan loo beddelin JSON
    if (!response.ok) {
      console.error(`CleanCloud Server Error: ${response.status}`);
      return NextResponse.json({ error: "CleanCloud API server error" }, { status: response.status });
    }

    const data = await response.json();
    const rawProducts = data.Products || data.products || [];

    // Halkan waxaan si toos ah u qaadanaynaa 'item.price' maadaama uu yahay halka saxda ah
    const formattedProducts = rawProducts.map((item) => {
      if (!item) return item;

      // Xogta rasmiga ah ee CleanCloud-kaaga: 'item.price' ayaa ah qiimaha tooska ah
      const cleanCloudPrice = item.price || "0.00";

      return {
        ...item,
        price: String(cleanCloudPrice).trim(),
        // Maadaama CleanCloud-kaaga hal qiimo uun soo celinayo boggan, 
        // dhammaan adeegyada kale waxaan siineynas qiimahaas rasmiga ah si uusan eber u noqon
        cleanPressPrice: String(cleanCloudPrice).trim(),
        // Sidoo kale haddii CleanCloud uu qaab kale u soo celiyo, halkan bay badbaado u tahay
        standard: String(cleanCloudPrice).trim(), 
        pressOnlyPrice: String(cleanCloudPrice).trim(),
        washFoldPrice: String(cleanCloudPrice).trim(),
        bedBathPrice: String(cleanCloudPrice).trim()
      };
    });

    return NextResponse.json({ Products: formattedProducts });

  } catch (error) {
    console.error("CleanCloud Connect Error:", error);
    return NextResponse.json({ error: "Failed to fetch exact prices" }, { status: 500 });
  }
}