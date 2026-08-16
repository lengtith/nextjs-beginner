# 🛒 Products Page

## 🎯 Objective

Build a simple product system with:

- Create product
- Display product list
- Add to cart
- Remove from cart
- Checkout

---

# 🎯 Implementation Workflow (Step List)

1. Click New Product
2. Fill form → Submit
3. Product saved
4. Display in UI
5. Add to cart
6. Open cart
7. Checkout

---

# 🪜 Step-by-Step Implementation

## ✅ Step 1: Setup State

We create state to store data and control UI.

```tsx
const [products, setProducts] = useState<Product[]>([]);
const [cart, setCart] = useState<Product[]>([]);
const [isOpen, setIsOpen] = useState(false);
const [isCartOpen, setIsCartOpen] = useState(false);
```

### 💡 Explanation

- `products` → store all products
- `cart` → store selected products
- `isOpen` → control create product dialog
- `isCartOpen` → control cart dialog

---

## ✅ Step 2: Setup Form State

```tsx
const [productForm, setProductForm] = useState<Product>({
  id: "",
  name: "",
  price: "",
  photo: "",
});
```

### 💡 Explanation

Temporary storage for form input before saving.

---

## ✅ Step 3: Handle Input Change

```tsx
const handleChange = (e) => {
  const { name, value } = e.target;

  setProductForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};
```

### 💡 Explanation

- One function controls all inputs
- Uses dynamic key `[name]`

---

## ✅ Step 4: Handle Submit (Create Product)

```tsx
const handleSubmit = (e) => {
  e.preventDefault();
```

### 🔹 Step 4.1: Validate Input

```tsx
if (!productForm.name.trim() || !productForm.price.trim()) {
  return;
}
```

👉 Prevent empty values

---

### 🔹 Step 4.2: Generate ID

```tsx
id: crypto.randomUUID();
```

👉 Ensure each product is unique

---

### 🔹 Step 4.3: Save Product

```tsx
setProducts((prev) => [newProduct, ...prev]);
```

👉 Add new product to top of list

---

### 🔹 Step 4.4: Reset Form

```tsx
setProductForm({ id: "", name: "", price: "", photo: "" });
setIsOpen(false);
```

👉 Clear form + close dialog

---

## ✅ Step 5: Render Product List

```tsx
{products.map((product) => (
```

### 💡 Explanation

Loop through products and display UI

---

## ✅ Step 6: Add to Cart

```tsx
const handleAddToCart = (id: string) => {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  setCart((prev) => [...prev, product]);
};
```

---

## ✅ Step 7: Cart Badge

```tsx
{
  cart.length > 0 && <div>{cart.length}</div>;
}
```

---

## ✅ Step 8: Open Cart

```tsx
onClick={() => setIsCartOpen(true)}
```

---

## ✅ Step 9: Render Cart Items

```tsx
{cart.map((item) => (
```

---

## ✅ Step 10: Remove from Cart

```tsx
const handleRemoveFromCart = (id: string) => {
  setCart((prev) => prev.filter((product) => product.id !== id));
};
```

---

## ✅ Step 11: Checkout

```tsx
const handleCheckout = () => {
```

### 🔹 Calculate Total

```tsx
cart.reduce((total, product) => total + parseFloat(product.price), 0);
```

### 🔹 Reset Cart

```tsx
setCart([]);
setIsCartOpen(false);
```
