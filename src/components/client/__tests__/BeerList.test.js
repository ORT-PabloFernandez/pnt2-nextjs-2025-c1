import { render, screen, fireEvent, act } from '@testing-library/react';
import { CartProvider } from '../../app/context/CartContext';
import BeerList from '../BeerList';
import beers from '../../app/beers/beers';

describe('BeerList', () => {
  const mockBeer = {
    name: 'Test Beer',
    type: 'IPA',
    abv: 5.5,
    label: 'test-label.jpg',
    price: 250
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render beer list', () => {
    render(
      <CartProvider>
        <BeerList />
      </CartProvider>
    );

    beers.forEach(beer => {
      expect(screen.getByText(beer.name)).toBeInTheDocument();
      expect(screen.getByText(`Tipo: ${beer.type}`)).toBeInTheDocument();
      expect(screen.getByText(`ABV: ${beer.abv}%`)).toBeInTheDocument();
    });
  });

  it('should open and close cart', () => {
    render(
      <CartProvider>
        <BeerList />
      </CartProvider>
    );

    const cartButton = screen.getByRole('button', { name: /carrito/i });
    fireEvent.click(cartButton);

    expect(screen.getByText('Tu Carrito')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /x/i });
    fireEvent.click(closeButton);

    expect(screen.queryByText('Tu Carrito')).not.toBeInTheDocument();
  });

  it('should add beer to cart', async () => {
    render(
      <CartProvider>
        <BeerList />
      </CartProvider>
    );

    const firstBeer = beers[0];
    const addToCartButton = screen.getByRole('button', { name: /añadir al carrito/i });
    fireEvent.click(addToCartButton);

    const cartButton = screen.getByRole('button', { name: /carrito/i });
    fireEvent.click(cartButton);

    expect(await screen.findByText(firstBeer.name)).toBeInTheDocument();
    expect(screen.getByText(`x1`)).toBeInTheDocument();
  });

  it('should show total price in cart', async () => {
    render(
      <CartProvider>
        <BeerList />
      </CartProvider>
    );

    const firstBeer = beers[0];
    const addToCartButton = screen.getByRole('button', { name: /añadir al carrito/i });
    fireEvent.click(addToCartButton);

    const cartButton = screen.getByRole('button', { name: /carrito/i });
    fireEvent.click(cartButton);

    const totalPrice = await screen.findByText(new RegExp(`\$${firstBeer.price}`));
    expect(totalPrice).toBeInTheDocument();
  });

  it('should remove beer from cart', async () => {
    render(
      <CartProvider>
        <BeerList />
      </CartProvider>
    );

    const firstBeer = beers[0];
    const addToCartButton = screen.getByRole('button', { name: /añadir al carrito/i });
    fireEvent.click(addToCartButton);

    const cartButton = screen.getByRole('button', { name: /carrito/i });
    fireEvent.click(cartButton);

    const removeButton = screen.getByRole('button', { name: /x/i });
    fireEvent.click(removeButton);

    expect(screen.queryByText(firstBeer.name)).not.toBeInTheDocument();
  });
});
