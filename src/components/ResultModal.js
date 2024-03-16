import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearSelectedResult } from '../redux/searchSlice'
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material'
import moment from 'moment'

const ResultModal = () => {
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
        <>
          <DialogTitle>{selectedResult.title}</DialogTitle>
          <DialogContent>
            <Typography
              component={'div'}
              dangerouslySetInnerHTML={{ __html: selectedResult.snippet }}
            />
            <span
              style={{ fontSize: '0.8rem', color: 'gray', marginTop: '10px' }}
            >
              {moment(selectedResult.timestamp).format('MMMM D, YYYY')}
            </span>
          </DialogContent>
        </>
      )}
    </Dialog>
  )
}

export default ResultModal
