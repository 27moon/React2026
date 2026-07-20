import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Layout } from './Layout';

describe('Layout Component', () => {
  it('should render children content inside layout structure', () => {
    render(
      <Layout>
        <div data-testid="child-element">Content</div>
      </Layout>
    );
    expect(screen.getByTestId('child-element')).toBeInTheDocument();
  });
});
