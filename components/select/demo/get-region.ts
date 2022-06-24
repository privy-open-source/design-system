function searchAndPaging<T extends { name: string }> (data: T[], keyword = '', page = 1, perPage = 20): T[] {
  const start = (page - 1) * perPage
  const until = start + perPage

  return data.filter((item) => {
    return item.name
      .toLowerCase()
      .includes(keyword.toLowerCase())
  }).slice(start, until)
}

export async function getProvinces (keyword = '', page = 1, perPage = 20) {
  const { default: provinces } = await import('./api/province')
  const data                   = searchAndPaging(provinces, keyword, page, perPage)

  return { data }
}

export async function getCities (id: string, keyword = '', page = 1, perPage = 20) {
  const { default: regencies } = await import(`./api/regencies/${id}.ts`)
  const data                   = searchAndPaging(regencies, keyword, page, perPage)

  return { data }
}
