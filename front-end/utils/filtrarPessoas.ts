import type { Data } from "../src/interfaces"

export function filtrarPessoas(data: Data[], search: string, sexoFilter: string | undefined) {
  return data.filter((pessoa) => {
    const termo = search.toLowerCase()

    const matchSearc = 
      pessoa.nome.toLowerCase().includes(termo) ||
      pessoa.cpf.includes(termo) ||
      pessoa.rg.includes(termo)

    const matchSexo =
      !sexoFilter || pessoa.sexo === sexoFilter

    return matchSearc && matchSexo
  })
}