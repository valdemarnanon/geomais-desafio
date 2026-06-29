import { useEffect, useState } from 'react'
import { Button, Flex, Form, Input, Modal, Select, Table } from 'antd'
import { columns } from './columns'
import './App.css'

import { validateSearch } from "../utils/validateSearch"
import type { Data } from './interfaces'

function App () {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [search, setSearch] = useState('')
  const [data, setData] = useState<Data[]>([])
  const [form] = Form.useForm()

  useEffect(() => {
    fetch("http://localhost:3000/db")
      .then(response => response.json())
      .then((data) => {
        setData(data.pessoas)
      })
      .catch(err => console.log(err))
  }, [])


  const showModal = () => {
    setIsOpenModal(true)
    form.resetFields()
  }

  const handleOk = async () => {
    const values = await form.validateFields()
    let sex: string;

    if (values.sexo === 'M') sex = 'Masculino'
    if (values.sexo === 'F') sex = 'Feminino'

    setData((prev) => {
      return [
        ...prev,
        {
          id: Math.max(...prev.map(item => item.id), 0) + 1,
          nome: values.nome,
          cpf: values.cpf,
          rg: values.rg,
          data_nasc: values.data_nasc,
          sexo: sex
        }
      ]
    })
    setIsOpenModal(false)
  }

  const filteredRows = validateSearch(search, data)

  const handleRemove = (record: Data) => {
    console.log("🚀 ~ handleRemove ~ record:", record)
    if (!record) return

    setData(data.filter(item => item.id !== record.id))
  }

  const handleCancel = () => {
    setIsOpenModal(false)
  }

  return (
    <Form form={form} layout='vertical'>
      <Flex>
        <Button type='primary' onClick={showModal}>Adicionar</Button>
        <Modal
          title="Adicionar Pessoa"
          closable={{ 'aria-label': 'Custom Close Button' }}
          open={isOpenModal}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form.Item name='nome' label='Nome:'>
            <Input type='text' placeholder='Digite seu nome...' />
          </Form.Item>
          <Form.Item name='cpf' label='CPF:'>
            <Input type='text' placeholder='Digite seu CPF...' />
          </Form.Item>
          <Form.Item name='rg' label='RG:'>
            <Input type='text' placeholder='Digite seu RG...' />
          </Form.Item>
          <Form.Item name='data_nasc' label='Data de Nascimento:'>
            <Input type='text' placeholder='Digite sua data de...' />
          </Form.Item>
          <Form.Item name="sexo" label='Sexo:'>
            <Select>
              <Select.Option value="M">Masculino</Select.Option>
              <Select.Option value="F">Feminino</Select.Option>
            </Select>
          </Form.Item>
        </Modal>

        <Input type='text' placeholder='Pesquisar...' value={search} onChange={(e) => setSearch(e.target.value)} />
      </Flex>
      <Table columns={columns({ handleRemove }) as []} dataSource={filteredRows} />
    </Form >
  )
}

export default App
