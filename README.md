# Nexus Next CRM

**Overview:**
Nexus CRM is designed to manage customer relationships, sales processes, product inventory, and generate reports. The system includes modules for customers, sales, quotes, products, and reports.

**Modules:**

1. **Customer Management**
2. **Sales Management**
3. **Quotes Management**
4. **Product Management**
5. **Reports Management**

### Detailed Requirements:

### 1. Customer Management

- **Features:**
  - Add, edit, delete customer profiles
  - View customer details
  - Search and filter customers
- **API Endpoints:**
  - `POST /customers` - Create a new customer
  - `GET /customers` - Retrieve a list of customers
  - `GET /customers/:id` - Retrieve a single customer by ID
  - `PUT /customers/:id` - Update a customer by ID
  - `DELETE /customers/:id` - Delete a customer by ID

### 2. Sales Management

- **Features:**
  - Record new sales
  - Track sales status
  - Link sales to customers and products
- **API Endpoints:**
  - `POST /sales` - Record a new sale
  - `GET /sales` - Retrieve a list of sales
  - `GET /sales/:id` - Retrieve a single sale by ID
  - `PUT /sales/:id` - Update a sale by ID
  - `DELETE /sales/:id` - Delete a sale by ID

### 3. Quotes Management

- **Features:**
  - Create and manage quotes
  - Convert quotes to sales
  - Link quotes to customers and products
- **API Endpoints:**
  - `POST /quotes` - Create a new quote
  - `GET /quotes` - Retrieve a list of quotes
  - `GET /quotes/:id` - Retrieve a single quote by ID
  - `PUT /quotes/:id` - Update a quote by ID
  - `DELETE /quotes/:id` - Delete a quote by ID

### 4. Product Management

- **Features:**
  - Add, edit, delete product information
  - Manage product inventory
  - Search and filter products
- **API Endpoints:**
  - `POST /products` - Add a new product
  - `GET /products` - Retrieve a list of products
  - `GET /products/:id` - Retrieve a single product by ID
  - `PUT /products/:id` - Update a product by ID
  - `DELETE /products/:id` - Delete a product by ID

### 5. Reports Management

## Model Flow:

The flow of each model in Nexus CRM involves CRUD (Create, Read, Update, Delete) operations managed through API endpoints. Here's how each model functions in detail:

### 1. Customer Management

- **Add Customer**: When a new customer is added through a POST request to `/customers`, the customer data is validated and saved in the `Customer` collection.
- **Edit Customer**: A PUT request to `/customers/:id` updates the customer information based on the provided customer ID.
- **Delete Customer**: A DELETE request to `/customers/:id` removes the customer from the `Customer` collection.
- **View Customer Details**: A GET request to `/customers/:id` retrieves a single customer's details.
- **List Customers**: A GET request to `/customers` retrieves a list of all customers, with optional search and filter functionality.

### 2. Sales Management

- **Record Sale**: A POST request to `/sales` records a new sale. The sale data, including customer and product references, is validated and saved in the `Sale` collection.
- **Track Sale Status**: A PUT request to `/sales/:id` updates the sale status and other details based on the provided sale ID.
- **Delete Sale**: A DELETE request to `/sales/:id` removes the sale from the `Sale` collection.
- **View Sale Details**: A GET request to `/sales/:id` retrieves a single sale's details.
- **List Sales**: A GET request to `/sales` retrieves a list of all sales, with optional filters.

### 3. Quotes Management

- **Create Quote**: A POST request to `/quotes` creates a new quote, linking it to a customer and a product, and saves it in the `Quote` collection.
- **Manage Quote**: A PUT request to `/quotes/:id` updates the quote based on the provided quote ID.
- **Convert Quote to Sale**: This can be a special operation where a quote is transformed into a sale, involving data transfer from `Quote` to `Sale`.
- **Delete Quote**: A DELETE request to `/quotes/:id` removes the quote from the `Quote` collection.
- **View Quote Details**: A GET request to `/quotes/:id` retrieves a single quote's details.
- **List Quotes**: A GET request to `/quotes` retrieves a list of all quotes, with optional filters.

### 4. Product Management

- **Add Product**: A POST request to `/products` adds a new product to the `Product` collection.
- **Edit Product**: A PUT request to `/products/:id` updates the product information based on the provided product ID.
- **Delete Product**: A DELETE request to `/products/:id` removes the product from the `Product` collection.
- **View Product Details**: A GET request to `/products/:id` retrieves a single product's details.
- **List Products**: A GET request to `/products` retrieves a list of all products, with optional search and filter functionality.

### 5. Reports Management

- **Sales Report**: A GET request to `/reports/sales` generates a sales report. Optional query parameters startDate and endDate can be provided to filter sales data within a specific date range.
- **Customer Report**: A GET request to `/reports/customers` generates a customer activity report. Optional query parameters startDate and endDate can be provided to filter customer data within a specific date range.
- **Product Report**: A GET request to `/reports/products` generates a product inventory report, listing all products in the database.
