import * as chatVerifiers from '../../controllers/chat/chatMessageVerifiers';
import * as chatModifiers from '../../controllers/chat/chatInputModifier';
import * as chat from '../../controllers/chat/chat';

describe("Testing Chat functions", () => {

  describe('Testing stripAfterCommand', () => {

    test('do:w loremipsum is do:w', () => {
        expect(chatModifiers.stripAfterCommand('do:w loremipsum')).toBe('do:w');
    });

    test('do:w is do:w', () => {
      expect(chatModifiers.stripAfterCommand('do:w')).toBe('do:w');
    });

    test('do:wloremipsum is do:wloremipsum', () => {
      expect(chatModifiers.stripAfterCommand('do:wloremipsum')).toBe('do:wloremipsum');
    });

  });

  describe('Testing stripNewLine', () => {

    test('do:w\n is do:w', () => {
      expect(chatModifiers.stripNewLine('do:w\n')).toBe('do:w');
    });

    test('\ndo:w\n is do:w', () => {
      expect(chatModifiers.stripNewLine('\ndo:w\n')).toBe('do:w');
    });

  });

  describe('Testing checkMessageConditions', () => {

    test('hello world is true', () => {
      expect(chatVerifiers.checkMessageConditions('hello world')).toBe(true);
    });
    
    test('hello world*50 is false', () => {
      expect(chatVerifiers.checkMessageConditions('hello world'.repeat(50))).toBe(false);
    });
    
    test('<script></script> is false', () => {
      expect(chatVerifiers.checkMessageConditions('<script></script>')).toBe(false);
    });
    test('%3Cscirpt%3Ealert%281%29%3C%2Fscript%3E is false', () => {
      expect(chatVerifiers.checkMessageConditions('%3Cscirpt%3Ealert%281%29%3C%2Fscript%3E to be true')).toBe(false);
    });

  });


  describe('Testing isGameCommand', () => {

    test('do:w is true', () => {
      expect(chatVerifiers.isGameCommand('do:w')).toBe(true);
    });
    
    test('do:wloremipsum is false', () => {
      expect(chatVerifiers.isGameCommand('do:wloremipsum')).toBe(false);
    });
    
    test('do:w loremipsum is false', () => {
      expect(chatVerifiers.isGameCommand('do:w loremipsum')).toBe(false);
    });
    
    test('w loremipsum is false', () => {
      expect(chatVerifiers.isGameCommand('w loremipsum')).toBe(false);
    });
    
    test('loremipsum do:w is false', () => {
      expect(chatVerifiers.isGameCommand('loremipsum do:w')).toBe(false);
    });
    
  });


  describe('Testing handleReceivedMessages', () => {

    test('do:w loremipsum is do:w loremipsum', () => {
      expect(chat.handleReceivedMessages('do:w loremipsum')).toBe('do:w loremipsum');
    });
    
    test('do:w is do:w', () => {
      expect(chat.handleReceivedMessages('do:w')).toBe('do:w');
    });
    
    test('do:wloremipsum is do:wloremipsum', () => {
      expect(chat.handleReceivedMessages('do:wloremipsum')).toBe('do:wloremipsum');
    });
    
    test('hello world is hello world', () => {
      expect(chat.handleReceivedMessages('hello world')).toBe('hello world');
    });
    
    test('hello world*50 is null', () => {
      expect(chat.handleReceivedMessages('hello world'.repeat(50))).toBe(null);
    });
    
    test('<script></script> is null', () => {
      expect(chat.handleReceivedMessages('<script></script>')).toBe(null);
    });
    
    test('do:wloremipsum is do:wloremipsum', () => {
      expect(chat.handleReceivedMessages('do:wloremipsum')).toBe('do:wloremipsum');
    });
    
    test('w loremipsum is w loremipsum', () => {
      expect(chat.handleReceivedMessages('w loremipsum')).toBe('w loremipsum');
    });
    
    test('loremipsum do:w is loremipsum do:w', () => {
      expect(chat.handleReceivedMessages('loremipsum do:w')).toBe('loremipsum do:w');
    });

  });

  describe("Testing isHTML", () => {
    test('bogdan123 to be false', () => {
      expect(chatVerifiers.isHTML('bogdan123')).toBe(false);
    })

    test('bogdan<script>alert(1)</script> to be true', () => {
      expect(chatVerifiers.isHTML('bogdan<script>alert(1)</script>')).toBe(true);
    })
  })

  describe("Testing isEncodedURL", () => {
    test('bogdan123 to be false', () => {
      expect(chatVerifiers.isEncodedURL('bogdan123')).toBe(false);
    })

    test('%3Cscirpt%3Ealert%281%29%3C%2Fscript%3E to be true', () => {
      expect(chatVerifiers.isEncodedURL('%3Cscirpt%3Ealert%281%29%3C%2Fscript%3E')).toBe(true);
    })
  })

  describe("Testing hasSpecialCharacters", () => {
    test('bogdan123 to be true', () => {
      expect(chatVerifiers.isUsernameValid('bogdan123')).toBe(true);
    })

    test('%3Cscirpt%3Ealert%281%29%3C%2Fscript%3E to be false', () => {
      expect(chatVerifiers.isUsernameValid('%3Cscirpt%3Ealert%281%29%3C%2Fscript%3E')).toBe(false);
    })

    test('bogdan_asdf to be true', () => {
      expect(chatVerifiers.isUsernameValid('bogdan_asdf')).toBe(true);
    })

  })

})