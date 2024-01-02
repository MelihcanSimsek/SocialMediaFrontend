import { ChatFilterPipe } from './chat-filter.pipe';

describe('ChatFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new ChatFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
