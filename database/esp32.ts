interface SeedEsp32 {
    user: string;
    led: number;
    status: 'ON' | 'OFF';
}

interface SeedData {
    esp32s: SeedEsp32[]
}

export const initialData: SeedData = {
    esp32s: [
        {
            user: 'juank',
            led: 0,
            status: 'OFF'
        },
        {
            user: 'betty',
            led: 0,
            status: 'OFF'
        },
    ]
}