export const formatDT = (dt: string) => {
  return dt
    .replace(/\D/g, '') // remove tudo que não for numero
    .slice(0, 8)
    .replace(/^(\d{2})(\d)/, '$1/$2')
    .replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3')
}