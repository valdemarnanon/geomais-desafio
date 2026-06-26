type CollumnsType = {
    title: string
    dataIndex: string
    key: string
}

export const columns = () => {
    const baseColumns: CollumnsType[] = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome'
        },
        {
            title: 'CPF',
            dataIndex: 'cpf',
            key: 'cpf'
        },
        {
            title: 'RG',
            dataIndex: 'rg',
            key: 'rg'
        },
        {
            title: 'Data de Nascimento',
            dataIndex: 'data_nasc',
            key: 'data_nasc'
        },
        {
            title: 'Sexo',
            dataIndex: 'sexo',
            key: 'sexo'
        }
    ]

    return baseColumns
}