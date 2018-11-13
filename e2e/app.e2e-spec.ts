import { AmadeusFrontEndPage } from './app.po';

describe('amadeus-front-end App', () => {
  let page: AmadeusFrontEndPage;

  beforeEach(() => {
    page = new AmadeusFrontEndPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
