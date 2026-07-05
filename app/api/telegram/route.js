import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Telegram Webhook Body:", JSON.stringify(body)); // Kani wuxuu Vercel Logs ku tusayaa farriinta soo gashay
    
    if (!body.message || !body.message.text) {
      return NextResponse.json({ status: 'ignored' });
    }

    const chatId = body.message.chat.id;
    const userMessage = body.message.text.trim();
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const cleanCloudToken = process.env.NEXT_PUBLIC_CLEANCLOUD_TOKEN;

    console.log("Tokens loaded:", { hasBotToken: !!token, hasCcToken: !!cleanCloudToken });

    let replyText = "";

    if (userMessage === '/start') {
      replyText = "Ku soo dhowaw LikeNew Tracker! 🧺\n\nSi aad u ogaato heerka dalabkaaga, fadlan qor nambarka dalabka oo ku bilaabma LN (Tusaale: LN-1024).";
    } 
    else if (userMessage.toUpperCase().startsWith('LN-')) {
      const orderIdOnly = userMessage.toUpperCase().replace('LN-', ''); 

      try {
        const cleanCloudResponse = await fetch(`https://api.cleancloudapp.com/api/v1/order/status?api_token=${cleanCloudToken}&order_id=${orderIdOnly}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        const cleanCloudData = await cleanCloudResponse.json();
        console.log("CleanCloud Response:", JSON.stringify(cleanCloudData));

        if (cleanCloudData && cleanCloudData.status) {
          let statusSomali = "";
          const status = cleanCloudData.status.toLowerCase();

          if (status === 'in progress' || status === 'cleaning') {
            statusSomali = "Haddaa la dhaqayaa (In Progress) 🧼";
          } else if (status === 'ready' || status === 'completed') {
            statusSomali = "Waa diyaar, waad soo doonan kartaa! 🛍️✨";
          } else if (status === 'collected') {
            statusSomali = "Waa la qaatay (Adiga ayaa horay u qaatay) ✅";
          } else {
            statusSomali = cleanCloudData.status; 
          }

          replyText = `📊 **Xogta Dalabkaaga LikeNew**\n\n🆔 Nambarka: LN-${orderIdOnly}\n📌 Heerka uu joogo: ${statusSomali}\n\nWaad ku mahadsan tahay doorashada LikeNew! 🧺`;
        } else {
          replyText = `❌ Ma helin wax dalab ah oo leh nambarka: LN-${orderIdOnly}. Fadlan hubi nambarka rasiidhkaaga.`;
        }
      } catch (apiError) {
        console.error("CleanCloud API Error:", apiError);
        replyText = "⚠️ Rafeeto! Cilad ayaa ku timid la xiriirka nidaamka CleanCloud. Fadlan dib isku day yar ka dib.";
      }
    } 
    else {
      replyText = "Fadlan soo geli nambar dalab oo sax ah oo ku bilaabma LN- (Tusaale: LN-1024).";
    }

    // Dib u dirista farriinta Telegram
    const telegramRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: replyText,
        parse_mode: "Markdown"
      }),
    });
    
    console.log("Telegram Response Status:", telegramRes.status);

    return NextResponse.json({ status: 'success' });

  } catch (error) {
    console.error("Telegram Webhook Crash Error:", error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}