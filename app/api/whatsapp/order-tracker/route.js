import { NextResponse } from 'next/server';

/*
 * LikeNew WhatsApp Order Bot
 * Method: POST
 *
 * Laba hab ayey u shaqeysaa:
 *
 * 1) WATI "message received" webhook (habka rasmiga ah):
 *    WATI wuxuu farriin kasta oo soo gasha u soo diraa payload
 *    ({ eventType:"message", owner:false, text:"HQ-8781", waId:"2526..." }).
 *    Backend-ku jawaabta ayuu si toos ah ugu celiyaa WATI send API.
 *    Env vars loo baahan yahay: WATI_API_ENDPOINT, WATI_API_TOKEN
 *
 * 2) Direct/test ({ "message": "HQ-8781" }): wuxuu soo celiyaa
 *    { reply: "...", ... } JSON.
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

// ---- Farriimaha diyaarka ah (Somali + English) ----

const MENU = {
  so:
    'Wa calaykum salaam 👋 Ku soo dhowow LikeNew! 🧺\n\n' +
    'Sidee kuu caawin karaa maanta? Fadlan dooro mid:\n\n' +
    '1️⃣ 📦 Dalabkayga la socod\n' +
    '2️⃣ 🎧 Caawimaad macmiil\n' +
    '3️⃣ 😠 Cabasho ama dhibaato\n' +
    '4️⃣ 📍 Xarumaheena / Lockers-ka\n\n' +
    'Waxaad qori kartaa numberka (tusaale "1") ama qoraalka rabtaada.',
  en:
    'Hi 👋 Welcome to LikeNew! 🧺\n\n' +
    'How can I help you today? Please choose:\n\n' +
    '1️⃣ 📦 Track my order\n' +
    '2️⃣ 🎧 Customer Help\n' +
    '3️⃣ 😠 Complaint\n' +
    '4️⃣ 📍 Our branches / lockers\n\n' +
    'You can type the number (e.g. "1") or just tell me what you need.',
};

const ASK_ID = {
  so:
    'Fadlan ii soo dir Order ID-ga dalabkaaga oo ay la socoto xarunta.\n\n' +
    'Tusaale:\n📍 HQ-8781\n📍 KM5-8781',
  en:
    'Please send me your Order ID together with the branch prefix.\n\n' +
    'Example:\n📍 HQ-8781\n📍 KM5-8781',
};

const HELP = {
  so:
    'Waan ku caawin karnaa 🎧.\n\n' +
    'La xiriir kooxda adeegga macaamiisha 📞 2414, ama qor su’aashaada halkan.',
  en:
    "We're happy to help 🎧.\n\n" +
    'Call our support team on 📞 2414, or ask me your question here.',
};

const COMPLAINT = {
  so:
    'Waan ka xumahay dhibaatadan 😔.\n\n' +
    'Fadlan la xiriir kooxda adeegga macaamiisha 📞 2414 — waxay kuu xallin doonaan dhaqso.',
  en:
    'Sorry to hear that 😔.\n\n' +
    "Please contact our customer support team on 📞 2414 and they'll help you right away.",
};

const BRANCHES = {
  so:
    'Waxaan xarumo iyo lockers ku leenahay Muqdisho. 📍\n\n' +
    'Booqo bogga Lockers ee website-kayaga, ama wac 📞 2414 si aad u ogaato tan kuu dhow.',
  en:
    'We have branches and lockers around Mogadishu. 📍\n\n' +
    'Check the Lockers page on our website, or call 📞 2414 for the nearest one.',
};

const ERROR_MSG = {
  so: '⚠️ Waan ka xumahay, hadda ma hubin karo dalabkaaga.\n\nFadlan isku day mar kale wax yar kadib.',
  en: "⚠️ Sorry, I'm unable to check your order right now.\n\nPlease try again shortly.",
};

const NOT_FOUND = {
  so: (id) =>
    `❌ Ma helin dalab leh nambarka *${id}*.\n\nFadlan hubi nambarka rasiidhkaaga oo mar kale isku day.`,
  en: (id) =>
    `❌ I couldn't find an order with the ID *${id}*.\n\nPlease check your receipt and try again.`,
};

// ---- Kala-sooc (regex) ----

const ORDER_RE = /\b(HQ|KM5)-\d+\b/i;
const GREETING_RE =
  /^(hi+|hey+|hello|hallo|start|menu|salaan|salam|asc|a\.s\.c|assalamu|salamu|iska warran|war|haye|hai|good (morning|afternoon|evening))\b/i;
const EN_HINT_RE =
  /\b(my order|track my|where('?s| is)|order status|need help|customer help|i have a complaint|refund|damaged|missing|payment|your branch|the locker|nearest|please help|thank you)\b/i;
const SO_HINT_RE =
  /\b(salaan|asc|dalab|dalabkayga|hubi|xaggee|diyaar|caawi|caawimaad|cabasho|dhibaato|xarun|goob|lacag|dhar)\b/i;

const OPT1_RE =
  /^(1|1️⃣)$|\b(track|tracking|order|orders|status|dalab|dalabka|dalabkayga|la socod|order-?kayga|xaggee|marayaa|diyaar baa)\b/i;
const OPT2_RE = /^(2|2️⃣)$|\b(help|support|customer help|caawi|caawimaad|taageero)\b/i;
const OPT3_RE =
  /^(3|3️⃣)$|\b(complaint|cabasho|dhibaato|refund|damaged|missing|lost|payment dispute|lacag|dhar (khaldan|maqan|luntay))\b/i;
const OPT4_RE = /^(4|4️⃣)$|\b(branch|branches|locker|lockers|xarun|xarumaha|goob|location|address|cinwaan)\b/i;

function pickLang(text) {
  if (SO_HINT_RE.test(text)) return 'so';
  if (EN_HINT_RE.test(text) && !/[؀-ۿ]/.test(text)) return 'en';
  return 'so';
}

export async function GET() {
  return NextResponse.json({
    status: 'online',
    message: 'LikeNew WhatsApp Order Bot API is running.',
    wati_configured: Boolean(process.env.WATI_API_ENDPOINT && process.env.WATI_API_TOKEN),
  });
}

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

// ---- Logic-ga: farriin -> { reply, meta } ----
async function computeReply(rawTextIn) {
  const rawText = String(rawTextIn || '').trim();
  const lang = pickLang(rawText);

  const match = rawText.match(ORDER_RE);
  if (match) {
    return await lookupOrder(match[0].toUpperCase(), lang);
  }
  if (!rawText || GREETING_RE.test(rawText)) {
    return { success: false, intent: 'MENU', reply: MENU[lang] };
  }
  if (OPT1_RE.test(rawText)) return { success: false, intent: 'ASK_ORDER_ID', reply: ASK_ID[lang] };
  if (OPT2_RE.test(rawText)) return { success: false, intent: 'CUSTOMER_HELP', reply: HELP[lang] };
  if (OPT3_RE.test(rawText)) return { success: false, intent: 'COMPLAINT', reply: COMPLAINT[lang] };
  if (OPT4_RE.test(rawText)) return { success: false, intent: 'BRANCHES', reply: BRANCHES[lang] };
  return { success: false, intent: 'FALLBACK', reply: MENU[lang] };
}

// ---- WATI send API ----
async function sendWatiMessage(waId, text) {
  const endpoint = process.env.WATI_API_ENDPOINT; // e.g. https://live-mt-server.wati.io/10233063
  const token = process.env.WATI_API_TOKEN; // "Bearer eyJ..." ama "eyJ..."
  if (!endpoint || !token) {
    console.error('WATI_API_ENDPOINT / WATI_API_TOKEN lama dejin');
    return { sent: false, reason: 'not_configured' };
  }
  const auth = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
  const base = endpoint.replace(/\/$/, '');
  const url =
    `${base}/api/v1/sendSessionMessage/${encodeURIComponent(waId)}` +
    `?messageText=${encodeURIComponent(text)}`;

  try {
    // WATI v1 sendSessionMessage: messageText waa query param, body iyo
    // Content-Type looma baahna (mararqaar Content-Type: application/json
    // oo body la'aan ah wuxuu keenaa 400).
    const res = await fetch(url, {
      method: 'POST',
      headers: { Authorization: auth, accept: '*/*' },
    });
    const raw = await res.text();
    let data = null;
    try {
      data = JSON.parse(raw);
    } catch {
      data = raw;
    }
    if (!res.ok || (data && data.result === false)) {
      console.error('WATI send failed', res.status, raw.slice(0, 300));
      return { sent: false, status: res.status, data };
    }
    return { sent: true, data };
  } catch (e) {
    console.error('WATI send error', e);
    return { sent: false, error: String(e) };
  }
}

// ---- Aqoonso WATI inbound webhook ----
function isWatiInbound(body) {
  const eventType = String(body.eventType || body.type || '').toLowerCase();
  const owner = body.owner;
  const isOwnerOutbound = owner === true || owner === 'true';
  // Kaliya farriimaha macmiilku soo diray (owner=false) oo nooca "message" ah
  return (
    Boolean(body.waId) &&
    !isOwnerOutbound &&
    (eventType === 'message' ||
      eventType === 'newcontactmessagereceived' ||
      eventType === 'session_message' ||
      eventType === '')
  );
}

export async function POST(request) {
  try {
    const body = await readInput(request);

    // Duub payload-ka WATI (Vercel logs)
    console.log('[order-bot] incoming:', JSON.stringify(body).slice(0, 800));

    // ===== HAB 1: WATI inbound webhook =====
    if (body.waId) {
      const eventType = String(body.eventType || body.type || '').toLowerCase();
      const isOwnerOutbound = body.owner === true || body.owner === 'true';
      // Loop-ka ka hortag: ha ka jawaabin farriimaha business-ku diray
      if (isOwnerOutbound || eventType === 'sessionmessagesent' || eventType === 'templatemessagesent') {
        console.log('[order-bot] ignored (outbound/owner)');
        return NextResponse.json({ ok: true, ignored: true });
      }

      const msgType = String(body.type || 'text').toLowerCase();
      const text =
        msgType === 'text' || msgType === 'message' || msgType === ''
          ? String(
              body.text ?? body.message ?? body.messageText ?? body.body ?? '',
            ).trim()
          : '';

      const waId = String(body.waId).trim();
      const result = await computeReply(text);
      const sendRes = await sendWatiMessage(waId, result.reply);
      console.log(
        `[order-bot] waId=${waId} text="${text}" intent=${result.intent || 'order'} sent=${sendRes.sent} ${
          sendRes.sent ? '' : JSON.stringify(sendRes).slice(0, 300)
        }`,
      );

      return NextResponse.json({ ok: true, intent: result.intent || null, sent: sendRes.sent });
    }

    // ===== HAB 2: Direct / test =====
    const rawText = String(
      body.order_id ??
        body.orderID ??
        body.orderId ??
        body.message ??
        body.text ??
        body.body ??
        body.first_incoming_message ??
        '',
    ).trim();

    const result = await computeReply(rawText);
    return NextResponse.json(result);
  } catch (error) {
    console.error('order-bot crash:', error);
    return NextResponse.json({ success: false, error: 'INTERNAL_ERROR', reply: ERROR_MSG.so });
  }
}

async function lookupOrder(orderId, lang) {
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
    return { success: false, error: 'INTERNAL_ERROR', order_id: orderId, reply: ERROR_MSG[lang] };
  }

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
    return { success: false, error: 'INTERNAL_ERROR', order_id: orderId, reply: ERROR_MSG[lang] };
  }

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

  if (!targetOrder || targetOrder.status === undefined || targetOrder.status === null) {
    return {
      success: false,
      error: 'ORDER_NOT_FOUND',
      order_id: orderId,
      reply: NOT_FOUND[lang](orderId),
    };
  }

  const statusCode = String(targetOrder.status);
  const mapped = STATUS_MAP[statusCode];
  const statusSo = mapped ? mapped.so : `(Status Code ${statusCode})`;
  const statusEn = mapped ? mapped.en : `Status Code ${statusCode}`;
  const note = mapped && mapped.deliveryNote ? `\n\n${mapped.deliveryNote}` : '';

  const reply =
    lang === 'en'
      ? `Your LikeNew Order Information 🧺\n\n` +
        `*Order ID:* ${orderId}\n\n` +
        `*Current Status:* ${statusEn}${note}\n\n` +
        'Thank you for choosing LikeNew! ❤️'
      : `Xogta Dalabkaaga *LIKENEW ${branch}* 🧺\n\n` +
        `*ID Nambarka:* ${orderId}\n\n` +
        `*Heerka uu joogo:* ${statusSo}${note}\n\n` +
        'Waad ku mahadsan tahay doorashadaada LIKENEW! ❤️';

  return {
    success: true,
    order_id: orderId,
    branch,
    status_code: statusCode,
    status: statusEn,
    status_somali: statusSo,
    ...(mapped && mapped.deliveryNote ? { delivery_note: mapped.deliveryNote } : {}),
    reply,
  };
}
