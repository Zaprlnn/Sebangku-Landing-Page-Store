// TODO: Integrate with Midtrans SDK
export async function initiateMidtrans(orderId: string, amount: number) {
  // TODO: Call Midtrans API to get snap token
  throw new Error("Not implemented");
}

export async function handleWebhook(payload: any) {
  // TODO: Verify Midtrans signature and update order status
  throw new Error("Not implemented");
}
