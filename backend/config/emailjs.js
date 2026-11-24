import emailjs from "@emailjs/nodejs";

const sendMail = async (to, subject, html) => {
  const {
    EMAILJS_SERVICE_ID: serviceId,
    EMAILJS_TEMPLATE_ID: templateId,
    EMAILJS_PUBLIC_KEY: publicKey,
    EMAILJS_PRIVATE_KEY: privateKey,
  } = process.env;

  try {
    const missing = Object.entries({
      EMAILJS_SERVICE_ID: serviceId,
      EMAILJS_TEMPLATE_ID: templateId,
      EMAILJS_PUBLIC_KEY: publicKey,
      EMAILJS_PRIVATE_KEY: privateKey,
    })
      .filter(([, value]) => !value)
      .map(([name]) => name);

    if (missing.length) {
      throw new Error(
        `Missing EmailJS environment variables: ${missing.join(", ")}`
      );
    }

    await emailjs.send(
      serviceId,
      templateId,
      { to_email: to, subject, html },
      { publicKey, privateKey }
    );

    console.log("EmailJS email sent successfully");
    return true;
  } catch (error) {
    console.error("EmailJS email sending failed:", error);
    return false;
  }
};

export default sendMail;
