INSERT INTO Cliente (id, nombre, dirección, id_concesionario) VALUES (1, 'Juan Pérez', 'Calle Falsa 123', 1);

INSERT INTO Cliente (id, nombre, direccion, id_concesionario) VALUES (2, 'María García', 'Avenida Siempre Viva 456', 2);

INSERT INTO Cliente (id, nombre, direccion, id_concesionario) VALUES (3, 'Carlos López', 'Boulevard del Sol 789', 1);

select * from almacen
-- Primero, asegúrate de que existan los concesionarios en la tabla Concesionario
INSERT INTO Concesionario (id, nombre, dirección) VALUES (1, 'Concesionario A', 'Calle del Concesionario 1');
INSERT INTO Concesionario (id, nombre, dirección) VALUES (2, 'Concesionario B', 'Avenida del Concesionario 2');

-- Luego, inserta los clientes en la tabla Cliente
INSERT INTO Cliente (id, nombre, dirección, id_concesionario) VALUES (1, 'Juan Pérez', 'Calle Falsa 123', 1);
INSERT INTO Cliente (id, nombre, dirección, id_concesionario) VALUES (2, 'María García', 'Avenida Siempre Viva 456', 2);
INSERT INTO Cliente (id, nombre, dirección, id_concesionario) VALUES (3, 'Carlos López', 'Boulevard del Sol 789', 1);

-- Inserta vehículos en la tabla Vehiculo
INSERT INTO Vehiculo (id, marca, modelo, año, precio, id_concesionario) VALUES (1, 'Toyota', 'Corolla', 2020, 20000, 1);
INSERT INTO Vehiculo (id, marca, modelo, año, precio, id_concesionario) VALUES (2, 'Ford', 'Mustang', 2021, 30000, 2);
INSERT INTO Vehiculo (id, marca, modelo, año, precio, id_concesionario) VALUES (3, 'Chevrolet', 'Camaro', 2019, 25000, 1);

--insertar en tabla empleados
INSERT INTO Almacen (Nombre, Ubicación) VALUES ('Almacen Central', 'Av. Principal 123');
INSERT INTO Almacen (Nombre, Ubicación) VALUES ('Almacen Norte', 'Calle 45 #678');
INSERT INTO Almacen (Nombre, Ubicación) VALUES ('Almacen Sur', 'Carrera 12 #34-56');

select * from almacen

-- Inserta empleados en la tabla Empleado
INSERT INTO Empleado (id, nombre, cargo, salario, id_concesionario) VALUES (1, 'Ana Rodríguez', 'Vendedor', 30000, 1);
INSERT INTO Empleado (id, nombre, cargo, salario, id_concesionario) VALUES (2, 'Luis Fernández', 'Gerente', 50000, 2);
INSERT INTO Empleado (id, nombre, cargo, salario, id_concesionario) VALUES (3, 'Pedro Sánchez', 'Mecánico', 35000, 1);

-- Inserta compras en la tabla Compra
INSERT INTO Compra (id, fecha, id_cliente, id_empleado, precio_total) VALUES (1, '2024-07-16', 1, 1, 15000);
INSERT INTO Compra (id, fecha, id_cliente, id_empleado, precio_total) VALUES (2, '2024-07-16', 2, 2, 20000);
INSERT INTO Compra (id, fecha, id_cliente, id_empleado, precio_total) VALUES (3, '2024-07-16', 1, 2, 18000);

select * from detalle_venta
-- Inserta productos en la tabla Producto
INSERT INTO Detalle_Venta (id, id_compra, id_producto, tipo_producto, cantidad, precio_unitario, precio_total) VALUES (1, 1, 1, 'Electrónico', 2, 100, 200);
INSERT INTO Detalle_Venta (id, id_compra, id_producto, tipo_producto, cantidad, precio_unitario, precio_total) VALUES (2, 2, 2, 'Mueble', 1, 200, 200);
INSERT INTO Detalle_Venta (id, id_compra, id_producto, tipo_producto, cantidad, precio_unitario, precio_total) VALUES (3, 3, 3, 'Accesorio', 3, 150, 450);
INSERT INTO Detalle_Venta (id, id_compra, id_producto, tipo_producto, cantidad, precio_unitario, precio_total)
VALUES (1, 1, 1, 'Mueble', 2, 100, 200);

select * from detalle_venta

-- Inserta insumos en la tabla Insumo
INSERT INTO Insumo (id, nombre, descripción, precio, id_almacén) VALUES (1, 'Tornillos', 'Tornillos de acero inoxidable', 5.99, 1);
INSERT INTO Insumo (id, nombre, descripción, precio, id_almacén) VALUES (2, 'Pintura', 'Pintura blanca mate', 15.50, 2);
INSERT INTO Insumo (id, nombre, descripción, precio, id_almacén) VALUES (3, 'Cables eléctricos', 'Cables de 2 metros', 8.75, 3);


ALTER TABLE cliente
ADD correo_electronico VARCHAR(100);  -- Ejemplo: Ajusta la longitud según tus necesidades

INSERT INTO cliente (id, nombre, dirección, id_concesionario, correo_electronico)
VALUES (5, 'Juan Pérez', 'Calle Principal 123', 1, 'juan.perez@example.com');

INSERT INTO cliente (id, nombre, dirección, id_concesionario, correo_electronico)
VALUES (6, 'María García', 'Avenida Central 456', 2, 'maria.garcia@example.com');

INSERT INTO cliente (id, nombre, dirección, id_concesionario, correo_electronico)
VALUES (400, 'Carlos velez', 'Calle terciaria 789', 1, 'alejovg1997@gmail.com');

ALTER TABLE detalle_venta
ALTER COLUMN tipo_producto TYPE VARCHAR(255);