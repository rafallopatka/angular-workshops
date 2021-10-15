import * as fromPosts from '../reducers/posts.reducer';
import { selectPoststate } from './posts.selectors';

describe('Posts Selectors', () => {
  it('should select the feature state', () => {
    const result = selectPoststate({
      [fromPosts.postsFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
