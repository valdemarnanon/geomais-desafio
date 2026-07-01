export const validarCPF = (_: unknown, value: string) => {
    const cpf = value?.replace(/[^\d]+/g, '')

    if (!cpf) {
        return Promise.resolve()
    }

    if (cpf.length !== 11) {
        return Promise.reject(new Error('CPF deve ter 11 dígitos'))
    }

    return Promise.resolve()
}