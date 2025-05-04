import React from 'react';
import Masonry from 'react-masonry-css';
import styles from '../../../assets/styles/Components/Home.module.scss';
const MasonryLayout: React.FC = () => {

        const breakpointColumnsObj = {
            default: 2,
            1100: 2,
            700: 1,
            500: 1,
        };
    
        const carMasonryData = [
            {
                id: 1,
                name: "Tesla Model S",
                image: "https://assets.entrepreneur.com/content/3x2/2000/1686042484-Untitleddesign83.jpg",
                price: "$79,990",
            },
            {
                id: 2,
                name: "BMW X5 M60i",
                image: "https://robbreport.com/wp-content/uploads/2024/08/temerario01.jpg?w=800",
                price: "$61,700",
            },
            {
                id: 3,
                name: "Audi A6 Avant",
                image: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Land-Rover/Defender/12294/1736235204503/side-view-(left)-90.jpg",
                price: "$54,900",
            },
            {
                id: 4,
                name: "Cybertruck",
                image: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Volkswagen/Virtus/10617/1739939470391/front-left-side-47.jpg",
                price: "$54,999"
            },
            {
                id: 5,
                name: "Cybertruck",
                image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/2019_Toyota_Corolla_Icon_Tech_VVT-i_Hybrid_1.8.jpg/960px-2019_Toyota_Corolla_Icon_Tech_VVT-i_Hybrid_1.8.jpg",
                price: "$54,999"
            },
            {
                id: 6,
                name: "Cybertruck",
                image: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Porsche/911/11757/1717680690776/front-left-side-47.jpg?impolicy=resize",
                price: "$54,999"
            },
        ];
    return (
        <div>
            <div className="px-12 py-6 overflow-y-auto">
                <Masonry breakpointCols={breakpointColumnsObj} className={styles.masonryGrid} columnClassName={styles.masonryGridColumn}>
                    {carMasonryData.map((car) => (
                        <div key={car.id} className={`${styles.card} rounded-xl mx-2 my-3 border border-solid border-[rgba(217, 217, 217, 1)] bg-gray-100`}>
                            <img src={car.image} alt={car.name} className={`${styles.cardImage} rounded-tr-xl rounded-tl-xl`} />
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{car.name}</h3>
                                <p className={styles.cardPrice}>{car.price}</p>
                            </div>
                        </div>
                    ))}
                </Masonry>
            </div>
        </div>
    );
};

export default MasonryLayout;