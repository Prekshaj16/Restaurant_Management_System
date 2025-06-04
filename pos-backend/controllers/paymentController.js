const createOrder = async (req, res, next) => {
  return res.status(400).json({
    success: false,
    message: "Payment failed: Order creation is disabled.",
  });
};

const verifyPayment = async (req, res, next) => {
  return res.status(400).json({
    success: false,
    message: "Payment verification failed!",
  });
};

const webHookVerification = async (req, res, next) => {
  return res.status(400).json({
    success: false,
    message: "Webhook verification failed!",
  });
};

module.exports = {
  createOrder,
  verifyPayment,
  webHookVerification,
};
