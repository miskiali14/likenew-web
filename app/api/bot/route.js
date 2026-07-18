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
    const userMessage = body.message.text.trim().toUpperCase(); // Toos u weyneey xarfaha si shaqadu u fududaato
    
    // === ENVIRONMENT VARIABLES ===
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const tokenHQ = process.env.NEXT_PUBLIC_CLEANCLOUD_TOKEN; 
    const tokenKM4 = process.env.CLEANCLOUD_TOKEN_KM4;
    // =============================

    let replyText = "";

    // Marka uu macmiilku qoro /start
    if (userMessage === '/START') {
      replyText = "Ku soo dhowaw *Likenew Tracker*! 🧺\n\nSi aad u ogaato heerka dalabkaaga, fadlan qor nambarka dalabka adoo raacinaya xarunta aad geysatay:\n\n* Xarunta HQ:* Qor **HQ-8781**\n* Xarunta KM5:* Qor **KM5-8781**";
    } 
    // Condition-ka labada xarunood (Haddii uu ku bilaabo HQ- ama 5-)
    else if (userMessage.startsWith('HQ-') || userMessage.startsWith('KM5-')) {
      
      let activeCleanCloudToken = "";
      let branchName = "";
      let orderIdOnly = "";

      if (userMessage.startsWith('HQ-')) {
        activeCleanCloudToken = tokenHQ;
        branchName = "LikeNew HQ";
        orderIdOnly = userMessage.replace('HQ-', '');
      } else {
        activeCleanCloudToken = tokenKM4;
        branchName = "LikeNew KM5";
        orderIdOnly = userMessage.replace('KM5-', '');
      }

      try {
        console.log(`📡 Fetching from ${branchName} via getOrders for ID: ${orderIdOnly}`);

        const cleanCloudResponse = await fetch(`https://cleancloudapp.com/api/getOrders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            api_token: activeCleanCloudToken,
            orderID: orderIdOnly
          })
        });

        const cleanCloudData = await fetchResponse(cleanCloudResponse);
        console.log(`📊 ${branchName} API Raw Response:`, JSON.stringify(cleanCloudData));

        let targetOrder = null;

        // Xallinta saxda ah ee JSON-ka CleanCloud (Orders oo Xaraf weyn ku bilaabma)
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
          let deliveryNote = ""; // Meeshan waxaa geli doona qoraalka dirista haddii uu ready yahay
          const statusValue = String(targetOrder.status);

          // Tarjumidda nambarada status-ka CleanCloud ku saleysan dokumentiga rasmiga ah
          if (statusValue === '0') {
            statusSomali = "Waxuu ku jiraa dhaqmo (Cleaning) 🧼";
          } else if (statusValue === '5') {
            statusSomali = "Gacanta ayaa lagu hayaa oo la sifeynayaa (Detailing) ✨";
          } else if (statusValue === '4') {
            statusSomali = "Wuxuu sugayaa in la soo qaado (Awaiting Pickup) 🚚";
          } else if (statusValue === '1') {
            statusSomali = "Waa diyaar (Ready to Deliver) 🛍️";
            // Qoraalka dhalmada haddii dharku ready yahay
            deliveryNote = "\n\nHaddii aad rabto in goobtaada laguugu keeno wac *2414* 📞";
          } else if (statusValue === '2') {
            statusSomali = "Waa la qaatay (Completed) ✅";
          } else {
            statusSomali = `Heerka uu joogo: (Status Code: ${statusValue})`; 
          }

          // === HALKAN WAA ISBEDELKA QORAALKA (UX/UI FORMATTING) ===
          replyText = `Xogta Dalabkaaga *LIKENEW ${branchName.replace('LikeNew ', '')}.*\n\n` +
                      `*ID Nambarka*: ${userMessage}\n` +
                      `*Heerka uu joogo*: ${statusSomali}${deliveryNote}\n\n` +
                      `Waad ku mahadsan tahay doorashadaada LIKENEW!`;
                      
        } else {
          console.log(`❌ Order details not found in ${branchName} response structure.`);
          replyText = `❌ Ma helin wax dalab oo firfircoon oo leh nambarka: *${userMessage}* gudaha *${branchName}*.\n\nFadlan hubi nambarka rasiidhkaaga.`;
        }
      } catch (apiError) {
        console.error(`❌ ${branchName} API Fetch Error:`, apiError);
        replyText = `⚠️ Cilad ayaa ku timid la xiriirka nidaamka *${branchName}*. Fadlan dib isku day yar ka dib.`;
      }
    } 
    else {
      replyText = "Fadlan soo geli nambar dalab oo sax ah oo ku bilaabma horgalaha xarunta.\n\n*(Tusaale: HQ-8781 ama KM5-8781)*";
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