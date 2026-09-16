'use client';

import { useState } from 'react';

/** Saved-card + new-card form state used by the checkout and payment screens. */
export function usePaymentCards() {
  const [cards, setCards] = useState([{ id: 'demo-visa-4242', brand: 'Visa', last4: '4242', expiry: '01/54' }]);
  const [selectedCardId, setSelectedCardId] = useState('demo-visa-4242');
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardForm, setCardForm] = useState({ number: '', expiry: '', cvc: '' });
  const [cardError, setCardError] = useState('');
  const selectedCard = cards.find((card) => card.id === selectedCardId);

  const saveCard = () => {
    const number = cardForm.number.replace(/\D/g, '');
    const expiry = cardForm.expiry.trim();
    const cvc = cardForm.cvc.replace(/\D/g, '');
    if (number.length < 12 || !/^\d{2}\s*\/\s*\d{2}$/.test(expiry) || cvc.length < 3) {
      setCardError('Enter a valid card number, expiry date, and security code.');
      return;
    }
    const card = { id: `card-${Date.now()}`, brand: number.startsWith('4') ? 'Visa' : 'Card', last4: number.slice(-4), expiry: expiry.replace(/\s+/g, '') };
    setCards((current) => [...current, card]);
    setSelectedCardId(card.id);
    setCardForm({ number: '', expiry: '', cvc: '' });
    setCardError('');
    setShowCardForm(false);
  };

  const deleteCard = (id) => {
    setCards((current) => current.filter((card) => card.id !== id));
    if (selectedCardId === id) setSelectedCardId(cards.find((card) => card.id !== id)?.id || null);
  };

  return { cards, selectedCard, selectedCardId, setSelectedCardId, showCardForm, setShowCardForm, cardForm, setCardForm, cardError, setCardError, saveCard, deleteCard };
}
