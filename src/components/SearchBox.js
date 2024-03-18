import React, { useState, useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { fetchSearchResultsAsync } from '../redux/searchSlice'
import debounce from 'lodash.debounce'
import useKeyboardShortcut from '../hooks/useKeyboardShortcut'
import { Search, Clear } from '@mui/icons-material'

const useStyles = makeStyles((theme) => {
  return {
    searchBox: {
      marginBottom: theme.spacing(2),
    },
  }
})

const SearchBox = () => {
  const classes = useStyles()
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const abortControllerRef = useRef(null)

  const focusInputRef = useCallback(() => {
    inputRef.current?.focus()
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(
    debounce(async (term) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      const abortController = new AbortController()

      abortControllerRef.current = abortController

      dispatch(
        fetchSearchResultsAsync({ term, signal: abortController.signal })
      )
    }, 350),
    []
  )

  useKeyboardShortcut('k', focusInputRef)

  const handleSearch = (term) => {
    setSearchTerm(term)
    debounceSearch(term.trim())
  }

  return (
    <TextField
      inputRef={inputRef}
      fullWidth
      className={classes.searchBox}
      value={searchTerm}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder='Search Wikipedia...'
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <Search />
          </InputAdornment>
        ),
        endAdornment: searchTerm && (
          <InputAdornment position='end'>
            <IconButton color='error' onClick={() => handleSearch('')}>
              <Clear />
            </IconButton>
          </InputAdornment>
        ),
      }}
      style={{ marginTop: '20px' }}
    />
  )
}

export default SearchBox
