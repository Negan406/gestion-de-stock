import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { showNotification } from '../utils/notifications';

function InventoryPage() {
  const [products, setProducts] = useLocalStorage('stock', []);
  const [editingProduct, setEditingProduct] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(''); // State for category filter

  const handleDelete = (id) => {
    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <p>Êtes-vous sûr de vouloir supprimer ce produit ?</p>
        <button class="confirm-btn">Oui</button>
        <button class="cancel-btn">Non</button>
      </div>
    `;
    
    document.body.appendChild(modal);
  
    modal.querySelector('.confirm-btn').addEventListener('click', () => {
      setProducts(products.filter(p => p.id !== id));
      showNotification('Produit supprimé avec succès');
      document.body.removeChild(modal);
    });
  
    modal.querySelector('.cancel-btn').addEventListener('click', () => {
      document.body.removeChild(modal);
    });
  };

  // Add modern CSS styles
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .custom-modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
        text-align: center;
        z-index: 1000;
        width: 300px;
      }
      .modal-content p {
        margin-bottom: 20px;
      }
      .confirm-btn, .cancel-btn {
        padding: 10px 15px;
        border: none;
        cursor: pointer;
        margin: 5px;
        border-radius: 5px;
      }
      .confirm-btn {
        background: red;
        color: white;
      }
      .cancel-btn {
        background: gray;
        color: white;
      }
      .confirm-btn:hover {
        background: darkred;
      }
      .cancel-btn:hover {
        background: darkgray;
      }
    </style>
  `);

  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedProduct = {
      ...editingProduct,
      name: form.editProductName.value.trim(),
      category: form.editProductCategory.value,
      price: parseFloat(form.editProductPrice.value),
      quantity: parseInt(form.editProductQuantity.value),
      lastModified: new Date().toISOString()
    };
    setProducts(products.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
    setEditingProduct(null);
    showNotification('Produit mis à jour avec succès');
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  // Filter products based on the selected category
  const filteredProducts = categoryFilter
    ? products.filter(product => product.category === categoryFilter)
    : products;

  return (
    <div id="inventory-page">
      <section className="card" id="inventory">
        <div className="card-header bg-primary text-white">
          <h2 className="h5 mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
  <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1M.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8z"/>
</svg>  Inventaire
          </h2>
        </div>
        <div className="card-body p-0">
          <div className="mb-3">
            <label className="form-label">Filtrer par catégorie</label>
            <select
              className="form-select"
              value={categoryFilter}
              onChange={handleCategoryChange}
            >
              <option value="">Toutes les catégories</option>
              <option value="Electronique">Electronique</option>
              <option value="Alimentaire">Alimentaire</option>
              <option value="Vêtements">Vêtements</option>
              <option value="Mobilier">Mobilier</option>
            </select>
          </div>
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th>Nom</th>
                  <th>Catégorie</th>
                  <th>Prix</th>
                  <th>Quantité</th>
                  <th>Valeur</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.price.toFixed(2)} DH</td>
                    <td>{product.quantity}</td>
                    <td>{(product.price * product.quantity).toFixed(2)} DH</td>
                    <td>
                      <button
                        onClick={() => handleEditClick(product)}
                        className="btn btn-primary btn-sm me-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                          <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="btn btn-danger btn-sm"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-light">
                <tr>
                  <td colSpan="4" className="text-end fw-bold">
                    Valeur Totale:
                  </td>
                  <td className="fw-bold">
                    {filteredProducts.reduce((sum, p) => sum + p.price * p.quantity, 0).toFixed(2)} DH
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>
      {editingProduct && (
        <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modifier le Produit</h5>
                <button type="button" className="btn-close" onClick={() => setEditingProduct(null)}></button>
              </div>
              <div className="modal-body">
                <form id="editProductForm" onSubmit={handleEditSubmit}>
                  <input type="hidden" name="editProductId" value={editingProduct.id} />
                  <div className="mb-3">
                    <label className="form-label">Nom du Produit</label>
                    <input
                      type="text"
                      className="form-control"
                      name="editProductName"
                      defaultValue={editingProduct.name}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Catégorie</label>
                    <select
                      className="form-select"
                      name="editProductCategory"
                      defaultValue={editingProduct.category}
                      required
                    >
                      <option value="Electronique">Electronique</option>
                      <option value="Alimentaire">Alimentaire</option>
                      <option value="Vêtements">Vêtements</option>
                      <option value="Mobilier">Mobilier</option>
                      <option value="Prod">Prod</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Prix (€)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="editProductPrice"
                      defaultValue={editingProduct.price}
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Quantité</label>
                    <input
                      type="number"
                      className="form-control"
                      name="editProductQuantity"
                      defaultValue={editingProduct.quantity}
                      required
                    />
                  </div>
                  <div className="text-end">
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={() => setEditingProduct(null)}
                    >
                      Annuler
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Sauvegarder
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InventoryPage;
