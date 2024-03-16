import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedResult } from '../redux/searchSlice'
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { CircularProgress } from '@mui/material'
import moment from 'moment'

const isMacOS = window.navigator.platform.toUpperCase().includes('MAC')

const commandKey = isMacOS ? '⌘' : 'Ctrl'

const shortcutMessage = `Start Seaching... (${commandKey} + K)`
const noResultMessage = 'No results found...'

const useStyles = makeStyles((theme) => {
  return {
    listWrapper: {
      maxHeight: 'calc(100vh - 200px)',
      overflow: 'auto',
      padding: '10px',
    },
    centerWrap: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(2),
    },
  }
})

const ResultList = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { results, loading, loaded } = useSelector((state) => ({
    results: state.search.results,
    loading: state.search.loading,
    loaded: state.search.loaded,
  }))

  const handleResultClick = (result) => {
    dispatch(setSelectedResult(result))
  }

  return (
    <Box className={classes.listWrapper}>
      <List>
        {loading ? (
          <Box className={classes.centerWrap}>
            <CircularProgress />
          </Box>
        ) : !results?.length ? (
          <Box className={classes.centerWrap}>
            <Typography color={'GrayText'} variant='h8' fontStyle={'italic'}>
              {!results?.length && loaded ? noResultMessage : shortcutMessage}
            </Typography>
          </Box>
        ) : (
          ''
        )}
        {results.map((result) => {
          return (
            <ListItem
              key={result.pageid}
              onClick={() => {
                handleResultClick(result)
              }}
              button
            >
              <ListItemText
                primary={<Typography variant='h6'>{result.title}</Typography>}
                secondary={
                  <>
                    <Typography
                      component={'div'}
                      dangerouslySetInnerHTML={{ __html: result.snippet }}
                    />
                    <span
                      style={{
                        fontSize: '0.8rem',
                        color: 'gray',
                        marginTop: '10px',
                      }}
                    >
                      {moment(result.timestamp).format('MMMM D, YYYY')}
                    </span>
                  </>
                }
              />
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}

export default ResultList
