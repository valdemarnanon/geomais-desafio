import { useEffect, useState } from 'react'
import { Button, Flex, Form, Input, Modal, Select, Table } from 'antd'
import { columns } from './columns'
import './App.css'

import { validateSearch } from "../utils/validateSearch"
import { formatCPF } from "../utils/formatCPF"
import { formatRG } from "../utils/formatRG"
import { formatDT } from "../utils/formatDT"

import type { Data } from './interfaces'

const API_URL = 'http://localhost:3000/pessoas'

function App () {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [edit, setEdit] = useState<Data | null>(null)
  const [search, setSearch] = useState('')
  const [data, setData] = useState<Data[]>([])
  const [form] = Form.useForm()

  const carregarPessoas = async () => {
    const response = await fetch(API_URL)
    const pessoas = await response.json()

    setData(pessoas)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregarPessoas()
  }, [])

  const showModal = () => {
    setIsOpenModal(true)
    form.resetFields()
  }

  const handleOk = async () => {
    const values = await form.validateFields()

    const pessoa = {
      ...values,
      sexo: values.sexo === 'M' ? 'Masculino' : 'Feminino'
    }

    if (edit) {
      await fetch(`${API_URL}/${edit.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pessoa)
      })

      await carregarPessoas()

      setEdit(null)
      form.resetFields()
      setIsOpenModal(false)

      return
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pessoa)
    })

    const pessoaCriada = await response.json()

    setData(prev => [...prev, pessoaCriada])

    form.resetFields()
    setIsOpenModal(false)
  }


  const handleRemove = async (record: Data) => {
    await fetch(`${API_URL}/${record.id}`, {
      method: 'DELETE'
    })

    setData(data.filter(item => item.id !== record.id))
  }

  const handleEdit = async (record: Data) => {
    setEdit(record)

    form.setFieldsValue({
      nome: record.nome,
      cpf: record.cpf,
      rg: record.rg,
      data_nasc: record.data_nasc,
      sexo: record.sexo === 'Masculino' ? 'M' : 'F'
    })

    setIsOpenModal(true)
  }


  const handleCPF = (value: string) => {
    form.setFieldsValue({
      cpf: formatCPF(value)
    })
  }

  const handleRG = (value: string) => {
    form.setFieldsValue({
      rg: formatRG(value)
    })
  }

  const handleDT = (value: string) => {
    form.setFieldsValue({
      data_nasc: formatDT(value)
    })
  }

  const filteredRows = validateSearch(search, data)

  const handleCancel = () => {
    setIsOpenModal(false)
  }

  return (
    <div className='container'>
      <Form className='form' form={form} layout='vertical'>
        <Flex className='header-actions'>
          <Button type='primary' onClick={showModal}>Adicionar</Button>
          <Modal
            title="Adicionar Pessoa"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isOpenModal}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form.Item name='nome' label='Nome:' rules={[{ required: true, message: 'Digite seu nome' }]}>
              <Input type='text' placeholder='Digite seu nome...' />
            </Form.Item>
            <Form.Item name='cpf' label='CPF:' rules={[{ required: true, message: 'Digite seu CPF' }]}>
              <Input
                type='text'
                onChange={(e) => handleCPF(e.target.value)}
                placeholder='Digite seu CPF...'
              />
            </Form.Item>
            <Form.Item name='rg' label='RG:' rules={[{ required: true, message: 'Digite seu RG' }]}>
              <Input
                type='text'
                onChange={(e) => handleRG(e.target.value)}
                placeholder='Digite seu RG...'
              />
            </Form.Item>
            <Form.Item name='data_nasc' label='Data de Nascimento:' rules={[{ required: true, message: 'Digite sua data de nascimento' }]}>
              <Input
                type='text'
                onChange={(e) => handleDT(e.target.value)}
                placeholder='Digite sua data de...'
              />
            </Form.Item>
            <Form.Item name="sexo" label='Sexo:' rules={[{ required: true, message: 'Seleciona um Sexo' }]}>
              <Select>
                <Select.Option value="M">Masculino</Select.Option>
                <Select.Option value="F">Feminino</Select.Option>
              </Select>
            </Form.Item>
          </Modal>

          <Input type='text' placeholder='Pesquisar...' value={search} onChange={(e) => setSearch(e.target.value)} />
        </Flex>
        <Table
          rowKey="id"
          columns={columns({ handleRemove, handleEdit }) as []}
          dataSource={filteredRows}
        />
      </Form>
    </div>
  )
}

export default App
