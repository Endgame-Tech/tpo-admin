export function formatToNumber(number = 0, decimals = 0) {
    if (isNaN(number)) {
      number = 0;
    }
  
    return new Intl.NumberFormat(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(number);
  }