import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChipBlack from '../../assets/chip-card-black.png';
import ChipWhite from '../../assets/chip-card-white.png';
import MasterCardWhite from '../../assets/master-card-icon-white.png';
import MasterCardBlack from '../../assets/master-card-icon-black.png';
import Loader from '../Loader';

interface Card {
  name: string;
  balance: number;
  validTill: string;
  cardNo: string;
}

interface MyCardsProps {
  isLoading?: boolean;
}

const MyCards: React.FC<MyCardsProps> = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('https://api.devincilabs.com/api/v1/user/card');
        setCards(response.data.data);
        setError(null);
      } catch (err) {
        setError('Failed to load cards');
        console.error('Error fetching cards:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="bg-white rounded-[25px] p-6 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="rounded-[25px]">
      <div className="my-cards grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card, index) => (
          <div
            key={card.cardNo}
            className={`relative ${
              index === 0
                ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white'
                : 'bg-white text-black border'
            } rounded-[25px] p-4 h-[225px]`}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm opacity-80">Balance</p>
                <p className="text-xl lg:text-2xl font-bold">
                  ${card.balance.toLocaleString()}
                </p>
              </div>
              <img
                src={index === 0 ? ChipWhite : ChipBlack}
                alt="Chip"
                className="h-8"
              />
            </div>

            <div className="xl:w-[210px] w-[210px] flex justify-between">
              <div>
                <p className="text-xs mb-1">CARD HOLDER</p>
                <p className="font-medium text-sm mb-3">{card.name}</p>
              </div>
              <div>
                <p className="text-xs mb-1">VALID THRU</p>
                <p>{card.validTill}</p>
              </div>
            </div>

            <div
              className={`absolute left-0 bottom-0 py-[1.5rem] px-[1rem] border w-full flex justify-between items-center text-sm rounded-b-[25px] ${
                index === 0 ? 'bg-[#414141] text-white' : 'text-black'
              }`}
            >
              <p className="font-medium">{card.cardNo}</p>
              <img
                src={index === 0 ? MasterCardWhite : MasterCardBlack}
                alt="MasterCard"
                className="h-6"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCards;