import { SnackytimePage } from './app.po';

describe('snackytime App', () => {
  let page: SnackytimePage;

  beforeEach(() => {
    page = new SnackytimePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
