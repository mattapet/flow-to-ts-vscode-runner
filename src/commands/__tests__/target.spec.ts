import { FileTarget } from '../target';

describe('file-target', () => {
  it('should detect .js extension as Flow file', () => {
    expect(new FileTarget('someFile.js').isFlowFile).toBe(true);
    expect(new FileTarget('someFile.js').isNotFlowFile).toBe(false);
  });

  it('should detect .jsx extension as Flow file', () => {
    expect(new FileTarget('someFile.jsx').isFlowFile).toBe(true);
    expect(new FileTarget('someFile.jsx').isNotFlowFile).toBe(false);
  });
});
