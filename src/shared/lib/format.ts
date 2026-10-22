const integer = new Intl.NumberFormat('en')
const decimal = new Intl.NumberFormat('en', { maximumFractionDigits: 2 })

export function formatNumber(value: number) {
  return integer.format(value)
}

export function formatDecimal(value: number) {
  return decimal.format(value)
}

export function formatBytes(bytes: number) {
  const megabytes = bytes / 1024 / 1024

  return megabytes < 1
    ? `${formatDecimal(bytes / 1024)} KB`
    : `${formatDecimal(megabytes)} MB`
}
