import { createStore } from 'redux'
import reducer from '../redux/reducers'

const store = createStore(reducer)

export default store
