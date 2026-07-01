import { useEffect, useState } from 'react'
import { Button, Flex, Form, Input, Modal, notification, Select, Table } from 'antd'
import { columns } from './columns'
import './App.css'

import { PessoaProvider } from "../providers/pessoaProvider"
import { filtrarPessoas } from "../utils/filtrarPessoas"
import { mascararCPF } from "../utils/mascararCPF"
import { mascararRG } from "../utils/mascararRG"
import { mascararDT } from "../utils/mascararDT"

import { validarCPF } from "../utils/validarCPF"

import type { Data } from './interfaces'

function App () {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [edit, setEdit] = useState<Data | null>(null)
  const [search, setSearch] = useState<string>('')
  const [sexoFilter, setSexoFilter] = useState<string | undefined>(undefined)
  const [data, setData] = useState<Data[]>([])
  const [form] = Form.useForm()

  const carregarPessoas = async () => {
    const pessoas = await PessoaProvider.get()
    if (!pessoas.ok) {
      notification.warning({ description: pessoas.data.message })
      return
    }
    setData(pessoas.data)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregarPessoas()
  }, [])

  const showModal = () => {
    setEdit(null)
    setIsOpenModal(true)
    form.resetFields()
  }

  const handleOk = async () => {
    const pessoa = await form.validateFields()
    const response = edit
      ? await PessoaProvider.update(edit.id, pessoa)
      : await PessoaProvider.create(pessoa)

    if (!response.ok) {
      notification.warning({ description: response.data.message })
      return
    }

    setEdit(null)
    form.resetFields()
    setIsOpenModal(false)
    await carregarPessoas()
  }


  const handleRemove = async (record: Data) => {
    const response = await PessoaProvider.delete(record.id)
    if (!response.ok) {
      notification.warning({ description: response.data.message })
      return
    }
    // setData(prev => prev.filter(item => item.id !== record.id))
    await carregarPessoas()
  }

  const handleEdit = async (record: Data) => {
    setEdit(record)

    form.setFieldsValue({
      nome: record.nome,
      cpf: record.cpf,
      rg: record.rg,
      data_nasc: record.data_nasc,
      sexo: record.sexo
    })

    setIsOpenModal(true)
  }

  const filteredRows = filtrarPessoas(data, search, sexoFilter)

  const handleCancel = () => {
    setEdit(null)
    form.resetFields()
    setIsOpenModal(false)
  }

  return (
    <div className='container'>
      <Form className='form' form={form} layout='vertical' initialValues={{ sexo: 'Masculino' }}>
        <Flex className='header-actions'>
          <Button type='primary' onClick={showModal}>Adicionar</Button>
          <Modal
            title={edit ? 'Editar Pessoa' : 'Adicionar Pessoa'}
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isOpenModal}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form.Item name='nome' label='Nome:' rules={[{ required: true, message: 'Digite seu nome' }]}>
              <Input type='text' placeholder='Digite seu nome...' />
            </Form.Item>
            <Form.Item
              name='cpf'
              label='CPF:'
              getValueFromEvent={(e) => mascararCPF(e.target.value)}
              validateTrigger={['onChange', 'onBlur']}
              rules={[
                { required: true, message: 'Digite seu CPF' },
                { validator: validarCPF }
              ]}
            >
              <Input
                type='text'
                placeholder='000.000.000-00'
                maxLength={14}
              // onChange={(e) => form.setFieldsValue({ cpf: mascararCPF(e.target.value) })}
              />
            </Form.Item>
            <Form.Item name='rg' label='RG:' rules={[{ required: true, message: 'Digite seu RG' }]}>
              <Input
                type='text'
                onChange={(e) => form.setFieldsValue({ rg: mascararRG(e.target.value) })}
                placeholder='Digite seu RG...'
              />
            </Form.Item>
            <Form.Item name='data_nasc' label='Data de Nascimento:' rules={[{ required: true, message: 'Digite sua data de nascimento' }]}>
              <Input
                type='text'
                onChange={(e) => form.setFieldsValue({ data_nasc: mascararDT(e.target.value) })}
                placeholder='Digite sua data de...'
              />
            </Form.Item>
            <Form.Item name="sexo" label='Sexo:'>
              <Select>
                <Select.Option value="Masculino">Masculino</Select.Option>
                <Select.Option value="Feminino">Feminino</Select.Option>
              </Select>
            </Form.Item>
          </Modal>

          <Input type='text' placeholder='Pesquise pelo NOME ou CPF / RG' value={search} onChange={(e) => setSearch(e.target.value)} />
          <Select
            allowClear
            placeholder="Filtrar por sexo"
            value={sexoFilter}
            onChange={(value) => setSexoFilter(value)}
            options={[
              { label: 'Masculino', value: 'Masculino' },
              { label: 'Feminino', value: 'Feminino' }
            ]}
          />
        </Flex>
        <Table
          rowKey="id"
          columns={columns({ handleRemove, handleEdit }) as []}
          dataSource={filteredRows}
          pagination={{
            // showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} itens`,
            showTotal: (total) => `Total de ${total} itens`,
            showSizeChanger: false,
            pageSize: 10,
          }}
        />
      </Form>
    </div>
  )
}

export default App
