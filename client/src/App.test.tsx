import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import App from './App';

// Cast axios as mocked for TypeScript
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('App', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockedAxios.get.mockResolvedValue({ data: { message: 'Welcome to LogiBot' } });
    mockedAxios.post.mockReset();
  });

  it('renders welcome message', async () => {
    render(<App />);
    expect(await screen.findByText('Welcome to LogiBot')).toBeInTheDocument();
  });

  it('displays shipment response after submission', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        response: {
          type: 'shipment',
          data: { id: '123', status: 'In Transit', location: 'Chicago', eta: 'March 16, 2025' }
        }
      }
    });

    render(<App />);
    const input = screen.getByPlaceholderText('e.g., Where is shipment #123?');
    const button = screen.getByText('Submit');

    fireEvent.change(input, { target: { value: 'Where is shipment #123?' } });
    fireEvent.click(button);

    expect(await screen.findByText('Shipment #123')).toBeInTheDocument();
    expect(screen.getByText('In Transit')).toBeInTheDocument(); // Check just the value
  });
});