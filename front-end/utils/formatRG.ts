export const formatRG = (rg: string) => {
    return rg
        .replace(/\D/g, '') // remove tudo que não for numero
        .slice(0, 9)
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
}