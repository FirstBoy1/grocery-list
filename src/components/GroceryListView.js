import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Select, Form, Input, Space, Divider } from 'antd'

import { addEntry } from '../redux/groceryListSlice'
import { EntryRow } from './EntryRow'

export const GroceryListView = ({ setSelectedEntry }) => {
  const [addNew, setAddNew] = useState(false)
  const [filterBy, setFilterBy] = useState('all')
  const entries = useSelector((state) => state.groceryList.entries)
  const dispatch = useDispatch()

  let filteredEntries = entries
  if (filterBy !== 'all') {
    filteredEntries = entries.filter(
      (entry) =>
        (!entry.status && filterBy === 'ranout') ||
        (entry.status && filterBy === 'have')
    )
  }

  const handleNewEntry = (values) => {
    dispatch(addEntry(values))
    setAddNew(false)
  }

  return (
    <div className="grocery-list">
      <div className="grocery-list__header">
        {addNew ? (
          <Form
            initialValues={{ name: '', priority: 5 }}
            onFinish={handleNewEntry}
          >
            <Form.Item name="name">
              <Input autoFocus />
            </Form.Item>

            <Form.Item name="priority">
              <Select>
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
                <Select.Option value="3">3</Select.Option>
                <Select.Option value="4">4</Select.Option>
                <Select.Option value="5">5</Select.Option>
              </Select>
            </Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button
                htmlType="button"
                type="danger"
                onClick={() => setAddNew(false)}
              >
                Cancel
              </Button>
            </Space>
          </Form>
        ) : (
          <Button onClick={() => setAddNew(true)}>Add New Entry</Button>
        )}
        <div>
          <label htmlFor="filter">Filter By: </label>
          <Select
            id="filter"
            value={filterBy}
            onChange={(value) => setFilterBy(value)}
          >
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="ranout">Ran Out</Select.Option>
            <Select.Option value="have">Have</Select.Option>
          </Select>
        </div>
      </div>
      <Divider orientation="left" />

      {filteredEntries.length === 0 ? (
        <p className="empty-list-message">Add some entries</p>
      ) : null}

      {filteredEntries.map((entry) => (
        <EntryRow
          key={entry.id}
          entry={entry}
          setSelectedEntry={setSelectedEntry}
        />
      ))}
    </div>
  )
}
