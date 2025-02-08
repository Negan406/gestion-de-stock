import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

function AddProductPage() {
  const [products, setProducts] = useLocalStorage('stock', []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newProduct = {
      id: Date.now(),
      name: form.productName.value.trim(),
      category: form.productCategory.value,
      price: parseFloat(form.productPrice.value),
      quantity: parseInt(form.productQuantity.value)
    };
    setProducts([...products, newProduct]);
    form.reset();
  };

  return (
    <div id="add-product-page" >
      <section className="card mb-4" id="add-product">
        <div className="card-header bg-primary text-white">
          <h2 className="h5 mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
</svg> Ajouter un Produit
          </h2>
        </div>
        <div className="card-body">
          <form id="productForm" className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-4">
              <label className="form-label">Nom du Produit</label>
              <input type="text" className="form-control" name="productName" required />
            </div>
            <div className="col-md-3">
              <label className="form-label">Catégorie</label>
              <select className="form-select" name="productCategory" required>
                <option value="Electronique">Electronique</option>
                <option value="Alimentaire">Alimentaire</option>
                <option value="Vêtements">Vêtements</option>
                <option value="Mobilier">Mobilier</option>
                <option value="Prod">Prod</option>
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label">Prix (DH)</label>
              <input type="number" className="form-control" name="productPrice" step="0.01" required />
            </div>
            <div className="col-md-2">
              <label className="form-label">Quantité</label>
              <input type="number" className="form-control" name="productQuantity" required />
            </div>
            <div className="col-md-1 d-flex align-items-end">
              <button type="submit" className="btn btn-success w-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy" viewBox="0 0 16 16">
        <path d="M11 2H9v3h2z"/>
                  <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"/>
          </svg>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default AddProductPage;
