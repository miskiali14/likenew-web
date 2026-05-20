import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const apiToken = process.env.NEXT_PUBLIC_CLEANCLOUD_TOKEN;

    // 1. Hubi haddii uu Express yahay
    const isExpress = body.express === 1 || body.express === "1";

    const formatSomaliPhone = (phone) => {
      if (!phone) return null;
      let cleaned = String(phone).replace(/\D/g, "");
      if (cleaned.startsWith("0")) cleaned = "252" + cleaned.slice(1);
      if (cleaned.length === 9) cleaned = "252" + cleaned;
      return cleaned;
    };

    const phone = formatSomaliPhone(body.customer_phone);
    if (!phone) {
      return NextResponse.json({ status: "error", message: "Invalid phone number" }, { status: 400 });
    }

    // ADD CUSTOMER
    const customerResponse = await fetch("https://cleancloudapp.com/api/addCustomer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_token: apiToken,
        customerName: body.customer_name || "Guest Customer",
        customerTel: phone,
        customerEmail: body.email || `customer${Date.now()}@safinaapp.com`,
      }),
    });

    const customerResult = await customerResponse.json();
    const customerID = customerResult.CustomerID || customerResult.customerID;

    // =========================================
    // 2. XALKA XISAABTA (50% EXTRA FOR EXPRESS)
    // =========================================
    let runningTotal = 0;
    const inputProducts = body.products || [];

    const productsArray = inputProducts.map((p) => {
      let itemPrice = parseFloat(p.price || 0);
      const itemQty = parseInt(p.quantity) || 1;

      // MUHIIM: Haddii uu Express yahay, ku dar 50% (Qiimaha * 1.5)
      if (isExpress) {
        itemPrice = itemPrice * 1.5;
      }

      runningTotal += (itemPrice * itemQty);
      
      return {
        id: "0",
        name: String(p.name || "Laundry Item"),
        price: String(itemPrice.toFixed(2)), 
        quantity: itemQty,
        pieces: parseInt(p.pieces) || itemQty,
      };
    });

    // Xisaabi Final Total-ka
    let finalOrderTotal;
    if (inputProducts.length > 0) {
      finalOrderTotal = runningTotal.toFixed(2);
    } else {
      let baseTotal = parseFloat(body.total || 0);
      // Haddii aysan alaab jirin, wadarta guud ku dar 50%
      finalOrderTotal = isExpress ? (baseTotal * 1.5).toFixed(2) : baseTotal.toFixed(2);
    }

    // 3. ADD ORDER
    const orderResponse = await fetch("https://cleancloudapp.com/api/addOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_token: apiToken,
        customerID: customerID, 
        finalTotal: String(finalOrderTotal), 
        express: isExpress ? 1 : 0, 
        products: productsArray,
        orderNotes: body.customer_note || "",
        pickupDate: new Date().toISOString().split('T')[0],
        pickupStart: "9am", 
        pickupEnd: "6pm",
      }),
    });

    const orderResult = await orderResponse.json();

    if (orderResult.Success === "True") {
      return NextResponse.json({
        status: "success",
        orderID: orderResult.orderID || orderResult.OrderID,
      });
    }

    return NextResponse.json({
      status: "error",
      message: "Order API Error: " + (orderResult.Error || "Failed"),
      data: orderResult,
    }, { status: 400 });

  } catch (error) {
    return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
  }
}