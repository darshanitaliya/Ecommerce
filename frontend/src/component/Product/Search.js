import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Search.css'
import MetaData from '../layout/metaData'

const Search = () => {
  const [keyword, setKeyword] = useState('')
  const history = useNavigate()

  const searchSubmitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history(`/products/${keyword}`)
    } else {
      history('/products')
    }
  }

  return (
    <>
      <MetaData title="Search A Product" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </>
  )
}

export default Search
