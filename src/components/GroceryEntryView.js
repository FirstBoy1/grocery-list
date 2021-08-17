import { useSelector, useDispatch } from 'react-redux'
import { Select, Radio, Typography } from 'antd'
import moment from 'moment'

import { updatePriority, toggleSataus } from '../redux/groceryListSlice'

const { Text } = Typography

export const GroceryEntryView = ({ selectedEntry }) => {
  const entry = useSelector((state) => {
    const { entries } = state.groceryList
    return entries.find((e) => e.id === selectedEntry)
  })
  const dispatch = useDispatch()

  if (!entry) {
    return null
  }

  return (
    <div className="grocery-detail">
      <h3>Entry Detail</h3>
      <h4>{entry.name}</h4>
      <div className="priority-status-container">
        <span>
          <label htmlFor="priority">Priority: </label>
          <Select
            id="priority"
            name="priority"
            value={entry.priority}
            onChange={(priority) =>
              dispatch(updatePriority({ id: entry.id, priority }))
            }
          >
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="2">2</Select.Option>
            <Select.Option value="3">3</Select.Option>
            <Select.Option value="4">4</Select.Option>
            <Select.Option value="5">5</Select.Option>
          </Select>
        </span>
        <span>
          <Radio.Group
            value={entry.status ? 'have' : 'ran out'}
            onChange={() => dispatch(toggleSataus(entry.id))}
          >
            <Radio value="have">Have</Radio>
            <Radio value="ran out">Ran Out</Radio>
          </Radio.Group>
        </span>
      </div>
      <div>
        <h3>Change History</h3>
        {entry.history.map((h) => (
          <p key={h.timeStamp} className="history-row">
            {moment(h.timeStamp).format('MMMM Do YYYY, h:mm:ss a')}{' '}
            {h.from || h.to ? (
              <span>
                <Text delete>{h.from ? 'Have' : 'Ran Out'}</Text>
                <Text> to </Text>
                <Text>{h.to ? 'Have' : 'Ran Out'}</Text>
              </span>
            ) : null}
          </p>
        ))}
      </div>
    </div>
  )
}
