const sendEmail = (email, subject, text) => {
  const json = { email: email, subject: subject, text: text };
  return window
    .fetch("/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    })
    .then((a) => {
      console.log(a);
    })
    .catch((a) => {
      console.log(a);
    });
};

const api = {
  sendEmail: sendEmail,
};

export default api;
