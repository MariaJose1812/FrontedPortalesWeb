export interface User {
    id: string;
    name: string;
    email: string;
    faculty: 'Derecho' | 'Gestión Estratégica de Empresas' | 'Mercadotecnia' | 'Psicología' | 'Ingeniería Industrial' | 'Ingeniería Civil' | 'Ingeniería en Ciencias de la Computación' | 'Medicina y Cirugía';
}