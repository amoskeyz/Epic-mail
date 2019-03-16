import messages from '../models/messages';

class messageController {
  static receivedMessages(req, res) {
    return res.status(200).json({
      status: 200,
      data: messages,
    });
  }

  static unreadMessages(req, res) {
    const array = messages.filter(message => message.status === 'unread');
    return res.status(200).json({
      status: 200,
      data: array,
    });
  }

  static sentMessages(req, res) {
    const array = messages.filter(message => message.status === 'sent');
    return res.status(200).json({
      status: 200,
      data: array,
    });
  }

  static specificMessage(req, res) {
    const messageObj = messages.find(message => message.id
        === Number(req.params.id));
    if (messageObj) {
      return res.status(200).json({
        status: 200,
        data: messageObj,
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'message not found',
    });
  }

  static composeMessage(req, res) {
    const {
      subject, message, parentMessageId, status, senderId, receiverId,
    } = req.body;
    const id = messages.length + 1;
    const createdOn = new Date();
    const textObj = {
      id, subject, message, parentMessageId, status, createdOn, senderId, receiverId,
    };
    messages.push(textObj);
    return res.status(200).json({
      status: 200,
      data: {
        id, createdOn, subject, message, parentMessageId, status,
      },
    });
  }

  static deleteMessage(req, res) {
    const messageId = req.params.id;
    const messageObj = messages.find(message => message.id === Number(req.params.id));
    if (!messageObj) {
      return res.status(404).json({
        status: 404,
        error: 'message not found',
      });
    }

    const id = parseInt(messageId);
    const index = messages.findIndex(message => message.id === id);
    messages.splice(index, 1);
    return res.status(200).json({
      satus: 200,
      data: { messageObj },
    });
  }
}

export default messageController;