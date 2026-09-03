import { NextResponse } from 'next/server';

/*
 * WATI Action: ORDER_TRACKER_API
 * Method: POST
 * Body: { "order_id": "HQ-8781", "whatsapp_phone": "2526xxxxxxx" }
 *
 * Waa isla nidaamkii Telegram bot-ka (app/api/bot/route.js), laakiin halkii
 * la diri lahaa farriin Telegram, wuxuu ku celinayaa JSON oo WATI AI Agent
 * uu isticmaalayo. Response-kan ayaa ah ISHA KELIYA EE RUNTA AH.
 */

// Status codes CleanCloud -> friendly text (English + Somali)
const STATUS_MAP = {
  '0': {
    en: 'Cleaning',
    so: 'Waxuu ku jiraa dhaqmo (Cleaning) 🧼',
  },
  '1': {
    en: 'Ready to Deliver',
    so: 'Waa diyaar (Ready to Deliver) 🛍️',
    deliveryNote: 'Haddii aad rabto in goobtaada laguugu keeno wac 2414 📞',
  },
  '2': {
    en: 'Completed',
    so: 'Waa la qaatay (Completed) ✅',
  },
  '4': {
    en: 'Awaiting Pickup',
    so: 'Wuxuu sugayaa in la soo qaado (Awaiting Pickup) 🚚',
  },
  '5': {
    en: 'Detailing',
    so: 'Gacanta ayaa lagu hayaa oo la sifeynayaa (Detailing) ✨',
  },
};

// Health check
export async function GET() {
  return NextResponse.json({
    status: 'online',
    message: 'LikeNew WhatsApp Order Tracker API is running.',
  });
}

// Ka soo saar order_id / whatsapp_phone qaab kasta oo codsiga (JSON, form,
// query string) — Astra/WATI mararqaar si kala duwan ayey u dirsadaan.
async function readInput(request) {
  const out = {};

  // Query string
  try {
    const url = new URL(request.url);
    for (const [k, v] of url.searchParams.entries()) out[k] = v;
  } catch {
    // ignore
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
      // Content-Type lama sheegin — isku day JSON, kadib text
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
    // ignore — waxaan isticmaalnaa waxa aan hore u helnay
  }

  return out;
}

export async function POST(request) {
  try {
    const body = await readInput(request);

    const rawOrderId = String(body.order_id ?? body.orderID ?? body.orderId ?? '').trim();
    const whatsappPhone = body.whatsapp_phone
      ? String(body.whatsapp_phone).trim()
      : body.whatsappPhone
        ? String(body.whatsappPhone).trim()
        : null;

    // 1. Order ID maqan
    if (!rawOrderId) {
      return NextResponse.json({
        success: false,
        error: 'MISSING_ORDER_ID',
        order_id: null,
      });
    }

    const orderId = rawOrderId.toUpperCase();

    // 2. Hubi qaabka + aqoonso xarunta
    let cleanCloudToken = '';
    let branch = '';
    let orderIdOnly = '';

    if (orderId.startsWith('HQ-')) {
      cleanCloudToken = process.env.NEXT_PUBLIC_CLEANCLOUD_TOKEN;
      branch = 'HQ';
      orderIdOnly = orderId.slice(3);
    } else if (orderId.startsWith('KM5-')) {
      cleanCloudToken = process.env.CLEANCLOUD_TOKEN_KM4;
      branch = 'KM5';
      orderIdOnly = orderId.slice(4);
    } else {
      return NextResponse.json({
        success: false,
        error: 'INVALID_ORDER_ID',
        order_id: orderId,
      });
    }

    if (!orderIdOnly || !/^\d+$/.test(orderIdOnly)) {
      return NextResponse.json({
        success: false,
        error: 'INVALID_ORDER_ID',
        order_id: orderId,
      });
    }

    if (!cleanCloudToken) {
      console.error(`❌ Missing CleanCloud token for branch ${branch}`);
      return NextResponse.json({
        success: false,
        error: 'INTERNAL_ERROR',
        order_id: orderId,
      });
    }

    // 3. Weydii CleanCloud
    let cleanCloudData = null;
    try {
      const res = await fetch('https://cleancloudapp.com/api/getOrders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_token: cleanCloudToken,
          orderID: orderIdOnly,
        }),
      });
      cleanCloudData = await res.json().catch(() => null);
    } catch (apiError) {
      console.error(`❌ CleanCloud fetch error (${branch}):`, apiError);
      return NextResponse.json({
        success: false,
        error: 'INTERNAL_ERROR',
        order_id: orderId,
      });
    }

    // 4. Ka soo saar dalabka JSON-ka CleanCloud (qaababka kala duwan)
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

    // 5. Dalab lama helin
    if (!targetOrder || targetOrder.status === undefined || targetOrder.status === null) {
      return NextResponse.json({
        success: false,
        error: 'ORDER_NOT_FOUND',
        order_id: orderId,
      });
    }

    // 6. Tarjun status-ka
    const statusCode = String(targetOrder.status);
    const mapped = STATUS_MAP[statusCode];

    const responsePayload = {
      success: true,
      order_id: orderId,
      branch,
      status_code: statusCode,
      status: mapped ? mapped.en : `Status Code ${statusCode}`,
      status_somali: mapped ? mapped.so : `Heerka uu joogo: (Status Code ${statusCode})`,
      whatsapp_phone: whatsappPhone,
    };

    if (mapped && mapped.deliveryNote) {
      responsePayload.delivery_note = mapped.deliveryNote;
    }

    return NextResponse.json(responsePayload);
  } catch (error) {
    console.error('💥 order-tracker crash:', error);
    return NextResponse.json({
      success: false,
      error: 'INTERNAL_ERROR',
      order_id: null,
    });
  }
}
