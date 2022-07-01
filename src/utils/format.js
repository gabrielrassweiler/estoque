
const formatMoney = (currency) => {
  return currency.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  })
}

export {
  formatMoney
}
