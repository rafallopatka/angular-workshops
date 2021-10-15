import * as fromProfile from './profile.actions';

describe('loadProfile', () => {
  it('should return an action', () => {
    expect(fromProfile.loadProfile().type).toBe('[Profile] Load Profiles');
  });
});
