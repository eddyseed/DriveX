import React, { useEffect, useState } from 'react';
import styles from '../../../assets/styles/Components/Home.module.scss';
import Product from '../../Products/ProductPage';
import axios from 'axios';
import SearchCarForm from '../Elements/SearchCarForm';
import MasonryLayout from '../Elements/MasonryLayout';
interface Car {
    id: number;
    car_catalog: {
        name: string;
        brand: string;
        model_year: number;
        fuel_type: string;
        transmission: string;
        mileage: number;
        seating_capacity: number;
        engine_capacity: number;
        torque: string;
        horsepower: number;
        color: string;
        showroom_price: number;
    };
    showrooms: {
        name: string;
        location: string;
        contact_number: string;
    };
    previous_owners?: number;
    service_history?: string;
    last_service_date?: string;
    accident_history?: boolean;
    km_driven?: number;
    resale_price?: number;
    is_certified?: boolean;
    is_available?: boolean;
    on_road_price?: number;
    discount?: number;
    insurance_price?: number;
    warranty_period?: string;
}
interface InitialData {
    brands: string[];
    categories: string[];
}

const LandingPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(new String(''));
    const [filteredSearchBrands, setfilteredSearchBrands] = useState<Set<string>>(new Set());
    const [filteredCategories, setfilteredCategories] = useState<Set<string>>(new Set());
    const [filteredCars, setFilteredCars] = useState<Car[]>(new Array())
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(true)
                setError('')

                //API Call
                const res = await axios.get<InitialData>("http://localhost:5000/api/abstract/initialdata");
                if (res.status !== 200) {
                    setError('Failed to fetch initial data');
                    setLoading(false);
                    return;
                }
                // Assuming the response contains the brands and categories
                const { brands, categories } = res.data;
                setfilteredSearchBrands(new Set<string>(brands))
                setfilteredCategories(new Set<string>(categories))

            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error("Backend Error:", error.response?.data.message || error.message);
                    setError(error.response?.data.message || "An error occurred");
                    setLoading(false);
                } else {
                    console.error("Unknown Error:", error);
                    setError("An unknown error occurred");
                    setLoading(false);
                }
            } finally {
                setLoading(false);
            }
        }
        fetchInitialData()
    }, []);


    return (
        <>
            {filteredCars.length > 0 && (
                <div className="fixed top-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-70 overflow-y-auto">
                    <Product cars={filteredCars} onClose={() => setFilteredCars([])} />
                </div>
            )}
            <div className={`${styles.LandingPage} h-auto grid grid-cols-2`}>
                <MasonryLayout />
                <div className="flex justify-center z-20">
                    <SearchCarForm filteredCars={filteredCars} categories={filteredCategories} brands={filteredSearchBrands} onSearchResult={(cars) => setFilteredCars(cars)} />
                </div>
            </div>
        </>
    );
};

export default LandingPage;
