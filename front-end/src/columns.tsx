import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Flex } from "antd"
import type { Data } from "./interfaces"

type CollumnsType = {
    title: string
    dataIndex: string
    key: string
    render?: (_: never, record: Data) => void
}

type ColumnsProps = {
    handleRemove: (record: Data) => void
    handleEdit: (record: Data) => void
}

export const columns = ({ handleRemove, handleEdit }: ColumnsProps) => {
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
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Flex gap={5}>
                    <Button
                        icon={<EditOutlined />}
                        type="primary"
                        ghost
                        onClick={() => handleEdit(record)}
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        type="primary"
                        ghost
                        onClick={() => handleRemove(record)}
                    />
                </Flex>
            )
        }
    ]

    return baseColumns
}