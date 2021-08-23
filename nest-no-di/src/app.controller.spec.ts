import { AppController } from './app.controller';

describe('AppController', () => {
  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(new AppController().getHello()).toBe('Hello World!');
    });
  });
});
