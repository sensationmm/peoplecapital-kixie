import { atom, useRecoilState } from 'recoil';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';

import { Layout } from "../components/Layout/Layout"
import { Message } from "../components/Message/Message"

import * as Styled from './SentMessages.style';
import * as Validation from '../utils/validation';
import { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { MessageClass } from '../services/message';
import { useSnackbar } from '../hooks/useSnackbar';

const messagesState = atom({
  key: 'Messages',
  default: []
});

const defaultMessage = {
  number: '',
  message: '',
  errors:{}
};

const formState = atom({
  key: 'Form',
  default: defaultMessage
});

export const SentMessages = () => {
  const [deleteMessageId, setDeleteMessageId] = useState(undefined);
  const [editMessageId, setEditMessageId] = useState(undefined);

	const [openSnackbar] = useSnackbar();

  const [sentMessages, setSentMessages] = useRecoilState(messagesState);
  const [newMessage, setNewMessage] = useRecoilState(formState);

  useEffect(() => {
    const getAllMessages = async () => {
      try {
        const allMessages = await MessageClass.getMessages();
        setSentMessages(allMessages.messages)
      } catch (e) {
        openSnackbar('Could not get messages', 'error');
      }
    }

    getAllMessages();
  }, []);

  const validatePhone = () => {
    if(!Validation.phoneNumber(newMessage.number)) {
      setNewMessage((oldMessage) => ({...oldMessage, errors: { ...oldMessage.errors, number: 'Invalid Phone'}}));
    } else {
      const {number, ...newErrors} = newMessage.errors; 
      setNewMessage((oldMessage) => ({...oldMessage, errors: newErrors}));
    }
  }

  const validateMessage = () => {
    if(!Validation.message(newMessage.message)) {
      setNewMessage((oldMessage) => ({...oldMessage, errors: { ...oldMessage.errors, message: 'Required'}}));
    } else {
      const {message, ...newErrors} = newMessage.errors; 
      setNewMessage((oldMessage) => ({...oldMessage, errors: newErrors}));
    }
  }

  const clearForm = () => {
    setNewMessage(defaultMessage);
  }

  const onSendMessage = async () => {
    if(Object.keys(newMessage.errors).length === 0) {
      try {
        const sentMessage = await MessageClass.sendMessage(newMessage.number, newMessage.message);

        if(sentMessage.status === 'ok') {
          setSentMessages((oldMessages) => [
            sentMessage.message,
            ...oldMessages,
          ]);
          openSnackbar('Message sent', 'success');
          clearForm();
        }
      } catch (e) {
        openSnackbar('Could not send message', 'error');
      }
    }
  }

  const onSaveEditMessage = async (msg) => {
    const messageEdited = await MessageClass.editMessage(editMessageId, msg);
    if(messageEdited) {
      setSentMessages(
        (oldMessages) => oldMessages.map(message => message.messageId !== editMessageId 
          ? message 
          : {
            ...message,
            messageText: msg,
            editedDate: Date.now()
          }
        )
      );
    } else {
      openSnackbar('Could not edit message', 'error');
    }
    setEditMessageId(undefined);
  }

  const onDeleteMessage = (msgId) => {
    setDeleteMessageId(msgId);
  }

  const onConfirmDelete = async () => {
    const messageDeleted = await MessageClass.deleteMessage(deleteMessageId);

    if(messageDeleted) {
      setSentMessages((oldMessages) => [
        ...oldMessages.filter(msg => msg.messageId !== deleteMessageId)
      ]);
    } else {
      openSnackbar('Could not delete message', 'error');
    }
    onCancelDelete();

  }

  const onCancelDelete = () => {
    setDeleteMessageId(undefined);
  }

  const getSelectedMessage = (msgId) => {
    const selected = sentMessages.filter(msg => msg.messageId === msgId)[0];
    return selected;
  }


  return (
    <Layout title="Sent Messages">
      <Styled.Container>
        <Styled.MessagesContainer>
          {sentMessages.length > 0 ?
            <Styled.Messages>
              {sentMessages.map((message) => <Message key={`message-${message.messageId}`} {...message} onDelete={onDeleteMessage} onEdit={setEditMessageId} onSave={onSaveEditMessage} editing={editMessageId === message.messageId} />)
              }</Styled.Messages>
            : <Styled.NoMessages>No messages to show</Styled.NoMessages>
          }
        </Styled.MessagesContainer>

        <Styled.NewMessage>
          <div>
            <InputLabel shrink={false} htmlFor={'phone-number'}>Phone Number</InputLabel>
            <TextField id="phone-number" placeholder="Enter phone number" variant="outlined" value={newMessage.number} onChange={(e) => setNewMessage((oldMessage) => ({...oldMessage, number: e.target.value}))} onBlur={validatePhone} error={newMessage.errors.hasOwnProperty('number')} helperText={newMessage.errors.number} />
          </div>
          <div>
            <InputLabel htmlFor={'message'}>Message</InputLabel>
            <TextField id="message" placeholder="Enter your message" variant="outlined" multiline minRows={4} maxRows={4} value={newMessage.message} onChange={(e) => setNewMessage((oldMessage) => ({...oldMessage, message: e.target.value}))} onBlur={validateMessage} error={newMessage.errors.hasOwnProperty('message')} helperText={newMessage.errors.message}  />
          </div>
          <Button variant="contained" onClick={onSendMessage}>Send Message</Button>
        </Styled.NewMessage>
      </Styled.Container>

       {deleteMessageId !== undefined && 
        <Dialog
          open={true}
          onClose={onCancelDelete}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>Delete message from {getSelectedMessage(deleteMessageId)?.recipientPhone}?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              This cannot be undone
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onCancelDelete}>Cancel</Button>
            <Button onClick={onConfirmDelete}>Confirm</Button>
          </DialogActions>
        </Dialog>
      }
    </Layout>
  )
}