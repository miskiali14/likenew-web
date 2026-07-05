import { NextResponse } from 'next/server';

// 1. Kani wuxuu xallinayaa haddii Telegram ama browser uu qaab GET ah u soo garaaco endpoint-ka
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
    
    // Hubi haddii farriintu tahay mid sax ah oo qoraal leh
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
        const cleanCloudResponse = await fetch(`https://api.cleancloudapp.com/api/v1/order/status?api_token=${cleanCloudToken}&order_id=${orderIdOnly}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        const cleanCloudData = await cleanCloudResponse.json();
        console.log("📊 CleanCloud API Raw Response:", JSON.stringify(cleanCloudData));

        if (cleanCloudData && cleanCloudData.status) {
          let statusSomali = "";
          const status = cleanCloudData.status.toLowerCase();

          if (status === 'in progress' || status === 'cleaning') {
            statusSomali = "Haddaa la dhaqayaa (In Progress) 🧼";
          } else if (status === 'ready' || status === 'completed') {
            statusSomali = "Waa diyaar, waad soo doonan kartaa! 🛍️✨";
          } else if (status === 'collected') {
            statusSomali = "Waa la qaatay (Horay ayaad u qaadatay) ✅";
          } else {
            statusSomali = cleanCloudData.status; 
          }

          replyText = `📊 **Xogta Dalabkaaga LikeNew**\n\n🆔 Nambarka: LN-${orderIdOnly}\n📌 Heerka uu joogo: ${statusSomali}\n\nWaad ku mahadsan tahay doorashada LikeNew! 🧺`;
        } else {
          replyText = `❌ Ma helin wax dalab ah oo leh nambarka: LN-${orderIdOnly}. Fadlan hubi nambarka rasiidhkaaga.`;
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