export interface SeedProduct {
    codigo: string;
    nombre: string;
    imagenCredencial: string;
    creadoEn: Date;
}

export interface SeedData {
    products: SeedProduct[],
}

export const initialData: SeedData = {
    products: [
        {
            codigo: "PRD001",
            nombre: "Laptop Pro 14",
            imagenCredencial: "libro_morado.png",
            // imagenCredencial: "/laptop_pro_14.jpg",
            creadoEn: new Date('2022-01-15')
        },
        {
            codigo: "PRD002",
            nombre: "Smartphone X",
            // imagenCredencial: "/smartphone_x.jpg",
            imagenCredencial: "godzilla.jpg",
            creadoEn: new Date('2022-03-20')
        },
        {
            codigo: "PRD003",
            nombre: "Tablet Y",
            // imagenCredencial: "/tablet_y.jpg",
            imagenCredencial: "godzilla.jpg",
            creadoEn: new Date('2022-05-30')
        },
        {
            codigo: "PRD004",
            nombre: "Smartwatch Z",
            // imagenCredencial: "/smartwatch_z.jpg",
            imagenCredencial: "godzilla.jpg",
            creadoEn: new Date('2022-07-10')
        },
        {
            codigo: "PRD005",
            nombre: "Auriculares Bluetooth",
            // imagenCredencial: "/auriculares_bluetooth.jpg",
            imagenCredencial: "godzilla.jpg",
            creadoEn: new Date('2022-09-05')
        },
        {
            codigo: "PRD006",
            nombre: "Monitor 4K",
            // imagenCredencial: "/monitor_4k.jpg",
            imagenCredencial: "godzilla.jpg",
            creadoEn: new Date('2022-11-22')
        },
        {
            codigo: "PRD007",
            nombre: "Teclado Mecánico",
            // imagenCredencial: "/teclado_mecanico.jpg",
            imagenCredencial: "godzilla.jpg",
            creadoEn: new Date('2023-01-17')
        },
        {
            codigo: "PRD008",
            nombre: "Ratón Inalámbrico",
            // imagenCredencial: "/raton_inalambrico.jpg",
            imagenCredencial: "godzilla.jpg",
            creadoEn: new Date('2023-03-09')
        },
        {
            codigo: "PRD009",
            nombre: "Cámara Digital",
            // imagenCredencial: "/camara_digital.jpg",
            imagenCredencial: "godzilla.jpg",
            creadoEn: new Date('2023-05-14')
        },
        {
            codigo: "PRD010",
            nombre: "Impresora Multifunción",
            // imagenCredencial: "/impresora_multifuncion.jpg",
            imagenCredencial: "godzilla.jpg",
            creadoEn: new Date('2023-07-21')
        }
    ]
}