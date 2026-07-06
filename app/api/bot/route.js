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

    console.log("🔑 Checking Environment Variables:", { 
      hasBotToken: !!token, 
      hasCleanCloudToken: !!cleanCloudToken 
    });

    let replyText = "";

    // Marka uu macmiilku qoro /start
    if (userMessage === '/start') {
      replyText = "Ku soo dhowaw LikeNew Tracker! 🧺\n\nSi aad u ogaato heerka dalabkaaga, fadlan qor nambarka dalabka oo ku bilaabma LN (Tusaale: LN-1024).";
    } 
    // Marka uu macmiilku raadinayo dalab (Tusaale: LN-1024)
    else if (userMessage.toUpperCase().startsWith('LN-')) {
      const orderIdOnly = userMessage.toUpperCase().replace('LN-', ''); 

      try {
        console.log(`📡 Fetching status from CleanCloud for Order ID: ${orderIdOnly}`);
        
        if (!cleanCloudToken) {
          console.error("❌ ERROR: NEXT_PUBLIC_CLEANCLOUD_TOKEN is missing in Vercel Settings!");
        }

        // --- DESIGN CHANGE: CleanCloud uses POST and application/json ---
        const cleanCloudResponse = await fetch(`https://cleancloudapp.com/api/getOrders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            api_token: cleanCloudToken,
            orderID: orderIdOnly
            // Kaliya waxaan u diraynaa si uu noogu soo celiyo xogta dalabka isaga oo aan waxba laga beddelin
          })
        });

        const cleanCloudData = await cleanCloudResponse.json();
        console.log("📊 CleanCloud API Raw Response:", JSON.stringify(cleanCloudData));

        // Hubi haddii uu nidaamku leeyahay Success == "True" ama uu jiro status nambar ah
        if (cleanCloudData && (cleanCloudData.Success === "True" || 'status' in cleanCloudData)) {
          let statusSomali = "";
          
          // CleanCloud Status Codes siday dukumentiga ku qoran tahay:
          // 0 = Cleaning, 1 = Ready, 2 = Completed, 4 = Awaiting Pickup, 5 = Detailing
          const statusValue = String(cleanCloudData.status);

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
          const errMsg = cleanCloudData?.Error || "Dalabka lama helin ama nambarku waa khaldan yahay.";
          console.log(`⚠️ CleanCloud responded with error. Info: ${JSON.stringify(cleanCloudData)}`);
          replyText = `❌ Ma helin wax dalab ah oo leh nambarka: LN-${orderIdOnly}.\n*(Faahfaahin: ${errMsg})*.\n\nFadlan hubi nambarka rasiidhkaaga.`;
        }
      } catch (apiError) {
        console.error("❌ CleanCloud API Fetch Error:", apiError);
        replyText = "⚠️ Rafeeto! Cilad ayaa ku timid la xiriirka nidaamka CleanCloud. Fadlan dib isku day yar ka dib.";
      }
    } 
    else {
      replyText = "Fadlan soo geli nambar dalab oo sax ah oo ku bilaabma LN- (Tusaale: LN-1024).";
    }

    // Dib u dirista farriinta Telegram-ka macmiilka
    console.log(`✉️ Sending message back to Telegram Chat ID: ${chatId}`);
    const telegramRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: replyText,
        parse_mode: "Markdown"
      }),
    });
    
    console.log("🚀 Telegram Bot Response Status:", telegramRes.status);

    return NextResponse.json({ status: 'success' });

  } catch (error) {
    console.error("💥 Critical Webhook Crash Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}