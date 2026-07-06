// Gudaha 'LN-' else-if block:
try {
  console.log(`📡 Fetching from CleanCloud via getOrders for ID: ${orderIdOnly}`);

  const cleanCloudResponse = await fetch(`https://cleancloudapp.com/api/getOrders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_token: cleanCloudToken,
      orderID: orderIdOnly // Dukumentigu wuxuu leeyahay 'orderID'
    })
  });

  const cleanCloudData = await fetchResponse(cleanCloudResponse);
  console.log("📊 CleanCloud API Raw Response:", JSON.stringify(cleanCloudData));

  let targetOrder = null;

  // CleanCloud getOrders wuxuu soo celiyaa liis (Array) ama shay ka kooban .orders array
  if (cleanCloudData) {
    if (Array.isArray(cleanCloudData) && cleanCloudData.length > 0) {
      targetOrder = cleanCloudData[0];
    } else if (cleanCloudData.orders && Array.isArray(cleanCloudData.orders) && cleanCloudData.orders.length > 0) {
      targetOrder = cleanCloudData.orders[0];
    } else if (typeof cleanCloudData === 'object' && cleanCloudData.status !== undefined) {
      targetOrder = cleanCloudData; 
    }
  }

  if (targetOrder && targetOrder.status !== undefined && targetOrder.status !== null) {
    let statusSomali = "";
    const statusValue = String(targetOrder.status);

    // Ku saleysan dukumentiga rasmiga ah ee getOrders:
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
    replyText = `❌ Ma helin wax dalab oo firfircoon oo leh nambarka: LN-${orderIdOnly}.\n\nFadlan hubi nambarka rasiidhkaaga.`;
  }
} catch (apiError) {
  console.error("❌ CleanCloud API Fetch Error:", apiError);
  replyText = "⚠️ Cilad ayaa ku timid la xiriirka nidaamka CleanCloud. Fadlan dib isku day yar ka dib.";
}

// Hab caawinaad leh oo Next.js response-ka loogu beddelo JSON si ammaan ah
async function fetchResponse(res) {
  try {
    return await res.json();
  } catch (e) {
    return null;
  }
}