const escapeHtml = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });

const formatPrice = (value) => {
  const amount = Number(value);
  return Number.isFinite(amount)
    ? `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`
    : "—";
};

const getOrderDate = (value) => {
  const date = new Date(Number(value));
  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
};

const getProductImage = (image) => {
  const imageUrl = Array.isArray(image) ? image[0] : image;
  if (typeof imageUrl !== "string") return "";

  try {
    const parsedUrl = new URL(imageUrl);
    return parsedUrl.protocol === "https:" &&
      parsedUrl.hostname === "res.cloudinary.com"
      ? escapeHtml(parsedUrl.href)
      : "";
  } catch {
    return "";
  }
};

const buildProductRows = (items) =>
  items
    .map((item) => {
      const name = escapeHtml(item.name || "FOREVER item");
      const size = escapeHtml(item.size || "—");
      const quantity = Number(item.quantity) || 0;
      const imageUrl = getProductImage(item.image);
      const image = imageUrl
        ? `<img src="${imageUrl}" width="76" height="92" alt="${name}" style="display:block; width:76px; height:92px; object-fit:cover; border:0; border-radius:4px; background-color:#efede7;">`
        : `<div style="width:76px; height:92px; background-color:#efede7; color:#a6533d; font-family:Georgia,serif; font-size:12px; line-height:92px; text-align:center;">FOREVER</div>`;

      return `
        <tr>
          <td width="92" valign="top" style="padding:16px 12px 16px 0; border-bottom:1px solid #e7e4dc;">
            ${image}
          </td>
          <td valign="middle" style="padding:16px 8px; border-bottom:1px solid #e7e4dc; font-family:Arial,sans-serif;">
            <div style="color:#242722; font-size:14px; font-weight:700; line-height:1.45;">${name}</div>
            <div style="margin-top:7px; color:#777a72; font-size:12px; line-height:1.6;">SIZE&nbsp; ${size} &nbsp;·&nbsp; QTY&nbsp; ${quantity}</div>
            <div style="margin-top:5px; color:#777a72; font-size:12px;">${formatPrice(item.price)} each</div>
          </td>
          <td width="95" align="right" valign="middle" style="padding:16px 0 16px 8px; border-bottom:1px solid #e7e4dc; color:#242722; font-family:Arial,sans-serif; font-size:13px; font-weight:600; white-space:nowrap;">
            ${formatPrice(Number(item.price) * quantity)}
          </td>
        </tr>`;
    })
    .join("");

export const buildWelcomeEmail = (name) => `
  <div style="font-family:Arial,sans-serif; color:#242722;">
    <p style="margin:0 0 12px; color:#a6533d; font-size:10px; font-weight:700; letter-spacing:2px; text-transform:uppercase;">A WARM WELCOME</p>
    <h1 style="margin:0; color:#242722; font-family:Georgia,'Times New Roman',serif; font-size:32px; font-weight:400; line-height:1.2;">Good style, meet your everyday.</h1>
    <p style="margin:18px 0 0; color:#242722; font-size:15px; line-height:1.8;">Hi ${escapeHtml(name || "there")},</p>
    <p style="margin:8px 0 0; color:#777a72; font-size:14px; line-height:1.8;">Your FOREVER account is ready. Discover thoughtful everyday pieces, made to move with you and stay in style.</p>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:26px;">
      <tr>
        <td bgcolor="#a6533d" style="border-radius:2px;">
          <a href="https://wear-forever.vercel.app" style="display:inline-block; padding:14px 22px; color:#fffefa; font-family:Arial,sans-serif; font-size:11px; font-weight:700; letter-spacing:1.5px; text-decoration:none; text-transform:uppercase;">Explore the collection&nbsp; →</a>
        </td>
      </tr>
    </table>
    <p style="margin:24px 0 0; color:#777a72; font-size:12px; line-height:1.7;">Thanks for making FOREVER part of your story.</p>
  </div>`;

export const buildOrderEmail = ({
  customerName,
  order,
  eyebrow,
  title,
  message,
}) => {
  const items = Array.isArray(order.items) ? order.items : [];
  const address = order.address || {};
  const addressLines = [
    address.street,
    [address.city, address.state].filter(Boolean).join(", "),
    [address.zipcode, address.country].filter(Boolean).join(" "),
  ]
    .filter(Boolean)
    .map(escapeHtml);
  const addressName = [address.firstName, address.lastName]
    .filter(Boolean)
    .map(escapeHtml)
    .join(" ");
  const paymentLabel =
    order.paymentMethod === "COD"
      ? "Cash on delivery"
      : order.payment
        ? "Paid"
        : "Payment pending";

  return `
    <div style="font-family:Arial,sans-serif; color:#242722;">
      <p style="margin:0 0 12px; color:#a6533d; font-size:10px; font-weight:700; letter-spacing:2px; text-transform:uppercase;">${escapeHtml(eyebrow)}</p>
      <h1 style="margin:0; color:#242722; font-family:Georgia,'Times New Roman',serif; font-size:30px; font-weight:400; line-height:1.2;">${escapeHtml(title)}</h1>
      <p style="margin:14px 0 0; color:#242722; font-size:15px; line-height:1.7;">Hi ${escapeHtml(customerName || "there")},</p>
      <p style="margin:6px 0 0; color:#777a72; font-size:14px; line-height:1.8;">${escapeHtml(message)}</p>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:24px; border:1px solid #e7e4dc; background-color:#f8f7f3;">
        <tr>
          <td style="padding:14px 16px; border-bottom:1px solid #e7e4dc;">
            <div style="color:#777a72; font-size:9px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;">ORDER NUMBER</div>
            <div style="margin-top:5px; color:#242722; font-size:13px; font-weight:700; word-break:break-all;">#${escapeHtml(order._id)}</div>
          </td>
          <td align="right" style="padding:14px 16px; border-bottom:1px solid #e7e4dc;">
            <div style="color:#777a72; font-size:9px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;">ORDER DATE</div>
            <div style="margin-top:5px; color:#242722; font-size:12px;">${getOrderDate(order.date)}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:13px 16px;">
            <div style="color:#777a72; font-size:9px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;">ORDER STATUS</div>
            <div style="margin-top:5px; color:#a6533d; font-size:12px; font-weight:700;">${escapeHtml(order.status || "Order Placed")}</div>
          </td>
          <td align="right" style="padding:13px 16px;">
            <div style="color:#777a72; font-size:9px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;">PAYMENT</div>
            <div style="margin-top:5px; color:#242722; font-size:12px;">${escapeHtml(order.paymentMethod || "—")} · ${paymentLabel}</div>
          </td>
        </tr>
      </table>

      <h2 style="margin:28px 0 4px; color:#242722; font-family:Georgia,'Times New Roman',serif; font-size:21px; font-weight:400;">Your pieces</h2>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tbody>${buildProductRows(items)}</tbody>
      </table>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:8px;">
        <tr>
          <td style="padding:13px 0; color:#777a72; font-size:12px;">${items.length} ${items.length === 1 ? "item" : "items"}</td>
          <td align="right" style="padding:13px 0; color:#242722; font-size:16px; font-weight:700;">TOTAL&nbsp; ${formatPrice(order.amount)}</td>
        </tr>
      </table>

      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:12px; border-top:1px solid #e7e4dc;">
        <tr>
          <td style="padding-top:16px;">
            <div style="color:#777a72; font-size:9px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;">DELIVERING TO</div>
            <div style="margin-top:7px; color:#242722; font-size:12px; font-weight:600;">${addressName || escapeHtml(customerName || "Customer")}</div>
            ${addressLines.map((line) => `<div style="margin-top:3px; color:#777a72; font-size:12px; line-height:1.6;">${line}</div>`).join("")}
            ${address.phone ? `<div style="margin-top:3px; color:#777a72; font-size:12px;">${escapeHtml(address.phone)}</div>` : ""}
          </td>
        </tr>
      </table>
    </div>`;
};
