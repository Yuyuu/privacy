export default {
  ROOM: {
    JOIN: 'pv:room:join',
    LEAVE: 'pv:room:leave',
    NEW_PLAYER: 'pv:room:newplayer',
    PLAYER_LEFT: 'pv:room:playerleft',
    NEW_DEALER: 'pv:room:newdealer',
    DEALER_CHANGED: 'pv:room:dealerchanged'
  },
  CHAT: {
    NEW_MESSAGE: 'pv:chat:newmessage'
  },
  GAME: {
    JOIN: 'pv:game:join',
    START: 'pv:game:start',
    STARTED: 'pv:game:started',
    TURN_OVER: 'pv:game:turnover',
    NEXT_TURN: 'pv:game:nextturn'
  },
  QUESTION: {
    SETUP: 'pv:question:setup',
    DEFINED: 'pv:question:defined',
    START: 'pv:question:start',
  },
  ANSWER: {
    SAVE: 'pv:answer:save',
    GIVEN: 'pv:answer:given',
  }
};
