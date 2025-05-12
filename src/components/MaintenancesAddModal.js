import React, { useState, useEffect } from 'react';
import VenetianTile from './VenetianTile';
import { clients } from '../mock/clients';
import { employees } from '../mock/employees';

const MaintenancesAddModal = ({ isOpen, onClose, onSave }) => {
  const [clientsList, setClientsList] = useState([]);
  const [employeesList, setEmployeesList] = useState([]);
  const [newMaintenance, setNewMaintenance] = useState({
    clientId: '',
    address: '',
    googleMapsLink: '',
    serviceType: '',
    frequency: '',
    lastServiceDate: new Date().toISOString().split('T')[0],
    lastServiceEmployeeId: '',
    status: 'active',
    notes: ''
  });
  
  useEffect(() => {
    // In a real app, this would be an API call or localStorage
    setClientsList(clients);
    setEmployeesList(employees);
  }, []);
  
  // Handle input change for new maintenance
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMaintenance({
      ...newMaintenance,
      [name]: value
    });
  };
  
  // Handle client selection to pre-fill address and link
  const handleClientSelect = (e) => {
    const clientId = e.target.value;
    const client = clientsList.find(c => c.id === parseInt(clientId));
    setNewMaintenance({
      ...newMaintenance,
      clientId: clientId ? parseInt(clientId) : '',
      address: client?.address || '',
      googleMapsLink: client?.googleMapsLink || ''
    });
  };
  
  // Handle save new maintenance
  const handleSaveMaintenance = () => {
    if (!newMaintenance.clientId || !newMaintenance.serviceType || !newMaintenance.frequency) {
      alert('Por favor, completa los campos obligatorios (Cliente, Tipo de Servicio, Frecuencia).');
      return;
    }
    
    const maintenanceToSave = {
      ...newMaintenance,
      id: Date.now(), // Simple ID generation
      lastServiceEmployeeId: newMaintenance.lastServiceEmployeeId ? parseInt(newMaintenance.lastServiceEmployeeId) : null
    };
    
    onSave(maintenanceToSave);
    onClose();
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <VenetianTile className="max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-blue-100">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-blue-800">Nuevo Mantenimiento</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cliente
              </label>
              <select
                name="clientId"
                value={newMaintenance.clientId}
                onChange={handleClientSelect}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Seleccionar Cliente...</option>
                {clientsList.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Servicio
              </label>
              <input
                type="text"
                name="serviceType"
                value={newMaintenance.serviceType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Frecuencia
              </label>
              <input
                type="text"
                name="frequency"
                value={newMaintenance.frequency}
                onChange={handleInputChange}
                placeholder="Ej: Semanal, Mensual"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha del Último Servicio
              </label>
              <input
                type="date"
                name="lastServiceDate"
                value={newMaintenance.lastServiceDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Empleado que Ejecutó Último Servicio (Opcional)
              </label>
              <select
                name="lastServiceEmployeeId"
                value={newMaintenance.lastServiceEmployeeId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Seleccionar Empleado...</option>
                {employeesList.map(employee => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                name="status"
                value={newMaintenance.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dirección del Servicio
              </label>
              <input
                type="text"
                name="address"
                value={newMaintenance.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enlace Google Maps (Opcional)
              </label>
              <input
                type="text"
                name="googleMapsLink"
                value={newMaintenance.googleMapsLink}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notas (Opcional)
              </label>
              <textarea
                name="notes"
                value={newMaintenance.notes}
                onChange={handleInputChange}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancelar
            </button>
            
            <button
              onClick={handleSaveMaintenance}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Guardar Mantenimiento
            </button>
          </div>
        </div>
      </VenetianTile>
    </div>
  );
};

export default MaintenancesAddModal;