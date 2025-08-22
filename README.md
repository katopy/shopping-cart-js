# Shopping Cart - DPS

## Overview
[main.js] is the core JavaScript file that handles the shopping cart functionality for an e-commerce website. It manages the cart's user interface, including displaying items, calculating totals, and handling user interactions.

## Components

### 1. Global Variables
- `cart`: Instance of the ShoppingCart class
- `cartModal`: Reference to the cart modal element
- `closeCartBtn`: Reference to the close button in the cart
- `cartIcon`: Reference to the cart icon in the header
- `cartItemsContainer`: Container for cart items
- `cartTotalElement`: Element that displays the cart total

### 2. Core Functions

#### [openCart()]
- Displays the cart modal
- Updates the cart items display

#### [closeCart()]
- Hides the cart modal

#### [renderCartItems()]
- Clears the current cart display
- Shows "Your cart is empty" if no items
- For each item in cart:
  - Calculates item total (price × quantity)
  - Creates and appends HTML for the cart item
  - Includes product image, name, quantity, and price
- Updates the cart total

#### [loadEventListeners()]
- Sets up event listeners for:
  - Add to cart buttons
  - Cart icon click
  - Close button click
  - Click outside modal to close
  - Remove item buttons

#### [updateCartUI()]
- Updates the cart item count in the header
- Shows/hides the cart count badge
- Refreshes the cart display if open

## Usage
1. The script initializes when the DOM is fully loaded
2. Users can:
   - Click the cart icon to view their cart
   - Add items to cart from product cards
   - Remove items using the × button
   - See real-time updates to cart total and item count

## Dependencies
- Requires [ShoppingCart] class to be defined
- Expects specific HTML structure with matching class names
- Uses ES6+ features (template literals, arrow functions)

## Notes
- Cart persists only during the current session
- All prices are formatted to 2 decimal places
- The cart supports multiple quantities of the same item

