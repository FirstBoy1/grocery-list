import { useState } from 'react'
import 'antd/dist/antd.css'

import './App.css'
import { GroceryListView } from './components/GroceryListView'
import { GroceryEntryView } from './components/GroceryEntryView'

function App() {
  const [selectedEntry, setSelectedEntry] = useState(null)

  return (
    <div className="grocery-container">
      <GroceryListView setSelectedEntry={setSelectedEntry} />
      <GroceryEntryView selectedEntry={selectedEntry} />
    </div>
  )
}

export default App
