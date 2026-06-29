export const validateCPF = (cpf: string) => {

  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
  if (cpfRegex.test(cpf)) {
    return cpf.replace(/\D/g, '')
  }
  return cpf
}
