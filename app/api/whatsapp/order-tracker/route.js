import { NextResponse } from 'next/server';

/*
 * WhatsApp Order Tracker endpoint
 * Method: POST
 * Body (mid kasta way shaqeynaysaa):
 *   { "order_id": "HQ-8781", "whatsapp_phone": "2526xxxxxxx" }
 *   { "message": "HQ-8781" }                 <- WATI catch-all flow
 *   { "text": "track my order HQ-8781" }
 *
 * Jawaab kasta waxay leedahay `reply` field = qoraal WhatsApp diyaar ah.
 * WATI Chatbot: API Request -> Send message {{reply}}. Laba node oo kaliya.
 */

const STATUS_MAP = {
  '0': { en: 'Cleaning', so: 'Waxuu ku jiraa dhaqmo (Cleaning) 🧼' },
  '1': {
    en: 'Ready to Deliver',
    so: 'Waa diyaar (Ready to Deliver) 🛍️',
    deliveryNote: 'Haddii aad rabto in goobtaada laguugu keeno wac 2414 📞',
  },
  '2': { en: 'Completed', so: 'Waa la qaatay (Completed) ✅' },
  '4': { en: 'Awaiting Pickup', so: 'Wuxuu sugayaa in la soo qaado (Awaiting Pickup) 🚚' },
  '5': { en: 'Detailing', so: 'Gacanta ayaa lagu hayaa oo la sifeynayaa (Detailing) ✨' },
};

const WELCOME =
  'Ku soo dhowow LikeNew Tracker! 🧺\n\n' +
  'Si aad u hubiso dalabkaaga, fadlan ii soo dir Order ID-ga oo ay la socoto xarunta aad dalabka geysay.\n\n' +
  'Tusaale:\n📍 HQ: HQ-8781\n📍 KM5: KM5-8781';

const INVALID =
  'Fadlan isticmaal Order ID-ga oo ay la socoto xarunta.\n\n' +
  'Tusaale:\n📍 HQ-8781\n📍 KM5-8781';

const ERROR_MSG =
  '⚠️ Waan ka xumahay, hadda ma hubin karo dalabkaaga.\n\n' +
  'Fadlan isku day mar kale wax yar kadib.';

const GREETING_RE = /^(hi|hey|hello|start|salaan|asc|assalamu|iska warran|war|haye|hai)\b/i;
const ORDER_RE = /\b(HQ|KM5)-\d+\b/i;

function json(payload, extra) {
  return NextResponse.json({ ...payload, ...extra });
}

export async function GET() {
  return NextResponse.json({
    status: 'online',
    message: 'LikeNew WhatsApp Order Tracker API is running.',
  });
}

// Ka soo saar input-ka qaab kasta oo codsiga (JSON, form, query, raw text)
async function readInput(request) {
  const out = {};
  try {
    const url = new URL(request.url);
    for (const [k, v] of url.searchParams.entries()) out[k] = v;
  } catch {
    /* ignore */
  }

  const contentType = (request.headers.get('content-type') || '').toLowerCase();
  try {
    if (contentType.includes('application/json')) {
      Object.assign(out, await request.json());
    } else if (
      contentType.includes('application/x-www-form-urlencoded') ||
      contentType.includes('multipart/form-data')
    ) {
      const form = await request.formData();
      for (const [k, v] of form.entries()) out[k] = v;
    } else {
      const text = await request.text();
      if (text) {
        try {
          Object.assign(out, JSON.parse(text));
        } catch {
          const params = new URLSearchParams(text);
          for (const [k, v] of params.entries()) out[k] = v;
        }
      }
    }
  } catch {
    /* ignore */
  }
  return out;
}

export async function POST(request) {
  try {
    const body = await readInput(request);

    // Raw message-ka (WATI catch-all) ama order_id toos ah
    const rawText = String(
      body.order_id ?? body.orderID ?? body.orderId ?? body.message ?? body.text ?? body.body ?? '',
    ).trim();

    const whatsappPhone =
      (body.whatsapp_phone && String(body.whatsapp_phone).trim()) ||
      (body.whatsappPhone && String(body.whatsappPhone).trim()) ||
      (body.waId && String(body.waId).trim()) ||
      null;

    // 1. Farriin madhan ama salaan -> welcome
    if (!rawText || GREETING_RE.test(rawText)) {
      return json({ success: false, error: 'GREETING', reply: WELCOME });
    }

    // 2. Ka soo bixi Order ID-ga farriinta (xitaa haddii jumlad dheer tahay)
    const match = rawText.match(ORDER_RE);
    if (!match) {
      return json({ success: false, error: 'INVALID_ORDER_ID', reply: INVALID });
    }

    const orderId = match[0].toUpperCase();
    let cleanCloudToken = '';
    let branch = '';
    let orderIdOnly = '';

    if (orderId.startsWith('HQ-')) {
      cleanCloudToken = process.env.NEXT_PUBLIC_CLEANCLOUD_TOKEN;
      branch = 'HQ';
      orderIdOnly = orderId.slice(3);
    } else {
      cleanCloudToken = process.env.CLEANCLOUD_TOKEN_KM4;
      branch = 'KM5';
      orderIdOnly = orderId.slice(4);
    }

    if (!cleanCloudToken) {
      console.error(`Missing CleanCloud token for branch ${branch}`);
      return json({ success: false, error: 'INTERNAL_ERROR', order_id: orderId, reply: ERROR_MSG });
    }

    // 3. Weydii CleanCloud
    let cleanCloudData = null;
    try {
      const res = await fetch('https://cleancloudapp.com/api/getOrders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_token: cleanCloudToken, orderID: orderIdOnly }),
      });
      cleanCloudData = await res.json().catch(() => null);
    } catch (apiError) {
      console.error(`CleanCloud fetch error (${branch}):`, apiError);
      return json({ success: false, error: 'INTERNAL_ERROR', order_id: orderId, reply: ERROR_MSG });
    }

    // 4. Ka soo saar dalabka
    let targetOrder = null;
    if (cleanCloudData) {
      if (Array.isArray(cleanCloudData.Orders) && cleanCloudData.Orders.length > 0) {
        targetOrder = cleanCloudData.Orders[0];
      } else if (Array.isArray(cleanCloudData) && cleanCloudData.length > 0) {
        targetOrder = cleanCloudData[0];
      } else if (Array.isArray(cleanCloudData.orders) && cleanCloudData.orders.length > 0) {
        targetOrder = cleanCloudData.orders[0];
      } else if (typeof cleanCloudData === 'object' && cleanCloudData.status !== undefined) {
        targetOrder = cleanCloudData;
      }
    }

    // 5. Lama helin
    if (!targetOrder || targetOrder.status === undefined || targetOrder.status === null) {
      return json({
        success: false,
        error: 'ORDER_NOT_FOUND',
        order_id: orderId,
        reply:
          `❌ Ma helin dalab leh nambarka *${orderId}*.\n\n` +
          'Fadlan hubi nambarka rasiidhkaaga oo mar kale isku day.',
      });
    }

    // 6. Status
    const statusCode = String(targetOrder.status);
    const mapped = STATUS_MAP[statusCode];
    const statusSo = mapped ? mapped.so : `Heerka uu joogo: (Status Code ${statusCode})`;
    const deliveryNote = mapped && mapped.deliveryNote ? `\n\n${mapped.deliveryNote}` : '';

    const reply =
      `Xogta Dalabkaaga *LIKENEW ${branch}* 🧺\n\n` +
      `*ID Nambarka:* ${orderId}\n\n` +
      `*Heerka uu joogo:* ${statusSo}${deliveryNote}\n\n` +
      'Waad ku mahadsan tahay doorashadaada LIKENEW! ❤️';

    return json({
      success: true,
      order_id: orderId,
      branch,
      status_code: statusCode,
      status: mapped ? mapped.en : `Status Code ${statusCode}`,
      status_somali: statusSo,
      whatsapp_phone: whatsappPhone,
      ...(mapped && mapped.deliveryNote ? { delivery_note: mapped.deliveryNote } : {}),
      reply,
    });
  } catch (error) {
    console.error('order-tracker crash:', error);
    return json({ success: false, error: 'INTERNAL_ERROR', reply: ERROR_MSG });
  }
}
