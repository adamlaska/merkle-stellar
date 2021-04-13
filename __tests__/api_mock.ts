const apiMockDataFile = (url: string): string | null => {
  if (
    url.indexOf('https://horizon.stellar.org/accounts/GA72FQOMHYUCNEMZN7GY6OBWQTQEXYL43WPYCY2FE3T452USNQ7KSV6E/transactions?order=desc') ==
    0
  ) {
    return './data/horizon.json'
  }
  if (url.indexOf('https://horizon.stellar.org/ledgers/27966265') == 0) {
    return './data/ledger.json'
  }
  const tab: {[key: string]: any} = {
    'https://keybase.io/_/api/1.0/merkle/path.json?uid=dbb165b7879fe7b1174df73bed0b9500&start_hash256=178bcfd7696baea2cd26f5ddcfe8a466fcd7df2d1f8134ab4b55370ea5793414':
      './data/path_by_uid_max.json',
    'https://keybase.io/_/api/1.0/sig/get.json?uid=dbb165b7879fe7b1174df73bed0b9500': './data/sigs_for_max.json',
    'https://keybase.io/_/api/1.0/merkle/path.json?username=max&start_hash256=178bcfd7696baea2cd26f5ddcfe8a466fcd7df2d1f8134ab4b55370ea5793414':
      './data/path_by_username_max.json',
  }
  const ret = tab[url]
  if (ret) {
    return ret
  }
}

const apiMockData = (url: string): any => {
  const file = apiMockDataFile(url)
  if (!file) {
    throw new Error(`unhandled mock API call ${url}`)
  }
  return require(file)
}

export const apiMock = (url: string): Promise<unknown> => {
  const data = apiMockData(url)
  return Promise.resolve({data: data})
}
