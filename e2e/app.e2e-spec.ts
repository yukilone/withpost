import { WithPostPage } from './app.po';

describe('with-post App', function() {
  let page: WithPostPage;

  beforeEach(() => {
    page = new WithPostPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
