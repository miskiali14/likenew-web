import { NextResponse } from 'next/server';

// 1. Kani wuxuu xallinayaa haddii Telegram ama browser uu GET ku soo garaaco
export async function GET() {
  return NextResponse.json({ 
    status: 'online', 
    message: 'LikeNew Telegram Webhook is running successfully!' 
  });
}

// 2. Kani waa kan qaabilaya farriimaha dhabta ah ee ka imaanaya Telegram bots
export async function POST(request) {
  try {
    const body = await request.json();
    console.log("👉 Telegram Webhook Body Received:", JSON.stringify(body));
    
    if (!body || !body.message || !body.message.text) {
      console.log("⚠️ Ignored: Message body or text is missing.");
      return NextResponse.json({ status: 'ignored' });
    }

    const chatId = body.message.chat.id;
    const userMessage = body.message.text.trim();
    
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const cleanCloudToken = process.env.NEXT_PUBLIC_CLEANCLOUD_TOKEN;

    let replyText = "";

    // Marka uu macmiilku qoro /start
    if (userMessage === '/start') {
      replyText = "Ku soo dhowaw LikeNew Tracker! 🧺\n\nSi aad u ogaato heerka dalabkaaga, fadlan qor nambarka dalabka oo ku bilaabma LN (Tusaale: LN-8822).";
    } 
    // Marka uu macmiilku raadinayo dalab (Tusaale: LN-8822)
    else if (userMessage.toUpperCase().startsWith('LN-')) {
      const orderIdOnly = userMessage.toUpperCase().replace('LN-', ''); 

      try {
        console.log(`📡 Fetching from CleanCloud via getOrders for ID: ${orderIdOnly}`);

        const cleanCloudResponse = await fetch(`https://cleancloudapp.com/api/getOrders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            api_token: cleanCloudToken,
            orderID: orderIdOnly // Ama halkan u dhiib parameters-ka kale ee getOrders u baahan yahay siday taariikhda tahay
          })
        });

        const cleanCloudData = await cleanCloudResponse.json();
        console.log("📊 CleanCloud API Raw Response:", JSON.stringify(cleanCloudData));

        // --- DESIGN HAGAAJIN: Maadaama uu getOrders yahay, xogtu waxay ku jirtaa Array ---
        let targetOrder = null;

        if (cleanCloudData) {
          if (Array.isArray(cleanCloudData)) {
            targetOrder = cleanCloudData[0]; // Haddii response-ku uu toos Array u yahay
          } else if (cleanCloudData.orders && Array.isArray(cleanCloudData.orders)) {
            targetOrder = cleanCloudData.orders[0]; // Haddii uu ku jiro shayga .orders
          } else if (cleanCloudData.Success === "True" && cleanCloudData.status !== undefined) {
            targetOrder = cleanCloudData; // Haddii uu hal shay oo toos ah soo celiyey
          }
        }

        // Haddii aan helay dalabkii nidaamka ku jiray iyo status-kiisa
        if (targetOrder && targetOrder.status !== undefined && targetOrder.status !== null) {
          let statusSomali = "";
          const statusValue = String(targetOrder.status);

          // Tarjumidda nambarada status-ka CleanCloud
          if (statusValue === '0' || statusValue === '5') {
            statusSomali = "Haddaa la dhaqayaa / Sifayn (In Progress) 🧼";
          } else if (statusValue === '4') {
            statusSomali = "Wuxuu sugayaa in la soo qaado (Awaiting Pickup) 🚚";
          } else if (statusValue === '1') {
            statusSomali = "Waa diyaar, waad soo doonan kartaa! 🛍️✨";
          } else if (statusValue === '2') {
            statusSomali = "Waa la qaatay (Completed) ✅";
          } else {
            statusSomali = `Gacanta ayaa lagu hayaa (Status: ${statusValue})`; 
          }

          replyText = `📊 **Xogta Dalabkaaga LikeNew**\n\n🆔 Nambarka: LN-${orderIdOnly}\n📌 Heerka uu joogo: ${statusSomali}\n\nWaad ku mahadsan tahay doorashada LikeNew! 🧺`;
        } else {
          // Haddii dalabka laga waayo liiska soo noqday
          console.log("❌ Order details not found in array structures.");
          replyText = `❌ Ma helin wax dalab oo firfircoon oo leh nambarka: LN-${orderIdOnly}.\n\nFadlan hubi nambarka rasiidhkaaga dhabta ah.`;
        }
      } catch (apiError) {
        console.error("❌ CleanCloud API Fetch Error:", apiError);
        replyText = "⚠️ Rafeeto! Cilad ayaa ku timid la xiriirka nidaamka CleanCloud. Fadlan dib isku day yar ka dib.";
      }
    } 
    else {
      replyText = "Fadlan soo geli nambar dalab oo sax ah oo ku bilaabma LN- (Tusaale: LN-8822).";
    }

    // Dib u dirista farriinta Telegram-ka macmiilka
    const telegramRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: replyText,
        parse_mode: "Markdown"
      }),
    });

    return NextResponse.json({ status: 'success' });

  } catch (error) {
    console.error("💥 Critical Webhook Crash Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}