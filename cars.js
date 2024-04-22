const cars = [
    {
        id: 1,
        make: "Honda",
        model: "Civic",
        year: 2001,
        color: "blue"
    },
    {
        id: 2,
        make: "Ford",
        model: "Focus",
        year: 2009,
        color: "blue"
    },
    {
        id: 3,
        make: "Nissan",
        model: "Sentra",
        year: 2018,
        color: "red"
    },
    {
        id: 4,
        make: "Volkswagen",
        model: "Golf",
        year: 2005,
        color: "black"
    },
    {
        id: 5,
        make: "Audi",
        model: "A3",
        year: 2022,
        color: "silver"
    }
];

function getCars() {
    return cars;
}

function getCarInformation(id) {
    const car = cars.find(car => car.id === id);
    if (car) {
        return `Make: ${car.make}, Model: ${car.model}, Year: ${car.year}, Color: ${car.color}.`;
    } else {
        return "Car doesn't exist";
    }
}

function getCarAge(id) {
    const car = cars.find(car => car.id === id);
    if (car) {
        const currentYear = new Date().getFullYear();
        const carAge = currentYear - car.year;
        return `Car is ${carAge} years old.`;
    } else {
        return "Car doesn't exist";
    }
}

module.exports = {
    getCars,
    getCarInformation,
    getCarAge
};