import React, { useState } from 'react';
import Button from '../../../components/UI/atoms/Button';
import { useColorContext } from '../../../context/ColorContext';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import InputField from '../../../components/UI/atoms/InputField';
import { useAuth } from '../../../context/AuthContext';
import Product from '../../Products/ProductPage';
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
interface FormData {
    producer: string,
    category: string,
    car_type: 'first' | 'second' | null,
    budgetRange: string
}
interface SearchCarFormProps {
    categories: Set<string>;
    brands: Set<string>;
    onSearchResult: (cars: Car[]) => void;
    filteredCars: Car[]
}
const SearchCarForm: React.FC<SearchCarFormProps> = ({ categories, brands, onSearchResult, filteredCars}) => {
    const { user } = useAuth()
    const { colors } = useColorContext();
    const { primary, darkSecondary } = colors.variants;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(new String(''));
    // const [filteredCars, setFilteredCars] = useState<Car[]>(new Array())

    const [formData, setFormData] = useState<FormData>({
        producer: '',
        category: '',
        car_type: null,
        budgetRange: ''
    })
    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.post('http://localhost:5000/api/abstract/fetchSearchQuery', formData);
            if (response.data.message) {
                console.log(response.data, response.data.data.length)
                onSearchResult(response.data.data)
            }
            else {
                console.log('No Response from backend')
                setError('No Response from backend');
                setLoading(false);
            }

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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleCarTypeClick = (type: 'first' | 'second') => {
        setFormData({ ...formData, car_type: type });
    };
    return (
        <>
            {filteredCars.length > 0 && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-70 overflow-y-auto">
                    <Product cars={filteredCars} onClose={() => onSearchResult([])} />
                </div>
            )}
            <div className="my-12 w-[66%] rounded-lg">
                <div>
                    <div>
                        <h2>Hey {user?.name?.split(" ")[0] || 'Guest'}</h2>
                        <header>Get Your Car In Minutes</header>
                    </div>
                    <div>
                        <div className='space-x-4'>
                            <Button
                                colors={formData.car_type === 'first' ? darkSecondary : primary}
                                onClick={() => handleCarTypeClick('first')}
                                text='First Hand' children={undefined} />
                            <Button
                                colors={formData.car_type === 'second' ? darkSecondary : primary}
                                onClick={() => handleCarTypeClick('second')}
                                text='Second Hand' children={undefined} />
                        </div>

                        <div className='space-y-1'>
                            <label htmlFor="producer">Select Producer*</label>
                            <select
                                className='w-11/12 h-2/5 border-2 border-gray-300 rounded-md'
                                name="producer"
                                id="producer"
                                onChange={(e) => handleChange(e)}
                                value={formData.producer}
                                required
                            >
                                <option value="">Select Producer...</option>
                                {[...brands].map((item, index) => (
                                    <option key={index} value={String(item)}>{String(item)}</option>
                                ))}
                            </select>
                        </div>
                        <div className='space-y-1'>
                            <label htmlFor="category">Select Category*</label>
                            <select
                                className='w-11/12 h-2/5 border-2 border-gray-300 rounded-md'
                                name="category"
                                id="category"
                                onChange={(e) => handleChange(e)}
                                value={formData.category}
                                required
                            >
                                <option value="">Select Category...</option>
                                {[...categories].map((item, index) => (
                                    <option key={index} value={String(item)}>{String(item)}</option>
                                ))}
                            </select>
                        </div>
                        <div className='space-y-1'>
                            <label htmlFor="budgetRange">Select Budget Range (in Rs)</label>
                            <InputField name='budgetRange' id='budgetRange' placeholder='For eg Rs 5,52,000.' onChange={handleChange} type='number' required value={formData.budgetRange || ''} />
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <Button colors={primary} onClick={() => setFormData({ producer: '', category: '', car_type: null, budgetRange: '' })} text='Reset'>{undefined}</Button>
                        <Button colors={darkSecondary} text='Search' onClick={(e) => { e.preventDefault(); handleSubmit(); }}>{<SearchIcon />}</Button>
                    </div>
                </div>

            </div></>

    );
};

export default SearchCarForm;

