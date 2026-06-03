export function simulatePayment() {
  return new Promise((resolve) => {
    const delay = 2000 + Math.random() * 1500
    setTimeout(() => {
      const approved = Math.random() < 0.8
      resolve({
        approved,
        transactionId: `TXN-${Date.now()}`,
        message: approved
          ? 'Pagamento aprovado com sucesso!'
          : 'Pagamento recusado. Tente novamente.',
      })
    }, delay)
  })
}
