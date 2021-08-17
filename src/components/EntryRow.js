import { useDispatch } from 'react-redux'
import { Button, Checkbox, Space, Typography } from 'antd'
import moment from 'moment'

import { removeEntry, toggleSataus } from '../redux/groceryListSlice'

const { Text } = Typography

export const EntryRow = ({ entry, setSelectedEntry }) => {
  const dispatch = useDispatch()

  return (
    <div className="entry">
      <Checkbox
        checked={entry.status}
        onChange={() => dispatch(toggleSataus(entry.id))}
      />
      <Text delete={entry.status}>{entry.name}</Text>

      <p>
        last changed{' '}
        {moment(
          new Date(entry.history[entry.history.length - 1].timeStamp),
          'YYYYMMDD'
        ).fromNow()}
      </p>

      <Space>
        <Button type="primary" onClick={() => setSelectedEntry(entry.id)}>
          Edit
        </Button>
        <Button danger onClick={() => dispatch(removeEntry(entry.id))}>
          Delete
        </Button>
      </Space>
    </div>
  )
}
