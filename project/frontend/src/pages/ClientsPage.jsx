import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { showNotification } from '../utils/notifications';

function ClientsPage() {
  const [clients, setClients] = useLocalStorage('clients', []);
  const [editingClient, setEditingClient] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newClient = {
      id: Date.now(),
      name: form.clientName.value.trim(),
      email: form.clientEmail.value.trim(),
      phone: form.clientPhone.value.trim()
    };
    setClients([...clients, newClient]);
    form.reset();
    showNotification('Client ajouté avec succès');
  };

  const handleDelete = (id) => {
    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <p>Êtes-vous sûr de vouloir supprimer ce client ?</p>
        <button class="confirm-btn">Oui</button>
        <button class="cancel-btn">Non</button>
      </div>
    `;
    
    document.body.appendChild(modal);
  
    modal.querySelector('.confirm-btn').addEventListener('click', () => {
      setClients(clients.filter(c => c.id !== id));
      showNotification('Client supprimé avec succès');
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

  const handleEditClick = (client) => {
    setEditingClient(client);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedClient = {
      id: editingClient.id,
      name: form.editClientName.value.trim(),
      email: form.editClientEmail.value.trim(),
      phone: form.editClientPhone.value.trim()
    };
    setClients(clients.map(c => (c.id === updatedClient.id ? updatedClient : c)));
    setEditingClient(null);
    showNotification('Client mis à jour avec succès');
  };

  return (
    <div id="add-product-page" >
      <h1 className="mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="30" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
</svg>  Gestion des Clients
      </h1>
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Ajouter un Client</h5>
            </div>
            <div className="card-body">
              <form id="clientForm" className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-4">
                  <label className="form-label">Nom</label>
                  <input type="text" className="form-control" name="clientName" required />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" name="clientEmail" required />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Téléphone</label>
                  <input type="tel" className="form-control" name="clientPhone" required />
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
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Liste des Clients</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map(client => (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.email}</td>
                    <td>{client.phone}</td>
                    <td>
                      <button
                        onClick={() => handleEditClick(client)}
                        className="btn btn-primary btn-sm me-1"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>
                      </button>
                      <button
                        onClick={() => handleDelete(client.id)}
                        className="btn btn-danger btn-sm"
                      >
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {editingClient && (
        <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modifier le Client</h5>
                <button type="button" className="btn-close" onClick={() => setEditingClient(null)}></button>
              </div>
              <div className="modal-body">
                <form id="editClientForm" onSubmit={handleEditSubmit}>
                  <input type="hidden" name="editClientId" value={editingClient.id} />
                  <div className="mb-3">
                    <label className="form-label">Nom</label>
                    <input
                      type="text"
                      className="form-control"
                      name="editClientName"
                      defaultValue={editingClient.name}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="editClientEmail"
                      defaultValue={editingClient.email}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Téléphone</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="editClientPhone"
                      defaultValue={editingClient.phone}
                      required
                    />
                  </div>
                  <div className="text-end">
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={() => setEditingClient(null)}
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

export default ClientsPage;
