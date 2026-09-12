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
    '4️⃣ 📍 Xarumaheena / Lockers-ka\n' +
    '5️⃣ 🎒 Waxyaabaha la helay (Lost & Found)\n\n' +
    'Waxaad qori kartaa numberka (tusaale "1") ama qoraalka rabtaada.',
  en:
    'Hi 👋 Welcome to LikeNew! 🧺\n\n' +
    'How can I help you today? Please choose:\n\n' +
    '1️⃣ 📦 Track my order\n' +
    '2️⃣ 🎧 Customer Help\n' +
    '3️⃣ 😠 Complaint\n' +
    '4️⃣ 📍 Our branches / lockers\n' +
    '5️⃣ 🎒 Lost & Found\n\n' +
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

// Instruction.md -> "HUMAN SUPPORT": marka macmiilku si cad u weydiisto qof dhab ah
const HUMAN_SUPPORT = {
  so: 'Arrintaas waxaan kuu gudbin karaa kooxda adeegga macaamiisha. 📞 2414 👨‍💼',
  en: 'I can connect you with our customer support team. 📞 2414 👨‍💼',
};

// Xogta lockers-ka waa xaqiiqo — ka soo qaatay components/Lockers.jsx
const BRANCHES = {
  so:
    'Xarumaheena / Lockers-ka LikeNew 📍\n\n' +
    '1️⃣ *Waaberi Locker*\n' +
    '   📍 21 Oct Street, Waaberi\n' +
    '   🕐 24/7 Furan\n' +
    '   🗺️ https://maps.app.goo.gl/tTvbmD63yowVTdz69\n\n' +
    '2️⃣ *Hodan Locker*\n' +
    '   📍 KM4 Street, Hodan\n' +
    '   🕐 24/7 Furan\n' +
    '   🗺️ https://maps.app.goo.gl/EoL4JyeiVgUq5aYQ7\n\n' +
    'Liiska buuxa + khariidad: 🔗 https://www.likenew.so/lockers\n\n' +
    'Su\'aal dheeraad ah → 📞 2414',
  en:
    'LikeNew Branches / Lockers 📍\n\n' +
    '1️⃣ *Waaberi Locker*\n' +
    '   📍 21 Oct Street, Waaberi\n' +
    '   🕐 Open 24/7\n' +
    '   🗺️ https://maps.app.goo.gl/tTvbmD63yowVTdz69\n\n' +
    '2️⃣ *Hodan Locker*\n' +
    '   📍 KM4 Street, Hodan\n' +
    '   🕐 Open 24/7\n' +
    '   🗺️ https://maps.app.goo.gl/EoL4JyeiVgUq5aYQ7\n\n' +
    'Full list + map: 🔗 https://www.likenew.so/lockers\n\n' +
    'More questions → 📞 2414',
};

const LOST_FOUND = {
  so:
    'Waxyaabaha macaamiisha ay ku dhex tageen dharka (jeebabka: lacag, furayaal, taleefan, kaararka, iwm) 🎒\n\n' +
    'Si aan halkan kuugu raadiyo, ii soo dir:\n' +
    '*found* + magacaaga / ID-gaaga / nambarkaaga\n\n' +
    'Tusaale:\n• found Ahmed Zaki\n• found 11250\n• found 0615123456\n\n' +
    'Ama booqo 🔗 https://found.likenew.so',
  en:
    'Items customers left in their clothes (pockets: cash, keys, phone, cards, etc.) 🎒\n\n' +
    'To search here, send me:\n' +
    '*found* + your name / ID / phone number\n\n' +
    'Example:\n• found Ahmed Zaki\n• found 11250\n• found 0615123456\n\n' +
    'Or visit 🔗 https://found.likenew.so',
};

const LF_STATUS = {
  CLAIMED: { so: 'Waa la qaatay ✅', en: 'Already claimed ✅' },
  HELD: { so: 'Xarunta ayaa lagu hayaa 🏬', en: 'Held at branch 🏬' },
};

// ---- FAQ xaqiiqo ah (ka soo qaatay website-ka — /delivery, /refund-policy) ----

const HOURS_INFO = {
  so:
    'Qaadista iyo dhigista waa **bilaash** 🚚\n\n' +
    '🕘 Waqtiga: 9:00 AM – 10:00 PM (maalin kasta)\n' +
    'Waxaan idinku soo geli doonaa 2-saacadood gudahood (10 AM – 10 PM) si aan alaabta u qaadano.\n\n' +
    '⚡ Express: dhar-kaaga wuxuu kuu soo noqonayaa ku dhawaad 24 saacadood.\n\n' +
    'Su\'aal dheeraad ah → 📞 2414',
  en:
    'Pickup & delivery is **free** 🚚\n\n' +
    '🕘 Hours: 9:00 AM – 10:00 PM (daily)\n' +
    "We'll arrive within a 2-hour window (10 AM – 10 PM) to collect your items.\n\n" +
    '⚡ Express: your clothes come back in about 24 hours.\n\n' +
    'More questions → 📞 2414',
};

const REFUND_POLICY_INFO = {
  so:
    '📋 *Refund Policy — LikeNew*\n\n' +
    'Lacagta waa la celin karaa haddii:\n' +
    '• Adeegga aan la geynin\n' +
    '• Dalabka si khaldan loo geliyay\n' +
    '• Lacag laba jeer la bixiyay\n\n' +
    'Lacag lama celiyo haddii:\n' +
    '• Khalad ka dhashay xogta aad gelisay\n' +
    '• Alaabta la qaatay iyada oo aan cabasho la keenin\n\n' +
    'La xiriir: 📞 2414 / info@likenew.so',
  en:
    '📋 *Refund Policy — LikeNew*\n\n' +
    'Eligible for a refund:\n' +
    '• Service not delivered\n' +
    '• Incorrect order processing\n' +
    '• Duplicate payment\n\n' +
    'Not eligible:\n' +
    '• Customer error in order details\n' +
    '• Items collected and accepted without complaint\n\n' +
    'Contact: 📞 2414 / info@likenew.so',
};

const PRICE_INFO = {
  so:
    'Qiimaha adeegyada wuu kala duwan yahay (nooca dharka + Express/caadi ah). 💲\n\n' +
    'Eeg qiimo buuxa oo cusub bogga: 🔗 https://www.likenew.so/services1page\n\n' +
    'Ama wac 📞 2414 si aad u ogaato qiimaha alaabta gaarka ah.',
  en:
    'Prices vary by item type and service (Express/standard). 💲\n\n' +
    'See the full, up-to-date price list here: 🔗 https://www.likenew.so/services1page\n\n' +
    'Or call 📞 2414 for a specific item price.',
};

const ERROR_MSG = {
  so: '⚠️ Waan ka xumahay, hadda ma hubin karo dalabkaaga.\n\nFadlan isku day mar kale wax yar kadib.',
  en: "⚠️ Sorry, I'm unable to check your order right now.\n\nPlease try again shortly.",
};

// Su'aal ka baxsan hadafka bot-ka (qiimo, saacado, delivery, sheeko guud, iwm)
const UNKNOWN = {
  so:
    'Waan ka xumahay, si buuxda uma fahmin. 🤔\n\n' +
    'Waxaan kaa caawin karaa:\n' +
    '📦 La socodka dalabka (ii soo dir Order ID: HQ-8781 / KM5-8781)\n' +
    '🎒 Waxyaabaha la helay (qor magacaaga / ID-gaaga)\n' +
    '😠 Cabasho\n📍 Xarumaha / Lockers-ka\n💲 Qiimaha · 🕘 Saacadaha/Delivery · 📋 Refund Policy\n\n' +
    'Su’aalo kale → fadlan wac 📞 2414.',
  en:
    "Sorry, I didn't quite get that. 🤔\n\n" +
    'I can help with:\n' +
    '📦 Order tracking (send your Order ID: HQ-8781 / KM5-8781)\n' +
    '🎒 Lost & Found (type your name / ID)\n' +
    '😠 Complaints\n📍 Branches / lockers\n💲 Prices · 🕘 Hours/Delivery · 📋 Refund Policy\n\n' +
    'Anything else → please call 📞 2414.',
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
// Erayo qeexan oo luqad kasta — lagu qiimeeyo af farriinta
const SO_WORDS = new Set(
  ('waa waan waxaan waxa wuxuu waxay waxaad aan oo ku ka kaga u ii iga igu kuu noo uu ay iyo ' +
    'maya haa sidee maxay maxaa xaggee halkee goorma imisa fadlan mahadsanid walaal abaayo adeer ' +
    'dalab dalabka dalabkayga dalabkaaga hubi diyaar xarun xarunta goobta lacag dhar jeeb jeebka ' +
    'lumay lumiyay luntay raadi soo dir kayga kaaga tahay yahay miyaa anigu adigu ma haye ' +
    'ii iiga oo an baa ayaa waaye moo caawi caawimaad cabasho dhibaato ka warran ' +
    'asc salaan salam assalamu salamu')
    .split(/\s+/),
);
const EN_WORDS = new Set(
  ('the is are was were am my mine your yours you we they where when how what why which whose ' +
    "please could would should still not don't can't won't isn't aren't i'm it's that this these " +
    'those there here have has had do does did will shall about from into with for and but or ' +
    'thanks thank morning afternoon evening hello hey hi want need know tell give show order orders')
    .split(/\s+/),
);

const OPT1_RE =
  /^(1|1️⃣)$|\b(track|tracking|order|orders|status|dalab|dalabka|dalabkayga|la socod|order-?kayga|xaggee|marayaa|diyaar baa)\b/i;
const OPT2_RE = /^(2|2️⃣)$|\b(help|support|customer help|caawi|caawimaad|taageero)\b/i;
// Instruction.md "HUMAN SUPPORT" — macmiil si cad u weydiisanaya qof dhab ah
const HUMAN_RE =
  /\b(human|real person|an agent|a representative|talk to (someone|somebody|a person)|speak to (someone|somebody|a human|an agent)|customer service (rep|representative)|qof dhab ah|la hadal (qof|shaqaale)|i la xidhiidhi qof|wac shaqaale)\b/i;
const OPT3_RE =
  /^(3|3️⃣)$|\b(complaint|cabasho|dhibaato|refund|damaged|payment dispute|dhar (khaldan|maqan|luntay)|lacag(ta)? celin|celi(ya)? lacag(ta)?)\b/i;
const OPT4_RE = /^(4|4️⃣)$|\b(branch|branches|locker|lockers|xarun|xarumaha|goob|location|address|cinwaan)\b/i;
const OPT5_RE =
  /^(5|5️⃣)$|\b(lost ?(and|&) ?found|found items?|lumay|lumiyay|luntay|jeeb|jeebka|jeebabka|boorso|wallet|purse|keys?|fure|furayaal|taleefan|phone|watch|saacad|ring|kaatun|id card|kaarka|passport|baasaboor|left in (my|the)|iga tagay|iga hadhay|iga baxay|la iga waayay)\b/i;
// "found Ahmed Zaki" / "la helay 11250" / "raadi 0615..." -> raadin haadlinks
const LF_SEARCH_RE = /^(found|la\s?helay|laga\s?helay|raadi|search|waxyaabaha)\b[\s:,-]*(.{2,})$/i;

// FAQ xaqiiqo ah (soo qaatay website-ka) — waa in ay ka horreeyaan OPT3/OPT5
// si "refund policy" aanu u dhicin Complaint, "saacad" aanu u dhicin Lost&Found.
const HOURS_RE =
  /\b(hours?|saacadaha( shaqada)?|waqtiga shaqada|working ?hours|opening ?hours|what time (do you|are you)|when (do you|are you) open|when.*(open|close)|delivery time|pickup time|free delivery|geli (goorma|waqtiga))\b/i;
const REFUND_POLICY_RE =
  /\b(refund policy|policy (on|for) refund|siyaasadd?a (lacag ?celinta|celinta)|refund ?policy)\b/i;
const PRICE_RE = /\b(price|prices|pricing|cost|how much (is|does|are)|qiime|qiimaha|imisa (ayay|buu|bay|baa))\b/i;

// Aqoonso afka farriinta: qiimee erayada Soomaali vs Ingiriisi.
// Isku-mid ama midna la'aan -> Soomaali (macmiisha badankood).
function pickLang(text) {
  const t = String(text || '').toLowerCase();
  if (/[؀-ۿ]/.test(t)) return 'so'; // far Carabi -> xaalad Soomaali
  const words = t.match(/[a-z']+/g) || [];
  let so = 0;
  let en = 0;
  for (const w of words) {
    if (SO_WORDS.has(w)) so += 1;
    if (EN_WORDS.has(w)) en += 1;
  }
  if (so > en) return 'so';
  if (en > so) return 'en';
  return en > 0 ? 'en' : 'so';
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
  // "I want to talk to a human" -> joojii tracking flow-ka, bixi human support
  if (HUMAN_RE.test(rawText)) return { success: false, intent: 'HUMAN_SUPPORT', reply: HUMAN_SUPPORT[lang] };
  // "found <query>" -> raadi haadlinks (OPT5 ka hor)
  const lf = rawText.match(LF_SEARCH_RE);
  if (lf && lf[2] && lf[2].trim().length >= 2) {
    return await searchLostFound(lf[2].trim(), lang);
  }
  // FAQ xaqiiqo ah — ka hor OPT3/OPT5 si "refund policy"/"saacad" aanay u
  // dhicin Complaint/Lost&Found qalad ah.
  if (HOURS_RE.test(rawText)) return { success: false, intent: 'HOURS', reply: HOURS_INFO[lang] };
  if (REFUND_POLICY_RE.test(rawText))
    return { success: false, intent: 'REFUND_POLICY', reply: REFUND_POLICY_INFO[lang] };
  if (PRICE_RE.test(rawText)) return { success: false, intent: 'PRICE', reply: PRICE_INFO[lang] };

  // OPT5 (lost & found) OPT3 ka hor — "lost wallet" -> Lost&Found, maaha Complaint
  if (OPT5_RE.test(rawText)) return { success: false, intent: 'LOST_FOUND', reply: LOST_FOUND[lang] };
  if (OPT3_RE.test(rawText)) return { success: false, intent: 'COMPLAINT', reply: COMPLAINT[lang] };
  if (OPT4_RE.test(rawText)) return { success: false, intent: 'BRANCHES', reply: BRANCHES[lang] };

  // FALLBACK ka hor: text-ku ma u eg yahay magac / telefoon / ID?
  // -> isku day raadin Lost & Found
  const looksLikeName = /^[\p{L}][\p{L}\s.'’-]{3,40}$/u.test(rawText) && /\s/.test(rawText);
  const looksLikePhone = /^\+?\d[\d\s-]{5,14}\d$/.test(rawText);
  const looksLikeId = /^\d{3,8}$/.test(rawText);

  // Telefoon/ID = calaamad adag (aan macno kale lahayn) -> had iyo jeer
  // jawaab gaar ah ("wax lama helin"), ha noqon menu guud.
  if (looksLikePhone || looksLikeId) {
    return await searchLostFound(rawText, lang, false);
  }
  // Magac (2+ eray) = calaamad ka daciifsan -> silent (wax lama helin -> menu)
  if (looksLikeName) {
    const r = await searchLostFound(rawText, lang, true);
    if (r) return r;
  }

  // Su'aal ka baxsan hadafka bot-ka
  return { success: false, intent: 'UNKNOWN', reply: UNKNOWN[lang] };
}

// ---- WATI send API ----
async function sendWatiMessage(waId, text) {
  const endpoint = process.env.WATI_API_ENDPOINT; // e.g. https://live-mt-server.wati.io/10233063
  const token = process.env.WATI_API_TOKEN; // "Bearer eyJ..." ama "eyJ..."
  if (!endpoint || !token) {
    console.error('WATI_API_ENDPOINT / WATI_API_TOKEN lama dejin');
    return { sent: false, reason: 'not_configured' };
  }
  // Nadiifi token-ka: ka saar xaraf kasta oo aan ASCII ahayn (•, newline).
  const rawTok = String(token).replace(/[^\x20-\x7E]/g, '').trim();
  const bare = rawTok.replace(/^bearer\s+/i, ''); // token-ka oo qura
  const base = endpoint.replace(/[^\x20-\x7E]/g, '').replace(/\/$/, '');
  const digits = String(waId).replace(/\D/g, '');

  const qs = new URLSearchParams({ messageText: String(text) }).toString();
  const url = `${base}/api/v1/sendSessionMessage/${digits}?${qs}`;

  // Isku day "Bearer <tok>" marka hore, haddii 401 -> isku day "<tok>" qura
  const attempts = [`Bearer ${bare}`, bare];
  let last = null;
  for (const auth of attempts) {
    try {
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
      if (res.ok && !(data && data.result === false)) {
        return { sent: true, data };
      }
      last = { sent: false, status: res.status, data: String(raw).slice(0, 200) };
      console.error('WATI send failed', res.status, String(raw).slice(0, 200));
      if (res.status !== 401 && res.status !== 403) break; // 401/403 kaliya ku celi
    } catch (e) {
      last = { sent: false, error: String(e) };
      console.error('WATI send error', String(e), '| base=', base);
      break;
    }
  }
  return last || { sent: false };
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

      return NextResponse.json({
        ok: true,
        intent: result.intent || null,
        sent: sendRes.sent,
        ...(sendRes.sent ? {} : { debug: sendRes }),
      });
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

// ---- Lost & Found: raadi haadlinks ----
// silentIfEmpty: haddii run oo wax lama helin -> null (caller -> menu)
async function searchLostFound(query, lang, silentIfEmpty = false) {
  let items = null;
  try {
    const res = await fetch(
      `https://www.haadlinks.com/api/public/customer-items/search?q=${encodeURIComponent(query)}`,
      { headers: { accept: 'application/json' } },
    );
    const data = await res.json().catch(() => null);
    if (res.ok && Array.isArray(data)) items = data;
    else if (res.ok && data && Array.isArray(data.items)) items = data.items;
  } catch (e) {
    console.error('haadlinks search error', String(e));
    if (silentIfEmpty) return null;
    return { success: false, intent: 'LF_ERROR', reply: ERROR_MSG[lang] };
  }

  if (!items || items.length === 0) {
    if (silentIfEmpty) return null;
    return {
      success: false,
      intent: 'LF_NONE',
      reply:
        lang === 'en'
          ? `🔎 No items found for *"${query}"*.\n\nPlease check the name/ID or visit your branch. 📞 2414`
          : `🔎 Wax lama helin *"${query}"*.\n\nFadlan hubi magaca/ID-ga ama booqo xarunta. 📞 2414`,
    };
  }

  const shown = items.slice(0, 5);
  const lines = shown.map((it, i) => {
    const st = LF_STATUS[String(it.status || '').toUpperCase()];
    const statusTxt = st ? st[lang] : it.status || '';
    const meta = [it.branch && `${it.branch}`, it.customerId && `ID ${it.customerId}`, it.date]
      .filter(Boolean)
      .join(' · ');
    return (
      `${i + 1}) *${it.customerName || query}*\n` +
      (meta ? `   ${meta}\n` : '') +
      (statusTxt ? `   ${statusTxt}\n` : '') +
      (it.description ? `   ${it.description}` : '')
    ).trim();
  });

  const head =
    lang === 'en'
      ? `🎒 Lost & Found — "${query}"\n\n`
      : `🎒 Waxyaabaha la helay — "${query}"\n\n`;
  const foot =
    lang === 'en'
      ? `\n\nFor held items, please visit your branch to collect. 📞 2414`
      : `\n\nAlaabta la hayo, fadlan booqo xarunta si aad u qaadato. 📞 2414`;
  const more =
    items.length > shown.length
      ? lang === 'en'
        ? `\n\n(+${items.length - shown.length} more — see https://found.likenew.so)`
        : `\n\n(+${items.length - shown.length} kale — eeg https://found.likenew.so)`
      : '';

  return { success: true, intent: 'LF_RESULTS', count: items.length, reply: head + lines.join('\n\n') + more + foot };
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
