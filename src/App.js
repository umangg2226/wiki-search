import React from 'react'
import { Container, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { SearchBox, ResultList, ResultModal } from './components'

const useStyles = makeStyles((theme) => {
  return {
    container: {
      padding: theme.spacing(2),
    },
    title: {
      marginBottom: theme.spacing(4),
    },
  }
})

const App = () => {
  const classes = useStyles()

  return (
    <Container className={classes.container} maxWidth='md'>
      <Typography variant='h4' align='center' className={classes.title}>
        Wikipedia Search
      </Typography>
      <SearchBox />
      <ResultList />
      <ResultModal />
    </Container>
  )
}

export default App
