export function getUserData(data: any[] | null) {
    const userCount = data?.length || 1
    const verifiedUsers = data?.filter(user => user.is_verified_user === true)
    const verifiedUsersCount = verifiedUsers?.length || 0
    const verifiedUsersAsPercentage = formatToNumber((verifiedUsersCount/userCount) * 100,2)
  return { userCount, verifiedUsersAsPercentage };
}


export function getVotersData(data: any[] | null) {
    const userCount = data?.length || 1
    const voters = data?.filter(user => user.is_registered === 'yes')
    const votersCount = voters?.length || 0
    const votersAsPercentage = formatToNumber((votersCount/userCount) * 100,2)
  return { votersCount, votersAsPercentage };
}

export function getVolunteersData(data: any[] | null) {
    const userCount = data?.length || 1
    const volunteers = data?.filter(user => user.is_volunteering === 'yes')
    const volunteersCount = volunteers?.length || 0
    const volunteersAsPercentage = formatToNumber((volunteersCount/userCount) * 100,2)
  return { volunteersCount, volunteersAsPercentage };
}

export function getDeactivatedAccountsData(data: any[] | null) {
    const userCount = data?.length || 1
    const deactivatedAccounts = data?.filter(user => user.is_active === false)
    const deactivatedAccountsCount = deactivatedAccounts?.length || 0
    const deactivatedAccountsAsPercentage = formatToNumber((deactivatedAccountsCount/userCount) * 100,2)
  return {  deactivatedAccountsCount,  deactivatedAccountsAsPercentage };
}


export function formatToNumber(number = 0, decimals = 0) {
  if (isNaN(number)) {
    number = 0;
  }

  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number);
}