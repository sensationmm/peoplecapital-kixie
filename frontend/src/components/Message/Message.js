import * as Styled from './Message.style';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import {format} from 'date-fns';
import { useState } from 'react';

export const Message = ({messageId, recipientPhone, messageText, timestamp, updatedAt, editing, onEdit, onSave, onDelete}) => {
  const [editableMsg, setEditableMessage] = useState(messageText);

  const handleSave = () => {
    setEditableMessage(messageText);
    onSave(editableMsg)
  }

  const handleCancelEdit = () => {
    setEditableMessage(messageText);
    onEdit(undefined);
  }

  return (
    <Styled.Container>
      <Styled.Info>
        <Styled.Recipient>Recipient: {recipientPhone}</Styled.Recipient>
        {!editing ?
          <>
            <div>Message: {messageText}</div>
            <div>
              <Styled.Date>Timestamp: {format( Date(timestamp), 'yyyy-MM-dd HH:mm a')}</Styled.Date>
              {updatedAt && updatedAt !== timestamp && <Styled.Date>Updated at: {format( Date(updatedAt), 'yyyy-MM-dd HH:mm a')}</Styled.Date>}
            </div>
          </> 
          : <TextField multiline minRows={2} maxRows={2} value={editableMsg} onChange={(e) => setEditableMessage(e.target.value)} />}
      </Styled.Info>

      <Styled.Actions>
        {!editing ? <>
        <EditIcon fontSize='large' onClick={() => onEdit(messageId)}  />
        <DeleteIcon fontSize='large' onClick={() => onDelete(messageId)} /></> : <>
        <DoneIcon fontSize='large' onClick={handleSave}  />
        <CloseIcon fontSize='large' onClick={handleCancelEdit} />
        </>}
      </Styled.Actions>
    </Styled.Container>
  )
};