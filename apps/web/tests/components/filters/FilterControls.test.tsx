import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { FilterControls } from '@/components/filters/FilterControls';

describe('FilterControls', () => {
  const defaultProps = {
    searchText: '',
    selectedSentiments: [],
    selectedStatuses: [],
    totalComments: 100,
    filteredComments: 50,
    onSearchChange: vi.fn(),
    onSentimentChange: vi.fn(),
    onStatusChange: vi.fn(),
    onClearFilters: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<FilterControls {...defaultProps} />);

    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByText('Showing 50 of 100 comments')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search by content/i)).toBeInTheDocument();
  });

  it('displays search input with current value', () => {
    render(<FilterControls {...defaultProps} searchText="test search" />);

    const searchInput = screen.getByPlaceholderText(/search by content/i);
    expect(searchInput).toHaveValue('test search');
  });

  it('calls onSearchChange when search input changes', async () => {
    render(<FilterControls {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText(/search by content/i);
    fireEvent.change(searchInput, { target: { value: 'new search' } });

    expect(defaultProps.onSearchChange).toHaveBeenCalledWith('new search');
  });

  it('displays sentiment filter options', () => {
    render(<FilterControls {...defaultProps} />);

    expect(screen.getByText('Sentiment')).toBeInTheDocument();
    expect(screen.getByLabelText(/filter by positive sentiment/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/filter by neutral sentiment/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/filter by negative sentiment/i)).toBeInTheDocument();
  });

  it('displays status filter options', () => {
    render(<FilterControls {...defaultProps} />);

    expect(screen.getByText('Comment Status')).toBeInTheDocument();
    expect(screen.getByLabelText(/filter by pending review status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/filter by approved for publication status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/filter by confidential status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/filter by redacted status/i)).toBeInTheDocument();
  });

  it('checks selected sentiment options', () => {
    render(
      <FilterControls 
        {...defaultProps} 
        selectedSentiments={['positive', 'negative']} 
      />
    );

    const positiveCheckbox = screen.getByLabelText(/filter by positive sentiment/i);
    const neutralCheckbox = screen.getByLabelText(/filter by neutral sentiment/i);
    const negativeCheckbox = screen.getByLabelText(/filter by negative sentiment/i);

    expect(positiveCheckbox).toBeChecked();
    expect(neutralCheckbox).not.toBeChecked();
    expect(negativeCheckbox).toBeChecked();
  });

  it('checks selected status options', () => {
    render(
      <FilterControls 
        {...defaultProps} 
        selectedStatuses={['pending_review', 'confidential']} 
      />
    );

    const pendingCheckbox = screen.getByLabelText(/filter by pending review status/i);
    const approvedCheckbox = screen.getByLabelText(/filter by approved for publication status/i);
    const confidentialCheckbox = screen.getByLabelText(/filter by confidential status/i);

    expect(pendingCheckbox).toBeChecked();
    expect(approvedCheckbox).not.toBeChecked();
    expect(confidentialCheckbox).toBeChecked();
  });

  it('calls onSentimentChange when sentiment checkbox is toggled', async () => {
    const user = userEvent.setup();
    render(<FilterControls {...defaultProps} selectedSentiments={[]} />);

    const positiveCheckbox = screen.getByLabelText(/filter by positive sentiment/i);
    await user.click(positiveCheckbox);

    expect(defaultProps.onSentimentChange).toHaveBeenCalledWith(['positive']);
  });

  it('calls onStatusChange when status checkbox is toggled', async () => {
    const user = userEvent.setup();
    render(<FilterControls {...defaultProps} selectedStatuses={[]} />);

    const pendingCheckbox = screen.getByLabelText(/filter by pending review status/i);
    await user.click(pendingCheckbox);

    expect(defaultProps.onStatusChange).toHaveBeenCalledWith(['pending_review']);
  });

  it('shows clear filters button when filters are active', () => {
    render(
      <FilterControls 
        {...defaultProps} 
        searchText="test"
        selectedSentiments={['positive']}
      />
    );

    expect(screen.getByRole('button', { name: /clear all filters/i })).toBeInTheDocument();
  });

  it('hides clear filters button when no filters are active', () => {
    render(<FilterControls {...defaultProps} />);

    expect(screen.queryByRole('button', { name: /clear all filters/i })).not.toBeInTheDocument();
  });

  it('calls onClearFilters when clear button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <FilterControls 
        {...defaultProps} 
        searchText="test"
        selectedSentiments={['positive']}
      />
    );

    const clearButton = screen.getByRole('button', { name: /clear all filters/i });
    await user.click(clearButton);

    expect(defaultProps.onClearFilters).toHaveBeenCalledTimes(1);
  });

  it('shows filtered badge when filters are applied', () => {
    render(
      <FilterControls 
        {...defaultProps} 
        searchText="test"
        totalComments={100}
        filteredComments={25}
      />
    );

    expect(screen.getByText('Filtered')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<FilterControls {...defaultProps} />);

    const searchInput = screen.getByPlaceholderText(/search by content/i);
    expect(searchInput).toHaveAttribute('aria-label', 'Search comments');

    const clearButton = screen.queryByRole('button', { name: /clear all filters/i });
    if (clearButton) {
      expect(clearButton).toHaveAttribute('aria-label', 'Clear all filters');
    }
  });
});