import { useEffect, useState } from 'react'
import './App.css'
import { Button, Flex, Form, Input, Modal, Table } from 'antd'
import { columns } from './columns'

import { validateSearch } from "../utils/validateSearch"

type Data = {
  nome: string
  cpf: string
  rg: string
  data_nasc: string
  sexo: string
}

function App () {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [search, setSearch] = useState('')
  const [data, setData] = useState<Data[]>([])
  console.log("🚀 ~ App ~ data:", data)
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
    if (!values) return

    setData((prev) => {
      return [
        ...prev,
        {
          nome: values.nome,
          cpf: values.cpf,
          rg: values.rg,
          data_nasc: values.data_nasc,
          sexo: values.sexo
        }
      ]
    })
    setIsOpenModal(false)
  }
  const handleCancel = () => {
    setIsOpenModal(false)
  }

  const filteredRows = validateSearch(search, data)

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
            <Input type='text' placeholder='Digite...' />
          </Form.Item>
          <Form.Item name='cpf' label='CPF:'>
            <Input type='text' placeholder='Digite...' />
          </Form.Item>
          <Form.Item name='rg' label='RG:'>
            <Input type='text' placeholder='Digite...' />
          </Form.Item>
          <Form.Item name='data_nasc' label='Dt Nascimento:'>
            <Input type='text' placeholder='Digite...' />
          </Form.Item>
          <Form.Item name='sexo' label='Sexo:'>
            <Input type='text' placeholder='Digite...' />
          </Form.Item>
        </Modal>

        <Input type='text' placeholder='Pesquisar...' value={search} onChange={(e) => setSearch(e.target.value)} />
      </Flex>
      <Table columns={columns()} dataSource={filteredRows} />
    </Form >
  )
}

export default App
