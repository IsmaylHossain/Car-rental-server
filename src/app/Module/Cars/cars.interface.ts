
export type TCar = {
    name: string;
    description: string;
    color: string;
    isElectric: boolean;
    status: string;
    features: string[];
    pricePerHour: number;
    isDeleted: boolean;
};

export type TReturnCar = {
    bookingId: string;
    endTime: string;
};