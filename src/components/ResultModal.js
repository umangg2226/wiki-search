import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearSelectedResult } from '../redux/searchSlice'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
} from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => {
  return {
    modal: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2),
    },
  }
})

const ResultModal = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selectedResult = useSelector((state) => state.search.selectedResult)

  return (
    <Dialog
      open={!!selectedResult}
      onClose={() => {
        dispatch(clearSelectedResult())
      }}
    >
      {selectedResult && (
        <Box className={classes.modal}>
          <DialogTitle>{selectedResult.title}</DialogTitle>
          <DialogContent>
            <Typography>{selectedResult.snippet}</Typography>
          </DialogContent>
        </Box>
      )}
    </Dialog>
  )
}

export default ResultModal
