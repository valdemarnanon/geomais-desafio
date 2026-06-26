const normalizarTexto = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

export const validateSearch = (search: string, handleData: any[] = []) => {
  const filteredRows = handleData.filter((item) =>
    normalizarTexto(item?.nome ?? '').includes(normalizarTexto(search))
  )
  return filteredRows
}