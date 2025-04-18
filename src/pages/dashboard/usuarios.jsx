import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
  Chip,
  IconButton,
  Alert,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
  Switch,
  Avatar,
  Tooltip
} from "@material-tailwind/react";
import {
  UserPlusIcon,
  PencilIcon,
  TrashIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  LockClosedIcon,
  KeyIcon,
  UserCircleIcon,
  XMarkIcon,
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";

// Datos de ejemplo para los usuarios (en una implementación real, estos vendrían desde una API)
const usuariosIniciales = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    email: "juan.perez@transportesromero.com",
    hashed_password: "••••••••••",
    full_name: "Juan Pérez",
    role_id: 1,
    is_active: true,
    created_at: "2024-12-15T08:30:00Z",
    updated_at: "2025-01-05T14:20:00Z",
    last_login: "2025-04-15T09:45:00Z"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    email: "maria.lopez@transportesromero.com",
    hashed_password: "••••••••••",
    full_name: "María López",
    role_id: 2,
    is_active: true,
    created_at: "2025-01-10T10:15:00Z",
    updated_at: "2025-01-10T10:15:00Z",
    last_login: "2025-04-16T11:30:00Z"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    email: "carlos.mendoza@transportesromero.com",
    hashed_password: "••••••••••",
    full_name: "Carlos Mendoza",
    role_id: 4,
    is_active: true,
    created_at: "2025-02-05T09:00:00Z",
    updated_at: "2025-02-05T09:00:00Z",
    last_login: "2025-04-14T16:20:00Z"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    email: "ana.garcia@transportesromero.com",
    hashed_password: "••••••••••",
    full_name: "Ana García",
    role_id: 3,
    is_active: false,
    created_at: "2025-03-12T11:30:00Z",
    updated_at: "2025-04-01T08:45:00Z",
    last_login: "2025-03-30T14:10:00Z"
  }
];

// Datos de roles
const roles = [
  { id: 1, name: "admin", description: "Administrador del Sistema" },
  { id: 2, name: "sales", description: "Personal de Ventas" },
  { id: 3, name: "warehouse", description: "Personal de Almacén" },
  { id: 4, name: "accountant", description: "Contador" }
];

// Add named export alongside default export
export function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState(usuariosIniciales);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // "create", "edit", "password", "view"
  const [searchTerm, setSearchTerm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Estado para nuevo/edición de usuario
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    full_name: "",
    role_id: 1,
    is_active: true
  });
  
  // Estado para alertas
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('info');
  
  // Filtrar usuarios según el término de búsqueda
  const filteredUsuarios = usuarios.filter(usuario => 
    usuario.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getRoleName(usuario.role_id).toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Obtener nombre del rol según ID
  const getRoleName = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    return role ? role.description : "Sin rol";
  };
  
  // Formatear fecha
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-PE', options);
  };
  
  // Abrir modal para crear nuevo usuario
  const handleOpenCreateModal = () => {
    setFormData({
      email: "",
      password: "",
      full_name: "",
      role_id: 1,
      is_active: true
    });
    setModalMode("create");
    setOpenModal(true);
    setShowPassword(false);
  };
  
  // Abrir modal para editar usuario
  const handleOpenEditModal = (usuario) => {
    setSelectedUsuario(usuario);
    setFormData({
      email: usuario.email,
      password: "",
      full_name: usuario.full_name,
      role_id: usuario.role_id,
      is_active: usuario.is_active
    });
    setModalMode("edit");
    setOpenModal(true);
  };
  
  // Abrir modal para cambiar contraseña
  const handleOpenPasswordModal = (usuario) => {
    setSelectedUsuario(usuario);
    setFormData({
      ...formData,
      password: ""
    });
    setModalMode("password");
    setOpenModal(true);
    setShowPassword(false);
  };
  
  // Abrir modal para ver detalles del usuario
  const handleOpenViewModal = (usuario) => {
    setSelectedUsuario(usuario);
    setModalMode("view");
    setOpenModal(true);
  };
  
  // Manejar cambios en el formulario
  const handleFormChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  // Validar el formulario
  const validateForm = () => {
    // Validar según el modo
    if (modalMode === "create") {
      // Para creación, todos los campos son requeridos
      if (!formData.email || !formData.password || !formData.full_name) {
        setAlertMessage('Todos los campos son obligatorios');
        setAlertType('error');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
        return false;
      }
      
      // Validar formato de email
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setAlertMessage('Ingrese un email válido');
        setAlertType('error');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
        return false;
      }
      
      // Validar que el email no esté duplicado
      if (usuarios.some(u => u.email.toLowerCase() === formData.email.toLowerCase())) {
        setAlertMessage('Ya existe un usuario con ese email');
        setAlertType('error');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
        return false;
      }
      
      // Validar contraseña
      if (formData.password.length < 8) {
        setAlertMessage('La contraseña debe tener al menos 8 caracteres');
        setAlertType('error');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
        return false;
      }
    } else if (modalMode === "edit") {
      // Para edición, validar email y nombre
      if (!formData.email || !formData.full_name) {
        setAlertMessage('El email y nombre son obligatorios');
        setAlertType('error');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
        return false;
      }
      
      // Validar formato de email
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setAlertMessage('Ingrese un email válido');
        setAlertType('error');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
        return false;
      }
      
      // Validar que el email no esté duplicado (excepto el mismo usuario)
      if (usuarios.some(u => u.email.toLowerCase() === formData.email.toLowerCase() && u.id !== selectedUsuario.id)) {
        setAlertMessage('Ya existe un usuario con ese email');
        setAlertType('error');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
        return false;
      }
    } else if (modalMode === "password") {
      // Para cambio de contraseña
      if (!formData.password || formData.password.length < 8) {
        setAlertMessage('La contraseña debe tener al menos 8 caracteres');
        setAlertType('error');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
        return false;
      }
    }
    
    return true;
  };
  
  // Guardar cambios
  const handleSaveChanges = () => {
    if (!validateForm()) {
      return;
    }
    
    // En una implementación real, aquí se enviarían los datos a la API
    
    if (modalMode === "create") {
      // Crear nuevo usuario
      const newUser = {
        id: `user-${Date.now()}`, // Generar un ID temporal
        email: formData.email,
        hashed_password: "••••••••••", // En la implementación real, la contraseña se hashearía en el backend
        full_name: formData.full_name,
        role_id: formData.role_id,
        is_active: formData.is_active,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_login: null
      };
      
      setUsuarios([...usuarios, newUser]);
      
      setAlertMessage('Usuario creado correctamente');
      setAlertType('success');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } else if (modalMode === "edit") {
      // Actualizar usuario existente
      const updatedUsers = usuarios.map(usuario => 
        usuario.id === selectedUsuario.id ? {
          ...usuario,
          email: formData.email,
          full_name: formData.full_name,
          role_id: formData.role_id,
          is_active: formData.is_active,
          updated_at: new Date().toISOString()
        } : usuario
      );
      
      setUsuarios(updatedUsers);
      
      setAlertMessage('Usuario actualizado correctamente');
      setAlertType('success');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } else if (modalMode === "password") {
      // Cambiar contraseña
      setAlertMessage('Contraseña actualizada correctamente');
      setAlertType('success');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
    
    // Cerrar modal
    setOpenModal(false);
  };
  
  // Eliminar usuario
  const handleDeleteUser = (userId) => {
    // Pedir confirmación
    if (!window.confirm('¿Está seguro de eliminar este usuario? Esta acción no se puede deshacer.')) {
      return;
    }
    
    // En una implementación real, aquí se enviaría la solicitud a la API
    const updatedUsers = usuarios.filter(usuario => usuario.id !== userId);
    setUsuarios(updatedUsers);
    
    setAlertMessage('Usuario eliminado correctamente');
    setAlertType('success');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };
  
  // Cambiar estado (activar/desactivar)
  const handleToggleStatus = (usuario) => {
    // En una implementación real, aquí se enviaría la solicitud a la API
    const updatedUsers = usuarios.map(u => 
      u.id === usuario.id ? { ...u, is_active: !u.is_active, updated_at: new Date().toISOString() } : u
    );
    
    setUsuarios(updatedUsers);
    
    setAlertMessage(`Usuario ${usuario.is_active ? 'desactivado' : 'activado'} correctamente`);
    setAlertType('success');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };
  
  // Obtener las iniciales del nombre para el avatar
  const getInitials = (name) => {
    if (!name) return "U";
    
    const nameParts = name.split(" ");
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    
    return name.substring(0, 2).toUpperCase();
  };
  
  // Obtener color según el rol
  const getRoleColor = (roleId) => {
    const colors = {
      1: "blue",   // admin
      2: "green",  // ventas
      3: "orange", // almacén
      4: "purple"  // contador
    };
    
    return colors[roleId] || "gray";
  };
  
  return (
    <div className="mt-12">
      {showAlert && (
        <Alert
          color={alertType === 'success' ? 'green' : alertType === 'error' ? 'red' : 'blue'}
          icon={
            alertType === 'success' ? <CheckCircleIcon className="h-6 w-6" /> : 
            alertType === 'error' ? <ExclamationCircleIcon className="h-6 w-6" /> : 
            <InformationCircleIcon className="h-6 w-6" />
          }
          className="mb-4"
          dismissible={{
            onClose: () => setShowAlert(false),
          }}
        >
          {alertMessage}
        </Alert>
      )}
      
      <div className="mb-6 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Gestión de Usuarios
          </Typography>
          <Button
            className="flex items-center gap-2"
            size="sm"
            onClick={handleOpenCreateModal}
          >
            <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
            Nuevo Usuario
          </Button>
        </div>
        <Typography variant="small" color="blue-gray" className="font-normal">
          Administre los usuarios y sus permisos de acceso al sistema
        </Typography>
      </div>
      
      <Card className="overflow-hidden border border-blue-gray-100 shadow-sm">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 p-6"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <Typography variant="h6" color="blue-gray">
                Lista de Usuarios
              </Typography>
              <Typography variant="small" color="gray" className="mt-1 font-normal">
                Gestione permisos, roles y accesos al sistema
              </Typography>
            </div>
            <div className="w-full md:w-72">
              <Input
                label="Buscar usuarios"
                icon={<MagnifyingGlassIcon className="h-5 w-5 text-blue-gray-300" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          {filteredUsuarios.length > 0 ? (
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {[
                    "Usuario",
                    "Email",
                    "Rol",
                    "Estado",
                    "Último Acceso",
                    "Acciones",
                  ].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-6 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-medium uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredUsuarios.map((usuario) => {
                  const className = "py-3 px-5 border-b border-blue-gray-50";
                  return (
                    <tr key={usuario.id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar
                            size="sm"
                            variant="circular"
                            className={`bg-${getRoleColor(usuario.role_id)}-500 flex items-center justify-center`}
                            alt={usuario.full_name}
                          />
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-gray-100 text-xs font-bold">
                            {getInitials(usuario.full_name)}
                          </div>
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {usuario.full_name}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="text-xs font-normal opacity-70"
                            >
                              Creado el {formatDate(usuario.created_at).split(',')[0]}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {usuario.email}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="w-max">
                          <Chip
                            size="sm"
                            variant="ghost"
                            value={getRoleName(usuario.role_id)}
                            color={getRoleColor(usuario.role_id)}
                          />
                        </div>
                      </td>
                      <td className={className}>
                        <div className="w-max">
                          <Chip
                            size="sm"
                            variant="gradient"
                            value={usuario.is_active ? "Activo" : "Inactivo"}
                            color={usuario.is_active ? "green" : "blue-gray"}
                          />
                        </div>
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {usuario.last_login ? formatDate(usuario.last_login) : "Nunca"}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="flex gap-2">
                          <Tooltip content="Ver detalles">
                            <IconButton
                              variant="text"
                              color="blue-gray"
                              onClick={() => handleOpenViewModal(usuario)}
                            >
                              <EyeIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Editar usuario">
                            <IconButton
                              variant="text"
                              color="blue"
                              onClick={() => handleOpenEditModal(usuario)}
                            >
                              <PencilIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Cambiar contraseña">
                            <IconButton
                              variant="text"
                              color="amber"
                              onClick={() => handleOpenPasswordModal(usuario)}
                            >
                              <KeyIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content={usuario.is_active ? "Desactivar" : "Activar"}>
                            <IconButton
                              variant="text"
                              color={usuario.is_active ? "red" : "green"}
                              onClick={() => handleToggleStatus(usuario)}
                            >
                              {usuario.is_active ? (
                                <LockClosedIcon className="h-4 w-4" />
                              ) : (
                                <UserCircleIcon className="h-4 w-4" />
                              )}
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Eliminar">
                            <IconButton
                              variant="text"
                              color="red"
                              onClick={() => handleDeleteUser(usuario.id)}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="text-center p-10">
              <UserCircleIcon className="h-12 w-12 mx-auto text-blue-gray-300 mb-4" />
              <Typography variant="h6" color="blue-gray">
                No se encontraron usuarios
              </Typography>
              <Typography variant="small" color="blue-gray" className="mt-2">
                No hay usuarios que coincidan con su búsqueda
              </Typography>
              <Button
                className="mt-4 flex items-center gap-2 mx-auto"
                onClick={handleOpenCreateModal}
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
                Nuevo Usuario
              </Button>
            </div>
          )}
        </CardBody>
        <CardFooter className="flex justify-between items-center p-4 border-t border-blue-gray-50">
          <Typography variant="small" className="font-normal text-blue-gray-600">
            Mostrando {filteredUsuarios.length} de {usuarios.length} usuarios
          </Typography>
        </CardFooter>
      </Card>
      
      {/* Modal Dialog */}
      <Dialog size="md" open={openModal} handler={() => setOpenModal(false)}>
        <DialogHeader className="flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            {modalMode === "create" ? "Crear Nuevo Usuario" : 
             modalMode === "edit" ? "Editar Usuario" : 
             modalMode === "password" ? "Cambiar Contraseña" : 
             "Detalles del Usuario"}
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenModal(false)}
          >
            <XMarkIcon className="h-5 w-5" />
          </IconButton>
        </DialogHeader>
        
        <DialogBody className="overflow-y-auto">
          {modalMode === "view" && selectedUsuario && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Typography variant="small" className="font-medium text-blue-gray-700">
                  Nombre Completo
                </Typography>
                <Typography variant="small" className="font-normal">
                  {selectedUsuario.full_name}
                </Typography>
              </div>
              
              <div>
                <Typography variant="small" className="font-medium text-blue-gray-700">
                  Email
                </Typography>
                <Typography variant="small" className="font-normal">
                  {selectedUsuario.email}
                </Typography>
              </div>
              
              <div>
                <Typography variant="small" className="font-medium text-blue-gray-700">
                  Rol
                </Typography>
                <div className="mt-1">
                  <Chip
                    size="sm"
                    variant="ghost"
                    value={getRoleName(selectedUsuario.role_id)}
                    color={getRoleColor(selectedUsuario.role_id)}
                  />
                </div>
              </div>
              
              <div>
                <Typography variant="small" className="font-medium text-blue-gray-700">
                  Estado
                </Typography>
                <div className="mt-1">
                  <Chip
                    size="sm"
                    variant="gradient"
                    value={selectedUsuario.is_active ? "Activo" : "Inactivo"}
                    color={selectedUsuario.is_active ? "green" : "blue-gray"}
                  />
                </div>
              </div>
              
              <div>
                <Typography variant="small" className="font-medium text-blue-gray-700">
                  Fecha de Creación
                </Typography>
                <Typography variant="small" className="font-normal">
                  {formatDate(selectedUsuario.created_at)}
                </Typography>
              </div>
              
              <div>
                <Typography variant="small" className="font-medium text-blue-gray-700">
                  Última Actualización
                </Typography>
                <Typography variant="small" className="font-normal">
                  {formatDate(selectedUsuario.updated_at)}
                </Typography>
              </div>
              
              <div>
                <Typography variant="small" className="font-medium text-blue-gray-700">
                  Último Acceso
                </Typography>
                <Typography variant="small" className="font-normal">
                  {selectedUsuario.last_login ? formatDate(selectedUsuario.last_login) : "Nunca ha iniciado sesión"}
                </Typography>
              </div>
            </div>
          )}
          
          {(modalMode === "create" || modalMode === "edit") && (
            <div className="flex flex-col gap-4">
              <div>
                <Typography variant="small" className="font-medium mb-2">
                  Nombre Completo
                </Typography>
                <Input
                  value={formData.full_name}
                  onChange={(e) => handleFormChange('full_name', e.target.value)}
                  placeholder="Ej. Juan Pérez"
                  label="Nombre completo"
                  required
                />
              </div>
              
              <div>
                <Typography variant="small" className="font-medium mb-2">
                  Email
                </Typography>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                  placeholder="usuario@ejemplo.com"
                  label="Email"
                  required
                />
              </div>
              
              {modalMode === "create" && (
                <div>
                  <Typography variant="small" className="font-medium mb-2">
                    Contraseña
                  </Typography>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleFormChange('password', e.target.value)}
                      placeholder="Mínimo 8 caracteres"
                      label="Contraseña"
                      required
                    />
                    <IconButton
                      variant="text"
                      color="blue-gray"
                      className="!absolute right-1 top-1"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </IconButton>
                  </div>
                  <Typography variant="small" className="mt-1 text-gray-600">
                    Mínimo 8 caracteres
                  </Typography>
                </div>
              )}
              
              <div>
                <Typography variant="small" className="font-medium mb-2">
                  Rol
                </Typography>
                <Select
                  value={formData.role_id.toString()}
                  onChange={(val) => handleFormChange('role_id', parseInt(val, 10))}
                  label="Seleccione un rol"
                >
                  {roles.map((role) => (
                    <Option key={role.id} value={role.id.toString()}>
                      {role.description}
                    </Option>
                  ))}
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.is_active}
                  onChange={() => handleFormChange('is_active', !formData.is_active)}
                />
                <Typography variant="small" className="font-medium">
                  Usuario activo
                </Typography>
              </div>
            </div>
          )}
          
          {modalMode === "password" && selectedUsuario && (
            <div className="flex flex-col gap-4">
              <div className="text-center mb-4">
                <Typography variant="small" className="font-medium">
                  Cambiar contraseña para:
                </Typography>
                <Typography className="font-bold">
                  {selectedUsuario.full_name}
                </Typography>
                <Typography variant="small" className="text-blue-gray-600">
                  {selectedUsuario.email}
                </Typography>
              </div>
              
              <div>
                <Typography variant="small" className="font-medium mb-2">
                  Nueva Contraseña
                </Typography>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleFormChange('password', e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    label="Nueva contraseña"
                    required
                  />
                  <IconButton
                    variant="text"
                    color="blue-gray"
                    className="!absolute right-1 top-1"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </IconButton>
                </div>
                <Typography variant="small" className="mt-1 text-gray-600">
                  Mínimo 8 caracteres
                </Typography>
              </div>
              
              <Alert color="amber" className="mt-4" icon={<InformationCircleIcon className="h-6 w-6" />}>
                <Typography className="font-medium">
                  Información de seguridad
                </Typography>
                <Typography className="mt-2 text-xs">
                  Recomendamos usar contraseñas seguras que incluyan letras mayúsculas, minúsculas, números y caracteres especiales.
                </Typography>
              </Alert>
            </div>
          )}
        </DialogBody>
        <DialogFooter className="flex gap-2">
          {modalMode !== "view" && (
            <>
              <Button variant="outlined" color="red" onClick={() => setOpenModal(false)}>
                Cancelar
              </Button>
              <Button color="blue" onClick={handleSaveChanges}>
                {modalMode === "create" ? "Crear Usuario" : 
                 modalMode === "edit" ? "Guardar Cambios" : 
                 "Cambiar Contraseña"}
              </Button>
            </>
          )}
          {modalMode === "view" && (
            <Button color="blue" onClick={() => setOpenModal(false)}>
              Cerrar
            </Button>
          )}
        </DialogFooter>
      </Dialog>
    </div>
  );
}