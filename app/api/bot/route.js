import { NextResponse } from 'next/server';

// 1. Kani wuxuu xallinayaa haddii Telegram ama browser uu GET ku soo garaaco si loo hubiyo uun inuu online yahay
export async function GET() {
  return NextResponse.json({ 
    status: 'online', 
    message: 'LikeNew Telegram Webhook is running successfully!' 
  });
}

// 2. Kani waa kan qaabilaya farriimaha dhabta ah ee ka imaanaya Telegram bot-kaaga
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
      replyText = "Ku soo dhowaw LikeNew Tracker! 🧺\n\nSi aad u ogaato heerka dalabkaaga, fadlan qor nambarka dalabka oo ku bilaabma LN (Tusaale: LN-8781).";
    } 
    // Marka uu macmiilku raadinayo dalab (Tusaale: LN-8781)
    else if (userMessage.toUpperCase().startsWith('LN-')) {
      const orderIdOnly = userMessage.toUpperCase().replace('LN-', ''); 

      try {
        console.log(`📡 Fetching from CleanCloud via getOrders for ID: ${orderIdOnly}`);

        const cleanCloudResponse = await fetch(`https://cleancloudapp.com/api/getOrders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            api_token: cleanCloudToken,
            orderID: orderIdOnly
          })
        });

        const cleanCloudData = await fetchResponse(cleanCloudResponse);
        console.log("📊 CleanCloud API Raw Response:", JSON.stringify(cleanCloudData));

        let targetOrder = null;

        // Xallinta saxda ah ee JSON-ka CleanCloud uu soo celiyey (Orders oo Xaraf weyn ku bilaabma)
        if (cleanCloudData) {
          if (cleanCloudData.Orders && Array.isArray(cleanCloudData.Orders) && cleanCloudData.Orders.length > 0) {
            targetOrder = cleanCloudData.Orders[0];
          } else if (Array.isArray(cleanCloudData) && cleanCloudData.length > 0) {
            targetOrder = cleanCloudData[0];
          } else if (cleanCloudData.orders && Array.isArray(cleanCloudData.orders) && cleanCloudData.orders.length > 0) {
            targetOrder = cleanCloudData.orders[0];
          } else if (typeof cleanCloudData === 'object' && cleanCloudData.status !== undefined) {
            targetOrder = cleanCloudData; 
          }
        }

        // Haddii la helay dalabka iyo status-ka rasmiga ah
        if (targetOrder && targetOrder.status !== undefined && targetOrder.status !== null) {
          let statusSomali = "";
          const statusValue = String(targetOrder.status);

          // Tarjumidda nambarada status-ka CleanCloud ku saleysan dokumentiga rasmiga ah
          if (statusValue === '0') {
            statusSomali = "Haddaa la dhaqayaa (Cleaning) 🧼";
          } else if (statusValue === '5') {
            statusSomali = "Gacanta ayaa lagu hayaa oo la sifeynayaa (Detailing) ✨";
          } else if (statusValue === '4') {
            statusSomali = "Wuxuu sugayaa in la soo qaado (Awaiting Pickup) 🚚";
          } else if (statusValue === '1') {
            statusSomali = "Waa diyaar, waad soo doonan kartaa! (Ready to Deliver) 🛍️";
          } else if (statusValue === '2') {
            statusSomali = "Waa la qaatay (Completed) ✅";
          } else {
            statusSomali = `Heerka uu joogo: (Status Code: ${statusValue})`; 
          }

          replyText = `📊 **Xogta Dalabkaaga LikeNew**\n\n🆔 Nambarka: LN-${orderIdOnly}\n📌 Heerka uu joogo: ${statusSomali}\n\nWaad ku mahadsan tahay doorashada LikeNew! 🧺`;
        } else {
          console.log("❌ Order details not found in CleanCloud response structure.");
          replyText = `❌ Ma helin wax dalab oo firfircoon oo leh nambarka: LN-${orderIdOnly}.\n\nFadlan hubi nambarka rasiidhkaaga.`;
        }
      } catch (apiError) {
        console.error("❌ CleanCloud API Fetch Error:", apiError);
        replyText = "⚠️ Cilad ayaa ku timid la xiriirka nidaamka CleanCloud. Fadlan dib isku day yar ka dib.";
      }
    } 
    else {
      replyText = "Fadlan soo geli nambar dalab oo sax ah oo ku bilaabma LN- (Tusaale: LN-8781).";
    }

    // Dib u dirista farriinta dhanka Telegram Bot-ka
    console.log(`✉️ Sending message back to Telegram Chat ID: ${chatId}`);
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
    console.error("💥 Critical Webhook Crash Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Hab caawinaad leh oo response-ka loogu beddelo JSON si ammaan ah
async function fetchResponse(res) {
  try {
    return await res.json();
  } catch (e) {
    return null;
  }
}