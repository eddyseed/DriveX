const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


//For Adding Car Data To Database
const addUsedCarDetails = async (req, res) => {
    if (a[1] === 'owner') {
        const {firstName, middleName, lastName, mobileNumber, altMobileNumber, dateOfBirth, address} = req.body[0];
        const fullName = firstName+middleName+lastName
        
    }
}



//For posting data from database to frontend
const handleSearchQuery = async (req, res) => {
    const { producer, category, car_type, budgetRange } = req.body;

    if (!producer || !category) {
        return res.status(400).json({ error: 'Empty Fields Received From Frontend!' });
    }

    if (car_type === undefined || car_type === null) {
        return res.status(400).json({ error: 'car_type field is required.' });
    }

    try {
        let cars;

        if (car_type === 'first') {
            cars = await prisma.new_cars.findMany({
                where: {
                    car_catalog: {
                        brand: producer,
                        category: category,
                    },
                    on_road_price: {
                        lte: budgetRange
                    },
                },
                include: {
                    car_catalog: true,
                    showrooms: true,
                },
            });
        } else {
            cars = await prisma.used_cars.findMany({
                where: {
                    car_catalog: {
                        brand: producer,
                        category: category,
                    },
                    resale_price: {
                        lte: budgetRange
                    },
                },
                include: {
                    car_catalog: true,
                },
            });
        }

        res.status(200).json({ message: 'Query handled successfully', data: cars });
    } catch (error) {
        console.error("❌ Prisma query error:", error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};
const handleCarQuery = async (_, res) => {
    try {
        const brands = await prisma.car_catalog.findMany({
            select: { brand: true },
            distinct: ['brand'],
        });

        const categories = await prisma.car_catalog.findMany({
            select: { category: true },
            distinct: ['category'],
        });

        const brandList = brands.map(item => item.brand);
        const categoryList = categories.map(item => item.category);

        res.status(200).json({
            message: 'Fetched all brands and categories',
            brands: brandList,
            categories: categoryList
        });
    } catch (error) {
        console.error("❌ Error fetching brands and categories:", error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
module.exports = {
    handleSearchQuery, handleCarQuery, addUsedCarDetails
};
