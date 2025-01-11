function statusPlus(currentStatus) {
  switch (currentStatus) {
    case "pending":
      return "preparing";
    case "preparing":
      return "ready";
    case "ready":
      return "completed";
    default:
      return "completed";
  }
}
const statusPlusBackend = (currentStatus) => {
  const statusOrder = ["pending", "preparing", "ready", "completed"];
  const currentIndex = statusOrder.indexOf(currentStatus);
  if (currentIndex === -1 || currentIndex === statusOrder.length - 1) {
    return currentStatus;
  }
  return statusOrder[currentIndex + 1];
};
export {
  statusPlus as a,
  statusPlusBackend as s
};
