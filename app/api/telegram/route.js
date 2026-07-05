import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // 1. Hubi haddii farriintu tahay qoraal caadi ah
    if (!body.message || !body.message.text) {
      return NextResponse.json({ status: 'ignored' });
    }

    const chatId = body.message.chat.id;
    const userMessage = body.message.text.trim();
    
    // Soo qaado Token-nada kaaga jira .env
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const cleanCloudToken = process.env.NEXT_PUBLIC_CLEANCLOUD_TOKEN; 

    // Hubi haddii token-nadu ay maqan yihiin si looga hortago crash
    if (!token || !cleanCloudToken) {
      console.error("Cilad: TELEGRAM_BOT_TOKEN ama NEXT_PUBLIC_CLEANCLOUD_TOKEN ayaa ka maqan .env");
      return NextResponse.json({ error: "Environment variables missing" }, { status: 500 });
    }

    let replyText = "";

    // 2. Marka macmiilku marka hore riixo /start
    if (userMessage === '/start') {
      replyText = "Ku soo dhowaw LikeNew Tracker! 🧺\n\nSi aad u ogaato heerka dalabkaaga, fadlan qor nambarka dalabka oo ku bilaabma LN (Tusaale: LN-1024).";
    } 
    // 3. Marka macmiilku soo qoro nambarka dalabka (Tusaale: LN-1024)
    else if (userMessage.toUpperCase().startsWith('LN-')) {
      // CleanCloud waxay u baahan tahay nambarka oo kaliya (Tusaale: 1024 badalkii LN-1024)
      const orderIdOnly = userMessage.toUpperCase().replace('LN-', ''); 

      try {
        // Wac API-ga rasmiga ah ee CleanCloud (GET Request)
        const cleanCloudResponse = await fetch(
          `https://api.cleancloudapp.com/api/v1/order/status?api_token=${cleanCloudToken}&order_id=${orderIdOnly}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          }
        );

        const cleanCloudData = await cleanCloudResponse.json();

        if (cleanCloudData && cleanCloudData.status) {
          let statusSomali = "";
          const status = cleanCloudData.status.toLowerCase();

          // U beddel status-ka CleanCloud af-Soomaali nadiif ah
          if (status === 'in progress' || status === 'cleaning') {
            statusSomali = "Haddaa la dhaqayaa (In Progress) 🧼";
          } else if (status === 'ready' || status === 'completed') {
            statusSomali = "Waa diyaar, waad soo doonan kartaa! 🛍️✨";
          } else if (status === 'collected') {
            statusSomali = "Waa la qaatay (Horay ayaad u qaadatay) ✅";
          } else {
            statusSomali = cleanCloudData.status; // Haddii uu status kale soo celiyo
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

    // 4. Dib ugu celi farriinta Telegram-ka macmiilka
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
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
    console.error("Telegram Error:", error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}